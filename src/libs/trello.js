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
        write: true
      },
      success: token => {
        resolve(Trello.token());
      },
      error: error => reject(error)
    });
  });

/**
 * Create board with the given name
 */
export const createBoard = async name =>
  new Promise((resolve, reject) => {
    Trello.post(`/boards/?name=${encodeURI(name)}`, resolve, reject);
  });

/**
 * Fetch given board data
 */
export const fetchBoard = async boardId =>
  new Promise((resolve, reject) => {
    Trello.get(`/boards/${boardId}/?fields=all`, resolve, reject);
  });

/**
 * Fetch lists in given board
 */
export const fetchBoardLists = async boardId =>
  new Promise((resolve, reject) => {
    Trello.get(`/boards/${boardId}/lists/?fields=all`, resolve, reject);
  });

export default {
  authorize,
  createBoard,
  fetchBoard,
  fetchBoardLists
};
