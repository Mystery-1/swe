// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FaUser, FaCog, FaLock, FaBell, FaShieldAlt, FaHistory } from 'react-icons/fa';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../style/Profile.css';

// function UserProfile() {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [email, setEmail] = useState('');

//   useEffect(() => {
//     const storedEmail = localStorage.getItem('user_email');
//     if (storedEmail) {
//       setEmail(storedEmail);
//     }
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       toast.error("Passwords don't match.", {
//         position: "bottom-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//       return;
//     }

//     if (!email) {
//       toast.error("Email is missing.", {
//         position: "bottom-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//       return;
//     }

//     const formData = new URLSearchParams();
//     formData.append('email', email);
//     formData.append('password', password);
//     formData.append('confirm_password', confirmPassword);

//     fetch('http://localhost/SWE-444/my-app/src/back/tempProfile.php', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: formData.toString(),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           toast.success('Password has been updated successfully.', {
//             position: "bottom-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//           });
//         } else {
//           toast.error(data.message || 'Error updating password.', {
//             position: "bottom-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//           });
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error.message);
//         toast.error('An error occurred.', {
//           position: "bottom-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//       });
//   };

//   return (
//     <div className="container-fluid user-profile-dashboard">
//       <div className="row">
//         {/* Sidebar */}
//         <div className="col-md-3 user-profile-sidebar text-white">
//           <h4 className="user-profile-title">Dashboard</h4>
//           <ul className="nav flex-column mt-3">
//             <li className="nav-item">
//               <a className="nav-link text-white" href="#"><FaUser /> Profile Overview</a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link text-white" href="#"><FaCog /> Account Settings</a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link text-white" href="#"><FaLock /> Security Settings</a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link text-white" href="#"><FaBell /> Notifications</a>
//             </li>
//           </ul>
//         </div>

//         {/* Main Content */}
//         <div className="col-md-9 user-profile-main-content">
//           <div className="user-profile-content p-5">
//             <div className="user-profile-header d-flex align-items-center mb-4">
//               <img src="/icon.png" alt="Profile" className="user-profile-img me-3" />
//               <div>
//                 <h3>Welcome, User</h3>
//                 <p className="text-muted">Manage your account settings and more</p>
//               </div>
//             </div>

//             <div className="user-profile-card mb-4">
//               <div className="card-body">
//                 <h5 className="user-profile-card-title">Account Information</h5>
//                 <form onSubmit={handleSubmit}>
//                   <div className="form-group mb-3">
//                     <label htmlFor="email" className="form-label">Email</label>
//                     <input
//                       type="email"
//                       id="email"
//                       value={email}
//                       disabled
//                       className="form-control"
//                     />
//                   </div>
//                   <div className="form-group mb-3">
//                     <label htmlFor="password" className="form-label">New Password</label>
//                     <input
//                       type="password"
//                       id="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                       className="form-control"
//                     />
//                   </div>
//                   <div className="form-group mb-3">
//                     <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
//                     <input
//                       type="password"
//                       id="confirm-password"
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                       required
//                       className="form-control"
//                     />
//                   </div>
//                   <button type="submit" className="btn btn-dark">Update Password</button>
//                 </form>
//               </div>
//             </div>

//             <div className="user-profile-card">
//               <div className="card-body">
//                 <h5 className="user-profile-card-title">Profile Insights</h5>
//                 <ul className="list-unstyled">
//                   <li className="mb-3"><FaShieldAlt className="me-2 text-info" /> Account Age: 1 month</li>
//                   <li className="mb-3"><FaHistory className="me-2 text-info" /> Last Login: today</li>
//                   <li className="mb-3"><FaLock className="me-2 text-info" /> Security Level: High</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

// export default UserProfile;


import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaCog, FaLock, FaBell, FaShieldAlt, FaHistory } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/Profile.css';

function UserProfile() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showValidation, setShowValidation] = useState(false); // New state to control visibility of validation
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    specialChar: false,
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem('user_email');
    const storedName = localStorage.getItem('user_name');

    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);

    // Show validations once user starts typing
    setShowValidation(value.length > 0);

    // Check for validation conditions
    setValidations({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords don't match.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (!email) {
      toast.error("Email is missing.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    if (!validations.length || !validations.uppercase || !validations.specialChar) {
      toast.error('Password must meet all the validation criteria.', {
          position: "bottom-right",
          autoClose: 3000,
      });
      return;
  }

    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirm_password', confirmPassword);

    fetch('http://localhost/SWE-444/my-app/src/back/tempProfile.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success('Password has been updated successfully.', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error(data.message || 'Error updating password.', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error.message);
        toast.error('An error occurred.', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  return (
    <div className="container-fluid user-profile-dashboard">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 user-profile-sidebar text-white">
          <h4 className="user-profile-title">Dashboard</h4>
          <ul className="nav flex-column mt-3">
            <li className="nav-item">
              <a className="nav-link text-white" href="#"><FaUser /> Profile Overview</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#"><FaCog /> Account Settings</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#"><FaLock /> Security Settings</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#"><FaBell /> Notifications</a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9 user-profile-main-content">
          <div className="user-profile-content p-5">
            <div className="user-profile-header d-flex align-items-center mb-4">
              <img src="/icon.png" alt="Profile" className="user-profile-img me-3" />
              <div>
                <h3>Welcome, {name}</h3>
                <p className="text-muted">Manage your account settings and more</p>
              </div>
            </div>

            <div className="user-profile-card mb-4">
              <div className="card-body">
                <h5 className="user-profile-card-title">Account Information</h5>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      disabled
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label">New Password</label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                      className="form-control"
                    />
                    {/* Show validation only when password is being typed */}
                    {showValidation && (
                      <div className="password-validations">
                        <p style={{ color: validations.length ? 'green' : 'red' }}>
                          {validations.length ? '✔' : '✘'} At least 8 characters
                        </p>
                        <p style={{ color: validations.uppercase ? 'green' : 'red' }}>
                          {validations.uppercase ? '✔' : '✘'} At least one uppercase letter
                        </p>
                        <p style={{ color: validations.specialChar ? 'green' : 'red' }}>
                          {validations.specialChar ? '✔' : '✘'} At least one special character
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="form-control"
                    />
                  </div>
                  <button type="submit" className="btn btn-dark">Update Password</button>
                </form>
              </div>
            </div>

            <div className="user-profile-card">
              <div className="card-body">
                <h5 className="user-profile-card-title">Profile Insights</h5>
                <ul className="list-unstyled">
                  <li className="mb-3"><FaShieldAlt className="me-2 text-info" /> Account Age: 1 month</li>
                  <li className="mb-3"><FaHistory className="me-2 text-info" /> Last Login: today</li>
                  <li className="mb-3"><FaLock className="me-2 text-info" /> Security Level: High</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UserProfile;
