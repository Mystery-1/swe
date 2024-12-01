import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Box,
  LinearProgress,
  Chip,
} from "@mui/material";
import {
  Search as SearchIcon,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grow } from "@mui/material";
import { motion } from "framer-motion";

function TaskSchedule() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [gptCalled, setGptCalled] = useState(false);

  const fetchTasksFromDatabase = async () => {
    try {
      const userEmail = localStorage.getItem("user_email");
      if (!userEmail) {
        toast.error("User email is missing.", { position: "bottom-right" });
        return [];
      }

      const formData = new FormData();
      formData.append("user_email", userEmail);

      const response = await fetch(
        "http://localhost/SWE-444/my-app/src/back/getTasks.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        return data.tasks.map((task, index) => ({
          ...task,
          progress: 0, 
          id: task.id || task.task_id || index, 
        }));
      } else {
        toast.error(data.message || "Failed to fetch tasks.", {
          position: "bottom-right",
        });
        return [];
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Error fetching tasks from database.", {
        position: "bottom-right",
      });
      return [];
    }
  };

  const sendTasksToPhpAndFetchUpdatedTasks = async (tasksNeedingEstimation) => {
    try {
      const response = await fetch(
        "http://localhost/SWE-444/my-app/src/back/gpt1.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tasksNeedingEstimation),
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        const updatedTasks = data.tasks.map((task, index) => ({
          ...task,
          progress: 0,
          id: task.id || task.task_id || index, // Assign unique ID
        }));
        setTasks((prevTasks) => {
          // Merge updated tasks with existing ones
          const taskMap = {};
          prevTasks.forEach((task) => {
            taskMap[task.id] = task;
          });
          updatedTasks.forEach((task) => {
            taskMap[task.id] = task;
          });
          return Object.values(taskMap);
        });
      } else {
        toast.error(data.message || "Failed to process tasks.", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Error processing tasks:", error);
      toast.error("Error processing tasks.", { position: "bottom-right" });
    }
  };

  const handleSaveSchedule = async () => {
    try {
      const userEmail = localStorage.getItem("user_email");
      if (!userEmail) {
        toast.error("User email is missing.", { position: "bottom-right" });
        return;
      }

      const response = await fetch(
        "http://localhost/SWE-444/my-app/src/back/saveSchedule.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_email: userEmail, tasks }),
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        toast.success("Schedule saved successfully!", {
          position: "bottom-right",
        });
        window.location.reload();
      } else {
        toast.error(data.message || "Failed to save schedule.", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Error saving schedule:", error);
      toast.error("Error saving schedule.", { position: "bottom-right" });
    }
  };

  const handleMarkAsDone = (taskId) => {
    console.log("Marking task as done:", taskId);
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks([...completedTasks, taskId]);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, progress: 100 } : task
        )
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

useEffect(() => {
  // Define the function to trigger the PHP script
  const triggerTaskReminder = async () => {
      try {
          const response = await fetch('http://localhost/SWE-444/my-app/src/back/sendTaskEmails.php', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          if (response.ok) {
              const data = await response.json();
              console.log('Response:', data);
          } else {
              console.error('Failed to send task reminders:', response.status);
          }
      } catch (error) {
          console.error('Error while triggering task reminders:', error);
      }
  };

  // Call the function every 1 minute
  const intervalId = setInterval(() => {
      triggerTaskReminder();
  }, 6000); 

  return () => clearInterval(intervalId);
}, []);

  const parseTime = (timeStr) => {
    if (!timeStr) return null; 
    const [hours, minutes] = timeStr.split(":").map(Number);

    const adjustedHours = hours < 5 ? hours + 24 : hours;
    return adjustedHours * 60 + minutes;
  };

  const getTaskProgress = (task) => {
    const startTimeStr = task.startTime;
    const durationMinutes = parseInt(task.duration, 10);

    if (!startTimeStr || isNaN(durationMinutes) || durationMinutes <= 0) {
      return 0;
    }

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const [startHours, startMinutes] = startTimeStr.split(":").map(Number);
    let taskStartMinutes = startHours * 60 + startMinutes;

    if (startHours < 5) {
      taskStartMinutes += 24 * 60;
    }

    const taskEndMinutes = taskStartMinutes + durationMinutes;

    let adjustedCurrentMinutes = currentMinutes;
    if (currentMinutes < 5 * 60) {
      adjustedCurrentMinutes += 24 * 60;
    }

    if (adjustedCurrentMinutes < taskStartMinutes) {
      return 0;
    } else if (adjustedCurrentMinutes >= taskEndMinutes) {
      return 100;
    } else {
      const progress =
        ((adjustedCurrentMinutes - taskStartMinutes) / durationMinutes) * 100;
      return Math.min(Math.max(progress, 0), 100);
    }
  };

  // Update progress every minute
  useEffect(() => {
    const updateProgress = () => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => ({
          ...task,
          progress: completedTasks.includes(task.id)
            ? 100
            : getTaskProgress(task),
        }))
      );
    };

    updateProgress();
    const interval = setInterval(updateProgress, 1); 

    return () => clearInterval(interval);
  }, [completedTasks]);

  useEffect(() => {
    const fetchAndProcessTasks = async () => {
      setLoading(true);
      const fetchedTasks = await fetchTasksFromDatabase();
      const tasksNeedingEstimation = fetchedTasks.filter(
        (task) => task.duration === "0" || !task.duration
      );

      if (tasksNeedingEstimation.length > 0) {
        await sendTasksToPhpAndFetchUpdatedTasks(tasksNeedingEstimation);
        setGptCalled(true); // GPT was called
      } else {
        setTasks(fetchedTasks);
        setGptCalled(false); // GPT was not called
      }
      setLoading(false);
    };
    fetchAndProcessTasks();
  }, []);

  const filteredTasks = tasks
    .filter((task) =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const timeA = parseTime(a.startTime);
      const timeB = parseTime(b.startTime);

      if (timeA === null && timeB === null) return 0;
      if (timeA === null) return 1; 
      if (timeB === null) return -1;
      return timeA - timeB;
    });

  const theme = createTheme({
    palette: {
      primary: {
        main: "#0D47A1",
      },
      secondary: {
        main: "#0D47A1",
      },
      error: {
        main: "#D32F2F",
      },
      background: {
        default: "#F5F5F5",
      },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
  });

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return theme.palette.text.primary;
    }
  };
  
  if (loading) {
    return (
      <Container style={{ textAlign: "center", marginTop: "10rem" }}>
        <Typography variant="h6" style={{ marginTop: "10rem" }}>
          Loading tasks...
        </Typography>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Container maxWidth="md" style={{ marginTop: "6rem" }}>
          <TextField
            fullWidth
            placeholder="Search tasks..."
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ marginBottom: "2rem" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          {filteredTasks.length === 0 ? (
            <Typography variant="h6" align="center">
              No tasks found.
            </Typography>
          ) : (
            <>
              <Grid container spacing={4}>
                {filteredTasks.map((task) => {
                  const isCompleted = completedTasks.includes(task.id);
                  const progress = isCompleted ? 100 : task.progress || 0;

                  // Determine progress bar color
                  let progressColor = "primary";
                  if (progress >= 100 && !isCompleted) {
                    progressColor = "error"; // Task is overdue
                  }

                  return (
                    <Grow in={true} timeout={500} key={task.id}>
                    <Grid item xs={12} sm={6} md={4} key={task.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          backgroundColor: isCompleted
                            ? "#E0E0E0"
                            : "#FFFFFF",
                          position: "relative",
                        }}
                      >
                        <CardContent style={{ flexGrow: 1 }}>
                          {isCompleted && (
                            <Chip
                              label="Completed"
                              color="success"
                              style={{
                                position: "absolute",
                                top: 16,
                                right: 16,
                              }}
                            />
                          )}
                          <Box
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "1rem",
                            }}
                          >
                            <Box
                              style={{
                                backgroundColor: theme.palette.primary.main,
                                color: "#fff",
                                borderRadius: "8px",
                                width: 40,
                                height: 40,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: "1rem",
                                fontSize: "1.2rem",
                              }}
                            >
                              {task.name.charAt(0).toUpperCase()}
                            </Box>
                            <Typography variant="h6">{task.name}</Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            style={{ marginBottom: "1rem" }}
                          >
                            {task.description}
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ marginBottom: "0.5rem" }}
                          >
                            <strong>Priority:</strong>{" "}
                            <span
                              style={{ color: getPriorityColor(task.priority) }}
                            >
                              {task.priority}
                            </span>
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ marginBottom: "0.5rem" }}
                          >
                            <strong>Start Time:</strong>{" "}
                            {task.startTime || "N/A"}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Duration:</strong> {task.duration} minutes
                          </Typography>
                        </CardContent>
                        <Box style={{ padding: "0 16px 16px" }}>
                          <Box
                            display="flex"
                            alignItems="center"
                            style={{ marginBottom: "0.5rem" }}
                          >
                            <Box width="100%" mr={1}>
                              <LinearProgress
                                variant="determinate"
                                value={progress}
                                color={progressColor}
                              />
                            </Box>
                            <Box minWidth={35}>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                              >{`${Math.round(progress)}%`}</Typography>
                            </Box>
                          </Box>
                          {!isCompleted && (
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleMarkAsDone(task.id)}
                              fullWidth
                            >
                              Mark as Done
                            </Button>
                          )}
                        </Box>
                      </Card>
                      </motion.div>
                    </Grid>
                    </Grow>
                  );
                })}
                
              </Grid>

              {/* Conditionally render the Save Schedule button */}
              {gptCalled && (
                <Box mt={4} display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleSaveSchedule}
                  >
                    Save Schedule
                  </Button>
                </Box>
              )}
            </>
          )}
          <ToastContainer />
        </Container>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default TaskSchedule;
