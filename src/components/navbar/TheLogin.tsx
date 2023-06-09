import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../types/ITypes";



const TheLogin: React.FC<UserType> = ({ user }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <Button color="inherit" onClick={user ? undefined : handleLogin}>
        {user ? user : "login"}
      </Button>
    </div>
  );
  
  
};

export default TheLogin;
