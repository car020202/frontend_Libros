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
    maxWidth: "600px",
    margin: "30px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  select: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
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
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#fff",
  },
  deleteButton: {
    padding: "8px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default ManageBooks;
