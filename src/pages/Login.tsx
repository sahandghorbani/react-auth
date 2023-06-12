import React from "react";
import TheSnackbar from "../components/ui/TheSnackbar";
import LoginForm from "../components/form/LoginForm";
import { useLoginUserMutation } from "../redux/usersApi";

const LoginPage: React.FC = () => {
  const [loginUser, { isLoading, isError, isSuccess }] = useLoginUserMutation();
  const handleSubmit = async (username: string, password: string) => {
    await loginUser({ username, password });
  };

  return (
    <>
      <LoginForm
        onSubmit={handleSubmit}
        loading={isLoading}
        message={isSuccess ? "Success" : "Error occurred"}
      />
      <TheSnackbar message={isSuccess ? "Success" : "Error occurred"} />
    </>
  );
};

export default LoginPage;
