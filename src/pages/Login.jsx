import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
    setError(null); // Limpiar errores previos

    try {
      const response = await axios.post("http://localhost:8080/auth/login", formData);

      // Guardar datos del usuario en localStorage
      const user = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      console.log(user)

      // Verificar si el usuario tiene acceso como administrador o usuario normal
      if (user.accesoSistema) {
        navigate("/admin"); // Redirige al AdminDashboard
      } else {
        navigate("/dashboard"); // Redirige al Dashboard para usuarios normales
      }
      
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Error al iniciar sesión. Verifica tus datos."
      );
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register"); // Redirige a la página de registro
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Iniciar Sesión</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
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
          <label htmlFor="password" style={styles.label}>Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ingresa tu contraseña"
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Ingresar</button>
      </form>

      <button onClick={handleRegisterRedirect} style={styles.registerButton}>
        ¿No tienes cuenta? Regístrate
      </button>
    </div>
  );
};

// Estilos
// Estilos
const styles = {
  container: {
    width: "600px", // Cambiado a 600px
    margin: "100px auto", // Margen superior e inferior de 100px
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: "#121212", // Negro grisáceo
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    color: "#FFFFFF", // Blanco para el texto
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#FFFFFF", // Blanco puro
  },
  error: {
    color: "#FF6F61", // Rojo para errores
    marginBottom: "15px",
    textAlign: "center",
    fontWeight: "bold",
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
    marginBottom: "8px",
    fontWeight: "bold",
    color: "#FFFFFF", // Blanco puro
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #BFD2DE", // Bordes celestes
    fontSize: "14px",
    backgroundColor: "#1E1E1E", // Fondo oscuro para el input
    color: "#FFFFFF", // Texto blanco
    transition: "border 0.3s",
  },
  button: {
    padding: "12px",
    backgroundColor: "#BFD2DE", // Botón celeste
    color: "#121212", // Texto oscuro
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  registerButton: {
    padding: "12px",
    backgroundColor: "#BFD2DE", // Celeste uniforme para registro
    color: "#121212", // Texto oscuro
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "20px",
    width: "100%",
    transition: "background-color 0.3s",
  },
};


export default Login;
