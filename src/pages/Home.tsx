import { dependencies, container } from "../inversify.config";
import { ISetDispatch } from "../interface";
import { useEffect  } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserList from "../components/users/UserList";

export type RootState = {
  AuthSlice: {
    loading: boolean;
  };
};

function Home() {
  const dispatcher = container.get<ISetDispatch>(dependencies.ISetDispatch);
  const users = useSelector((state: any) => state.AuthSlice.users);
  // const isUserLoggedIn = useSelector((state: any) => state.AuthSlice.user);
  const isUserLoggedIn = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    dispatcher.setUsers();
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  }, []);

  return <UserList users={users} />;
}

export default Home;

