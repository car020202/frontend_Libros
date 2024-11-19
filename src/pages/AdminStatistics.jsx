import React, { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import axios from "axios";

const AdminStatistics = () => {
  const [stats, setStats] = useState(null);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get("http://localhost:8080/stats");
      setStats(response.data);
    } catch (err) {
      console.error("Error al cargar estadísticas.", err);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  if (!stats) {
    return <p>Cargando estadísticas...</p>;
  }

  return (
    <div>
      <h1>Estadísticas</h1>
      <div>
        <h2>Libros Más Populares</h2>
        <Bar data={stats.barData} />
      </div>
      <div>
        <h2>Proporción por Género</h2>
        <Pie data={stats.pieData} />
      </div>
      <div>
        <h2>Tendencias de Libros</h2>
        <Line data={stats.lineData} />
      </div>
    </div>
  );
};

export default AdminStatistics;
