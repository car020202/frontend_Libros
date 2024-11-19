import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    clave: "",
    estado: "activo", // Estado predeterminado
    accesoSistema: false, // Por defecto es usuario normal (false)
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleUserTypeChange = (e) => {
    const isAdmin = e.target.value === "admin";
    setUser({
      ...user,
      accesoSistema: isAdmin, // true si es admin, false si es usuario
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/auth/register", user);
      alert("Usuario agregado exitosamente.");
      navigate("/admin/users"); // Redirige a la página de gestión de usuarios
    } catch (err) {
      setError("Error al agregar el usuario. Verifica los datos e intenta nuevamente.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Agregar Usuario</h1>
      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="nombre" style={styles.label}>Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={user.nombre}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="apellido" style={styles.label}>Apellido:</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={user.apellido}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="clave" style={styles.label}>Contraseña:</label>
          <input
            type="password"
            id="clave"
            name="clave"
            value={user.clave}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="estado" style={styles.label}>Estado:</label>
          <select
            id="estado"
            name="estado"
            value={user.estado}
            onChange={handleChange}
            required
            style={styles.select}
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="incapacitado">Incapacitado</option>
            <option value="despedido">Despedido</option>
            <option value="renuncio">Renunció</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="tipoUsuario" style={styles.label}>Tipo de Usuario:</label>
          <select
            id="tipoUsuario"
            name="tipoUsuario"
            onChange={handleUserTypeChange}
            required
            style={styles.select}
          >
            <option value="usuario">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>Agregar Usuario</button>
      </form>

      <button style={styles.backButton} onClick={() => navigate("/admin/users")}>
        Volver
      </button>
    </div>
  );
};

// Estilos
const styles = {
  container: {
    width: "600px",
    margin: "100px auto",
    padding: "40px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#121212",
    color: "#fff",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    color: "#BFD2DE",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    width: "100%",
    borderRadius: "4px",
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    fontSize: "16px",
  },
  select: {
    padding: "10px",
    borderRadius: "4px",
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#BFD2DE",
    color: "#121212",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  backButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#FFD700",
    color: "#121212",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  error: {
    color: "red",
  },
};

export default AddUser;
