import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import { useGetUserByIdQuery } from "../../redux/usersApi";
import { useSelector } from "react-redux";

export default function TheNavbar() {
  //acts  like computed properties ; it does return the fulfied vaue
  const user = useSelector((state: any) => state.auth.user);

  const token = localStorage.getItem("token");
  let {data ,isLoading} = useGetUserByIdQuery(token);
  console.log('re-render' , token);
  
  
  
  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar sx={{ justifyContent: "space-between" }}>
              {isLoading ? (
                <span>Loading...</span>
              ) : (
                <>
                  <LogoutButton user={user} />
                  <LoginButton user={user} />
                </>
              )}
            </Toolbar>
          </AppBar>
        </Box>
    </>
  );
}
