import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Obtener el usuario autenticado desde localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Función para obtener los libros favoritos
  const fetchFavorites = async () => {
    if (!user) {
      setError("Usuario no autenticado. Por favor, inicia sesión.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/preferencias/${user.id}`
      );
      setFavorites(response.data); // Asume que el backend envía datos completos del libro
    } catch (err) {
      console.error("Error al cargar favoritos:", err);
      setError("Error al cargar los libros favoritos.");
    }
  };

  // Función para eliminar un libro de favoritos
  const handleRemoveFavorite = async (libroId) => {
    try {
      const response = await axios.delete("http://localhost:8080/preferencias", {
        headers: { "Content-Type": "application/json" },
        data: {
          userId: user.id, // ID del usuario desde localStorage
          libroId: libroId, // ID del libro a eliminar
        },
      });
      console.log("Respuesta del servidor:", response.data);
      alert("Libro eliminado de favoritos.");
      fetchFavorites(); // Actualizar la lista de favoritos
    } catch (err) {
      console.error("Error al eliminar el libro:", err);
      alert(err.response?.data || "Error al eliminar el libro de favoritos.");
    }
  };

  // Llamar a fetchFavorites al cargar el componente
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
            <div key={favorite.libro.id} style={styles.bookCard}>
              <h3 style={styles.bookTitle}>{favorite.libro.titulo}</h3>
              <p style={styles.bookDetails}>Autor: {favorite.libro.autor}</p>
              <p style={styles.bookDetails}>Género: {favorite.libro.genero}</p>
              <button
                style={styles.removeButton}
                onClick={() => handleRemoveFavorite(favorite.libro.id)}
              >
                Eliminar de Favoritos
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noFavorites}>No tienes libros favoritos aún.</p>
      )}
      <button style={styles.backButton} onClick={() => navigate("/dashboard")}>
        Volver
      </button>
    </div>
  );
};

// Estilos para el diseño oscuro
const styles = {
  container: {
    width: "1300px",
    margin: "100px auto",
    textAlign: "center",
    padding: "60px",
    border: "1px solid #BABAD9",
    borderRadius: "8px",
    backgroundColor: "#121212", // Fondo oscuro
    color: "#FFFFFF", // Texto blanco
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Sombra para el contenedor
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
  },
  bookList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  bookCard: {
    border: "1px solid #BABAD9", // Bordes claros
    borderRadius: "8px",
    padding: "15px",
    textAlign: "left",
    backgroundColor: "#1E1E1E", // Fondo oscuro para la tarjeta
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  bookTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#BFD2DE", // Azul claro para el título del libro
  },
  bookDetails: {
    fontSize: "14px",
    marginBottom: "10px",
    color: "#BABAD9", // Gris claro para los detalles del libro
  },
  removeButton: {
    padding: "10px 15px",
    backgroundColor: "#FF6F61", // Rojo para el botón de eliminar
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background-color 0.3s", // Suavidad al interactuar con el botón
  },
  noFavorites: {
    fontSize: "16px",
    color: "#BABAD9", // Gris claro para el mensaje de no favoritos
  },
  backButton: {
    marginTop: "50px",
    padding: "10px 20px",
    backgroundColor: "#BFD2DE", // Azul claro para el botón de volver
    color: "#121212", // Texto oscuro
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
};

export default FavoritesList;
