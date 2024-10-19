// import React, { useState, useEffect } from "react";
// import "../style/task.css";
// import "../style/gen.css";
// import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function TaskEntry() {
//   const [taskName, setTaskName] = useState("");
//   const [taskDescription, setTaskDescription] = useState("");
//   const [taskPriority, setTaskPriority] = useState("Medium");
//   const [tasks, setTasks] = useState([]);

//   // Fetch tasks related to user_email when the component mounts
//   useEffect(() => {
//     const fetchTasks = async () => {
//       const userEmail = localStorage.getItem("user_email");
//       if (userEmail) {
//         const taskData = new FormData();
//         taskData.append("user_email", userEmail);

//         try {
//           const response = await fetch("http://localhost/SWE-444/my-app/src/back/getTasks.php", {
//             method: "POST",
//             body: taskData,
//           });

//           const data = await response.json();
//           if (data.status === "success") {
//             setTasks(data.tasks); // Set tasks in state
//           } else {
//             toast.error(data.message, {
//               position: "bottom-right",
//               autoClose: 3000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//             });
//           }
//         } catch (error) {
//           toast.error("An error occurred while fetching tasks.", {
//             position: "bottom-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//           });
//           console.error("Error fetching tasks:", error);
//         }
//       }
//     };

//     fetchTasks();
//   }, []);

//   // Add a new task
//   const addTask = async () => {
//     if (taskName && taskDescription) {
//       const taskData = new FormData();
//       taskData.append("taskName", taskName);
//       taskData.append("taskDesc", taskDescription);
//       taskData.append("taskProi", taskPriority);
//       taskData.append("taskStat", "Pending");

//       const userEmail = localStorage.getItem("user_email");
//       if (userEmail) {
//         taskData.append("user_email", userEmail);
//       } else {
//         toast.error("User email not found. Please log in again.", {
//           position: "bottom-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//         return;
//       }

//       try {
//         const response = await fetch("http://localhost/SWE-444/my-app/src/back/addTask.php", {
//           method: "POST",
//           body: taskData,
//         });

//         const data = await response.json();
//         if (data.status === "success") {
//           const newTask = {
//             taskName, 
//             taskDesc: taskDescription,
//             taskProi: taskPriority,
//           };
//           setTasks((prevTasks) => [...prevTasks, newTask]);
//           setTaskName("");
//           setTaskDescription("");
//           setTaskPriority("Medium");

//           toast.success("Task added successfully!", {
//             position: "bottom-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//           });
//         } else {
//           toast.error(data.message, {
//             position: "bottom-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//           });
//         }
//       } catch (error) {
//         toast.error("An error occurred while adding the task.", {
//           position: "bottom-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//         console.error("Error:", error);
//       }
//     } else {
//       toast.error("Please fill out both the task name and description.", {
//         position: "bottom-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//     }
//   };

//   // Clear input fields
//   const clearInputs = () => {
//     setTaskName("");
//     setTaskDescription("");
//     setTaskPriority("Medium");
//   };

//   // Generate Schedule functionality
//   const generateSchedule = () => {
//     if (tasks.length > 0) {
//       toast.warning("Schedule generated in sprint 4", {
//         position: "bottom-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//       console.log("Tasks:", tasks);
//       // Add scheduling logic here
//     } else {
//       toast.error("No tasks available to generate a schedule.", {
//         position: "bottom-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//     }
//   };

//   // Delete task
//   const deleteTask = (index, taskName) => {
//     const confirmDelete = window.confirm(`Are you sure you want to delete the task: "${taskName}"?`);
//     if (confirmDelete) {
//       const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
//       setTasks(updatedTasks);
//       toast.error("Task deleted.", {
//         position: "bottom-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//     }
//   };

//   return (
//     <div className="App">
//       <main className="dashboard-container">
//         <section className="task-section">
//           <h2 className="task-section-title">Add New Task</h2>
//           <div className="task-inputs">
//             <input
//               type="text"
//               placeholder="Enter task name"
//               value={taskName}
//               onChange={(e) => setTaskName(e.target.value)}
//               className="task-input"
//             />
//             <textarea
//               placeholder="Task Description"
//               value={taskDescription}
//               onChange={(e) => setTaskDescription(e.target.value)}
//               className="task-textarea"
//             />
//             <select
//               value={taskPriority}
//               onChange={(e) => setTaskPriority(e.target.value)}
//               className="task-select"
//             >
//               <option value="Low">Low</option>
//               <option value="Medium">Medium</option>
//               <option value="High">High</option>
//             </select>
//           </div>
//           <div className="task-buttons">
//             <button onClick={addTask} className="add-task-button" data-tooltip="Add Task">
//               <FaPlusCircle /> Add Task
//             </button>
//             <button onClick={clearInputs} className="clear-task-button" data-tooltip="Clear Form">
//               Clear
//             </button>
//           </div>
//         </section>

//         <section className="task-list-section">
//           <h2 className="task-section-title">Task List</h2>
//           <div className="tasks-container">
//             {tasks.length === 0 ? (
//               <p className="no-tasks-message">No tasks added yet.</p>
//             ) : (
//               tasks.map((task, index) => (
//                 <div key={index} className="task-card">
//                   <div className="task-header">
//                     <strong>{task.taskName}</strong>
                    
//                   </div>
//                   <div className="task-description">{task.taskDesc}</div>
//                   <span className={`priority-badge ${task.taskProi ? task.taskProi.toLowerCase() : 'medium'}`}>
//                       {task.taskProi || 'Medium'}
//                     </span>
//                   <button className="delete-task-icon" onClick={() => deleteTask(index, task.taskName)} data-tooltip="Delete Task">
//                     <FaTrashAlt />
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//           <div className="schedule-buttons">
//             <button onClick={generateSchedule} className="generate-schedule-button-prof" data-tooltip="Generate Schedule">
//               Generate Schedule
//            </button>
//            </div>
//         </section>
//       </main>

//       <ToastContainer />
//     </div>
//   );
// }

// export default TaskEntry;


import React, { useState, useEffect } from "react";
import "../style/task.css";
import "../style/gen.css";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TaskEntry() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");
  const [tasks, setTasks] = useState([]);

  // Fetch tasks related to user_email when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      const userEmail = localStorage.getItem("user_email");
      if (userEmail) {
        const taskData = new FormData();
        taskData.append("user_email", userEmail);

        try {
          const response = await fetch("http://localhost/SWE-444/my-app/src/back/getTasks.php", {
            method: "POST",
            body: taskData,
          });

          const data = await response.json();
          if (data.status === "success") {
            setTasks(data.tasks); // Set tasks in state
          } else {
            toast.error(data.message, {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        } catch (error) {
          toast.error("An error occurred while fetching tasks.", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          console.error("Error fetching tasks:", error);
        }
      }
    };

    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async () => {
    if (taskName && taskDescription) {
      const taskData = new FormData();
      taskData.append("taskName", taskName);
      taskData.append("taskDesc", taskDescription);
      taskData.append("taskProi", taskPriority);
      taskData.append("taskStat", "Pending");

      const userEmail = localStorage.getItem("user_email");
      if (userEmail) {
        taskData.append("user_email", userEmail);
      } else {
        toast.error("User email not found. Please log in again.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      try {
        const response = await fetch("http://localhost/SWE-444/my-app/src/back/addTask.php", {
          method: "POST",
          body: taskData,
        });

        const data = await response.json();
        if (data.status === "success") {
          const newTask = {
            taskName, 
            taskDesc: taskDescription,
            taskProi: taskPriority,
          };
          setTasks((prevTasks) => [newTask, ...prevTasks]); // Add the new task at the beginning
          setTaskName("");
          setTaskDescription("");
          setTaskPriority("Medium");

          toast.success("Task added successfully!", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error(data.message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {
        toast.error("An error occurred while adding the task.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.error("Error:", error);
      }
    } else {
      toast.error("Please fill out both the task name and description.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // Clear input fields
  const clearInputs = () => {
    setTaskName("");
    setTaskDescription("");
    setTaskPriority("Medium");
  };

  // Generate Schedule functionality
  const generateSchedule = () => {
    if (tasks.length > 0) {
      toast.warning("Schedule generated in sprint 4", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.log("Tasks:", tasks);
      // Add scheduling logic here
    } else {
      toast.error("No tasks available to generate a schedule.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // Delete task
  // const deleteTask = (index, taskName) => {
  //   const confirmDelete = window.confirm(`Are you sure you want to delete the task: "${taskName}"?`);
  //   if (confirmDelete) {
  //     const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
  //     setTasks(updatedTasks);
  //     toast.success("Task deleted successfully.", {
  //       position: "bottom-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //   }
  // };


  const deleteTask = async (index, taskName) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the task: "${taskName}"?`);
    if (confirmDelete) {
      try {
        const taskData = new FormData();
        taskData.append("taskName", taskName);
  
        const response = await fetch("http://localhost/SWE-444/my-app/src/back/deTask.php", {
          method: "POST",
          body: taskData,
        });
  
        const data = await response.json();
        if (data.status === "success") {
          // Remove the task from the state if deletion is successful
          const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
          setTasks(updatedTasks);
          toast.success("Task deleted successfully.", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          // Handle error from the PHP response
          toast.error(data.message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {
        // Handle any network or other errors
        toast.error("An error occurred while deleting the task.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.error("Error deleting task:", error);
      }
    }
  };
  
  return (
    <div className="App">
      <main className="dashboard-container">
        <section className="task-section">
          <h2 className="task-section-title">Add New Task</h2>
          <div className="task-inputs">
            <input
              type="text"
              placeholder="Enter task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="task-input"
            />
            <textarea
              placeholder="Task Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="task-textarea"
            />
            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              className="task-select"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="task-buttons">
            <button onClick={addTask} className="add-task-button" data-tooltip="Add Task">
              <FaPlusCircle /> Add Task
            </button>
            <button onClick={clearInputs} className="clear-task-button" data-tooltip="Clear Form">
              Clear
            </button>
          </div>
        </section>

        <section className="task-list-section">
          <h2 className="task-section-title">Task List</h2>
          <div className="tasks-container">
            {tasks.length === 0 ? (
              <p className="no-tasks-message">No tasks added yet.</p>
            ) : (
              tasks.map((task, index) => (
                <div key={index} className="task-card">
                  <div className="task-header">
                    <strong>{task.taskName}</strong>
                  </div>
                  <div className="task-description">{task.taskDesc}</div>
                  <span className={`priority-badge ${task.taskProi ? task.taskProi.toLowerCase() : 'medium'}`}>
                      {task.taskProi || 'Medium'}
                  </span>
                  <button className="delete-task-icon" onClick={() => deleteTask(index, task.taskName)} data-tooltip="Delete Task">
                    <FaTrashAlt />
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="schedule-buttons">
            <button onClick={generateSchedule} className="generate-schedule-button-prof" data-tooltip="Generate Schedule">
              Generate Schedule
           </button>
          </div>
        </section>
      </main>

      <ToastContainer />
    </div>
  );
}

export default TaskEntry;
