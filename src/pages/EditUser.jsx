import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
    const [user, setUser] = useState({
        nombre: "",
        apellido: "",
        email: "",
        estado: "activo", // Estado predeterminado
        clave: "",
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); // Obtener el ID desde la URL
    const navigate = useNavigate();

    // Obtener los datos del usuario por ID
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/auth/user/${id}`);

                setUser(response.data); // Actualiza el estado con los datos del usuario
                setLoading(false); // Desactivar estado de carga
            } catch (err) {
                console.error("Error al cargar los datos del usuario", err);
                setError("Error al cargar los datos del usuario.");
                setLoading(false); // Desactivar estado de carga en caso de error
            }
        };

        if (id) fetchUser(); // Solo llamar si 'id' está disponible
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    // Función para actualizar el usuario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/auth/user/${id}`, user);
            alert("Usuario actualizado exitosamente.");
            navigate("/admin/users"); // Volver a la página de gestión de usuarios
        } catch (err) {
            setError("Error al actualizar el usuario.");
        }
    };

    if (loading) {
        return <p>Cargando datos...</p>; // Muestra el mensaje mientras se cargan los datos
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Editar Usuario</h1>
            {error && <p style={styles.error}>{error}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label htmlFor="nombre" style={styles.label}>Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={user.nombre}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="apellido" style={styles.label}>Apellido:</label>
                    <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        value={user.apellido}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="email" style={styles.label}>Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="clave" style={styles.label}>Contraseña:</label>
                    <input
                        type="password"
                        id="clave"
                        name="clave"
                        value={user.clave}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="estado" style={styles.label}>Estado:</label>
                    <select
                        id="estado"
                        name="estado"
                        value={user.estado}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    >
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                        <option value="incapacitado">Incapacitado</option>
                        <option value="despedido">Despedido</option>
                        <option value="renuncio">Renunció</option>
                    </select>
                </div>
                <button type="submit" style={styles.button}>Actualizar Usuario</button>
            </form>

            <button style={styles.backButton} onClick={() => navigate("/admin/users")}>
                Volver
            </button>
        </div>
    );
};

// Estilos
const styles = {
    container: {
        width: "600px",
        margin: "100px auto",
        padding: "40px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#121212",
        color: "#fff",
        textAlign: "center",
    },
    title: {
        fontSize: "24px",
        color: "#BFD2DE",
        marginBottom: "20px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    inputGroup: {
        marginBottom: "15px",
    },
    label: {
        display: "block",
        marginBottom: "5px",
    },
    input: {
        padding: "10px",
        width: "100%",
        borderRadius: "4px",
        backgroundColor: "#1E1E1E",
        color: "#FFFFFF",
        fontSize: "16px",
    },
    button: {
        padding: "12px",
        backgroundColor: "#BFD2DE",
        color: "#121212",
        border: "none",
        borderRadius: "5px",
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
    error: {
        color: "red",
    },
};

export default EditUser;
