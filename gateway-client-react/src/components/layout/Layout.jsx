import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => (
  <div className="d-flex flex-column vh-100">
    <Header />
    <div className="d-flex flex-grow-1">
      <Sidebar />
      <main className="flex-grow-1 p-4 bg-white">
        <Outlet />
      </main>
    </div>
  </div>
);
export default Layout;