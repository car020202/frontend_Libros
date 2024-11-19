import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    clave: "",
    estado: "activo", // Valor predeterminado
    accesoSistema: false, // Valor predeterminado
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llamada al endpoint de registro
      const response = await axios.post("http://localhost:8080/auth/register", formData);
      console.log("Usuario registrado:", response.data);
      navigate("/"); // Redirigir al login después del registro exitoso
    } catch (err) {
      console.error(err);
      setError(err.response ? err.response.data : "Error en el servidor");
    }
  };

  const handleBack = () => {
    navigate("/"); // Redirigir al login o página principal
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Registro de Usuario</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="nombre" style={styles.label}>Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
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
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Ingresa tu apellido"
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
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingresa tu correo"
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
            value={formData.clave}
            onChange={handleChange}
            placeholder="Crea una contraseña"
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Registrarse</button>
        <button type="button" style={styles.backButton} onClick={handleBack}>
          Volver
        </button>
      </form>
    </div>
  );
};

// Estilos en línea
const styles = {
  container: {
    width: "600px",
    margin: "100px auto",
    padding: "40px",
    border: "1px solid #BABAD9",
    borderRadius: "10px",
    backgroundColor: "#121212", // Fondo oscuro
    color: "#FFFFFF", // Texto blanco
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#BFD2DE", // Azul claro para el título
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#FFFFFF", // Texto blanco
    fontSize: "16px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #BABAD9",
    backgroundColor: "#121212",
    color: "#FFFFFF",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#BFD2DE", // Azul claro para el botón
    color: "#121212", // Texto oscuro para contraste
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "10px",
  },
  backButton: {
    padding: "12px",
    backgroundColor: "#FF6F61", // Rojo claro para el botón de volver
    color: "#FFFFFF", // Texto blanco
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "10px",
  },
};

export default Register;
