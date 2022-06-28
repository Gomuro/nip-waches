import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    // maxWidth: 345, original width style
    maxWidth: "100%",
    height: "900px",
  },
  media: {
    width: "100%",
    height: "400px",
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cardContent: {
    padding: "15px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px",
  },
  btnGroup: {
    display: "flex",
  },
}));
