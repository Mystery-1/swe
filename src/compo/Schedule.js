// import React, { useState, useEffect } from 'react';
// import '../style/s2.css';

// function TaskSchedule() {
//   const [tasks, setTasks] = useState([
//     { id: 1, name: 'Executive Review', description: 'Evaluate Q3 results and discuss the future roadmap.', time: '09:00 AM', priority: 'High', duration: 120, finished: false },
//     { id: 2, name: 'Client Presentation', description: 'Show new product designs and gather feedback from stakeholders.', time: '11:30 AM', priority: 'Medium', duration: 90, finished: false },
//     { id: 3, name: 'Code Review', description: 'Technical review of new features and refactoring.', time: '02:00 PM', priority: 'Low', duration: 180, finished: false },
//     { id: 4, name: 'Team Sync', description: 'Daily standup meeting to sync progress on the project.', time: '04:00 PM', priority: 'Low', duration: 30, finished: false },
//     { id: 5, name: 'Strategy Planning', description: 'Brainstorm and plan the next product strategy for Q4.', time: '10:00 AM', priority: 'High', duration: 150, finished: false },
//     { id: 6, name: 'UI/UX Design Review', description: 'Review design proposals and gather feedback from the design team.', time: '03:00 PM', priority: 'Medium', duration: 60, finished: false },
//   ]);

//   const [finishedTasks, setFinishedTasks] = useState([]);
//   const [isFinishedTasksOpen, setIsFinishedTasksOpen] = useState(false);
//   const [finishedTaskId, setFinishedTaskId] = useState(null);

//   // Format the current time as HH:MM AM/PM
//   const getCurrentTime = () => {
//     const now = new Date();
//     let hours = now.getHours();
//     const minutes = now.getMinutes();
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12 || 12; // Convert to 12-hour format
//     const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
//     return `${hours}:${formattedMinutes} ${ampm}`;
//   };

//   // Parse time helper function
//   const parseTime = (timeStr) => {
//     const [time, modifier] = timeStr.split(' ');
//     let [hours, minutes] = time.split(':');
//     if (modifier === 'PM' && hours !== '12') {
//       hours = parseInt(hours, 10) + 12;
//     }
//     return new Date().setHours(hours, minutes, 0, 0);
//   };

//   // Calculate task progress
//   const calculateProgress = (task) => {
//     const now = new Date().getTime();
//     const startTime = parseTime(task.time);
//     const endTime = startTime + task.duration * 60 * 1000;

//     if (now < startTime) return 0;
//     if (now > endTime) return 100;

//     const elapsedTime = now - startTime;
//     const totalTime = endTime - startTime;
//     return Math.min(100, (elapsedTime / totalTime) * 100);
//   };

//   // Handle task completion with animation and set completion time
//   const handleTaskCompletion = (taskId) => {
//     const completionTime = getCurrentTime();
//     setFinishedTaskId(taskId);
//     setTimeout(() => {
//       setTasks((prevTasks) => {
//         const taskToFinish = prevTasks.find((task) => task.id === taskId);
//         if (taskToFinish && !taskToFinish.finished) {
//           taskToFinish.finished = true;
//           const finishedTask = { ...taskToFinish, completionTime };
//           setFinishedTasks((prevFinishedTasks) => [...prevFinishedTasks, finishedTask]);
//           return prevTasks.filter((task) => task.id !== taskId);
//         }
//         return prevTasks;
//       });
//       setFinishedTaskId(null);
//     }, 500); // Match the animation duration
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTasks((prevTasks) =>
//         prevTasks.map((task) => ({
//           ...task,
//           progress: calculateProgress(task),
//         }))
//       );
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const getPriorityClass = (priority) => {
//     switch (priority) {
//       case 'High':
//         return 'high-priority';
//       case 'Medium':
//         return 'medium-priority';
//       case 'Low':
//         return 'low-priority';
//       default:
//         return '';
//     }
//   };

//   return (
//     <div className="schedule-dashboard">
//       <header className="dashboard-header">
//         <h1>Today's Tasks</h1>
//       </header>

//       <div className="dashboard-content">
//         <section className="tasks-section">
//           <h2>Ongoing Tasks</h2>
//           <div className="task-overview">
//             {tasks.length > 0 ? (
//               tasks.map((task) => (
//                 <div
//                   key={task.id}
//                   className={`task-card ${getPriorityClass(task.priority)} ${finishedTaskId === task.id ? 'finished' : ''}`}
//                 >
//                   <label className="custom-checkbox">
//                     <input
//                       type="checkbox"
//                       className="task-checkbox"
//                       onChange={() => handleTaskCompletion(task.id)}
//                       checked={task.finished}
//                     />
//                     <span className="checkmark"></span>
//                   </label>
//                   <div className="task-info">
//                     <h2 className="task-title">{task.name}</h2>
//                     <p className="task-desc">{task.description}</p>
//                     <p className="task-time">Time: {task.time}</p>
//                     <p className="task-duration">Duration: {task.duration} minutes</p>
//                     <p className="task-priority">Priority: {task.priority}</p>
//                   </div>
//                   <div className="task-progress">
//                     <CircularProgress value={task.progress} />
//                     <p className="progress-label">{Math.round(task.progress)}% Completed</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No ongoing tasks.</p>
//             )}
//           </div>
//         </section>

//         <aside className={`finished-tasks-panel ${isFinishedTasksOpen ? 'open' : ''}`}>
//           <button
//             className="toggle-button"
//             onClick={() => setIsFinishedTasksOpen(!isFinishedTasksOpen)}
//           >
//             {isFinishedTasksOpen ? 'Hide Finished Tasks' : 'Show Finished Tasks'}
//           </button>
//           <div className="finished-tasks-content">
//             {finishedTasks.length === 0 ? (
//               <p>No tasks have been completed yet.</p>
//             ) : (
//               finishedTasks.map((task) => (
//                 <div key={task.id} className="finished-task">
//                   <h3>{task.name}</h3>
//                   <p>Completed at {task.completionTime}</p>
//                 </div>
//               ))
//             )}
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }

// function CircularProgress({ value }) {
//   const radius = 15.9155;
//   const circumference = 2 * Math.PI * radius;

//   const circleStyle = {
//     strokeDasharray: `${(value / 100) * circumference} ${circumference}`,
//     stroke: value === 100 ? '#48bb78' : '#4fd1c5', // Green when full, default color otherwise
//   };

//   return (
//     <svg viewBox="0 0 36 36" className="circular-chart">
//       <circle
//         className="circle-bg"
//         cx="18"
//         cy="18"
//         r={radius}
//       />
//       <circle
//         className="circle"
//         style={circleStyle}
//         cx="18"
//         cy="18"
//         r={radius}
//       />
//     </svg>
//   );
// }


// export default TaskSchedule;



import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/s2.css';

function TaskSchedule() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Executive Review', description: 'Evaluate Q3 results and discuss the future roadmap.', time: '09:00 AM', priority: 'High', duration: 120, finished: false },
    { id: 2, name: 'Client Presentation', description: 'Show new product designs and gather feedback from stakeholders.', time: '11:30 AM', priority: 'Medium', duration: 90, finished: false },
    { id: 3, name: 'Code Review', description: 'Technical review of new features and refactoring.', time: '02:00 PM', priority: 'Low', duration: 180, finished: false },
    { id: 4, name: 'Team Sync', description: 'Daily standup meeting to sync progress on the project.', time: '04:00 PM', priority: 'Low', duration: 30, finished: false },
    { id: 5, name: 'Strategy Planning', description: 'Brainstorm and plan the next product strategy for Q4.', time: '10:00 AM', priority: 'High', duration: 150, finished: false },
    { id: 6, name: 'UI/UX Design Review', description: 'Review design proposals and gather feedback from the design team.', time: '03:00 PM', priority: 'Medium', duration: 60, finished: false },
  ]);

  const [finishedTasks, setFinishedTasks] = useState([]);
  const [isFinishedTasksOpen, setIsFinishedTasksOpen] = useState(false);
  const [finishedTaskId, setFinishedTaskId] = useState(null);

  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${formattedMinutes} ${ampm}`;
  };

  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    if (modifier === 'PM' && hours !== '12') {
      hours = parseInt(hours, 10) + 12;
    }
    return new Date().setHours(hours, minutes, 0, 0);
  };

  const calculateProgress = (task) => {
    const now = new Date().getTime();
    const startTime = parseTime(task.time);
    const endTime = startTime + task.duration * 60 * 1000;

    if (now < startTime) return 0;
    if (now > endTime) return 100;

    const elapsedTime = now - startTime;
    const totalTime = endTime - startTime;
    return Math.min(100, (elapsedTime / totalTime) * 100);
  };

  const handleTaskCompletion = (taskId) => {
    const completionTime = getCurrentTime();
    setFinishedTaskId(taskId);
    setTimeout(() => {
      setTasks((prevTasks) => {
        const taskToFinish = prevTasks.find((task) => task.id === taskId);
        if (taskToFinish && !taskToFinish.finished) {
          taskToFinish.finished = true;
          const finishedTask = { ...taskToFinish, completionTime };
          setFinishedTasks((prevFinishedTasks) => [...prevFinishedTasks, finishedTask]);
          toast.success(`Task "${taskToFinish.name}" completed at ${completionTime}`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          return prevTasks.filter((task) => task.id !== taskId);
        }
        return prevTasks;
      });
      setFinishedTaskId(null);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => ({
          ...task,
          progress: calculateProgress(task),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'high-priority';
      case 'Medium':
        return 'medium-priority';
      case 'Low':
        return 'low-priority';
      default:
        return '';
    }
  };

  return (
    <div className="schedule-dashboard">
      <header className="dashboard-header">
        <h1>Today's Tasks</h1>
      </header>

      <div className="dashboard-content">
        <section className="tasks-section">
          <h2>Ongoing Tasks</h2>
          <div className="task-overview">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className={`task-card ${getPriorityClass(task.priority)} ${finishedTaskId === task.id ? 'finished' : ''}`}
                >
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      className="task-checkbox"
                      onChange={() => handleTaskCompletion(task.id)}
                      checked={task.finished}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <div className="task-info">
                    <h2 className="task-title">{task.name}</h2>
                    <p className="task-desc">{task.description}</p>
                    <p className="task-time">Time: {task.time}</p>
                    <p className="task-duration">Duration: {task.duration} minutes</p>
                    <p className="task-priority">Priority: {task.priority}</p>
                  </div>
                  <div className="task-progress">
                    <CircularProgress value={task.progress} />
                    <p className="progress-label">{Math.round(task.progress)}% Completed</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No ongoing tasks.</p>
            )}
          </div>
        </section>

        <aside className={`finished-tasks-panel ${isFinishedTasksOpen ? 'open' : ''}`}>
          <button
            className="toggle-button"
            onClick={() => setIsFinishedTasksOpen(!isFinishedTasksOpen)}
          >
            {isFinishedTasksOpen ? 'Hide Finished Tasks' : 'Show Finished Tasks'}
          </button>
          <div className="finished-tasks-content">
            {finishedTasks.length === 0 ? (
              <p>No tasks have been completed yet.</p>
            ) : (
              finishedTasks.map((task) => (
                <div key={task.id} className="finished-task">
                  <h3>{task.name}</h3>
                  <p>Completed at {task.completionTime}</p>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>

      <ToastContainer />
    </div>
  );
}

function CircularProgress({ value }) {
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;

  const circleStyle = {
    strokeDasharray: `${(value / 100) * circumference} ${circumference}`,
    stroke: value === 100 ? '#48bb78' : '#4fd1c5',
  };

  return (
    <svg viewBox="0 0 36 36" className="circular-chart">
      <circle
        className="circle-bg"
        cx="18"
        cy="18"
        r={radius}
      />
      <circle
        className="circle"
        style={circleStyle}
        cx="18"
        cy="18"
        r={radius}
      />
    </svg>
  );
}

export default TaskSchedule;
