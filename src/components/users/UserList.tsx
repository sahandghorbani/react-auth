import { UserData, UserListProps } from "../../types/ITypes";
import User from "./User";

const UserList: React.FC<UserListProps> = ({ users }) => (
  <>
    {users.map((user: UserData, index: number) => (
      <User key={index} user={user} />
    ))}
  </>
);

export default UserList;
