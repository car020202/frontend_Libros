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
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
  registerButton: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "15px",
    width: "100%",
  },
};

export default Login;
