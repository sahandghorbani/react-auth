import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../types/ITypes";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/authSlice";




const LogoutButton: React.FC<UserType> = ({ user }) => {
  let dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
   dispatch(logoutUser())
    navigate('/login')
  };
  return (
    <div>
      {user && (
        <Button color="inherit" onClick={handleLogout}>
          logout
        </Button>
      )}
    </div>
  );
};

export default LogoutButton;
