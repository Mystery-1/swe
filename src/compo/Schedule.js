import React, { useState, useEffect, useCallback } from 'react';
import '../style/s2.css';
import {
  FaClock,
  FaHourglassHalf,
  FaCheckCircle,
  FaClipboardCheck,
  FaEye,
  FaEyeSlash,
  FaEdit,
  FaSave,
  FaTimes,
} from 'react-icons/fa';
import { FaFlag, FaCommentDots } from 'react-icons/fa';

function CircularProgress({ value }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <svg className="ts-progress-circle" viewBox="0 0 120 120">
      <circle className="ts-progress-bg" cx="60" cy="60" r="54" />
      <circle
        className="ts-progress-bar"
        cx="60" cy="60" r="54"
        style={{ strokeDashoffset }}
      />
      <text
        x="50%" y="50%"
        className="ts-progress-text"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {Math.round(value)}%
      </text>
    </svg>
  );
}

function TaskSchedule() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Budget Review Meeting',
      description: 'Analyze budget allocation for Q4 and adjust expenses as needed.',
      time: '08:30 AM',
      priority: 'High',
      duration: 60,
      finished: false,
    },
    {
      id: 2,
      name: 'Design Brainstorm Session',
      description: 'Collaborate with the design team on new product ideas.',
      time: '09:45 AM',
      priority: 'Medium',
      duration: 90,
      finished: false,
    },
    {
      id: 3,
      name: 'Email Follow-ups',
      description: 'Respond to pending emails and reach out to stakeholders.',
      time: '11:00 AM',
      priority: 'Low',
      duration: 45,
      finished: false,
    },
    {
      id: 4,
      name: 'Lunch Break',
      description: 'Enjoy lunch and take a break from work.',
      time: '12:30 PM',
      priority: 'Low',
      duration: 60,
      finished: false,
    },
    {
      id: 5,
      name: 'Client Feedback Call',
      description: 'Call with client to gather feedback on recent deliverables.',
      time: '02:00 PM',
      priority: 'High',
      duration: 45,
      finished: false,
    },
    {
      id: 6,
      name: 'Social Media Strategy Meeting',
      description: 'Discuss plans for upcoming social media campaigns.',
      time: '03:15 PM',
      priority: 'Medium',
      duration: 60,
      finished: false,
    },
    {
      id: 7,
      name: 'Technical Workshop',
      description: 'Attend an internal workshop on new software tools.',
      time: '04:30 PM',
      priority: 'Low',
      duration: 90,
      finished: false,
    },
    {
      id: 8,
      name: 'Yoga Session',
      description: 'Participate in a virtual yoga session for relaxation.',
      time: '06:00 PM',
      priority: 'Low',
      duration: 60,
      finished: false,
    },
    {
      id: 9,
      name: 'Family Time',
      description: 'Spend quality time with family in the evening.',
      time: '07:30 PM',
      priority: 'High',
      duration: 90,
      finished: false,
    },
    {
      id: 10,
      name: 'Project Documentation',
      description: 'Update project documentation for recent changes.',
      time: '09:00 PM',
      priority: 'Medium',
      duration: 45,
      finished: false,
    },
    {
      id: 11,
      name: 'Daily Reflection',
      description: 'Reflect on the day’s activities and accomplishments.',
      time: '10:00 PM',
      priority: 'Low',
      duration: 20,
      finished: false,
    },
    {
      id: 12,
      name: 'Prepare for Next Week',
      description: 'Plan and organize tasks for the upcoming week.',
      time: '10:30 PM',
      priority: 'Medium',
      duration: 60,
      finished: false,
    },
    {
      id: 13,
      name: 'Meditation',
      description: 'Engage in a 30-minute meditation session before sleep.',
      time: '11:45 PM',
      priority: 'Low',
      duration: 30,
      finished: false,
    },
    {
      id: 14,
      name: 'Morning Exercise',
      description: 'Start the day with a 30-minute exercise routine.',
      time: '07:00 AM',
      priority: 'High',
      duration: 30,
      finished: false,
    },
    {
      id: 15,
      name: 'Team Standup',
      description: 'Daily team standup to discuss progress and blockers.',
      time: '09:00 AM',
      priority: 'High',
      duration: 30,
      finished: false,
    },
    {
      id: 16,
      name: 'Coffee Break',
      description: 'Quick coffee break to recharge.',
      time: '03:00 PM',
      priority: 'Low',
      duration: 15,
      finished: false,
    },
    {
      id: 17,
      name: 'Report Analysis',
      description: 'Analyze the quarterly performance report.',
      time: '01:30 PM',
      priority: 'Medium',
      duration: 60,
      finished: false,
    },
    {
      id: 18,
      name: 'Check Emails',
      description: 'Review and respond to emails received during the day.',
      time: '05:30 PM',
      priority: 'Low',
      duration: 30,
      finished: false,
    },
    {
      id: 19,
      name: 'Brainstorm Session',
      description: 'Brainstorm new ideas for the upcoming campaign.',
      time: '04:00 PM',
      priority: 'Medium',
      duration: 45,
      finished: false,
    },
    {
      id: 20,
      name: 'Client Call',
      description: 'Discuss project updates and timelines with the client.',
      time: '02:30 PM',
      priority: 'High',
      duration: 30,
      finished: false,
    },  ]);

  const [finishedTasks, setFinishedTasks] = useState([]);
  const [isFinishedTasksOpen, setIsFinishedTasksOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [feedback, setFeedback] = useState({});
  const [feedbackEditing, setFeedbackEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    if (modifier === 'PM' && hours !== '12') {
      hours = parseInt(hours, 10) + 12;
    }
    if (modifier === 'AM' && hours === '12') {
      hours = 0;
    }
    return new Date().setHours(hours, minutes, 0, 0);
  };

  const calculateProgress = useCallback((task) => {
    const now = new Date().getTime();
    const startTime = parseTime(task.time);
    const endTime = startTime + task.duration * 60 * 1000;
    if (now < startTime) return 0;
    if (now > endTime) return 100;
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
    },);

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
      if (taskToFinish && !taskToFinish.finished) {
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

  const handleTaskEdit = (task) => {
    setEditingTask(task);
  };

  const handleSaveEdit = (task) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? { ...t, ...editingTask } : t))
    );
    setEditingTask(null);
  };

  const handleFeedbackChange = (taskId, value) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [taskId]: value,
    }));
  };

  const handleOpenModal = (taskId) => {
    setFeedbackEditing(taskId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFeedbackEditing(null);
  };

  const handleFeedbackSave = (taskId) => {
    setIsModalOpen(false);
    setFeedbackEditing(null);
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
      {tasks
        .slice()
        .sort((a, b) => parseTime(a.time) - parseTime(b.time))
        .map((task) => (
          <div
            key={task.id}
            className={`ts-task-card ${getPriorityClass(task.priority)} ${
              task.progress === 100 ? 'ts-task-complete' : ''
            }`}
          >
            <div className="ts-task-content">
              {editingTask?.id === task.id ? (
                <div>
                  <input
                    type="text"
                    className="ts-edit-input"
                    value={editingTask.name}
                    onChange={(e) =>
                      setEditingTask({ ...editingTask, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="ts-edit-input"
                    value={editingTask.time}
                    onChange={(e) =>
                      setEditingTask({ ...editingTask, time: e.target.value })
                    }
                  />
                  <button
                    className="ts-save-button"
                    onClick={() => handleSaveEdit(task)}
                  >
                    <FaSave /> Save
                  </button>
                </div>
              ) : (
                <>
                  <h3>{task.name}</h3>
                  <p>{task.description}</p>
                  <div className="ts-task-meta">
                    <span>
                      <FaClock /> {task.time}
                    </span>
                    <span>
                      <FaHourglassHalf /> {task.duration} mins
                    </span>
                  </div>
                </>
              )}
            </div>
            <div className="ts-task-actions">
              <CircularProgress value={task.progress} />
              <button
                className="ts-edit-button"
                onClick={() => handleTaskEdit(task)}
              >
                <FaEdit /> Edit
              </button>
            </div>
            {task.progress === 100 && (
              <div
                className="ts-task-overlay"
                onClick={() => handleTaskCompletion(task.id)}
              >
                <FaClipboardCheck className="ts-overlay-icon" />
                <p className="ts-overlay-text p1">Mark as Done</p>
              </div>
            )}
          </div>
        ))}
    </div>
  ) : (
    <p className="ts-no-tasks">No ongoing tasks.</p>
  )}
</section>

<section className="ts-finished-tasks">
<div className="ts-toggle-switch" onClick={() => setIsFinishedTasksOpen(!isFinishedTasksOpen)}>
        <div className={`ts-switch-circle ${isFinishedTasksOpen ? 'active' : ''}`}>
          {isFinishedTasksOpen ? <FaEyeSlash /> : <FaEye />}
        </div>
        <span className="ts-switch-label">
          {isFinishedTasksOpen ? 'Hide Completed Tasks' : 'Show Completed Tasks'}
        </span>
      </div>

      {isFinishedTasksOpen && (
        <div className="ts-finished-list-superior">
          {finishedTasks.length > 0 ? (
            finishedTasks.map((task) => (
              <div key={task.id} className="ts-finished-card-elite">
                {/* Card Header */}
                <div className={`ts-card-header-elite ${task.priority.toLowerCase()}-priority`}>
                  <span className="ts-card-title-elite">{task.name}</span>
                  <span className="ts-completed-time-elite">
                    <FaCheckCircle className="ts-check-icon-elite" /> {task.completionTime}
                  </span>
                </div>

                {/* Task Details */}
                <div className="ts-card-body-elite">
                  <div className="ts-task-details-elite">
                    <p className="ts-description-elite">{task.description}</p>
                    <div className="ts-meta-info-elite">
                      <span className="ts-meta-item-elite">
                        <FaClock /> {task.duration} mins
                      </span>
                      <span className={`ts-priority-badge-elite ${task.priority.toLowerCase()}-badge`}>
                        <FaFlag /> {task.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>

                {/* Feedback Section */}
                <div className="ts-feedback-container-elite">
                  <h4 className="ts-feedback-title-elite">Feedback</h4>
                  <div className="ts-feedback-box-elite">
                    <FaCommentDots className="ts-feedback-icon-elite" />
                    <p className="ts-feedback-text-elite">
                      {feedback[task.id] || 'No feedback provided yet.'}
                    </p>
                  </div>
                </div>

                <div className="ts-card-actions-elite">
                  <button
                    className="ts-edit-feedback-button-elite"
                    onClick={() => handleOpenModal(task.id)}
                  >
                    <FaEdit /> Edit Feedback
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="ts-no-tasks-elite">No tasks have been completed yet.</p>
          )}
        </div>
      )}
    </section>
        </div>

        {isModalOpen && (
          <div className="ts-modal-overlay">
            <div className="ts-modal">
              <button className="ts-modal-close" onClick={handleCloseModal}>
                <FaTimes />
              </button>
              <h3>Edit Feedback</h3>
              <input
                type="text"
                className="ts-modal-input"
                placeholder="Leave feedback"
                value={feedback[feedbackEditing] || ''}
                onChange={(e) =>
                  handleFeedbackChange(feedbackEditing, e.target.value)
                }
              />
              <button
                className="ts-modal-save"
                onClick={() => handleFeedbackSave(feedbackEditing)}
              >
                <FaSave /> Save Changes
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default TaskSchedule;
