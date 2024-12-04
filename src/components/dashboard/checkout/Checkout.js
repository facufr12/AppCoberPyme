import { useState } from 'react';
import { Col, Row, Breadcrumb, Button } from 'react-bootstrap';
import { FaUser, FaClipboardCheck, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

// Importa sub componentes (Steps)
import BillingInformation from './steps/BillingInformation';
import PaymentSelection from './steps/PaymentSelection';
import ShippingInformation from './steps/ShippingInformation';
import OrderSummary from './OrderSummary';

// Importa componentes personalizados
import GKStepper3 from 'components/elements/stepper/GKStepper3';

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState();
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
    console.log(formData);
  };

  const next = () => {
    setCurrentStep(currentStep === 3 ? 1 : currentStep + 1);
  };

  const previous = () => {
    setCurrentStep(currentStep === 1 ? 1 : currentStep - 1);
  };

  const handleBack = () => {
    navigate('/user/instructor'); // Redirige al hacer clic en el botón
  };

  const steps = [
    {
      id: 1,
      title: 'Datos de Afiliación',
      icon: <FaUser />,
      content: (
        <BillingInformation data={formData} handleChange={handleChange} next={next} />
      )
    },
    {
      id: 2,
      title: 'Declaración Jurada de Salud',
      icon: <FaClipboardCheck />,
      content: (
        <ShippingInformation
          data={formData}
          handleChange={handleChange}
          next={next}
          previous={previous}
        />
      )
    },
    {
      id: 3,
      title: 'Confirmación',
      icon: <FaCheckCircle />,
      content: (
        <PaymentSelection
          data={formData}
          handleChange={handleChange}
          next={next}
          previous={previous}
        />
      )
    }
  ];

  return (
    <div>
      <Row>
        <Col lg={12} md={12} xs={12}>
          <div className="border-bottom pb-3 mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2 mb-lg-0">
              <h1 className="mb-0 h2 fw-bold"> Crear Póliza </h1>
              <Button onClick={handleBack} variant="primary">Ir A Prospectos</Button>
            </div>
            <Breadcrumb>
              <Breadcrumb.Item active>Póliza</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={7} xl={8}>
          <div id="stepperForm" className="bs-stepper">
            <Row>
              <div>
                <GKStepper3 currentStep={currentStep} steps={steps} />
              </div>
            </Row>
          </div>
        </Col>
        <Col xl={4} lg={5}>
          <OrderSummary />
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
