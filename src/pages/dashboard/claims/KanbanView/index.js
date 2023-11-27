import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { makeStyles, Box } from "@mui/material";
import {
  moveCard,
  updateBoard,
} from "../../../../slices/CustomSlices/actions/kanbanActions";
import { listData } from "../../../../slices/CustomSlices/actions/apiActions";
import List from "./List";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    display: "flex",
    overflow: "hidden",
    flexDirection: "column",
  },
  content: {
    flexGrow: 1,
    flexShrink: 1,
    display: "flex",
    overflowY: "hidden",
    overflowX: "auto",
  },
  inner: {
    display: "flex",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

function KanbanView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let { lists, isLoaded } = useSelector((state) => state.kanban);
  let id_token = useSelector((state) => state.user.id_token);
  // const { enqueueSnackbar } = useSnackbar();

  const handleDragEnd = async ({ source, destination, draggableId }) => {
    try {
      // Dropped outside the list
      if (!destination) {
        return;
      }

      // Card has not been moved
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        // Moved to the same list on diferent position

        return;
      } else {
        // Moved to another list
        await dispatch(
          moveCard(
            draggableId,
            destination.index,
            destination.droppableId,
            "claims/boa",
            id_token
          )
        );
      }
    } catch (error) {
      //
    }
  };

  const [loaded, setLoaded] = useState(false);
  if (!loaded && id_token) {
    setLoaded(true);
    dispatch(listData("claims/boa/all", id_token, false)).then((boa) => {
      dispatch(listData("account/staff/all", id_token, false)).then((staff) => {
        dispatch(updateBoard(boa.data, staff.data));
      });
    });
  }

  if (!isLoaded) {
    return null;
  }

  return (
    <Box>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            flexShrink: 1,
            overflowX: "auto",
            overflowY: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              px: 1,
              py: 3,
            }}
          >
            {lists.allIds.map((listId) => (
              <List className={classes.list} key={listId} listId={listId} />
            ))}
          </Box>
        </Box>
      </DragDropContext>
    </Box>
  );
}

export default KanbanView;
