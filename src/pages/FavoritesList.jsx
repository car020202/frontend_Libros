import React, { useEffect, useState } from "react";
import axios from "axios";

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  // Obtener el usuario autenticado desde el localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchFavorites = async () => {
    if (!user) {
      setError("Usuario no autenticado. Por favor, inicia sesión.");
      return;
    }

    try {
      // Realizar petición al backend para obtener los favoritos
      const response = await axios.get(
        `http://localhost:8080/preferencias/${user.id}`
      );
      setFavorites(response.data); // Asegúrate de que el backend envíe datos completos del libro
    } catch (err) {
      console.error(err);
      setError("Error al cargar los libros favoritos.");
    }
  };

  const handleRemoveFavorite = async (bookId) => {
    console.log("Datos enviados al backend para eliminar:", {
      userId: user.id, // ID del usuario
      libroId: bookId, // ID del libro
    });
  
    try {
      const response = await axios.delete("http://localhost:8080/preferencias", {
        headers: { "Content-Type": "application/json" },
        data: {
          userId: user.id,
          libroId: bookId,
        },
      });
      console.log("Respuesta del servidor:", response.data);
      alert("Libro eliminado de favoritos.");
      fetchFavorites();
    } catch (err) {
      console.error("Error al eliminar el libro:", err);
      alert(err.response?.data || "Error al eliminar el libro de favoritos.");
    }
  };
  
  


  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Mis Libros Favoritos</h2>
      {error && <p style={styles.error}>{error}</p>}
      {favorites.length > 0 ? (
        <div style={styles.bookList}>
          {favorites.map((favorite) => (
            <div key={favorite.libroId} style={styles.bookCard}>
              <h3 style={styles.bookTitle}>{favorite.libro.titulo}</h3>
              <p style={styles.bookDetails}>Autor: {favorite.libro.autor}</p>
              <p style={styles.bookDetails}>Género: {favorite.libro.genero}</p>
              <button
                style={styles.removeButton}
                onClick={() => handleRemoveFavorite(favorite.libroId)}
              >
                Eliminar de Favoritos
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noFavorites}>No tienes libros favoritos aún.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "900px", // Ancho fijo en lugar de maxWidth
    margin: "30px auto",
    textAlign: "center",
    padding: "20px",
    border: "1px solid #BABAD9", // Bordes con color consistente
    borderRadius: "8px",
    backgroundColor: "#121212", // Fondo oscuro
    color: "#FFFFFF", // Texto blanco
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Sombra para dar profundidad
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
    fontWeight: "bold",
    color: "#BFD2DE", // Azul claro para el título
  },
  error: {
    color: "#FF6F61", // Rojo para errores
    marginBottom: "20px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  bookList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  bookCard: {
    border: "1px solid #BABAD9", // Bordes celestes
    borderRadius: "8px",
    padding: "15px",
    textAlign: "left",
    backgroundColor: "#1E1E1E", // Fondo oscuro para las tarjetas
    color: "#FFFFFF", // Texto blanco
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Sombra para tarjetas
  },
  bookTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#BFD2DE", // Azul claro para los títulos de libros
  },
  bookDetails: {
    fontSize: "14px",
    marginBottom: "10px",
    color: "#BABAD9", // Gris claro para los detalles
  },
  removeButton: {
    padding: "10px 15px",
    backgroundColor: "#FF6F61", // Rojo para el botón de eliminar
    color: "#FFFFFF", // Texto blanco
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background-color 0.3s", // Transición para mejor interacción
  },
  noFavorites: {
    fontSize: "16px",
    color: "#BABAD9", // Gris claro para el texto de "sin favoritos"
  },
};

export default FavoritesList;
