import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const BillingInformation = (props) => {
  const { next } = props;

  // Estado local para el tipo de afiliación seleccionado
  const [afiliacion, setAfiliacion] = useState("");

  // Manejar cambio en la selección de afiliación
  const handleAfiliacionChange = (e) => {
    setAfiliacion(e.target.value);
  };

  // afiliaciones basadas en el tipo de afiliación seleccionado
  const afiliaciones = {
    "Particular/oAutoonomo": [
      { value: "opcion1", label: "Opción 1" },
      { value: "opcion3", label: "Opción 3" }
    ],
    "Conrecibodesueldo": [
      { value: "opcionA", label: "Opción A" },
      { value: "opcionB", label: "Opción B" },
      { value: "opcionC", label: "Opción C" }
    ],
    "Monotributista": [
      { value: "A", label: "A " },
      { value: "A exento", label: "A Exento" },
      { value: "B", label: "B" },
      { value: "B Exento", label: "B Exento" },
      { value: "C", label: "C" },
      { value: "D", label: "D" },
      { value: "E", label: "E " },
      { value: "F", label: "F" },
      { value: "G", label: "G" },
      { value: "H", label: "H" },
      { value: "I", label: "I" },
      { value: "J", label: "J" },
      { value: "K", label: "K" }
    ]
  };

  // Renderizado condicional de afiliaciones
  const renderSubOptions = () => {
    if (afiliacion && afiliaciones[afiliacion]) {
      return (
        <Col md={12} className="mb-3">
          <Form.Label>Opciones para {afiliacion.replace(/([A-Z])/g, ' $1').trim()}</Form.Label>
          <Form.Control as="select" id={`subopcion_${afiliacion}`}>
            <option value="">Selecciona una opción</option>
            {afiliaciones[afiliacion].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Control>
        </Col>
      );
    }
    return null;
  };

  return (
    <Form>
      <div className="bs-stepper-content">
        <div role="tabpanel" className="bs-stepper-pane active dstepper-block">
          <Row className="gx-3">
          <h3>Detalle de la Cotización</h3>
            <Col md={4} className="mb-3">
              {/* First Name */}
              <Form.Label htmlFor="firstname">Nro de Póliza</Form.Label>
              <Form.Control
                type="text"
                id="nPoliza"
                placeholder="Número de póliza"
              />
            </Col>
			<Col md={4} className="mb-3">
              {/* Edad */}
              <Form.Label htmlFor="Localiad">Plan</Form.Label>
              <Form.Control as="select" id="plan_lead">
			  <option value="">Plan?</option>
            						<option value="ZIPPER">ZIPPER</option>
            						<option value="CLASSIC X">CLASSIC X</option>
            						<option value="OXFORD">OXFORD</option>
            						<option value="FIT">FIT</option>
            						<option value="CUSTOM">CUSTOM</option>
            						<option value="TAYLORED">TAYLORED</option>
            						<option value="WAGON">WAGON</option>
            						<option value="COBER X">COBER X</option>
            						<option value="" disabled="">---------------</option>
            						<option value="BASICO">BASICO</option>
            						<option value="CLASSIC">CLASSIC</option>
            						<option value="CMVL100">CMVL100</option>
            						<option value="CMVL100P">CMVL100P</option>
            						<option value="CMVL50">CMVL50</option>
            						<option value="CMVL5P">CMVL5P</option>
            						<option value="CMVLB1">CMVLB1</option>
            						<option value="CMVLB2">CMVLB2</option>
            						<option value="CMVLB3">CMVLB3</option>
            						<option value="CMVLB4">CMVLB4</option>
            						<option value="CMVLB7">CMVLB7</option>
            						<option value="CMVLPM">CMVLDO</option>
            						<option value="">CMVLPM</option>
            						<option value="DORADO">DORADO</option>
            						<option value="FAMILIAS">FAMILIAS</option>
            						<option value="GLOBAL">GLOBAL</option>
            						<option value="GLOBAL D">GLOBAL D</option>
            						<option value="GLOBAL II">GLOBAL II</option>
            						<option value="GLOBAL IV">GLOBAL IV</option>
            						<option value="INTEGRAL">GLOBAL V</option>
            						<option value="">INTEGRAL</option>
            						<option value="INTEGRAL PLUS">INTEGRAL PLUS</option>
            						<option value="LINEA 1000">LINEA 1000</option>
            						<option value="LINEA 2000">LINEA 2000</option>
            						<option value="MAYOR">MAYOR</option>
            						<option value="MEDICOS">MEDICOS</option>
            						<option value="OSPAT">OSPAT</option>
            						<option value="PMO">PMO</option>    				
              </Form.Control>
            </Col>
			<Col md={4} className="mb-3">
              {/* First Name */}
              <Form.Label htmlFor="firstname">Costo $</Form.Label>
              <Form.Control
                type="text"
                id="costo_plan_lead"
                placeholder=""
              />
            </Col>
            <Col md={4} className="mb-3">
              {/* First Name */}
              <Form.Label htmlFor="firstname">Promoción Vigente %</Form.Label>
              <Form.Control
                type="text"
                id="Promovigente"
                placeholder="Promo"
              />
            </Col>
			
            <div className="mb-5">
              <h3 className="mb-1">Datos Personales del Titular</h3>
            </div>
            <Col md={6} className="mb-3">
              {/* Last Name */}
              <Form.Label htmlFor="lastName">Nombre Y Apellido</Form.Label>
              <Form.Control
                type="text"
                id="nombreTit"
                placeholder="Ingresar nombre y apellido"
              />
            </Col>
            <Col md={6} className="mb-3">
              {/* Email */}
              <Form.Label htmlFor="number">Dni / CUIL</Form.Label>
              <Form.Control
                type="email"
                id="dniTit"
                placeholder="Sin espacios, puntos o guiones"
              />
            </Col>
            <Col md={6} className="mb-3">
              {/* Edad */}
              <Form.Label htmlFor="age">Edad</Form.Label>
              <Form.Control as="select" id="edad_tit">
                <option value="">Seleccione la edad</option>
                <option value="1">1 Año</option>
                <option value="2">2 Años</option>
                <option value="3">3 Años</option>
                <option value="4">4 Años</option>
                <option value="5">5 Años</option>
                <option value="6">6 Años</option>
                <option value="7">7 Años</option>
                <option value="8">8 Años</option>
                <option value="9">9 Años</option>
                <option value="10">10 Años</option>
                <option value="11">11 Años</option>
                <option value="12">12 Años</option>
                <option value="13">13 Años</option>
                <option value="14">14 Años</option>
                <option value="15">15 Años</option>
                <option value="16">16 Años</option>
                <option value="17">17 Años</option>
                <option value="18">18 Años</option>
                <option value="19">19 Años</option>
                <option value="20">20 Años</option>
                <option value="21">21 Años</option>
                <option value="22">22 Años</option>
                <option value="23">23 Años</option>
                <option value="24">24 Años</option>
                <option value="25">25 Años</option>
                <option value="26">26 Años</option>
                <option value="27">27 Años</option>
                <option value="28">28 Años</option>
                <option value="29">29 Años</option>
                <option value="30">30 Años</option>
                <option value="31">31 Años</option>
                <option value="32">32 Años</option>
                <option value="33">33 Años</option>
                <option value="34">34 Años</option>
                <option value="35">35 Años</option>
                <option value="36">36 Años</option>
                <option value="37">37 Años</option>
                <option value="38">38 Años</option>
                <option value="39">39 Años</option>
                <option value="40">40 Años</option>
                <option value="41">41 Años</option>
                <option value="42">42 Años</option>
                <option value="43">43 Años</option>
                <option value="44">44 Años</option>
                <option value="45">45 Años</option>
                <option value="46">46 Años</option>
                <option value="47">47 Años</option>
                <option value="48">48 Años</option>
                <option value="49">49 Años</option>
                <option value="50">50 Años</option>
                <option value="51">51 Años</option>
                <option value="52">52 Años</option>
                <option value="53">53 Años</option>
                <option value="54">54 Años</option>
                <option value="55">55 Años</option>
                <option value="56">56 Años</option>
                <option value="57">57 Años</option>
                <option value="58">58 Años</option>
                <option value="59">59 Años</option>
                <option value="60">60 Años</option>
                <option value="61">61 Años</option>
                <option value="62">62 Años</option>
                <option value="63">63 Años</option>
                <option value="64">64 Años</option>
                <option value="65">65 Años</option>
              </Form.Control>
            </Col>
            <Col md={6} className="mb-3">
              {/* Fecha de Nacimiento */}
              <Form.Label htmlFor="birthDate">Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                id="fNacTit"
                placeholder="Seleccione una fecha"
              />
            </Col>

            <Col md={6} className="mb-3">
              {/* Edad */}
              <Form.Label htmlFor="promotions">Promociones</Form.Label>
              <Form.Control as="select" id="promo_tit">
                <option value="">Sin Promo </option>
              </Form.Control>
            </Col>
        
			<Col md={6} className="mb-3">
  {/* Selección de género */}
  <Form.Label>Sexo (según DNI)
  </Form.Label>
    <Form.Check 
      type="radio" 
      id="sexotit_hombre"
      label="Hombre" 
      name="genero"
      value="hombre"
    />
    <Form.Check 
      type="radio" 
      id="sexotit_mujer"
      label="Mujer" 
      name="genero"
      value="mujer"
    />
</Col>
<Col md={4} className="mb-3">
              {/* Last Name */}
              <Form.Label htmlFor="lastName">Email</Form.Label>
              <Form.Control
                type="text"
                id="correoTit"
                placeholder="Ingresar correo"
              />
            </Col>

            <Col md={4} className="mb-3">
              {/* Last Name */}
              <Form.Label htmlFor="lastName">Teléfono</Form.Label>
              <Form.Control
                type="text"
                id="tel"
                placeholder="Ingresar correo"
              />
            </Col>
			<Col md={4} className="mb-3">
              {/* Last Name */}
              <Form.Label htmlFor="lastName">Celular</Form.Label>
              <Form.Control
                type="text"
                id="cel"
                placeholder="Ingresar numero de celular"
              />
            </Col>

		



			<Row className="mb-3">
  <Col xs={3}>
    <Form.Label htmlFor="address">Dirección</Form.Label>
    <Form.Control
      type="text"
      placeholder="Ingresar dirección"
      id="calle"
    />
  </Col>

  <Col xs={3}>
    <Form.Label htmlFor="town">Número</Form.Label>
    <Form.Control
      type="text"
      placeholder=""
      id="nro"
    />
  </Col>

  <Col xs={3}>
    <Form.Label htmlFor="state">Piso</Form.Label>
    <Form.Control
      type="text"
      placeholder=""
      id="piso"
    />
  </Col>

  <Col xs={3}>
    <Form.Label htmlFor="zip">Depto</Form.Label>
    <Form.Control
      type="text"
      placeholder="Ingresar código postal"
      id="dpto"
    />
  </Col>
</Row>


        	<Col md={6} className="mb-3">
              {/* Edad */}
              <Form.Label htmlFor="Localiad">Localidad</Form.Label>
              <Form.Control as="select" id="loc">
			  <option value="">Selecciona el partido</option>
                <option value="CABA">CABA</option>
                <option value="Almirante Brown">Almirante Brown</option>
                <option value="Avellaneda">Avellaneda</option>
                <option value="Berazategui">Berazategui</option>
                <option value="Esteban Echeverría">Esteban Echeverría</option>
                <option value="Ezeiza">Ezeiza</option>
                <option value="Florencio Varela">Florencio Varela</option>
                <option value="General San Martín">General San Martín</option>
                <option value="Hurlingham">Hurlingham</option>
                <option value="Ituzaingó">Ituzaingó</option>
                <option value="José C. Paz">José C. Paz</option>
                <option value="La Matanza">La Matanza</option>
                <option value="Lanús">Lanús</option>
                <option value="Lomas de Zamora">Lomas de Zamora</option>
                <option value="Malvinas Argentinas">Malvinas Argentinas</option>
                <option value="Merlo">Merlo</option>
                <option value="Moreno">Moreno</option>
                <option value="Morón">Morón</option>
                <option value="Quilmes">Quilmes</option>
                <option value="San Fernando">San Fernando</option>
                <option value="San Isidro">San Isidro</option>
                <option value="San Miguel">San Miguel</option>
                <option value="Tigre">Tigre</option>
                <option value="Tres de Febrero">Tres de Febrero</option>
                <option value="Vicente López">Vicente López</option>
                <option value="Otra">Otra</option>
              </Form.Control>
            </Col>
			<Col md={6} className="mb-3">
              {/* First Name */}
              <Form.Label htmlFor="firstname">Cód.Postal</Form.Label>
              <Form.Control
                type="text"
                id="codpostal"
                placeholder="Número de póliza"
              />
            </Col>
            {/* Campo para seleccionar el tipo de afiliación */}
            <Col md={15} className="mb-6 mt-5">
              <Form.Label htmlFor="afiliacion">Tipo de Afiliación</Form.Label>
              <Form.Control
                as="select"
                id="afiliacion"
                className="select-center"
                value={afiliacion}
                onChange={handleAfiliacionChange}
              >
                <option value="">Selecciona el tipo de afiliación</option>
                <option value="Particular/oAutoonomo">Particular / Autónomo</option>
                <option value="Conrecibodesueldo">Con Recibo de Sueldo</option>
                <option value="Monotributista">Monotributista</option>
              </Form.Control>
            </Col>

            {/* afiliaciones dinámicas */}
            {renderSubOptions()}
          </Row>

          {/* Botón para avanzar */}
          <div className="d-flex justify-content-end">
            <Button variant="primary" onClick={next}>
              Avanzar a "Declaración Jurada de Salud"
              <i className="fe fe-shopping-bag ms-1"></i>
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default BillingInformation;
