import React, { useState, useEffect, useCallback } from 'react';
import '../style/s2.css';
import { FaClock, FaHourglassHalf, FaClipboardCheck } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CircularProgress({ value }) {
  const radius = 54;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <svg
      className="ts-progress-circle"
      viewBox="0 0 120 120"
      width="120"
      height="120"
    >
      <circle
        cx="50%"
        cy="50%"
        r={radius}
        strokeWidth={strokeWidth}
        fill="none"
        stroke="#e6e6e6"
        style={{ strokeLinecap: 'round' }}
      />
      <circle
        cx="50%"
        cy="50%"
        r={radius}
        strokeWidth={strokeWidth}
        fill="none"
        stroke="#007BFF"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        style={{
          strokeLinecap: 'round',
          transform: 'rotate(-90deg)',
          transformOrigin: 'center',
        }}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="18"
        fill="#333"
        fontWeight="bold"
      >
        {Math.round(value)}%
      </text>
    </svg>
  );
}

function assignStartTimeAndDuration(tasks) {
  const startingHour = 12; // Tasks start at 12:00 PM
  const startingMinute = 0;
  const defaultDuration = 30; // Default duration in minutes for tasks
  const taskGap = 5; // Gap in minutes between tasks

  // Group tasks by priority
  const highPriorityTasks = tasks.filter(task => task.priority === 'High');
  const lowPriorityTasks = tasks.filter(task => task.priority === 'Low');
  const mediumPriorityTasks = tasks.filter(task => task.priority === 'Medium');

  // Arrange tasks in the specified pattern
  const arrangedTasks = [];
  let highIndex = 0,
    lowIndex = 0,
    mediumIndex = 0;

  while (
    highIndex < highPriorityTasks.length ||
    lowIndex < lowPriorityTasks.length ||
    mediumIndex < mediumPriorityTasks.length
  ) {
    if (highIndex < highPriorityTasks.length) {
      arrangedTasks.push(highPriorityTasks[highIndex++]);
    }
    if (lowIndex < lowPriorityTasks.length) {
      arrangedTasks.push(lowPriorityTasks[lowIndex++]);
    }
    if (mediumIndex < mediumPriorityTasks.length) {
      arrangedTasks.push(mediumPriorityTasks[mediumIndex++]);
    }
    if (mediumIndex < mediumPriorityTasks.length) {
      arrangedTasks.push(mediumPriorityTasks[mediumIndex++]);
    }
  }

  let currentTime = new Date();
  currentTime.setHours(startingHour, startingMinute, 0, 0); // Set start time to 12:00 PM

  return arrangedTasks.map(task => {
    const startTime = new Date(currentTime);

    // Assign task duration based on priority
    let duration;
    switch (task.priority) {
      case 'High':
        duration = 120; // 2 hours for high-priority tasks
        break;
      case 'Medium':
        duration = 75; // 1 hour 15 minutes for medium-priority tasks
        break;
      case 'Low':
        duration = 40; // 40 minutes for low-priority tasks
        break;
      default:
        duration = defaultDuration;
    }

    // Update current time for the next task
    currentTime.setMinutes(currentTime.getMinutes() + duration + taskGap);

    // Format the start time as a string (e.g., "12:00 PM")
    const formattedStartTime = startTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return {
      ...task,
      time: formattedStartTime, // Assign formatted start time
      duration, // Assign duration
    };
  });
}


function TaskSchedule() {
  const [tasks, setTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a 3-second loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      const userEmail = localStorage.getItem('user_email');
      if (!userEmail) {
        toast.error('User email is missing.', {
          position: 'bottom-right',
          autoClose: 3000,
        });
        return;
      }

      const taskData = new FormData();
      taskData.append('user_email', userEmail);

      try {
        const response = await fetch(
          'http://localhost/SWE-444/my-app/src/back/getTasks.php',
          {
            method: 'POST',
            body: taskData,
          }
        );

        const data = await response.json();
        if (data.status === 'success') {
          const updatedTasks = assignStartTimeAndDuration(
            data.tasks.map((task) => ({
              id: task.id || Math.random(),
              name: task.taskName,
              description: task.taskDesc,
              priority: task.taskProi,
              progress: 0,
            }))
          );
          setTasks(updatedTasks);
        } else {
          toast.error(data.message || 'Failed to fetch tasks.', {
            position: 'bottom-right',
            autoClose: 3000,
          });
        }
      } catch (error) {
        toast.error('An error occurred while fetching tasks.', {
          position: 'bottom-right',
          autoClose: 3000,
        });
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const calculateProgress = useCallback((task) => {
    const now = new Date();
    const [time, modifier] = task.time.split(' '); // Split into time and AM/PM
    let [hours, minutes] = time.split(':').map(Number);
  
    // Adjust hours for AM/PM
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
  
    // Create a Date object for the task's start time (today's date + task time)
    const startTime = new Date();
    startTime.setHours(hours, minutes, 0, 0);
  
    // Calculate the end time based on duration
    const endTime = new Date(startTime.getTime() + task.duration * 60 * 1000);
  
    // Calculate progress
    if (now < startTime) return 0; // Task hasn't started yet
    if (now > endTime) return 100; // Task has completed
  
    // Calculate percentage of time elapsed
    const elapsedTime = now - startTime;
    const totalTime = endTime - startTime;
    return Math.min(100, (elapsedTime / totalTime) * 100);
  }, []);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => ({
          ...task,
          progress: calculateProgress(task),
        }))
      );
    }, 10);

    return () => clearInterval(interval);
  }, [calculateProgress]);

  const handleTaskCompletion = (taskId) => {
    const completionTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    setTasks((prevTasks) => {
      const taskToFinish = prevTasks.find((task) => task.id === taskId);
      if (taskToFinish) {
        const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
        setFinishedTasks((prevFinishedTasks) => [
          ...prevFinishedTasks,
          { ...taskToFinish, completionTime },
        ]);
        return updatedTasks;
      }
      return prevTasks;
    });
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'ts-high-priority';
      case 'Medium':
        return 'ts-medium-priority';
      case 'Low':
        return 'ts-low-priority';
      default:
        return '';
    }
  };
  if (loading) {
    return (
      <div class="ts-loading-screen">
  <h1>Welcome Back!</h1>
  <p>Preparing your tasks for today. Please wait a moment...</p>
  <div class="ts-spinner"></div>
</div>

    );
  }
  return (
    <div className="ts-dashboard">
      <header className="ts-header">
        <h1>Task Scheduler</h1>
      </header>

      <main className="ts-main">
        <div className="ts-columns">
          <section className="ts-tasks">
            <h2>Ongoing Tasks</h2>
            {tasks.length > 0 ? (
              <div className="ts-task-list">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`ts-task-card ${getPriorityClass(task.priority)}`}
                  >
                    <div className="ts-task-row ts-task-name">{task.name}</div>
                    <div className="ts-task-row ts-task-description">
                      {task.description}
                    </div>
                    <div className="ts-task-row ts-task-meta">
                      <span>
                        <FaClock /> {task.time}
                      </span>
                      <span>
                        <FaHourglassHalf /> {task.duration} mins
                      </span>
                    </div>
                    <div className="ts-task-actions">
                      <CircularProgress value={task.progress} />
                    </div>
                    {task.progress === 100 && (
                      <div
                        className="ts-task-overlay"
                        onClick={() => handleTaskCompletion(task.id)}
                      >
                        <FaClipboardCheck /> Mark as Done
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No ongoing tasks.</p>
            )}
          </section>

          <section className="ts-finished-tasks">
            <h2>Finished Tasks</h2>
            {finishedTasks.length > 0 ? (
              <div className="ts-task-list">
                {finishedTasks.map((task) => (
                  <div key={task.id} className="ts-finished-card">
                    <h3>{task.name}</h3>
                    <p>{task.description}</p>
                    <div className="ts-task-meta">
                      <span>Completed at: {task.completionTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No finished tasks.</p>
            )}
          </section>
        </div>
      </main>

      <ToastContainer />
    </div>
  );
}

export default TaskSchedule;
