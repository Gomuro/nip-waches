import React, { useEffect, useState } from "react";
import useStyles from "./styles.js";
import {
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import AdressingStep from "./Steps/AdressingStep/AdressingStep";
import PaymentStep from "./Steps/PaymentStep/PaymentStep";
import Confirmation from "./Steps/Confirmation/Confirmation";
import { commerce } from "../../lib/commerce";

const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  const navigate = useNavigate();

  const Form = () =>
    activeStep === 0 ? (
      <AdressingStep checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentStep />
    );

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: "cart",
          });

          setCheckoutToken(token);
        } catch {
          if (activeStep !== steps.length) navigate.push("/");
        }
      };

      generateToken();
    }
  }, [cart]);

  const nextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const next = (data) => {
    setShippingData(data);

    nextStep();
  };
  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
