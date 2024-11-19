import React from "react";

const AdminDashboard = () => {
  const admin = JSON.parse(localStorage.getItem("user")); // Recuperar información del administrador autenticado

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Panel de Administrador</h1>
      <p style={styles.text}>Bienvenido, {admin?.nombre || "Administrador"}.</p>
      <p style={styles.text}>Correo: {admin?.email}</p>

      <div style={styles.section}>
        <h2 style={styles.subTitle}>Gestión de Usuarios</h2>
        <p style={styles.text}>
          Administra la lista de usuarios, edita sus roles y elimina usuarios inactivos.
        </p>
        <button
          style={styles.button}
          onClick={() => (window.location.href = "/admin/users")}
        >
          Administrar Usuarios
        </button>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subTitle}>Gestión de Libros</h2>
        <p style={styles.text}>
          Agrega nuevos libros, actualiza información o elimina libros no disponibles.
        </p>
        <button
          style={styles.button}
          onClick={() => (window.location.href = "/admin/books")}
        >
          Administrar Libros
        </button>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subTitle}>Estadísticas</h2>
        <p style={styles.text}>
          Revisa gráficos de popularidad de libros, preferencias por género y tendencias.
        </p>
        <button
          style={styles.button}
          onClick={() => (window.location.href = "/admin/stats")}
        >
          Ver Estadísticas
        </button>
      </div>

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
    maxWidth: "800px",
    margin: "30px auto",
    padding: "20px",
    border: "1px solid #BFD2DE", // Bordes celestes
    borderRadius: "8px",
    backgroundColor: "#121212", // Negro grisáceo
    textAlign: "center",
    color: "#FFFFFF", // Texto blanco
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#FFFFFF", // Blanco puro
  },
  subTitle: {
    fontSize: "22px",
    marginTop: "30px",
    marginBottom: "15px",
    fontWeight: "bold",
    color: "#BFD2DE", // Azul claro para subtítulos
  },
  text: {
    marginBottom: "10px",
    fontSize: "16px",
    color: "#FFFFFF", // Texto blanco
  },
  section: {
    marginTop: "20px",
    textAlign: "left",
    border: "1px solid #BFD2DE", // Bordes celestes
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
    backgroundColor: "#1E1E1E", // Fondo oscuro para secciones
    color: "#FFFFFF", // Texto blanco
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#BFD2DE", // Azul claro para botones
    color: "#121212", // Texto oscuro
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "bold", // Negrita para destacar
    transition: "background-color 0.3s",
  },
  logoutButton: {
    padding: "10px 20px",
    marginTop: "20px",
    backgroundColor: "#FF6F61", // Rojo para botón de logout
    color: "#FFFFFF", // Texto blanco
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold", // Negrita para destacar
    transition: "background-color 0.3s",
  },
};

export default AdminDashboard;
