import React from "react";
import Navbar from "../Components/Navabar/Navbar";
import "./dashboard.scss";
import Button1 from "../Components/Button/Button1";
import JobForm from "../Components/JobForm/JobForm";
import { increment } from "../redux/testSlice";
import { useDispatch, useSelector } from "react-redux";

function Dashboard() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.testSlice?.value);

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="v1-dashboard">
        <div className="v1-dashboard__sidebar">
          <span className="material-symbols-outlined">home</span>
        </div>
        <div className="v1-dashboard__container">
          {/* <Button1
            text={"Create Interview"}
            onClickFunction={() => dispatch(increment())}
          /> */}
          <JobForm />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
