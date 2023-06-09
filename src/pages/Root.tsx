import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/navbar/MainNavigation';


const RootLayout:React.FC=()=> {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
