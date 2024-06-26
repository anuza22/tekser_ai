'use client';
import { Link } from "react-router-dom";
import { useState } from "react";
import "./header.css";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header className="header">
      <div className="container">
        <Link href="#" className="logo">
          <MountainIcon className="icon" />
          <span className="logo-text">
          Ai<span className="text-[#ffffff]">Sun</span>
          </span>
         
        </Link>
        <div className="actions">
          <div className="dropdown">
            <button className="button" onClick={toggleDropdown}>
              <GlobeIcon className="icon" />
              <span>EN</span>
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-item">
                  <GlobeIcon className="dropdown-icon" />
                  English
                </div>
                <div className="dropdown-item">
                  <GlobeIcon className="dropdown-icon" />
                  Español
                </div>
                <div className="dropdown-item">
                  <GlobeIcon className="dropdown-icon" />
                  Français
                </div>
              </div>
            )}
          </div>
          <button className="button">
            <MessageCircleQuestionIcon className="icon" />
            <span>FAQ</span>
          </button>
          <button className="button">
            <UserIcon className="icon" />
            <span>Login</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function GlobeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function MessageCircleQuestionIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
