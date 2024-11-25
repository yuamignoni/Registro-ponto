import useAuth from "../../hooks/useAuth";
import Signin from "../../pages/Signin";
const Private = ({ Item, allowedRoles = [] }) => {
    const { signed, user } = useAuth();

    if (!signed) {
        return <Signin />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        return <div>Acesso negado. Você não tem permissão para visualizar esta página.</div>;
    }

    return <Item />;
};
export default Private