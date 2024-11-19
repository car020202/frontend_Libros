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
    maxWidth: "800px",
    margin: "30px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px",
    border: "1px solid #ccc",
    textAlign: "left",
  },
  tr: {
    backgroundColor: "#f9f9f9",
  },
  td: {
    padding: "10px",
    border: "1px solid #ccc",
    textAlign: "left",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ManageUsers;
