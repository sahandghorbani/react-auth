import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
import { dependencies, container } from "../inversify.config";
import { ISetDispatch, IGetState } from "../interface";
import { useSelector } from "react-redux";

export default function TheNavbar() {
  // const user = useSelector((state:any) => state.AuthSlice.user);
  const myDependency = container.get<ISetDispatch>(dependencies.ISetDispatch);
  const getter = container.get<IGetState>(dependencies.IGetState);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      myDependency.setToken(token);
    }
  }, []);

  useEffect(() => {
    const user = getter.getState("AuthSlice", "user");
    // console.log(user);
  }, [getter.getState("AuthSlice", "user")]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button color="inherit">
            {getter.getState("AuthSlice", "user")
              ? getter.getState("AuthSlice", "user")
              : "login"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
