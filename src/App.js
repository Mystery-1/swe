// import React, { useState, useEffect } from "react";
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Home from './compo/Home';
// import Profile from './compo/Profile';
// import Navbar from './nav';
// import Logout from './compo/Logout';
// import ProtectedRoute from './compo/ProtectedRoute';
// import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
// import * as AuthComponents from './compo/AuthComponents'; // Renamed to prevent conflicts
// import ShowSchedule from './compo/Schedule';
// import TaskEntry from './compo/TaskEntry';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function App() {
//     const [isSignIn, setIsSignIn] = React.useState(true);
//     const navigate = useNavigate(); 
//     const [password, setPassword] = useState('');
    

//     // Authentication state
//     const [isAuthenticated, setIsAuthenticated] = React.useState(
//         localStorage.getItem('isAuthenticated') === 'true'
//     );

//     const [validations, setValidations] = React.useState({
//         length: false,
//         uppercase: false,
//         specialChar: false,
//     });

//     // Password validation handler
//     const handlePasswordChange = (event) => {
//         const { value } = event.target;
//         setPassword(value);

//         // Update validation checks
//         setValidations({
//             length: value.length >= 8,
//             uppercase: /[A-Z]/.test(value),
//             specialChar: /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/.test(value),
//         });
//     };
//     const handleSignUp = async (event) => {
//         event.preventDefault();

//         const { name, email, password } = event.target;

//         if (!name.value || !email.value || !password.value) {
//             toast.error('All fields are required. Please fill in all the details.', {
//                 position: "bottom-right",
//                 autoClose: 3000,
//             });
//             return;
//         }
//         if (!validations.length || !validations.uppercase || !validations.specialChar) {
//             toast.error('Password must meet all the validation criteria.', {
//                 position: "bottom-right",
//                 autoClose: 3000,
//             });
//             return;
//         }

//         try {
//             const response = await fetch('http://localhost/SWE-444/my-app/src/back/register.php', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//                 body: new URLSearchParams({
//                     name: name.value,
//                     email: email.value,
//                     password: password.value,
//                 }),
//             });
//             const data = await response.json();

//             if (data.status === 'success') {
//                 toast.success('User registered successfully. Please sign in.', {
//                     position: "bottom-right",
//                     autoClose: 3000,
//                 });
//                 setIsSignIn(true);
//             } else if (data.status === 'email_exists') {
//                 toast.error('This email is already registered. Please use a different email or sign in.', {
//                     position: "bottom-right",
//                     autoClose: 3000,
//                 });
//             } else {
//                 toast.error(data.message, {
//                     position: "bottom-right",
//                     autoClose: 3000,
//                 });
//             }
//         } catch (error) {
//             toast.error('An error occurred. Please try again.', {
//                 position: "bottom-right",
//                 autoClose: 3000,
//             });
//         }
//     };

//     const handleSignIn = async (event) => {
//         event.preventDefault();
    
//         const { email, password } = event.target;

//         if (!email.value || !password.value) {
//             toast.error('Email and password are required. Please complete all fields.', {
//                 position: "bottom-right",
//                 autoClose: 3000,
//             });
//             return;
//         }
    
//         try {
//             const response = await fetch('http://localhost/SWE-444/my-app/src/back/login.php', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//                 body: new URLSearchParams({
//                     email: email.value,
//                     password: password.value,
//                 }),
//             });
//             const data = await response.json();
    
//             if (data.status === 'success') {
//                 setIsAuthenticated(true);
//                 localStorage.setItem('isAuthenticated', 'true'); // Persist login state
//                 localStorage.setItem('user_email', email.value); // Save email in localStorage
//                 navigate('/home');
//                 toast.success('Successfully signed in!', {
//                     position: "bottom-right",
//                     autoClose: 3000,
//                 });
//             } else {
//                 toast.error(data.message, {
//                     position: "bottom-right",
//                     autoClose: 3000,
//                 });
//             }
//         } catch (error) {
//             toast.error('An error occurred. Please try again.', {
//                 position: "bottom-right",
//                 autoClose: 3000,
//             });
//         }
//     };

//     return (
//         <>
//             <AuthComponents.GlobalStyle />
//             <Routes>
//                 {/* Public Route */}
//                 <Route
//                     path="/"
//                     element={
//                         <>
//                             <AuthComponents.AuthWrapper>
//                                 <AuthComponents.AuthContainer>
//                                     <AuthComponents.AuthSignInContainer isSignIn={isSignIn}>
//                                         <AuthComponents.AuthForm onSubmit={handleSignIn}>
//                                             <AuthComponents.AuthTitle>Sign In</AuthComponents.AuthTitle>
//                                             <AuthComponents.AuthInput type='email' name='email' placeholder='Email' />
//                                             <AuthComponents.AuthInput type='password' name='password' placeholder='Password' />
//                                             <AuthComponents.AuthAnchor href='#'>Forgot your password?</AuthComponents.AuthAnchor>
//                                             <AuthComponents.AuthButton type='submit'>Sign In</AuthComponents.AuthButton>
//                                         </AuthComponents.AuthForm>
//                                     </AuthComponents.AuthSignInContainer>

//                                     <AuthComponents.AuthSignUpContainer isSignIn={isSignIn}>
//     <AuthComponents.AuthForm onSubmit={handleSignUp}>
//         <AuthComponents.AuthTitle>Create Account</AuthComponents.AuthTitle>
//         <AuthComponents.AuthInput type='text' name='name' placeholder='Name' />
//         <AuthComponents.AuthInput type='email' name='email' placeholder='Email' />
//         <AuthComponents.AuthInput 
//             type='password' 
//             name='password' 
//             placeholder='Password' 
//             onChange={handlePasswordChange}  // Attach validation handler here
//         />
//         {/* Styled Validation Section */}
//             <AuthComponents.ValidationMessage isValid={validations.length}>
//                 {validations.length ? '✔' : '✘'} At least 8 characters
//             </AuthComponents.ValidationMessage>
//             <AuthComponents.ValidationMessage isValid={validations.uppercase}>
//                 {validations.uppercase ? '✔' : '✘'} At least one uppercase letter
//             </AuthComponents.ValidationMessage>
//             <AuthComponents.ValidationMessage isValid={validations.specialChar}>
//                 {validations.specialChar ? '✔' : '✘'} At least one special character
//             </AuthComponents.ValidationMessage>
//         <AuthComponents.AuthButton type='submit'>Sign Up</AuthComponents.AuthButton>
//     </AuthComponents.AuthForm>
// </AuthComponents.AuthSignUpContainer>


//                                     <AuthComponents.AuthOverlayContainer isSignIn={isSignIn}>
//                                         <AuthComponents.AuthOverlay isSignIn={isSignIn}>
//                                             <AuthComponents.AuthLeftOverlayPanel isSignIn={isSignIn}>
//                                                 <AuthComponents.AuthTitle customColor="#ffffff">Welcome Back!</AuthComponents.AuthTitle>
//                                                 <AuthComponents.AuthParagraph>
//                                                     To keep connected with us please login with your personal info
//                                                 </AuthComponents.AuthParagraph>
//                                                 <AuthComponents.AuthGhostButton onClick={() => setIsSignIn(true)}>
//                                                     Sign In
//                                                 </AuthComponents.AuthGhostButton>
//                                             </AuthComponents.AuthLeftOverlayPanel>

//                                             <AuthComponents.AuthRightOverlayPanel isSignIn={isSignIn}>
//                                                 <AuthComponents.AuthTitle customColor="#ffffff">Hello, Friend!</AuthComponents.AuthTitle>
//                                                 <AuthComponents.AuthParagraph>
//                                                     Enter your personal details and start your journey with us
//                                                 </AuthComponents.AuthParagraph>
//                                                 <AuthComponents.AuthGhostButton onClick={() => setIsSignIn(false)}>
//                                                     Sign Up
//                                                 </AuthComponents.AuthGhostButton>
                                                
//                                             </AuthComponents.AuthRightOverlayPanel>
//                                         </AuthComponents.AuthOverlay>
//                                     </AuthComponents.AuthOverlayContainer>
//                                 </AuthComponents.AuthContainer>
//                             </AuthComponents.AuthWrapper>

//                             <AuthComponents.AuthFooter>
//                                 <div className="footer-section footer-logo">
//                                     © 2024 Schedule Generator. All rights reserved.
//                                 </div>

//                                 <div className="footer-section footer-links">
//                                     <a href="/terms">Terms of Service</a>
//                                     <a href="/privacy">Privacy Policy</a>
//                                     <a href="/contact">Contact Us</a>
//                                 </div>

//                                 <div className="footer-section footer-socials">
//                                     <a href="https://facebook.com" target="_blank" rel="noreferrer">
//                                         <FontAwesomeIcon icon={faFacebookF} />
//                                     </a>
//                                     <a href="https://twitter.com" target="_blank" rel="noreferrer">
//                                         <FontAwesomeIcon icon={faTwitter} />
//                                     </a>
//                                     <a href="https://linkedin.com" target="_blank" rel="noreferrer">
//                                         <FontAwesomeIcon icon={faLinkedinIn} />
//                                     </a>
//                                     <a href="https://instagram.com" target="_blank" rel="noreferrer">
//                                         <FontAwesomeIcon icon={faInstagram} />
//                                     </a>
//                                 </div>
//                             </AuthComponents.AuthFooter>
//                         </>
                        
//                     }
//                 />

//                 {/* Protected Routes */}
//                 <Route
//                     path="/home"
//                     element={
//                         <ProtectedRoute isAuthenticated={isAuthenticated}>
//                             <>
//                                 <Navbar />
//                                 <Home />
//                             </>
//                         </ProtectedRoute>
//                     }
//                 />
//                 <Route
//                     path="/profile"
//                     element={
//                         <ProtectedRoute isAuthenticated={isAuthenticated}>
//                             <>
//                                 <Navbar />
//                                 <Profile /> 
//                             </>
//                         </ProtectedRoute>
//                     }
//                 />
//                 <Route
//                     path="/schedule"
//                     element={
//                         <ProtectedRoute isAuthenticated={isAuthenticated}>
//                             <>
//                                 <Navbar />
//                                 <ShowSchedule />
//                             </>
//                         </ProtectedRoute>
//                     }
//                 />
//                 <Route
//                     path="/TaskEntry"
//                     element={
//                         <ProtectedRoute isAuthenticated={isAuthenticated}>
//                             <>
//                                 <Navbar />
//                                 <TaskEntry />
//                             </>
//                         </ProtectedRoute>
//                     }
//                 />
//                 <Route
//                     path="/logout"
//                     element={
//                         <Logout setIsAuthenticated={setIsAuthenticated} />
//                     }
//                 />
//             </Routes>

//             <ToastContainer />
//         </>
//     );
// }

// export default App;


import React, { useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Home from './compo/Home';
import Profile from './compo/Profile';
import Navbar from './nav';
import Logout from './compo/Logout';
import ProtectedRoute from './compo/ProtectedRoute';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import * as AuthComponents from './compo/AuthComponents'; // Renamed to prevent conflicts
import ShowSchedule from './compo/Schedule';
import TaskEntry from './compo/TaskEntry';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [isSignIn, setIsSignIn] = useState(true);
    const navigate = useNavigate(); 
    const [password, setPassword] = useState('');
    const [showValidation, setShowValidation] = useState(false); // New state to control visibility of validation

    // Authentication state
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated') === 'true'
    );

    const [validations, setValidations] = useState({
        length: false,
        uppercase: false,
        specialChar: false,
    });

    // Password validation handler
    const handlePasswordChange = (event) => {
        const { value } = event.target;
        setPassword(value);
        
        // Log the value to verify password input changes
        console.log(value);

        // Set the visibility of the validation messages based on whether the input has any value
        setShowValidation(value.length > 0);
        
        // Perform the validations and update the state
        setValidations({
            length: value.length >= 8,
            uppercase: /[A-Z]/.test(value),
            specialChar: /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/.test(value),
        });
    };

    const handleSignUp = async (event) => {
        event.preventDefault();

        const { name, email, password } = event.target;

        if (!name.value || !email.value || !password.value) {
            toast.error('All fields are required. Please fill in all the details.', {
                position: "bottom-right",
                autoClose: 3000,
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

        try {
            const response = await fetch('http://localhost/SWE-444/my-app/src/back/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    name: name.value,
                    email: email.value,
                    password: password.value,
                }),
            });
            const data = await response.json();

            if (data.status === 'success') {
                localStorage.setItem('user_name', name.value); // Save name in localStorage
                toast.success('User registered successfully. Please sign in.', {
                    position: "bottom-right",
                    autoClose: 3000,
                });
                setIsSignIn(true);
            } else if (data.status === 'email_exists') {
                toast.error('This email is already registered. Please use a different email or sign in.', {
                    position: "bottom-right",
                    autoClose: 3000,
                });
            } else {
                toast.error(data.message, {
                    position: "bottom-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.', {
                position: "bottom-right",
                autoClose: 3000,
            });
        }
    };

    const handleSignIn = async (event) => {
        event.preventDefault();
    
        const { email, password } = event.target;

        if (!email.value || !password.value) {
            toast.error('Email and password are required. Please complete all fields.', {
                position: "bottom-right",
                autoClose: 3000,
            });
            return;
        }
    
        try {
            const response = await fetch('http://localhost/SWE-444/my-app/src/back/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    email: email.value,
                    password: password.value,
                }),
            });
            const data = await response.json();
    
            if (data.status === 'success') {
                setIsAuthenticated(true);
                localStorage.setItem('isAuthenticated', 'true'); // Persist login state
                localStorage.setItem('user_email', email.value); // Save email in localStorage
                navigate('/home');
                toast.success('Successfully signed in!', {
                    position: "bottom-right",
                    autoClose: 3000,
                });
            } else {
                toast.error(data.message, {
                    position: "bottom-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.', {
                position: "bottom-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <>
            <AuthComponents.GlobalStyle />
            <Routes>
                {/* Public Route */}
                <Route
                    path="/"
                    element={
                        <>
                            <AuthComponents.AuthWrapper>
                                <AuthComponents.AuthContainer>
                                    <AuthComponents.AuthSignInContainer isSignIn={isSignIn}>
                                        <AuthComponents.AuthForm onSubmit={handleSignIn}>
                                            <AuthComponents.AuthTitle>Sign In</AuthComponents.AuthTitle>
                                            <AuthComponents.AuthInput type='email' name='email' placeholder='Email' />
                                            <AuthComponents.AuthInput type='password' name='password' placeholder='Password' />
                                            <AuthComponents.AuthAnchor href='#'>Forgot your password?</AuthComponents.AuthAnchor>
                                            <AuthComponents.AuthButton type='submit'>Sign In</AuthComponents.AuthButton>
                                        </AuthComponents.AuthForm>
                                    </AuthComponents.AuthSignInContainer>

                                    <AuthComponents.AuthSignUpContainer isSignIn={isSignIn}>
                                        <AuthComponents.AuthForm onSubmit={handleSignUp}>
                                            <AuthComponents.AuthTitle>Create Account</AuthComponents.AuthTitle>
                                            <AuthComponents.AuthInput type='text' name='name' placeholder='Name' />
                                            <AuthComponents.AuthInput type='email' name='email' placeholder='Email' />
                                            <AuthComponents.AuthInput 
                                                type='password' 
                                                name='password' 
                                                placeholder='Password' 
                                                onChange={handlePasswordChange}  // Attach validation handler here
                                            />
                                            {/* Styled Validation Section */}
                                            {showValidation && (
                                                <AuthComponents.ValidationWrapper>
                                                    <AuthComponents.ValidationMessage isValid={validations.length}>
                                                        <p style={{ color: validations.length ? 'green' : 'red' }}>
                                                            {validations.length ? '✔' : '✘'} At least 8 characters
                                                        </p>
                                                    </AuthComponents.ValidationMessage>
                                                    
                                                    <AuthComponents.ValidationMessage isValid={validations.uppercase}>
                                                        <p style={{ color: validations.uppercase ? 'green' : 'red' }}>
                                                            {validations.uppercase ? '✔' : '✘'} At least one uppercase letter
                                                        </p>
                                                    </AuthComponents.ValidationMessage>
                                                    
                                                    <AuthComponents.ValidationMessage isValid={validations.specialChar}>
                                                        <p style={{ color: validations.specialChar ? 'green' : 'red' }}>
                                                            {validations.specialChar ? '✔' : '✘'} At least one special character
                                                        </p>
                                                    </AuthComponents.ValidationMessage>
                                                </AuthComponents.ValidationWrapper>
                                            )}

                                            <AuthComponents.AuthButton type='submit'>Sign Up</AuthComponents.AuthButton>
                                        </AuthComponents.AuthForm>
                                    </AuthComponents.AuthSignUpContainer>


                                    <AuthComponents.AuthOverlayContainer isSignIn={isSignIn}>
                                        <AuthComponents.AuthOverlay isSignIn={isSignIn}>
                                            <AuthComponents.AuthLeftOverlayPanel isSignIn={isSignIn}>
                                                <AuthComponents.AuthTitle customColor="#ffffff">Welcome Back!</AuthComponents.AuthTitle>
                                                <AuthComponents.AuthParagraph>
                                                    To keep connected with us please login with your personal info
                                                </AuthComponents.AuthParagraph>
                                                <AuthComponents.AuthGhostButton onClick={() => setIsSignIn(true)}>
                                                    Sign In
                                                </AuthComponents.AuthGhostButton>
                                            </AuthComponents.AuthLeftOverlayPanel>

                                            <AuthComponents.AuthRightOverlayPanel isSignIn={isSignIn}>
                                                <AuthComponents.AuthTitle customColor="#ffffff">Hello, Friend!</AuthComponents.AuthTitle>
                                                <AuthComponents.AuthParagraph>
                                                    Enter your personal details and start your journey with us
                                                </AuthComponents.AuthParagraph>
                                                <AuthComponents.AuthGhostButton onClick={() => setIsSignIn(false)}>
                                                    Sign Up
                                                </AuthComponents.AuthGhostButton>
                                                
                                            </AuthComponents.AuthRightOverlayPanel>
                                        </AuthComponents.AuthOverlay>
                                    </AuthComponents.AuthOverlayContainer>
                                </AuthComponents.AuthContainer>
                            </AuthComponents.AuthWrapper>

                            <AuthComponents.AuthFooter>
                                <div className="footer-section footer-logo">
                                    © 2024 Schedule Generator. All rights reserved.
                                </div>

                                <div className="footer-section footer-links">
                                    <a href="/terms">Terms of Service</a>
                                    <a href="/privacy">Privacy Policy</a>
                                    <a href="/contact">Contact Us</a>
                                </div>

                                <div className="footer-section footer-socials">
                                    <a href="https://facebook.com" target="_blank" rel="noreferrer">
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </a>
                                    <a href="https://twitter.com" target="_blank" rel="noreferrer">
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </a>
                                    <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                                        <FontAwesomeIcon icon={faLinkedinIn} />
                                    </a>
                                    <a href="https://instagram.com" target="_blank" rel="noreferrer">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </a>
                                </div>
                            </AuthComponents.AuthFooter>
                        </>
                        
                    }
                />

                {/* Protected Routes */}
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <>
                                <Navbar />
                                <Home />
                            </>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <>
                                <Navbar />
                                <Profile /> 
                            </>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/schedule"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <>
                                <Navbar />
                                <ShowSchedule />
                            </>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/TaskEntry"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <>
                                <Navbar />
                                <TaskEntry />
                            </>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/logout"
                    element={
                        <Logout setIsAuthenticated={setIsAuthenticated} />
                    }
                />
            </Routes>

            <ToastContainer />
        </>
    );
}

export default App;
