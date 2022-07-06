import React, { useContext } from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import Review from "./Review";
import { loadStripe } from "@stripe/stripe-js";
import StoreContext from "../../../../context/storeContext";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentStep = ({
  checkoutToken,
  backStep,
  shippingData,
  onCaptureCheckout,
  nextStep,
}) => {
  const { refreshCart } = useContext(StoreContext);
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;
    const cartElement = elements.getElement(CardElement);

    const { err, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cartElement,
    });

    if (err) {
      console.log("[err]", err);
    } else {
      console.log(
        "🚀 ~ file: PaymentStep.jsx ~ line 66 ~ handleSubmit ~ shippingData",
        checkoutToken
      );
      console.log(
        "🚀 ~ file: PaymentStep.jsx ~ line 66 ~ handleSubmit ~ shippingData",
        shippingData.firstName
      );
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "International",
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "stripe",
          card: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      onCaptureCheckout(checkoutToken.id, orderData);

      refreshCart();

      nextStep();
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={backStep}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentStep;
