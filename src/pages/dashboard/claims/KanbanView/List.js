/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Droppable, Draggable } from "react-beautiful-dnd";
import {
  Box,
  Divider,
  Paper,
  Typography,
  makeStyles,
  TextField,
} from "@mui/material";
import Card from "./Card";
import AddCard from "./AddCard/AddCard";

function selectList(state, listId) {
  const { lists } = state.kanban;

  return lists.byId[listId];
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "84vh",
  },
  inner: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    maxHeight: "100%",
    overflowY: "hidden",
    overflowX: "hidden",
    width: 300,
    [theme.breakpoints.down("xs")]: {
      width: 300,
    },
  },
  title: {
    cursor: "pointer",
  },
  droppableArea: {
    flexGrow: 1,
    overflowY: "auto",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  menu: {
    width: 240,
  },
}));

function List({ className, listId, ...rest }) {
  const classes = useStyles();
  const list = useSelector((state) => selectList(state, listId));
  const cardList = useSelector((state) => state.kanban.cards.byId);
  const [query, setQuery] = useState([]);

  useEffect(() => {
    setQuery(list.cardIds);
  }, [list]);

  const searchData = (e) => {
    if (e.target.value) {
      if (list.cardIds.length !== 0) {
        let newQuery = list.cardIds.filter((ca) => {
          return cardList[ca].name.includes(e.target.value.toUpperCase());
        });
        setQuery(newQuery);
      }
    } else {
      setQuery(list.cardIds);
    }
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Paper className={classes.inner}>
        <Box py={1} px={2} display="flex" alignItems="center">
          <Typography
            color="inherit"
            variant="subtitle2"
            className={classes.name}
          >
            {list.name}
          </Typography>
          <Box flexGrow={1} />
        </Box>
        <Divider />
        <Droppable droppableId={list.id} type="card">
          {(provided) => (
            <Box
              minHeight={80}
              ref={provided.innerRef}
              className={classes.droppableArea}
            >
              {query.length !== 0 &&
                query.map((cardId, index) => (
                  <Draggable
                    draggableId={cardId.toString()}
                    index={index}
                    key={cardId}
                  >
                    {(provided, snapshot) => (
                      <Card
                        cardId={cardId}
                        dragging={snapshot.isDragging}
                        index={index}
                        key={cardId}
                        list={list}
                        ref={provided.innerRef}
                        style={{ ...provided.draggableProps.style }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      />
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
        <Divider />
        <Box p={2}>
          <TextField
            id="outlined-basic"
            label="Search"
            fullWidth
            variant="outlined"
            onChange={searchData}
          />
        </Box>
        {list.id === "OA" && (
          <>
            <Divider />
            <Box p={2}>
              <AddCard />
            </Box>
          </>
        )}
      </Paper>
    </div>
  );
}

List.propTypes = {
  className: PropTypes.string,
  listId: PropTypes.string.isRequired,
};

export default List;
