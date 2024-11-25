import { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import AdminAttendance from "../pages/AdminAttendance";

const Private = ({ Item, allowedRoles = [] }) => {
  const { signed, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signed) {
      navigate('/', { replace: true });
    }
  }, [signed, navigate]);

  if (!signed) {
    return null;
  }

  // Se há roles permitidas e o usuário não tem a role necessária,
  // retorna um componente vazio
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return <Item />;
};

const RoutesApp = () => {
  const { user } = useAuth();

  // Só inclui a rota de signup se o usuário for manager
  const isManager = user?.role === 'manager';

  return (
      <BrowserRouter>
        <Fragment>
          <Routes>
            <Route exact path="/home" element={<Private Item={Home} />} />
            <Route path="/" element={<Signin />} />
            {isManager && (
                <Route
                    exact
                    path="/signup"
                    element={<Private Item={Signup} allowedRoles={['manager']} />}
                />
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route
                path="/admin/attendance"
                element={<Private Item={AdminAttendance} allowedRoles={['manager']} />}
            />
          </Routes>
        </Fragment>
      </BrowserRouter>
  );
};

export default RoutesApp;