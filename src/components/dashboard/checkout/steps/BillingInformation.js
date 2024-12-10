import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const BillingInformation = (props) => {
  const { next } = props;

  const [afiliacion, setAfiliacion] = useState("");
  const [familiares, setFamiliares] = useState([]);

  const handleAfiliacionChange = (e) => {
    setAfiliacion(e.target.value);
  };

  const handleAddFamiliar = () => {
    setFamiliares([...familiares, { tipo: "", nombre: "", dni: "", edad: "", fechaNacimiento: "", camposAdicionales: null }]);
  };

  const handleRemoveFamiliar = (index) => {
    const updatedFamiliares = familiares.filter((_, i) => i !== index);
    setFamiliares(updatedFamiliares);
  };

  const handleFamiliarChange = (index, field, value) => {
    const updatedFamiliares = [...familiares];
    updatedFamiliares[index][field] = value;
    setFamiliares(updatedFamiliares);
  };

  const afiliaciones = {
    "Particular/oAutoonomo": [
      { value: "Autónomo", label: "Autónomo" },
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

  const handleTipoFamiliarChange = (index, tipo) => {
    const updatedFamiliares = [...familiares];
    updatedFamiliares[index].tipo = tipo;
    updatedFamiliares[index].camposAdicionales = tipo === "Pareja" ? "pareja" :
                                                   tipo === "Hijo/a" ? "hijo" : "familiarACargo";
    setFamiliares(updatedFamiliares);
  };

  const renderCamposAdicionales = (index) => {
    const familiar = familiares[index];

    if (familiar.camposAdicionales === "pareja") {
      return (
        <>
          <Col md={4}>
            <Form.Label>Nombre y Apellido</Form.Label>
            <Form.Control
              type="text"
              value={familiar.nombre}
              onChange={(e) => handleFamiliarChange(index, "nombre", e.target.value)}
              placeholder="Nombre y apellido de la pareja"
            />
          </Col>
          <Col md={4}>
            <Form.Label>DNI</Form.Label>
            <Form.Control
              type="text"
              value={familiar.dni}
              onChange={(e) => handleFamiliarChange(index, "dni", e.target.value)}
              placeholder="DNI de la pareja"
            />
          </Col>
          <Col md={4}>
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="number"
              value={familiar.edad}
              onChange={(e) => handleFamiliarChange(index, "edad", e.target.value)}
              placeholder="Edad de la pareja"
            />
          </Col>
        </>
      );
    }

    if (familiar.camposAdicionales === "hijo") {
      return (
        <>
          <Col md={4}>
            <Form.Label>Nombre y Apellido</Form.Label>
            <Form.Control
              type="text"
              value={familiar.nombre}
              onChange={(e) => handleFamiliarChange(index, "nombre", e.target.value)}
              placeholder="Nombre y apellido del hijo/a"
            />
          </Col>
          <Col md={4}>
            <Form.Label>DNI</Form.Label>
            <Form.Control
              type="text"
              value={familiar.dni}
              onChange={(e) => handleFamiliarChange(index, "dni", e.target.value)}
              placeholder="DNI del hijo/a"
            />
          </Col>
          <Col md={4}>
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              value={familiar.fechaNacimiento}
              onChange={(e) => handleFamiliarChange(index, "fechaNacimiento", e.target.value)}
            />
          </Col>
        </>
      );
    }

    if (familiar.camposAdicionales === "familiarACargo") {
      return (
        <>
          <Col md={4}>
            <Form.Label>Nombre y Apellido</Form.Label>
            <Form.Control
              type="text"
              value={familiar.nombre}
              onChange={(e) => handleFamiliarChange(index, "nombre", e.target.value)}
              placeholder="Nombre y apellido del familiar a cargo"
            />
          </Col>
          <Col md={4}>
            <Form.Label>DNI</Form.Label>
            <Form.Control
              type="text"
              value={familiar.dni}
              onChange={(e) => handleFamiliarChange(index, "dni", e.target.value)}
              placeholder="DNI del familiar a cargo"
            />
          </Col>
          <Col md={4}>
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="number"
              value={familiar.edad}
              onChange={(e) => handleFamiliarChange(index, "edad", e.target.value)}
              placeholder="Edad del familiar a cargo"
            />
          </Col>
        </>
      );
    }

    return null;
  };

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
              <Form.Label htmlFor="nPoliza">Nro de Póliza</Form.Label>
              <Form.Control
                type="text"
                id="nPoliza"
                placeholder="Número de póliza"
              />
            </Col>
            <Col md={4} className="mb-3">
              <Form.Label htmlFor="plan_lead">Plan</Form.Label>
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
                <option value="CMVLPM">CMVLPM</option>
                <option value="DORADO">DORADO</option>
                <option value="FAMILIAS">FAMILIAS</option>
                <option value="GLOBAL">GLOBAL</option>
                <option value="GLOBAL D">GLOBAL D</option>
                <option value="GLOBAL II">GLOBAL II</option>
                <option value="GLOBAL IV">GLOBAL IV</option>
                <option value="INTEGRAL">GLOBAL V</option>
                <option value="INTEGRAL">INTEGRAL</option>
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
              <Form.Label htmlFor="costo_plan_lead">Costo $</Form.Label>
              <Form.Control
                type="text"
                id="costo_plan_lead"
                placeholder=""
              />
            </Col>
            <Col md={4} className="mb-3">
              <Form.Label htmlFor="Promovigente">Promoción Vigente %</Form.Label>
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
              <Form.Label htmlFor="nombreTit">Nombre Y Apellido</Form.Label>
              <Form.Control
                type="text"
                id="nombreTit"
                placeholder="Ingresar nombre y apellido"
              />
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label htmlFor="dniTit">Dni / CUIL</Form.Label>
              <Form.Control
                type="text"
                id="dniTit"
                placeholder="Sin espacios, puntos o guiones"
              />
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label htmlFor="edad_tit">Edad</Form.Label>
              <Form.Control as="select" id="edad_tit">
                <option value="">Seleccione la edad</option>
                {[...Array(66).keys()].map(age => (
                  <option key={age} value={age}>{age} Años</option>
                ))}
              </Form.Control>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label htmlFor="fNacTit">Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                id="fNacTit"
                placeholder="Seleccione una fecha"
              />
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label htmlFor="promo_tit">Promociones</Form.Label>
              <Form.Control as="select" id="promo_tit">
                <option value="">Sin Promo </option>
              </Form.Control>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label>Sexo (según DNI)</Form.Label>
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
              <Form.Label htmlFor="correoTit">Email</Form.Label>
              <Form.Control
                type="text"
                id="correoTit"
                placeholder="Ingresar correo"
              />
            </Col>
            <Col md={4} className="mb-3">
              <Form.Label htmlFor="tel">Teléfono</Form.Label>
              <Form.Control
                type="text"
                id="tel"
                placeholder="Ingresar número de teléfono"
              />
            </Col>
            <Col md={4} className="mb-3">
              <Form.Label htmlFor="cel">Celular</Form.Label>
              <Form.Control
                type="text"
                id="cel"
                placeholder="Ingresar número de celular"
              />
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label htmlFor="loc">Localidad</Form.Label>
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
              <Form.Label htmlFor="calle">Calle</Form.Label>
              <Form.Control
                type="text"
                id="calle"
                placeholder="Calle"
              />
            </Col>
            <Row className="mb-3">
              <Col xs={3}>
                <Form.Label htmlFor="calle">Cód Postal</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar CP"
                  id="Cpostal"
                />
              </Col>
              <Col xs={3}>
                <Form.Label htmlFor="nro">Número</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  id="nro"
                />
              </Col>
              <Col xs={3}>
                <Form.Label htmlFor="piso">Piso</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  id="piso"
                />
              </Col>
              <Col xs={3}>
                <Form.Label htmlFor="dpto">Depto</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar departamento"
                  id="dpto"
                />
              </Col>
            </Row>
          
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
                <option value="Conrecibodesueldo"> Con Recibo de Sueldo</option>
                <option value="Monotributista">Monotributista</option>
              </Form.Control>
            </Col>
      
            <div className="mt-4">
  <h4 className="mt-3">Familiares Agregados</h4>
  {familiares.map((familiar, index) => (
    <div key={index} className="border p-3 mb-2">
      <Row>
        <Col md={4}>
          <Form.Label>Tipo de Familiar</Form.Label>
          <Form.Control
            as="select"
            value={familiar.tipo}
            onChange={(e) => handleTipoFamiliarChange(index, e.target.value)}
          >
            <option value="">Seleccione</option>
            <option value="Pareja">Pareja / Cónyuge</option>
            <option value="Hijo/a">Hijo/a</option>
            <option value="Familiar a cargo">Familiar a cargo</option>
          </Form.Control>
        </Col>
        {familiar.tipo && renderCamposAdicionales(index)}
        <Col md={4}>
          <Button
            variant="danger"
            onClick={() => handleRemoveFamiliar(index)}
            style={{ marginTop: "25px" }}
          >
            Eliminar
          </Button>
        </Col>
      </Row>
    </div>
  ))}
  <Button variant="primary" onClick={handleAddFamiliar} className="mt-3">
    Agregar Familiar
  </Button>
</div>

            <div className="d-flex justify-content-end mt-5">
              <Button variant="primary" onClick={next}>
                Avanzar a "Declaración Jurada de Salud"
                <i className="fe fe-shopping-bag ms-1"></i>
              </Button>
            </div>
          </Row>
        </div>
      </div>
    </Form>
  );
};

export default BillingInformation;