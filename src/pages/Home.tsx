import { dependencies, container } from "../inversify.config";
import { IGetState, ISetDispatch } from "../interface";
import { useEffect } from "react";
import { UserData } from "../types/ITypes";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { fetchAllUsers } from "../store/Auth";

export type RootState = {
  AuthSlice: {
    loading: boolean;
  };
};
function Home() {
  
  // const dispatch = useDispatch()
  const myDependency = container.get<IGetState>(dependencies.IGetState);
  const dispatcher = container.get<ISetDispatch>(dependencies.ISetDispatch);

  const users = useSelector((state: any) => state.AuthSlice.users);
  useEffect(() => {
    // dispatch(fetchAllUsers())
    dispatcher.setUsers();
    // console.log(myDependency.getState("AuthSlice", "users"));
  }, []);

    // const users = myDependency.getState("AuthSlice", "users");

  return (
    <>
      <ul>
        {users &&
          users.map((user: UserData, index: number) => (
            <li key={index}>{user.username}</li>
          ))}
      </ul>
    </>
  );
}

export default Home;
