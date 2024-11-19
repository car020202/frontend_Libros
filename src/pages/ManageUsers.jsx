import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/auth/users");
      setUsers(response.data);
    } catch (err) {
      setError("Error al cargar los usuarios.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/auth/user/delete`, {
        data: { id, adminEmail: JSON.parse(localStorage.getItem("user")).email },
      });
      alert("Usuario eliminado exitosamente.");
      fetchUsers(); // Refrescar la lista de usuarios
    } catch (err) {
      alert("Error al eliminar usuario.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gestión de Usuarios</h1>
      {error && <p style={styles.error}>{error}</p>}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Estado</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={styles.tr}>
              <td style={styles.td}>{user.id}</td>
              <td style={styles.td}>{user.nombre}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>{user.estado}</td>
              <td style={styles.td}>
                <button
                  onClick={() => handleDelete(user.id)}
                  style={styles.deleteButton}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    width: "800px", // Se cambió maxWidth por width
    margin: "30px auto",
    padding: "20px",
    border: "1px solid #BABAD9", // Bordes en gris claro
    borderRadius: "8px",
    backgroundColor: "#121212", // Fondo oscuro
    color: "#FFFFFF", // Texto blanco
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Sombra para el contenedor
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#BFD2DE", // Azul claro para el título
  },
  error: {
    color: "#FF6F61", // Rojo para errores
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    backgroundColor: "#1E1E1E", // Fondo oscuro para la tabla
    color: "#FFFFFF", // Texto blanco
  },
  th: {
    backgroundColor: "#BFD2DE", // Azul claro para encabezados de la tabla
    color: "#121212", // Texto oscuro
    padding: "10px",
    border: "1px solid #BABAD9", // Bordes claros
    textAlign: "left",
  },
  tr: {
    backgroundColor: "#121212", // Fondo oscuro para filas
  },
  td: {
    padding: "10px",
    border: "1px solid #BABAD9", // Bordes claros
    textAlign: "left",
    color: "#FFFFFF", // Texto blanco
  },
  deleteButton: {
    backgroundColor: "#FF6F61", // Rojo para el botón de eliminar
    color: "#FFFFFF", // Texto blanco
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s", // Suavidad al interactuar con el botón
    fontWeight: "bold",
  },
};

export default ManageUsers;
