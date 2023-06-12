
import { useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import UserList from "../components/users/UserList";
import { useGetUsersQuery } from "../redux/usersApi";


function Home() {
  const isUserLoggedIn = localStorage.getItem('token');
  const {data , isLoading } = useGetUsersQuery()
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  }, []);
  

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : data ? (
        <UserList users={data} />
      ) : (
        <div>No users found.</div>
      )}
    </div>
  );
}

export default Home;

