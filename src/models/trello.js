import Trello from "trello";

/**
 * Rematch Model responsible of requesting the Trello API
 */
export const trello = {
  state: {
    token: null
  },
  reducers: {
    /**
     * Store the given token
     */
    receiveToken(state, payload) {
      return { ...state, token: payload };
    }
  },
  effects: dispatch => ({
    /**
     * Starts the authorization process. We expect to retrieve a token.
     */
    async authorize() {
      const token = await Trello.authorize({
        name: "Trello API demo",
        type: "popup",
        persist: false,
        scope: {
          read: true,
          write: true
        }
      });
      dispatch.trello.receiveToken(token);
    }
  })
};
