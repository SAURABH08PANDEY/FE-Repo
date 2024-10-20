import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import AuthWrapper from "./common/AuthWrapper";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyToken } from "./redux/testSlice";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(verifyToken());
    }
  }, [dispatch, token]);
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <AuthWrapper>
              <Dashboard />
            </AuthWrapper>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
