import { Link } from "react-router-dom";
import { dependencies, container } from "../inversify.config";
import { IGetState } from "../interface";
import { useEffect } from "react";
export type RootState = {
  AuthSlice: {
    loading: boolean;
  };
};
function Home() {

  const myDependency = container.get<IGetState>(dependencies.IGetState);

  useEffect(() => {
    console.log(myDependency.getState("AuthSlice", "loading"));
  }, []);

  return (
    <>
      <h1> Home Page</h1>
      <p>
        <Link to="/login">login</Link>
      </p>
    </>
  );
}

export default Home;
