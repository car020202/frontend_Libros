import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useNavigate } from "react-router-dom"; // Para manejar la navegación
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminStatistics = () => {
  const [books, setBooks] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook para manejar navegación

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos reales del backend
        const librosResponse = await axios.get("http://localhost:8080/libros/all");
        const preferenciasResponse = await axios.get("http://localhost:8080/preferencias");

        setBooks(librosResponse.data); // Guardar libros
        setPreferences(preferenciasResponse.data); // Guardar preferencias
        setLoading(false); // Desactivar el estado de carga
      } catch (err) {
        console.error("Error al cargar datos del backend:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calcular datos para las gráficas
  const calculateBarData = () => {
    const popularidad = {};
    preferences.forEach((pref) => {
      const libroId = pref.libro.id;
      popularidad[libroId] = (popularidad[libroId] || 0) + 1;
    });

    const librosPopulares = Object.entries(popularidad)
      .map(([id, count]) => ({
        titulo: books.find((libro) => libro.id === parseInt(id))?.titulo || "Desconocido",
        count,
      }))
      .sort((a, b) => b.count - a.count);

    return {
      labels: librosPopulares.map((libro) => libro.titulo),
      datasets: [
        {
          label: "Veces agregado a favoritos",
          data: librosPopulares.map((libro) => libro.count),
          backgroundColor: "#BFD2DE",
        },
      ],
    };
  };

  const calculatePieData = () => {
    const generos = {};
    books.forEach((libro) => {
      generos[libro.genero] = (generos[libro.genero] || 0) + 1;
    });

    return {
      labels: Object.keys(generos),
      datasets: [
        {
          label: "Cantidad de libros por género",
          data: Object.values(generos),
          backgroundColor: ["#FF6F61", "#FFD700", "#BFD2DE", "#121212"],
        },
      ],
    };
  };

  if (loading) {
    return <p>Cargando estadísticas...</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Estadísticas de administración</h1>
      <div style={styles.chartsContainer}>
        <div style={styles.chart}>
          <h2 style={styles.subtitle}>Libros Más Populares</h2>
          <Bar data={calculateBarData()} options={chartOptions} />
        </div>
        <div style={styles.chart}>
          <h2 style={styles.subtitle}>Proporción de Géneros</h2>
          <Pie data={calculatePieData()} options={chartOptions} />
        </div>
      </div>
      <button style={styles.backButton} onClick={() => navigate(-1)}>
        Volver
      </button>
    </div>
  );
};

// Opciones de las gráficas
const chartOptions = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        font: {
          size: 12,
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          size: 10,
        },
      },
    },
    y: {
      ticks: {
        font: {
          size: 10,
        },
      },
    },
  },
};

const styles = {
  container: {
    width: "90%",
    margin: "50px auto",
    textAlign: "center",
    color: "#FFFFFF",
    backgroundColor: "#121212",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: "28px",
    color: "#BFD2DE",
    marginBottom: "20px",
  },
  chartsContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
  },
  chart: {
    flex: "1 1 45%",
    height: "300px",
    maxWidth: "400px",
    margin: "20px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#FFD700",
    marginBottom: "10px",
  },
  backButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#BFD2DE",
    color: "#121212",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
};

export default AdminStatistics;
