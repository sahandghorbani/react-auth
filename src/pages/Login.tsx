import React from "react";
import { useSelector } from "react-redux";
import { dependencies, container } from "../inversify.config";
import { ISetDispatch, IGetState } from "../interface";
import TheSnackbar from "../components/ui/TheSnackbar";
import LoginForm from "../components/form/LoginForm";

const LoginPage: React.FC = () => {
  const { loading } = useSelector((state: any) => state.AuthSlice);
  const dispatcher = container.get<ISetDispatch>(dependencies.ISetDispatch);
  const getter = container.get<IGetState>(dependencies.IGetState);

  const handleSubmit = (username: string, password: string) => {
    dispatcher.setDispatch(username, password);
  }

    
  return (
    <>
      <LoginForm
        onSubmit={handleSubmit}
        loading={loading}
      />
      <TheSnackbar message={getter.getState("AuthSlice", "message")} />
    </>
  );
};

export default LoginPage;
