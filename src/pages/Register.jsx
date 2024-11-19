import React, { useState } from "react";
import axios from "axios"; // Librería para realizar peticiones HTTP
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
      </form>
    </div>
  );
};

// Estilos en línea
const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
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
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Register;
