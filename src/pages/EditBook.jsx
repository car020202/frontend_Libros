import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditBook = () => {
  const [book, setBook] = useState({ titulo: "", autor: "", genero: "", estado: 1 });
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/libros/${id}`);
        setBook(response.data);
      } catch (err) {
        setError("Error al cargar el libro.");
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/libros/update/${id}`, book);
      alert("Libro actualizado exitosamente.");
      navigate("/admin/books");
    } catch (err) {
      setError("Error al actualizar el libro.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Editar Libro</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="titulo"
          value={book.titulo}
          onChange={handleChange}
          placeholder="Título"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="autor"
          value={book.autor}
          onChange={handleChange}
          placeholder="Autor"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="genero"
          value={book.genero}
          onChange={handleChange}
          placeholder="Género"
          required
          style={styles.input}
        />
        <select
          name="estado"
          value={book.estado}
          onChange={handleChange}
          style={styles.select}
        >
          <option value={1}>Activo</option>
          <option value={0}>Inactivo</option>
          <option value={2}>Reparación</option>
        </select>
        <button type="submit" style={styles.button}>
          Actualizar Libro
        </button>
      </form>
      <button style={styles.backButton} onClick={() => navigate("/admin/books")}>
        Volver
      </button>
    </div>
  );
};

// Reutiliza los estilos
const styles = {
  container: {
    width: "600px",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #BABAD9",
    borderRadius: "8px",
    backgroundColor: "#121212",
    color: "#FFFFFF",
    textAlign: "center",
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #BABAD9",
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    fontSize: "16px",
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
};

export default EditBook;
