import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAuth } from "../authentication/AuthContext";
import CustomToast from "../authentication/Toast";
import Logo from "../../../assets/images/logo-cober.svg";

const ProspectForm = ({ show, handleClose }) => {
  const { userData } = useAuth(); // Obtener userData desde el contexto
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [tAfiliacion, setTAfiliacion] = useState("");
  const [gpFamiliar, setGpFamiliar] = useState("");
  const [cel, setCel] = useState("");
  const [correo, setCorreo] = useState("");
  const [partido, setPartido] = useState("");
  const [estado, setEstado] = useState("");
  const [asignarVendedor, setAsignarVendedor] = useState(false); // Estado para el checkbox
  const [toastShow, setToastShow] = useState(false); // Estado para mostrar el Toast
  const [toastMessage, setToastMessage] = useState(""); // Mensaje del Toast
  const [toastTitle, setToastTitle] = useState(""); // Título del Toast
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar el loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Activar el estado de loading

    // Limpiar el valor de gpFamiliar (eliminar comas y el símbolo $) antes de enviarlo
    const gpFamiliarClean = gpFamiliar.replace(/[^0-9]/g, "");

    // Verifica si el campo "partido" (CUIT) está vacío
    const cuit = partido.trim() === "" ? "Sin Cuit" : partido;

    // Realiza la petición fetch
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyad5ToIenPBP915Txy3Moxe4M8_clx8BpIPjqpsgbpFlm8zseEA4_B9Fnn97krb6iREg/exec?func=añadirDato",
        {
          method: "POST",
          body: JSON.stringify({
            nombre,
            edad,
            tAfiliacion,
            gpFamiliar: gpFamiliarClean, // Enviar el valor limpio (sin comas ni $)
            cel,
            correo,
            partido: cuit, // Usamos la variable "cuit" que maneja el valor vacío
            estado,
            vendedor: asignarVendedor ? userData?.vendedor : null // Envío del vendedor desde userData si se selecciona el checkbox
          })
        }
      );

      // Maneja la respuesta
      if (response.ok) {
        const resultado = await response.json();
        setToastTitle("Prospecto Creado");
        setToastMessage(
          "Datos enviados correctamente: " + JSON.stringify(resultado)
        );
        setToastShow(true); // Mostrar el Toast
        handleClose(); // Cierra el modal
      } else {
        setToastTitle("Error");
        setToastMessage(
          "Error al enviar los datos: " +
            response.status +
            " " +
            response.statusText
        );
        setToastShow(true); // Mostrar el Toast
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setToastTitle("Error");
      setToastMessage(
        "Error al enviar los datos. Por favor, intenta nuevamente."
      );
      setToastShow(true); // Mostrar el Toast
    } finally {
      setIsLoading(false); // Desactivar el estado de loading, independientemente del resultado
    }
  };

  const isAlphabets = (str) => /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(str);
  const isValidCel = (cel) => /^\d{10}$/.test(cel); // Suponiendo que el celular debe tener 10 dígitos
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Función para formatear el valor de gpFamiliar
  const formatGpFamiliar = (value) => {
    // Eliminar cualquier carácter que no sea un número
    const rawValue = value.replace(/\D/g, '');
  
    // Determinar la posición de la coma según la longitud del valor
    let formattedValue = rawValue;
    if (rawValue.length === 4) {
      formattedValue = `${rawValue.slice(0, 1)},${rawValue.slice(1)}`; // Coma delante del primer número
    } else if (rawValue.length === 5) {
      formattedValue = `${rawValue.slice(0, 2)},${rawValue.slice(2)}`; // Coma después del segundo número
    } else if (rawValue.length === 6) {
      formattedValue = `${rawValue.slice(0, 3)},${rawValue.slice(3)}`; // Coma después del tercer número
    } else if (rawValue.length === 7) {
      formattedValue = `${rawValue.slice(0, 1)},${rawValue.slice(1)}`; // Coma delante del primer número
    }
  
    // Agregar el símbolo $ al final
    return formattedValue === "" ? "" : `${formattedValue}$`;
  };
  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Razón Social </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombre">
              <Form.Label style={{ marginTop: "1rem" }}>Razón Social</Form.Label>
              <Form.Control
                type="text"
                placeholder="Razón Social"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                isInvalid={!isAlphabets(nombre) && nombre.length > 0}
              />
              <Form.Control.Feedback type="invalid">
                Solo se permiten caracteres alfabéticos.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="tAfiliacion">
              <Form.Label style={{ marginTop: "1rem" }}>
                Nombre de Contacto
              </Form.Label>
              <Form.Control
                type="text"
                value={tAfiliacion}
                onChange={(e) => setTAfiliacion(e.target.value)}
                required
                placeholder="Ingrese el Nombre de Contacto"
              />
            </Form.Group>
            <Form.Group controlId="edad">
              <Form.Label style={{ marginTop: "1rem" }}>Cápitas</Form.Label>
              <Form.Control
                type="number"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                required
                placeholder="Ingrese la cantidad de cápitas"
              />
            </Form.Group>
            <Form.Group controlId="gpFamiliar">
              <Form.Label style={{ marginTop: "1rem" }}>Cotización</Form.Label>
              <Form.Control
                type="text"
                value={gpFamiliar}
                onChange={(e) => setGpFamiliar(formatGpFamiliar(e.target.value))}
                required
                placeholder="Ingrese la cotización"
              />
            </Form.Group>
            <Form.Group controlId="cel">
              <Form.Label style={{ marginTop: "1rem" }}>Celular</Form.Label>
              <Form.Control
                type="text"
                placeholder="Celular"
                value={cel}
                onChange={(e) => setCel(e.target.value)}
                required
                isInvalid={!isValidCel(cel) && cel.length > 0}
              />
              <Form.Control.Feedback type="invalid">
                Debe ser un número de 10 dígitos.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="correo">
              <Form.Label style={{ marginTop: "1rem" }}>Correo</Form.Label>
              <Form.Control
                type="email"
                placeholder="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
                isInvalid={!isValidEmail(correo) && correo.length > 0}
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingresa un correo válido.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="partido">
              <Form.Label style={{ marginTop: "1rem" }}>CUIT</Form.Label>
              <Form.Control
                type="number"
                value={partido}
                onChange={(e) => setPartido(e.target.value)}
                placeholder="Ingrese su CUIT"
                minLength={11}
                maxLength={11}
              />
            </Form.Group>
            <Form.Group controlId="vendedor">
              <Form.Check
                type="checkbox"
                label="Autoasignar vendedor?"
                checked={asignarVendedor}
                onChange={(e) => setAsignarVendedor(e.target.checked)}
              />
            </Form.Group>
            <Form.Group controlId="estado">
              <Form.Label style={{ marginTop: "1rem" }}>Estado</Form.Label>
              <Form.Control
                as="select"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                required
              >
                <option value="">Selecciona un estado</option>
                <option value="Lead"> Lead </option>
                <option value="Primercontacto">1º Contacto</option>
                <option value="Enproceso">En Proceso</option>
                <option value="Calificadocotizacion">Calificado Cotización</option>
                <option value="Ganado">Ganado</option>
                <option value="Perdido">Perdido</option>
                <option value="Pruebainterna">Prueba interna</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Guardar Prospecto"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Componente Toast */}
      <CustomToast
        show={toastShow}
        onClose={() => setToastShow(false)}
        message={toastMessage}
        title={toastTitle}
      />
    </>
  );
};

export default ProspectForm;