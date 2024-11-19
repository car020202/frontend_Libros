import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/auth/users");
      setUsers(response.data);
    } catch (err) {
      setError("Error al cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const adminEmail = JSON.parse(localStorage.getItem("user")).email;

    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
    try {
      await axios.delete("http://localhost:8080/auth/user/delete", {
        data: { id, adminEmail },
      });
      alert("Usuario eliminado exitosamente.");
      fetchUsers();
    } catch (err) {
      alert(
        err.response?.data || "Error al eliminar el usuario. Inténtalo de nuevo."
      );
    }
  };

  const handleSearch = () => {
    return users.filter(
      (user) =>
        user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleUpdate = (userId) => {
    navigate(`/admin/users/edit/${userId}`);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gestión de Usuarios</h1>
      {loading && <p style={styles.loading}>Cargando usuarios...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {/* Botón para agregar nuevo usuario */}
      <button
        style={styles.addButton}
        onClick={() => navigate("/admin/users/add")}
      >
        Agregar Usuario
      </button>

      {/* Búsqueda de usuario */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar por nombre, apellido o email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

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
            {handleSearch().map((user) => (
              <tr key={user.id} style={styles.tr}>
                <td style={styles.td}>{user.id}</td>
                <td style={styles.td}>{user.nombre}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>
                  {user.estado === "activo" ? "Activo" : "Inactivo"}
                </td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleUpdate(user.id)}
                    style={styles.updateButton}
                  >
                    Editar
                  </button>
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
    backgroundColor: "#121212",
    color: "#fff",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#BFD2DE",
  },
  loading: {
    color: "#FFD700",
    fontWeight: "bold",
  },
  error: {
    color: "#FF6F61",
    marginBottom: "15px",
    fontWeight: "bold",
  },
  noUsers: {
    color: "#BFD2DE",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#1E1E1E",
    color: "#fff",
  },
  th: {
    backgroundColor: "#BFD2DE",
    color: "#121212",
    padding: "10px",
    border: "1px solid #ccc",
  },
  tr: {
    backgroundColor: "#121212",
  },
  td: {
    padding: "10px",
    border: "1px solid #ccc",
    textAlign: "left",
  },
  updateButton: {
    backgroundColor: "#FFD700",
    color: "#121212",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    marginRight: "10px",
  },
  deleteButton: {
    backgroundColor: "#FF6F61",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  addButton: {
    marginBottom: "20px",
    padding: "10px 20px",
    backgroundColor: "#BFD2DE",
    color: "#121212",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  searchContainer: {
    marginBottom: "20px",
  },
  searchInput: {
    padding: "10px",
    width: "50%",
    borderRadius: "4px",
    border: "1px solid #BABAD9",
    backgroundColor: "#1E1E1E",
    color: "#fff",
  },
  backButton: {
    marginTop: "50px",
    padding: "10px 20px",
    backgroundColor: "#BFD2DE",
    color: "#121212",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default ManageUsers;
