import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ErrorPage from "./pages/ErrorPage";
import ManageUsers from "./pages/ManageUsers"; // Nueva página
import ManageBooks from "./pages/ManageBooks"; // Nueva página
import AdminStatistics from "./pages/AdminStatistics"; // Nueva página
import FavoritesList from "./pages/FavoritesList"; // Nueva página para Favoritos

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "favorites",
        element: <FavoritesList />, // Ruta para la lista de favoritos
      },
      {
        path: "admin",
        element: <AdminDashboard />,
      },
      {
        path: "admin/users",
        element: <ManageUsers />, // Ruta para Gestión de Usuarios
      },
      {
        path: "admin/books",
        element: <ManageBooks />, // Ruta para Gestión de Libros
      },
      {
        path: "admin/stats",
        element: <AdminStatistics />, // Ruta para Estadísticas
      },
    ],
  },
]);

export default router;
