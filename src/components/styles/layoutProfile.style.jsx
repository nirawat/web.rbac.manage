import { makeStyles } from "@material-ui/core/styles";

const LayoutProfileStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  card: {
    width: 300,
  },
  media: {
    height: 130,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default LayoutProfileStyles;
