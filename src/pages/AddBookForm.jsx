import React, { useState } from "react";
import axios from "axios";

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    genero: "",
    estado: 1, // Estado activo por defecto
  });
  const [message, setMessage] = useState(null);

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
      await axios.post("http://localhost:8080/libros/create", formData);
      setMessage("Libro agregado exitosamente.");
      setFormData({ titulo: "", autor: "", genero: "", estado: 1 }); // Limpiar formulario
    } catch (err) {
      console.error(err);
      setMessage("Error al agregar el libro.");
    }
  };

  return (
    <div>
      <h3>Agregar Libro</h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Autor:</label>
          <input
            type="text"
            name="autor"
            value={formData.autor}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Género:</label>
          <input
            type="text"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Estado:</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
          >
            <option value={1}>Activo</option>
            <option value={0}>Inactivo</option>
            <option value={2}>En reparación</option>
          </select>
        </div>
        <button type="submit">Agregar Libro</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: "600px",
    margin: "50px auto",
    padding: "30px",
    borderRadius: "8px",
    backgroundColor: "#121212", // Fondo oscuro
    color: "#FFFFFF", // Texto blanco
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Sombra para resaltar
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#BFD2DE", // Azul claro
  },
  message: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#BFD2DE", // Azul claro para mensajes
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
    color: "#FFFFFF",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #BABAD9",
    backgroundColor: "#1E1E1E", // Fondo oscuro para inputs
    color: "#FFFFFF", // Texto blanco
    fontSize: "16px",
  },
  select: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #BABAD9",
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#BFD2DE", // Azul claro para el botón
    color: "#121212", // Texto oscuro para contraste
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
};

export default AddBookForm;
