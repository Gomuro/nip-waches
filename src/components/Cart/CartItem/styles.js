import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  textField: {
    maxWidth: "30%",
  },
  media: {
    height: 260,
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  cartActions: {
    justifyContent: "space-between",
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    maxWidth: "100%",
  },
}));
