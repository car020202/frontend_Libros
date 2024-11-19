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

export default AddBookForm;
