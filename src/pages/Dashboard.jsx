import React from "react";
import { useNavigate } from "react-router-dom";
import BooksList from "../pages/BooksList";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Recuperar el usuario autenticado
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido, {user?.nombre || "Usuario"}!</h1>
      <p style={styles.text}>Esta es tu página principal después del inicio de sesión.</p>
      <p style={styles.text}>Tu correo: {user?.email}</p>

      {/* Botón para ir a favoritos */}
      <button
        onClick={() => navigate("/favorites")}
        style={styles.favoriteButton}
      >
        Ver Mis Favoritos
      </button>

      <BooksList />

      <button
        onClick={() => {
          localStorage.removeItem("user"); // Cerrar sesión
          window.location.href = "/"; // Redirigir al login
        }}
        style={styles.logoutButton}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

const styles = {
  container: {
    width: "600px",
    margin: "100px auto",
    textAlign: "center",
    backgroundColor: "#121212", // Fondo oscuro
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Sombra ligera
    color: "#FFFFFF", // Texto blanco
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    fontWeight: "bold",
    color: "#BFD2DE", // Azul claro para el título
  },
  text: {
    marginBottom: "10px",
    fontSize: "16px",
    color: "#BABAD9", // Gris claro para el texto
  },
  favoriteButton: {
    padding: "12px",
    backgroundColor: "#BFD2DE", // Azul claro para el botón
    color: "#121212", // Texto oscuro
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
    marginBottom: "20px",
  },
  logoutButton: {
    padding: "12px",
    backgroundColor: "#FF6F61", // Rojo para el botón de cerrar sesión
    color: "#FFFFFF", // Texto blanco
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
};

export default Dashboard;
