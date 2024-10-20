import React, { useEffect, useState } from "react";
import "./jobForm.scss";
import Button1 from "../Button/Button1";
import { createInterview } from "../../redux/testSlice";
import { useDispatch, useSelector } from "react-redux";
import EmailTagInput from "../EmailInputTags/EmailInputTags";

const JobForm = () => {
  const [experienceLevel, setExperienceLevel] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [emails, setEmails] = useState([]);
  const { isLoading, status } = useSelector(
    (state) => state?.testSlice?.createInterview
  );

  const dispatch = useDispatch();

  const handleExperienceChange = (e) => {
    setExperienceLevel(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(
      createInterview({
        jobTitle,
        jobDescription,
        experienceLevel,
        endDate,
        candidateEmails: emails
      })
    );
  };

  useEffect(() => {
    if(status) {
      setExperienceLevel("");
      setJobTitle("");
      setJobDescription("");
      setEndDate("");
      setEmails([]);
    } 
  }, [status])

  return (
    <form className="job-form">
      <div className="form-group">
        <label htmlFor="job-title" className="job-form__label">
          Job Title
        </label>
        <input
          type="text"
          id="job-title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Enter Job Title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="job-description" className="job-form__label">
          Job Description
        </label>
        <textarea
          id="job-description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Enter Job Description"
        />
      </div>

      <div className="form-group">
        <label htmlFor="experience-level" className="job-form__label">
          Experience Level
        </label>
        <select
          id="experience-level"
          value={experienceLevel}
          onChange={handleExperienceChange}
        >
          <option value="" disabled>
            Select Experience Level
          </option>
          <option value="junior">Junior</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="candidate" className="job-form__label">
          Add Candidate
        </label>
        <EmailTagInput width={"380px"} emails={emails} setEmails={setEmails}/>
      </div>

      <div className="form-group">
        <label htmlFor="end-date" className="job-form__label">
          End Date
        </label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <Button1
        text={"Send"}
        onClickFunction={() => handleSubmit()}
        isLoading={isLoading}
      />
    </form>
  );
};

export default JobForm;
