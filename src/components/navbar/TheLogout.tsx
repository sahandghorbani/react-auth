import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/Auth";
import { UserType } from "../../types/ITypes";



const TheLogout: React.FC<UserType> = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutUser()); 
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

export default TheLogout;
