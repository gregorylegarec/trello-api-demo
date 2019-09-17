import TrelloLib from "../libs/trello";

/**
 * Rematch Model responsible of requesting the Trello API
 */
export const trello = {
  state: {
    error: null,
    token: null
  },
  reducers: {
    /**
     * Store the given token
     */
    receiveToken(state, payload) {
      return { ...state, token: payload };
    },

    /**
     * Error handler
     */
    receiveError(state, error) {
      return { ...state, error };
    }
  },
  effects: dispatch => ({
    /**
     * Starts the authorization process. We expect to retrieve a token.
     */
    async authorize() {
      try {
        const token = await TrelloLib.authorize();
        dispatch.trello.receiveToken(token);
      } catch (error) {
        dispatch.trello.receiveError(error);
      }
    }
  })
};
