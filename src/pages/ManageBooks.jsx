import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ titulo: "", autor: "", genero: "", estado: 1 });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  // Navegar a la vista de edición
  const handleEdit = (id) => {
    navigate(`/admin/books/edit/${id}`); // Navegar a la vista de edición con el ID del libro
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gestión de Libros</h1>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.content}>
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
              <div>
                <button onClick={() => handleEdit(book.id)} style={styles.editButton}>
                  Editar
                </button>
                <button onClick={() => handleDelete(book.id)} style={styles.deleteButton}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button style={styles.backButton} onClick={() => navigate("/admin")}>
        Volver
      </button>
    </div>
  );
};

// Estilos - Todos los estilos se mantienen sin cambios
const styles = {
  container: {
    width: "1500px",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #BABAD9",
    borderRadius: "8px",
    backgroundColor: "#121212",
    color: "#FFFFFF",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#BFD2DE",
  },
  error: {
    color: "#FF6F61",
    textAlign: "center",
    marginBottom: "15px",
    fontWeight: "bold",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  },
  form: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginRight: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #BABAD9",
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    fontSize: "16px",
    transition: "border 0.3s",
  },
  select: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #BABAD9",
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#BFD2DE",
    color: "#121212",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  list: {
    flex: "1",
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #BABAD9",
    borderRadius: "4px",
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
  },
  editButton: {
    padding: "8px",
    backgroundColor: "#FFD700", // Amarillo para el botón de editar
    color: "#121212",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    marginRight: "10px",
    transition: "background-color 0.3s",
  },
  deleteButton: {
    padding: "8px",
    backgroundColor: "#FF6F61", // Rojo para el botón de eliminar
    color: "#FFFFFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  backButton: {
    marginTop: "20px",
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

export default ManageBooks;
