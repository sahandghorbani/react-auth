import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import { ISetDispatch } from "../../interface";
import { container, dependencies } from "../../inversify.config";

export default function TheNavbar() {
  const user = useSelector((state: any) => state.AuthSlice.user);
  const dispatcher = container.get<ISetDispatch>(dependencies.ISetDispatch);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatcher.setToken(token);
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <LogoutButton user={user} />
          <LoginButton user={user} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
