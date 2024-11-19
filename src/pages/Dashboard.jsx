import React from "react";

const Dashboard = () => {
  // Recuperar información del usuario autenticado
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido, {user?.nombre || "Usuario"}!</h1>
      <p style={styles.text}>Esta es tu página principal después del inicio de sesión.</p>
      <p style={styles.text}>Tu correo: {user?.email}</p>
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
    maxWidth: "600px",
    margin: "50px auto",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  text: {
    marginBottom: "10px",
  },
  logoutButton: {
    padding: "10px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Dashboard;
