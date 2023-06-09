import { Paper, Typography } from "@mui/material";
import { UserData } from "../../types/ITypes";

const User: React.FC<{ user: UserData }> = ({ user }) => (
  <Paper elevation={3} sx={{ padding: "20px", marginBottom: "10px" }}>
    <Typography variant="body1">Username: {user.username}</Typography>
  </Paper>
);

export default User;
