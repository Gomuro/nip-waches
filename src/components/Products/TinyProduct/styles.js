import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    maxWidth: "60%",
    height: "100%",
    borderRadius: "5px",
    boxShadow: "0 4px 6px 0 rgba(0, 0, 0, 0.2)",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    padding: "5px 10px",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  iconButton: {
    backgroundColor: "white",
    color: "green",
    "&:hover": {
      backgroundColor: "green",
      color: "white",
    },
  },
}));
