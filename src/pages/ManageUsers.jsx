import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]); // Almacena los datos de usuarios
  const [error, setError] = useState(null); // Maneja errores
  const [loading, setLoading] = useState(false); // Estado de carga
  const navigate = useNavigate();

  // Obtener usuarios
  const fetchUsers = async () => {
    setLoading(true); // Activa el estado de carga
    try {
      const response = await axios.get("http://localhost:8080/auth/users"); // Llamada a la API
      setUsers(response.data); // Actualiza el estado con los usuarios
    } catch (err) {
      setError("Error al cargar los usuarios.");
    } finally {
      setLoading(false); // Desactiva el estado de carga
    }
  };

  // Eliminar un usuario
  const handleDelete = async (id) => {
    const adminEmail = JSON.parse(localStorage.getItem("user")).email; // Obtén el correo del administrador

    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return; // Confirmar eliminación
    try {
      await axios.delete("http://localhost:8080/auth/user/delete", {
        data: { id, adminEmail },
      }); // Llamada a la API para eliminar
      alert("Usuario eliminado exitosamente.");
      fetchUsers(); // Actualizar la lista de usuarios
    } catch (err) {
      alert(
        err.response?.data || "Error al eliminar el usuario. Inténtalo de nuevo."
      );
    }
  };

  useEffect(() => {
    fetchUsers(); // Cargar usuarios al montar el componente
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
      <button style={styles.backButton} onClick={() => navigate("/admin")}>
        Volver
      </button>
    </div>
  );
};

// Estilos
const styles = {
  container: {
    width: "1200px",
    margin: "100px auto",
    padding: "40px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#121212", // Fondo oscuro
    color: "#fff", // Texto blanco
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Sombra
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#BFD2DE", // Azul claro
  },
  loading: {
    color: "#FFD700", // Amarillo para el estado de carga
    fontWeight: "bold",
  },
  error: {
    color: "#FF6F61", // Rojo para errores
    marginBottom: "15px",
    fontWeight: "bold",
  },
  noUsers: {
    color: "#BFD2DE", // Azul claro para texto sin usuarios
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#1E1E1E", // Fondo oscuro para la tabla
    color: "#fff",
  },
  th: {
    backgroundColor: "#BFD2DE", // Encabezados de la tabla
    color: "#121212",
    padding: "10px",
    border: "1px solid #ccc",
  },
  tr: {
    backgroundColor: "#121212", // Filas de la tabla
  },
  td: {
    padding: "10px",
    border: "1px solid #ccc",
    textAlign: "left",
  },
  deleteButton: {
    backgroundColor: "#FF6F61", // Rojo para el botón de eliminar
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  backButton: {
    marginTop: "50px",
    padding: "10px 20px",
    backgroundColor: "#BFD2DE", // Azul claro para el botón de volver
    color: "#121212", // Texto oscuro
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default ManageUsers;
