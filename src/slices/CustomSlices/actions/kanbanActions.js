import axios from "axios";
import { list_kanaban } from "../../../utils/GroupOrdersKanban";
import { LOGOUT } from "./userActionTypes";
import { url } from "../../../config";
import { resetList } from "./apiActions";

export const GET_BOARD = "@kanban/get-board";
export const UPDATE_BOARD = "@kanban/update-board";
export const CREATE_LIST = "@kanban/create-list";
export const UPDATE_LIST = "@kanban/update-list";
export const CLEAR_LIST = "@kanban/clear-list";
export const DELETE_LIST = "@kanban/delete-list";
export const CREATE_CARD = "@kanban/create-card";
export const UPDATE_CARD = "@kanban/update-card";
export const MOVE_CARD = "@kanban/move-card";
export const DELETE_CARD = "@kanban/delete-card";
export const ADD_COMMENT = "@kanban/add-comment";
export const ADD_CHECKLIST = "@kanban/add-checklist";
export const UPDATE_MEMBERS = "@kanban/update-members";
export const UPDATE_CHECKLIST = "@kanban/update-checklist";
export const DELETE_CHECKLIST = "@kanban/delete-checklist";
export const ADD_CHECK_ITEM = "@kanban/add-check-item";
export const UPDATE_CHECK_ITEM = "@kanban/update-check-item";
export const DELETE_CHECK_ITEM = "@kanban/delete-check-item";
export const UPDATE_ATTACHMENT = "@kanban/update-attachment";

export function getBoard() {
  const request = axios.get('/api/kanban/board');

  return (dispatch) => {
    request.then((response) =>
      dispatch({
        type: GET_BOARD,
        payload: response.data,
      })
    );
  };
}

export function updateBoard(boa, staff) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch({
        type: UPDATE_BOARD,
        payload: {
          boa,
          staff,
        },
      });
      resolve();
    });
  };
  // return (dispatch) => {
  //   dispatch({
  //     type: UPDATE_BOARD,
  //     payload: {
  //       boa,
  //       staff,
  //     },
  //   });
  // };
}

export function createList(name) {
  const request = axios.post('/api/kanban/board/lists/new', {
    name,
  });

  return (dispatch) => {
    request.then((response) =>
      dispatch({
        type: CREATE_LIST,
        payload: response.data,
      })
    );
  };
}

export function updateList(listId, update) {
  const request = axios.post('/api/kanban/board/list/update', {
    listId,
    update,
  });

  return (dispatch) => {
    request.then((response) =>
      dispatch({
        type: UPDATE_LIST,
        payload: response.data,
      })
    );
  };
}

export function clearList(listId) {
  const request = axios.post('/api/kanban/board/lists/clear', {
    listId,
  });

  return (dispatch) => {
    request.then(() =>
      dispatch({
        type: CLEAR_LIST,
        payload: {
          listId,
        },
      })
    );
  };
}

export function deleteList(listId) {
  const request = axios.post('/api/kanban/board/lists/remove', {
    listId,
  });

  return (dispatch) => {
    request.then(() =>
      dispatch({
        type: DELETE_LIST,
        payload: {
          listId,
        },
      })
    );
  };
}

export function createCard(listId, name) {
  const request = axios.post('/api/kanban/board/cards/new', {
    listId,
    name,
  });

  return (dispatch) => {
    request.then((response) =>
      dispatch({
        type: CREATE_CARD,
        payload: response.data,
      })
    );
  };
}

export const updateCard = (cardId, update, link, token) => (dispatch) => {
  console.log(update);
  var request = {
    url: url + '/' + link + '/' + cardId + '/',
    method: 'PUT',
    headers: {
      Authorization: 'fm ' + token,
    },
    data: update,
  };

  return axios(request)
    .then((response) => {
      dispatch({
        type: UPDATE_CARD,
        payload: response.data,
      });
      dispatch(resetList());
      return response;
    })
    .catch((err) => {
      if (err.response.statusText === 'Unauthorized') {
        dispatch({ type: LOGOUT });
      } else {
        return err;
      }
    });
};

// export function moveCard(cardId, position, listId) {
//   const request = axios.post('/api/kanban/board/cards/move', {
//     cardId,
//     position,
//     listId
//   });

//   return dispatch => {
//     request.then(() =>
//       dispatch({
//         type: MOVE_CARD,
//         payload: {
//           cardId,
//           position,
//           listId
//         }
//       })
//     );
//   };
// }

export const moveCard =
  (cardId, position, listId, link, token) => (dispatch) => {
    const list = list_kanaban;
    const data = {
      status: list[listId].name,
    };
    const request = {
      method: 'PUT',
      url: `${url}/${link}/${cardId}/`,
      headers: {
        Authorization: 'fm ' + token,
      },
      data: data,
    };

    dispatch({
      type: MOVE_CARD,
      payload: {
        cardId,
        position,
        listId,
      },
    });
    return axios(request).then((res) => {
      return res.data;
    });
  };

export const deleteCard = (cardId, link, token) => (dispatch) => {
  var request = {
    method: 'DELETE',
    url: `${url}/${link}/${cardId}/`,
    headers: {
      Authorization: 'fm ' + token,
    },
  };

  return axios(request)
    .then((res) => {
      dispatch({
        type: DELETE_CARD,
        payload: {
          cardId,
        },
      });
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const addComment = (cardId, data, link, token) => (dispatch) => {
  const request = {
    method: 'PUT',
    url: `${url}/${link}/${cardId}/`,
    headers: {
      Authorization: 'fm ' + token,
    },
    data: data,
  };

  return axios(request)
    .then((res) => {
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });
    })
    .catch((err) => {
      return err;
    });
};

export const addChecklist = (cardId, name, data, link, token) => (dispatch) => {
  const request = {
    method: 'PUT',
    url: `${url}/${link}/${cardId}/`,
    headers: {
      Authorization: 'fm ' + token,
    },
    data: data,
  };

  return axios(request)
    .then((res) => {
      dispatch({
        type: ADD_CHECKLIST,
        payload: res.data,
      });
    })
    .catch((err) => {
      return err;
    });
};

export const updateChecklist = (cardId, data, link, token) => (dispatch) => {
  const request = {
    method: 'PUT',
    url: `${url}/${link}/${cardId}/`,
    headers: {
      Authorization: 'fm ' + token,
    },
    data: data,
  };

  return axios(request)
    .then((res) => {
      dispatch({
        type: UPDATE_CHECKLIST,
        payload: res.data,
      });
    })
    .catch((err) => {
      return err;
    });
};

export const deleteChecklist = (cardId, data, link, token) => (dispatch) => {
  const request = {
    method: 'PUT',
    url: `${url}/${link}/${cardId}/`,
    headers: {
      Authorization: 'fm ' + token,
    },
    data: data,
  };

  return axios(request)
    .then((res) => {
      dispatch({
        type: DELETE_CHECKLIST,
        payload: res.data,
      });
    })
    .catch((err) => {
      return err;
    });
};

export const addCheckItem = (cardId, data, link, token) => (dispatch) => {
  const request = {
    method: 'PUT',
    url: `${url}/${link}/${cardId}/`,
    headers: {
      Authorization: 'fm ' + token,
    },
    data: data,
  };

  return axios(request)
    .then((res) => {
      dispatch({
        type: ADD_CHECK_ITEM,
        payload: res.data,
      });
    })
    .catch((err) => {
      return err;
    });
};

export const updateCheckItem = (cardId, data, link, token) => (dispatch) => {
  const request = {
    method: 'PUT',
    url: `${url}/${link}/${cardId}/`,
    headers: {
      Authorization: 'fm ' + token,
    },
    data: data,
  };

  return axios(request)
    .then((res) => {
      dispatch({
        type: UPDATE_CHECK_ITEM,
        payload: res.data,
      });
    })
    .catch((err) => {
      return err;
    });
};

export const deleteCheckItem = (cardId, data, link, token) => (dispatch) => {
  const request = {
    method: 'PUT',
    url: `${url}/${link}/${cardId}/`,
    headers: {
      Authorization: 'fm ' + token,
    },
    data: data,
  };

  return axios(request)
    .then((res) => {
      dispatch({
        type: DELETE_CHECK_ITEM,
        payload: res.data,
      });
    })
    .catch((err) => {
      return err;
    });
};

export const updateMembers = (cardId, data, link, token) => (dispatch) => {
  const request = {
    method: 'PUT',
    url: `${url}/${link}/${cardId}/`,
    headers: {
      Authorization: 'fm ' + token,
    },
    data: data,
  };

  return axios(request)
    .then((res) => {
      dispatch({
        type: UPDATE_MEMBERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      return err;
    });
};

export const updateAttachment = (cardId, data, link, token) => (dispatch) => {
  const request = {
    method: 'PUT',
    url: `${url}/${link}/${cardId}/`,
    headers: {
      Authorization: 'fm ' + token,
    },
    data: data,
  };

  return axios(request)
    .then((res) => {
      dispatch({
        type: UPDATE_ATTACHMENT,
        payload: res.data,
      });
    })
    .catch((err) => {
      return err;
    });
};
