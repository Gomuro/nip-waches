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
    padding: "0px 250px",
  },
  tinyMedia: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    padding: "100px 100px",

    "&:hover": {
      opacity: 0.9,
    },
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
