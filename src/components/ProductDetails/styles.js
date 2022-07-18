import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  container: {
    marginTop: "100px",
  },
  content: {
    maxWidth: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    padding: "10px 300px",
    maxWidth: "100%",
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
