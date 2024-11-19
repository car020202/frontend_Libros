import React, { useEffect, useState } from "react";
import axios from "axios";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/libros/all");
        setBooks(response.data);
      } catch (err) {
        setError("Error al cargar los libros.");
      }
    };
    fetchBooks();
  }, []);

  const handleAddFavorite = async (bookId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) { // Ajusta según el campo exacto del backend
      alert("Error: Usuario no autenticado.");
      return;
    }
  
    console.log("Datos enviados al backend:", {
      userId: user.id, // o user.id_usuario si así lo devuelve el backend
      libroId: bookId,
    });
  
    try {
      const response = await axios.post("http://localhost:8080/preferencias", {
        userId: user.id, // Ajusta a user.id si es necesario
        libroId: bookId,
      });
      console.log("Respuesta del servidor:", response.data);
      alert("Libro agregado a favoritos.");
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Error al agregar a favoritos.");
    }
  };
  
  



  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Libros Disponibles</h2>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.grid}>
        {books.map((book) => (
          <div key={book.id} style={styles.card}>
            <h3 style={styles.bookTitle}>{book.titulo}</h3>
            <p style={styles.author}>Autor: {book.autor}</p>
            <p style={styles.genre}>Género: {book.genero}</p>
            <button
              style={styles.button}
              onClick={() => handleAddFavorite(book.id)}
            >
              Agregar a Favoritos
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Estilos
const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#121212", // Fondo oscuro
    color: "#FFFFFF", // Texto blanco
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
    marginBottom: "20px",
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "1px solid #BFD2DE", // Bordes celestes
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Sombra ligera
    textAlign: "center",
    backgroundColor: "#1E1E1E", // Fondo oscuro para la tarjeta
    color: "#FFFFFF", // Texto blanco
  },
  bookTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#FFFFFF", // Texto blanco
  },
  author: {
    fontSize: "16px",
    marginBottom: "10px",
    color: "#BFD2DE", // Azul claro para autor
  },
  genre: {
    fontSize: "14px",
    marginBottom: "20px",
    color: "#BABAD9", // Gris claro para género
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#BFD2DE", // Azul claro para botones
    color: "#121212", // Texto oscuro para contraste
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
};



export default BooksList;
