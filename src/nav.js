import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaLock, FaSignOutAlt, FaHome, FaTasks } from 'react-icons/fa';
import { FaRegCalendarAlt } from 'react-icons/fa';

const NavbarContainer = styled.nav`
  background: #ffffff;
  color: #333;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  top: 0;
  left: 0;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CenterContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 700;
  color: #0062E6;
  text-decoration: none;

  &:hover {
    color: #004bb5;
  }
`;

const NavItem = styled.div`
  position: relative;

  a {
    text-decoration: none;
    color: #333;
    font-size: 16px;
    font-weight: 500;
    padding: 5px 10px;
    display: inline-flex;
    align-items: center;
    transition: color 0.3s ease;

    svg {
      margin-right: 6px;
    }

    &:hover {
      color: #0062E6;
    }

    &:after {
      content: '';
      position: absolute;
      width: 0%;
      height: 2px;
      background-color: #0062E6;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }

  &:hover > ul {
    display: block;
  }
`;

const DropdownMenu = styled.ul`
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #ffffff;
  padding: 10px 0;
  margin: 0;
  list-style: none;
  min-width: 180px;
  border-radius: 4px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const DropdownItem = styled.li`
  padding: 10px 20px;

  a {
    color: #333;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    align-items: center;
    transition: background-color 0.3s ease, color 0.3s ease;

    svg {
      margin-right: 8px;
    }

    &:hover {
      background-color: #f0f0f0;
      color: #0062E6;
    }
  }
`;

function Navbar() {
  const [email, setEmail] = useState('');

  // Fetch the email from localStorage when the component mounts
  useEffect(() => {
    const storedEmail = localStorage.getItem('user_email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <NavbarContainer>
      <LeftContainer>
        <Logo to="/">Schedule Generator</Logo>
      </LeftContainer>
      <CenterContainer>
        <NavItem>
          <Link to="/Home">
            <FaHome />
            Home
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/Schedule">
            <FaRegCalendarAlt />
            Schedule
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/TaskEntry">
            <FaTasks />
            Add Tasks
          </Link>
        </NavItem>
      </CenterContainer>
      <RightContainer>
        <NavItem>
          <Link to="#">
            <FaUserCircle />
            {email ? ` ${email}` : 'Profile'}
          </Link>
          <DropdownMenu>
            <DropdownItem>
              <Link to="/Profile">
                <FaLock />
                Change Password
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link to="/Logout">
                <FaSignOutAlt />
                Log Out
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </NavItem>
      </RightContainer>
    </NavbarContainer>
  );
}

export default Navbar;
