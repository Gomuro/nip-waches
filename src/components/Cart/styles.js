import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: { marginTop: "100px" },
  title: {},
  itemsContainer: {
    justifyContent: "space-between",
  },
  emptyButton: {
    minWidth: "150px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "5px",
    },
    [theme.breakpoints.up("xs")]: {
      marginRight: "20px",
    },
  },
  checkoutButton: {
    minWidth: "150px",
  },
  cardDetails: {
    display: "flex",
    marginTop: "10%",
    width: "100%",
    justifyContent: "space-between",
  },
}));
