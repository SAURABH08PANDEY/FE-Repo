import React, { useState } from "react";
import "./emailTagInput.scss";

const EmailTagInput = ({ width, emails, setEmails }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      if (validateEmail(inputValue)) {
        setEmails([...emails, inputValue]);
        setInputValue("");
      } else {
      }
    }
  };

  const validateEmail = (email) => {
    // Simple email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const removeEmail = (indexToRemove) => {
    setEmails(emails.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="email-tag-input" style={{ width }}>
      {emails.map((email, index) => (
        <div className="tag" key={index}>
          {email}
          <span className="remove-tag" onClick={() => removeEmail(index)}>
            &times;
          </span>
        </div>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter email"
      />
    </div>
  );
};

export default EmailTagInput;
