import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]); // Store user data
  const [error, setError] = useState(null); // Handle errors
  const [loading, setLoading] = useState(false); // Handle loading state

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true); // Set loading to true
    try {
      const response = await axios.get("http://localhost:8080/auth/users"); // API call to get users
      setUsers(response.data); // Update user state
    } catch (err) {
      setError("Error al cargar los usuarios.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Delete a user
  const handleDelete = async (id) => {
    const adminEmail = JSON.parse(localStorage.getItem("user")).email; // Admin email from localStorage

    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return; // Confirm deletion
    try {
      await axios.delete("http://localhost:8080/auth/user/delete", {
        data: { id, adminEmail },
      }); // API call to delete the user
      alert("Usuario eliminado exitosamente.");
      fetchUsers(); // Refresh user list after deletion
    } catch (err) {
      alert(
        err.response?.data || "Error al eliminar el usuario. Inténtalo de nuevo."
      );
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gestión de Usuarios</h1>
      {loading && <p style={styles.loading}>Cargando usuarios...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!loading && users.length > 0 && (
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
                <td style={styles.td}>
                  {user.estado ? "Activo" : "Inactivo"}
                </td>
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
      )}

      {!loading && users.length === 0 && (
        <p style={styles.noUsers}>No hay usuarios registrados.</p>
      )}
    </div>
  );
};

// Styling
const styles = {
  container: {
    maxWidth: "800px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#121212", // Dark background
    color: "#fff", // White text
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#BFD2DE", // Light blue title
  },
  loading: {
    color: "#FFD700", // Yellow loading text
    fontWeight: "bold",
  },
  error: {
    color: "#FF6F61", // Red error text
    marginBottom: "15px",
    fontWeight: "bold",
  },
  noUsers: {
    color: "#BFD2DE", // Light blue for "no users" text
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#1E1E1E", // Dark table background
    color: "#fff",
  },
  th: {
    backgroundColor: "#BFD2DE", // Light blue headers
    color: "#121212",
    padding: "10px",
    border: "1px solid #ccc",
  },
  tr: {
    backgroundColor: "#121212", // Row background
  },
  td: {
    padding: "10px",
    border: "1px solid #ccc",
    textAlign: "left",
  },
  deleteButton: {
    backgroundColor: "#FF6F61", // Red button
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default ManageUsers;
