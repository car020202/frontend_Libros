import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ErrorPage from "./pages/ErrorPage";
import ManageUsers from "./pages/ManageUsers"; // Página para Gestión de Usuarios
import ManageBooks from "./pages/ManageBooks"; // Página para Gestión de Libros
import AdminStatistics from "./pages/AdminStatistics"; // Página para Estadísticas
import FavoritesList from "./pages/FavoritesList"; // Página para Favoritos
import EditUser from "./pages/EditUser"; // Página para Editar Usuarios
import EditBook from "./pages/EditBook"; // Página para Editar Libros

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
        path: "admin/users/edit/:id",
        element: <EditUser />, // Ruta para editar usuarios
      },
      {
        path: "admin/books",
        element: <ManageBooks />, // Ruta para Gestión de Libros
      },
      {
        path: "admin/books/edit/:id",
        element: <EditBook />, // Ruta para editar libros
      },
      {
        path: "admin/stats",
        element: <AdminStatistics />, // Ruta para Estadísticas
      },
    ],
  },
]);

export default router;
