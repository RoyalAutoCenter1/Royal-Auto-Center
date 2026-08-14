import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Callback from './pages/Callback';
import { getUser } from './auth/authService';
import { useState, useEffect } from 'react';

import Layout from './components/layout/Layout';
import RegistroA from './pages/admin/RegistroA';
import RegistroB from './pages/admin/RegistroB';
import UnionAyB from './pages/admin/UnionAyB';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser().then((u) => {
      setUser(u);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />

        <Route path="/admin" element={<Layout />}>
          {/* <Route path="home" element={<Home />} /> */}
          <Route path="admin" element={<Admin />} />
          <Route path="ms-a" element={<RegistroA />} />
          <Route path="ms-b" element={<RegistroB />} />
          <Route path="union-a-b" element={<UnionAyB />} />
        </Route>
        {/* Ruta protegida */}
        {/* <Route 
          path="/admin" 
          element={user ? <Admin /> : <Navigate to="/" />} 
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;