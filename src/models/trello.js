import TrelloLib from "../libs/trello";
import persistence from "../libs/persistence";

const BOARD_ID_STORAGE_KEY = "trello_board_id";
const BOARD_NAME = "Trello API Demo";

/**
 * Rematch Model responsible of requesting the Trello API
 */
export const trello = {
  state: {
    boardId: persistence.getItem(BOARD_ID_STORAGE_KEY),
    error: null,
    documents: {
      board: null,
      lists: []
    }
  },
  reducers: {
    /**
     * Error handler
     */
    receiveError(state, error) {
      return { ...state, error };
    },

    /**
     * Store board
     */
    receiveBoard(state, payload = {}) {
      /**
       * Make the board persistent with local storage.
       * As it's the only value we will want to be stored in this project,
       * Let's not use rematch plugin rematch/persist.
       */
      persistence.setItem(BOARD_ID_STORAGE_KEY, payload.id);
      return {
        ...state,
        boardId: payload.id,
        documents: {
          ...state.documents,
          board: payload
        }
      };
    },

    /**
     * Store lists related to current board.
     */
    receiveBoardLists(state, payload = []) {
      return {
        ...state,
        documents: {
          ...state.documents,
          lists: payload
        }
      };
    }
  },
  effects: dispatch => ({
    /**
     * Entry point in model. Call the whole workflow from OAuth authorization
     * to data fetching.
     *
     * Should be call once, at application startup, or when user choose to
     * authorize.
     *
     * Separing into different effects allow us to follow execution via the
     * rematch/loading plugin.
     */
    async initialize(paylaod) {
      // OAuth authorization process
      await dispatch.trello.authorize();
      await dispatch.trello.ensureBoard();
      await dispatch.trello.fetchBoardLists();
    },

    async authorize() {
      await TrelloLib.authorize();
    },

    /**
     * Make sure that the board we want to use exists. If not, we create it.
     */
    async ensureBoard(payload, rootState) {
      const {
        trello: { boardId }
      } = rootState;

      // Ensure board
      if (boardId) {
        await dispatch.trello.fetchBoard(boardId);
      } else {
        await dispatch.trello.createBoard(BOARD_NAME);
      }
    },

    /**
     * Get lists related to current board
     */
    async fetchBoardLists(payload, rootState) {
      const {
        trello: { boardId }
      } = rootState;

      try {
        const lists = await TrelloLib.fetchBoardLists(boardId);
        dispatch.trello.receiveBoardLists(lists);
      } catch (error) {
        dispatch.trello.receiveError(error);
      }
    },

    /**
     * Create the board
     */
    async createBoard() {
      try {
        const board = await TrelloLib.createBoard(BOARD_NAME);
        dispatch.trello.receiveBoard(board);
      } catch (error) {
        dispatch.trello.receiveError(error);
      }
    },

    /**
     * Fetch board data
     */
    async fetchBoard(boardId) {
      try {
        const board = await TrelloLib.fetchBoard(boardId);
        dispatch.trello.receiveBoard(board);
      } catch (error) {
        dispatch.trello.receiveError(error);
      }
    }
  })
};
