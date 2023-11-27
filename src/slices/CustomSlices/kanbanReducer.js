/* eslint-disable no-param-reassign */
import produce from 'immer';
import _ from 'lodash';
import {
  GET_BOARD,
  UPDATE_BOARD,
  CREATE_LIST,
  UPDATE_LIST,
  CLEAR_LIST,
  DELETE_LIST,
  CREATE_CARD,
  UPDATE_CARD,
  MOVE_CARD,
  DELETE_CARD,
  ADD_COMMENT,
  UPDATE_MEMBERS,
  ADD_CHECKLIST,
  UPDATE_CHECKLIST,
  DELETE_CHECKLIST,
  ADD_CHECK_ITEM,
  UPDATE_CHECK_ITEM,
  DELETE_CHECK_ITEM,
  UPDATE_ATTACHMENT,
} from './actions/kanbanActions';
import objFromArray from '../utils/objFromArray';
import {
  GroupKanbanList,
  GroupKanbanCard,
  GroupKanbanMembers,
} from '../utils/GroupOrdersKanban';

const initialState = {
  isLoaded: false,
  lists: {
    byId: {},
    allIds: [],
  },
  cards: {
    byId: {},
    allIds: [],
  },
  members: {
    byId: {},
    allIds: [],
  },
};

const kanbanReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOARD: {
      const { board } = action.payload;

      return produce(state, (draft) => {
        draft.lists.byId = objFromArray(board.lists);
        draft.lists.allIds = Object.keys(draft.lists.byId);
        draft.cards.byId = objFromArray(board.cards);
        draft.cards.allIds = Object.keys(draft.cards.byId);
        draft.members.byId = objFromArray(board.members);
        draft.members.allIds = Object.keys(draft.members.byId);
        draft.isLoaded = true;
      });
    }

    case UPDATE_BOARD: {
      produce(state, (draft) => {
        draft.lists.byId = {};
        draft.lists.allIds = [];
        draft.cards.byId = {};
        draft.cards.allIds = [];
        draft.members.byId = {};
        draft.members.allIds = [];
        draft.isLoaded = true;
      });

      const { boa, staff } = action.payload;
      const cards = GroupKanbanCard(boa);
      const list = GroupKanbanList(boa);
      const memebers = GroupKanbanMembers(staff);
      let cards_ids = [];
      let staff_ids = [];

      if (boa.length !== 0) {
        boa.map((order) => (cards_ids = [...cards_ids, order.id.toString()]));
      }

      if (staff.length !== 0) {
        staff.map((s) => (staff_ids = [...staff_ids, s.id.toString()]));
      }

      return produce(state, (draft) => {
        draft.lists.byId = list;
        draft.lists.allIds = Object.keys(list);
        draft.cards.byId = cards;
        draft.cards.allIds = cards_ids;
        draft.members.byId = memebers;
        draft.members.allIds = staff_ids;
        draft.isLoaded = true;
      });
    }

    case CREATE_LIST: {
      const { list } = action.payload;

      return produce(state, (draft) => {
        draft.lists.byId[list.id] = list;
        draft.lists.allIds.push(list.id);
      });
    }

    case UPDATE_LIST: {
      const { list } = action.payload;

      return produce(state, (draft) => {
        _.merge(draft.lists.byId[list.id], list);
      });
    }

    case CLEAR_LIST: {
      const { listId } = action.payload;

      return produce(state, (draft) => {
        const { cardIds } = draft.lists.byId[listId];

        draft.lists.byId[listId].cardIds = [];
        draft.cards.byId = _.omit(draft.cards.byId, cardIds);
        _.pull(draft.cards.allIds, ...cardIds);
      });
    }

    case DELETE_LIST: {
      const { listId } = action.payload;

      return produce(state, (draft) => {
        draft.lists.byId = _.omit(draft.lists.byId, listId);
        _.pull(draft.lists.allIds, listId);
      });
    }

    case CREATE_CARD: {
      const { card } = action.payload;

      return produce(state, (draft) => {
        draft.cards.byId[card.id] = card;
        draft.cards.allIds.push(card.id);
        draft.lists.byId[card.listId].cardIds.push(card.id);
      });
    }

    case UPDATE_CARD: {
      const card = action.payload;

      return produce(state, (draft) => {
        _.merge(draft.cards.byId[card.id], card);
      });
    }

    case MOVE_CARD: {
      const { cardId, position, listId } = action.payload;

      return produce(state, (draft) => {
        const { listId: sourceListId } = draft.cards.byId[cardId];
        // Remove card from source list
        if (draft.lists.byId[sourceListId] && draft.lists.byId[sourceListId].cardIds) {
          _.pull(draft.lists.byId[sourceListId].cardIds, cardId);
        }

        // If listId arg exists, it means that
        // we have to add the card to the new list
        if (listId) {
          draft.cards.byId[cardId].listId = listId;
          draft.lists.byId[listId].cardIds.splice(position, 0, cardId);
        } else {
          draft.lists.byId[sourceListId].cardIds.splice(position, 0, cardId);
        }
      });
    }

    case DELETE_CARD: {
      const { cardId } = action.payload;

      return produce(state, (draft) => {
        const { listId } = draft.cards.byId[cardId];
        draft.cards.byId = _.omit(draft.cards.byId, cardId);
        _.pull(draft.cards.allIds, cardId.toString());
        _.pull(draft.lists.byId[listId].cardIds, cardId);
      });
    }

    case ADD_COMMENT: {
      const cardData = action.payload;

      return produce(state, (draft) => {
        draft.cards.byId[cardData.id].notes = cardData.notes;
      });
    }

    case ADD_CHECKLIST: {
      const cardData = action.payload;

      return produce(state, (draft) => {
        draft.cards.byId[cardData.id].notes = cardData.notes;
      });
    }

    case UPDATE_CHECKLIST: {
      const cardData = action.payload;

      return produce(state, (draft) => {
        draft.cards.byId[cardData.id].notes = cardData.notes;
      });
    }

    case DELETE_CHECKLIST: {
      const cardData = action.payload;

      return produce(state, (draft) => {
        draft.cards.byId[cardData.id].notes = cardData.notes;
      });
    }

    case ADD_CHECK_ITEM: {
      const cardData = action.payload;

      return produce(state, (draft) => {
        draft.cards.byId[cardData.id].notes = cardData.notes;
      });
    }

    case UPDATE_CHECK_ITEM: {
      const cardData = action.payload;

      return produce(state, (draft) => {
        draft.cards.byId[cardData.id].notes = cardData.notes;
      });
    }

    case DELETE_CHECK_ITEM: {
      const cardData = action.payload;

      return produce(state, (draft) => {
        draft.cards.byId[cardData.id].notes = cardData.notes;
      });
    }

    case UPDATE_MEMBERS: {
      const cardData = action.payload;

      return produce(state, (draft) => {
        draft.cards.byId[cardData.id].notes = cardData.notes;
      });
    }

    case UPDATE_ATTACHMENT: {
      const cardData = action.payload;

      return produce(state, (draft) => {
        draft.cards.byId[cardData.id].attachments = cardData.attachments;
      });
    }

    default: {
      return state;
    }
  }
};

export default kanbanReducer;
