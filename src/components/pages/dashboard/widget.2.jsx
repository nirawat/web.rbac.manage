import React from "react";
//import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  makeStyles,
  Card,
  CardActionArea,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  Box,
} from "@material-ui/core";

const data = [
  {
    id: 1,
    name: "นิรวัฒน์ ประเสริฐสังข์",
    detail: "เทคโนโลยีสารสนเทศ",
  },
  { id: 2, name: "เจมส์ เรืองศักดิ์", detail: "คลังสินค้า" },
  { id: 3, name: "โดม ปกรลัมณ์", detail: "คลังสินค้า" },
  { id: 4, name: "หลุย สก๊อตส์", detail: "จัดซื้อ" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    width: "100%",
    height: 300,
  },
  cardTitle: {
    padding: theme.spacing(0, 0, 0, 2),
  },
  cardArea: {
    margin: theme.spacing(0),
  },
  cardContent: {
    padding: theme.spacing(0),
    margin: theme.spacing(0),
  },
  listContent: {
    whiteSpace: "nowrap",
    padding: theme.spacing(0.5, 2, 0, 2),
  },
  avatar: {
    backgroundColor: "#607d8b",
  },
}));

const ListItemTexts = (props) => {
  return (
    <Box textOverflow="ellipsis" overflow="hidden" color={props.color}>
      {props.name}
    </Box>
  );
};

function Widget2(props) {
  const classes = useStyles();
  const { title } = props;
  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.cardArea}>
        <Typography
          variant="subtitle2"
          gutterBottom
          className={classes.cardTitle}
        >
          {title}
        </Typography>
        <Divider />
        <CardContent className={classes.cardContent}>
          <List>
            {data.map((item, index) => (
              <ListItem key={index} className={classes.listContent}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar} />
                </ListItemAvatar>
                <ListItemText
                  key={index}
                  primary={
                    <ListItemTexts name={item.name} color="textPrimary" />
                  }
                  secondary={item.detail}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

Widget2.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Widget2;
