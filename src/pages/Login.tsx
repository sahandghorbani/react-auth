import React from "react";
import { useSelector } from "react-redux";
import LoginForm from "../components/LoginForm";
import { dependencies, container } from "../inversify.config";
import { ISetDispatch, IGetState } from "../interface";

const LoginPage: React.FC = () => {
  const { loading } = useSelector((state: any) => state.AuthSlice);
  const dispatcher = container.get<ISetDispatch>(dependencies.ISetDispatch);
  const getter = container.get<IGetState>(dependencies.IGetState);

  const handleSubmit = (username: string, password: string) => {
    dispatcher.setDispatch(username, password);
  };

  return (
    <LoginForm
      onSubmit={handleSubmit}
      loading={loading}
      error={getter.getState("AuthSlice", "error")}
    />
  );
};

export default LoginPage;
