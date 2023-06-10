import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../types/ITypes";
import { container, dependencies } from "../../inversify.config";
import { ISetDispatch } from "../../interface";



const TheLogout: React.FC<UserType> = ({ user }) => {

  const dispatcher = container.get<ISetDispatch>(dependencies.ISetDispatch);
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatcher.logout()
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
