import styled, { keyframes } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0 ;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInOverlay = keyframes`
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
`;

const buttonHover = keyframes`
  0% {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  100% {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

// Global Styles
export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f0f2f5;
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #333333;

  }
`;

// Wrapper
export const AuthWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

// Container
export const AuthContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  width: 800px;
  max-width: 100%;
  min-height: 550px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 40px;
  animation: ${fadeIn} 0.8s ease-out;
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 20px;
    width: 90%;
  }
`;

// SignIn Container
export const AuthSignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${props =>
    props.isSignIn !== true
      ? `
      transform: translateX(100%);
    `
      : null}
`;

// SignUp Container
export const AuthSignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${props =>
    props.isSignIn !== true
      ? `
      transform: translateX(100%);
      opacity: 1;
      z-index: 5;
    `
      : null}
`;

// Form
export const AuthForm = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
  animation: ${fadeIn} 0.8s ease-out;

  @media (max-width: 480px) {
    padding: 0 20px;
  }
`;

// Title
export const AuthTitle = styled.h1`
  font-weight: 600;
  margin: 20px 0;
  font-size: 24px;
  color: ${(props) => props.customColor || '#333333'};
`;

// Input
export const AuthInput = styled.input`
  background-color: #f0f2f5;
  border: 1px solid #d9d9d9;
  padding: 14px 20px;
  margin: 15px 0;
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  color: #333333;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #40a9ff;
    background-color: #ffffff;
  }

  &:focus {
    border-color: #40a9ff;
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    outline: none;
  }

  &::placeholder {
    color: #bfbfbf;
    font-size: 14px;
    transition: opacity 0.3s ease;
  }

  &:focus::placeholder {
    opacity: 0.7;
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
  }
`;

// Button
export const AuthButton = styled.button`
  border-radius: 24px;
  border: none;
  background-color: #1890ff;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  padding: 12px 40px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 80ms ease-in, box-shadow 0.3s ease;

  &:hover {
    animation: ${buttonHover} 0.3s forwards;
    background-color: #40a9ff;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 480px) {
    padding: 10px 30px;
  }
`;

// Ghost Button
export const AuthGhostButton = styled(AuthButton)`
  background-color: transparent;
  border: 2px solid #ffffff;
  color: #ffffff;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

// Anchor
export const AuthAnchor = styled.a`
  color: #1890ff;
  font-size: 14px;
  text-decoration: none;
  margin: 10px 0;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

// Overlay Container
export const AuthOverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${props =>
    props.isSignIn !== true
      ? `
      transform: translateX(-100%);
    `
      : null}
  animation: ${slideInOverlay} 1s ease-in-out;
`;

// Overlay
export const AuthOverlay = styled.div`
  background: linear-gradient(to right, #006BFF, #024CAA);
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  ${props =>
    props.isSignIn !== true
      ? `
      transform: translateX(50%);
    `
      : null}
`;

// Overlay Panels
export const AuthOverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

// Left Overlay Panel
export const AuthLeftOverlayPanel = styled(AuthOverlayPanel)`
  transform: translateX(-20%);
  padding: 0 0 0 0;

  ${props =>
    props.isSignIn !== true
      ? `
      transform: translateX(0);
    `
      : null}
`;

// Right Overlay Panel
export const AuthRightOverlayPanel = styled(AuthOverlayPanel)`
  right: 0;
  transform: translateX(0);
  display: flex;
  padding: 0 0 0 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;

  ${props =>
    props.isSignIn !== true
      ? `
      transform: translateX(20%);
    `
      : null}
`;

// Paragraph
export const AuthParagraph = styled.p`
  font-size: 15px;
  font-weight: 300;
  line-height: 22px;
  letter-spacing: 0.5px;
  margin: 5%;
  color: #ffffff;
`;

// Message
export const AuthMessage = styled.div`
  background-color: ${(props) => (props.type === 'success' ? '#d4edda' : '#f8d7da')};
  color: ${(props) => (props.type === 'success' ? '#155724' : '#721c24')};
  padding: 0.8em;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid ${(props) => (props.type === 'success' ? '#c3e6cb' : '#f5c6cb')};
  text-align: center;
  font-size: 14px;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
  animation: ${fadeIn} 0.5s ease-out;
`;

// Footer
export const AuthFooter = styled.footer`
  background: #024CAA;
  color: #ffffff;
  padding: 15px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 10;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  .footer-section {
    flex: 1;
    padding: 10px;
  }

  .footer-logo {
    text-align: left;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 30px;
  }

  .footer-links a {
    color: #ffffff;
    text-decoration: none;
    font-size: 16px;
    transition: color 0.3s ease;

    &:hover {
      color: #1890ff;
      text-decoration: underline;
    }
  }

  .footer-socials {
    display: flex;
    justify-content: center;
    gap: 25px;
  }

  .footer-socials a {
    color: #ffffff;
    font-size: 22px;
    transition: color 0.3s ease, transform 0.3s ease;
    
    &:hover {
      color: #1890ff;
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 20px;

    .footer-section {
      padding: 5px 0;
    }

    .footer-logo {
      font-size: 18px;
      margin-bottom: 10px;
    }

    .footer-links {
      margin-bottom: 15px;
    }
  }

  @media (max-width: 480px) {
    .footer-links {
      flex-direction: column;
      gap: 20px;
    }

    .footer-socials {
      gap: 20px;
    }
  }
`;
// Wrapper for the validation messages
export const ValidationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  align-items: flex-start;
`;

// Individual validation message styling
export const ValidationMessage = styled.p`
  font-size: 14px;  font-weight: 500;
  margin: 0;
  color: ${(props) => (props.isValid ? 'green' : 'red')};
  display: flex;
  align-items: left;
  gap: 1px;
`;
