import {
  Button,
  CircularProgress,
  Divider,
  Link,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import StoreContext from "../../../../context/storeContext";
import useStyles from "./styles";

const Confirmation = () => {
  const classes = useStyles();
  const { order } = useContext(StoreContext);
  order.customer ? (
    <>
      <div>
        <Typography variant="h5">
          Thank you for your purchase, {order.customer.firstname}{" "}
          {order.customer.lastname}!
        </Typography>
        <Divider />
        <Typography variant="subtitle2">
          Order ref: {order.customer_reference}
        </Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">
        Back to home
      </Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  );
};
export default Confirmation;
