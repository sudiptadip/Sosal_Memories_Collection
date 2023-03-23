import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theame) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: "1rem",
    display: "flex",
    padding: "16px",
  },
  pagination: {
    borderRadius: 4,
    marginTop: "1rem",
    padding: "16px",
  },
  gridContainer: {
    [theame.breakpoints.down("xs")]: {
        flexDirection: "column-reverse",
    },
  }
  
}));
