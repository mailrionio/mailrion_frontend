/* eslint-disable @typescript-eslint/no-explicit-any */
import Toast from "@/components/Toast";
import { extractEmail, validateEmail } from "@/helpers";
import React, { ChangeEvent, useEffect, useState } from "react";
import "./multipleInputs.scss";
interface MultipleEmailInputProps {
  onEmailsChange: (emails: any) => void;
}

const MultipleEmailInput = ({ onEmailsChange }: MultipleEmailInputProps) => {
  const drafts = JSON.parse(localStorage.getItem("drafts") as string) as any;
  const [emails, setEmails] = useState<string[]>(drafts ? drafts.to : []);
  const [currentEmail, setCurrentEmail] = useState<string>("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentEmail(event.target.value);
  };

  const handleEmailKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === "," || event.key === "Tab") {
      if (validateEmail(currentEmail)) {
        event.preventDefault();
        if (currentEmail.trim() !== "") {
          setEmails((prev) => [...prev, currentEmail.trim()]);
          setCurrentEmail("");
          onEmailsChange(emails);
        }
      } else {
        Toast({ type: "error", message: "Enter valid email address" });
        event.preventDefault();
        return;
      }
    }
  };
  const handleEmailBlur = () => {
    if (currentEmail.trim() !== "") {
      if (validateEmail(currentEmail)) {
        setEmails((prev) => [...prev, currentEmail.trim()]);
        setCurrentEmail("");
        onEmailsChange(emails);
      } else {
        Toast({ type: "error", message: "Enter valid email address" });
        return;
      }
    }
  };
  const removeEmail = (index: any) => {
    const updatedEmails = emails.filter((_, i) => i !== index);
    setEmails(updatedEmails);
    onEmailsChange(updatedEmails);
  };

  useEffect(() => {
    onEmailsChange(emails);
  }, [emails, onEmailsChange]);

  return (
    <div className="multiple-email-input">
      <div className="email-list">
        {emails.map((email, index) => (
          <div className="email-item" key={index}>
            {extractEmail(email) ? extractEmail(email) : email}
            <div className="remove-email" onClick={() => removeEmail(index)}>
              <span>x</span>
            </div>
          </div>
        ))}
      </div>
      <input
        className="email-input"
        type="text"
        placeholder="Separate multiple emails with comma"
        value={currentEmail}
        onChange={handleEmailChange}
        onKeyDown={handleEmailKeyDown}
        onBlur={handleEmailBlur}
        required
      />
    </div>
  );
};

export default MultipleEmailInput;
