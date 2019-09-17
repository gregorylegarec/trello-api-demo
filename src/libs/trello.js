/**
 * This lib encapsulte the Trello client to improve some features like
 * better asynchronous calls, using Promises instead of callbacks.
 */
import Trello from "trello";

export const authorize = async () =>
  new Promise((resolve, reject) => {
    Trello.authorize({
      name: "Trello API demo",
      type: "popup",
      // Store token in local storage
      persist: true,
      scope: {
        read: true,
        write: true,
        account: false
      },
      success: token => {
        resolve(Trello.token());
      },
      error: error => reject(error)
    });
  });

// Trello.token() method does not return token from localStorage. It actually
// returns token after an Trello.authorize() call. So let bypass it to simplify
// UX.
export const getToken = () =>
  window.localStorage && localStorage.get("trello_token");

export default {
  authorize,
  getToken
};
