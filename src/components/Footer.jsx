import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        Desarrolladores: <strong>Jose Luis Calderon Cortez (Kruma)</strong> y{" "}
        <strong>Carlos Antonio Yanez Delgado (Cafe-kun)</strong>
      </p>
      <p style={styles.text}>© 2024 Todos los derechos reservados.</p>
    </footer>
  );
};

// Estilos
const styles = {
  footer: {
    backgroundColor: "#121212", // Fondo oscuro
    color: "#FFFFFF", // Texto blanco
    padding: "20px",
    textAlign: "center",
    borderTop: "1px solid #BABAD9", // Línea superior clara
  },
  text: {
    margin: "5px 0",
    fontSize: "16px",
    color: "#BFD2DE", // Azul claro
  },
};

export default Footer;
