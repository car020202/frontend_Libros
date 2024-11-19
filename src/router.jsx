import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard"; // Importar el Dashboard
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />, // Página principal (login)
      },
      {
        path: "register",
        element: <Register />, // Página de registro
      },
      {
        path: "dashboard",
        element: <Dashboard />, // Página de Dashboard
      },
    ],
  },
]);

export default router;
