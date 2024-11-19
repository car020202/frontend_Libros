import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ titulo: "", autor: "", genero: "", estado: 1 });
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/libros/all");
      setBooks(response.data);
    } catch (err) {
      setError("Error al cargar los libros.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/libros/create", form);
      alert("Libro agregado exitosamente.");
      fetchBooks();
    } catch (err) {
      alert("Error al agregar libro.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/libros/delete/${id}`);
      alert("Libro eliminado exitosamente.");
      fetchBooks();
    } catch (err) {
      alert("Error al eliminar libro.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gestión de Libros</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Título"
          value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Autor"
          value={form.autor}
          onChange={(e) => setForm({ ...form, autor: e.target.value })}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Género"
          value={form.genero}
          onChange={(e) => setForm({ ...form, genero: e.target.value })}
          required
          style={styles.input}
        />
        <select
          value={form.estado}
          onChange={(e) => setForm({ ...form, estado: e.target.value })}
          style={styles.select}
        >
          <option value={1}>Activo</option>
          <option value={0}>Inactivo</option>
          <option value={2}>Reparación</option>
        </select>
        <button type="submit" style={styles.button}>
          Agregar Libro
        </button>
      </form>
      <ul style={styles.list}>
        {books.map((book) => (
          <li key={book.id} style={styles.listItem}>
            <div>
              <strong>{book.titulo}</strong> - {book.autor} - {book.genero}
            </div>
            <button onClick={() => handleDelete(book.id)} style={styles.deleteButton}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    width: "600px", // Ancho fijo para consistencia
    margin: "30px auto",
    padding: "20px",
    border: "1px solid #BABAD9", // Bordes gris claro
    borderRadius: "8px",
    backgroundColor: "#121212", // Fondo oscuro
    color: "#FFFFFF", // Texto blanco
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Sombra para resaltar el contenedor
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#BFD2DE", // Azul claro para el título
  },
  error: {
    color: "#FF6F61", // Rojo para errores
    textAlign: "center",
    marginBottom: "15px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px", // Espaciado uniforme entre elementos
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #BABAD9", // Bordes gris claro
    backgroundColor: "#1E1E1E", // Fondo oscuro para los inputs
    color: "#FFFFFF", // Texto blanco
    fontSize: "16px",
    transition: "border 0.3s", // Suavidad en el cambio de estilo al interactuar
  },
  select: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #BABAD9", // Bordes gris claro
    backgroundColor: "#1E1E1E", // Fondo oscuro para el select
    color: "#FFFFFF", // Texto blanco
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#BFD2DE", // Azul claro para el botón
    color: "#121212", // Texto oscuro para contraste
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #BABAD9", // Bordes gris claro
    borderRadius: "4px",
    backgroundColor: "#1E1E1E", // Fondo oscuro
    color: "#FFFFFF", // Texto blanco
  },
  deleteButton: {
    padding: "8px",
    backgroundColor: "#FF6F61", // Rojo para botón de eliminar
    color: "#FFFFFF", // Texto blanco
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
};

export default ManageBooks;
