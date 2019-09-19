import React from "react";
import { connect } from "react-redux";

import { Button, Loader } from "saagie-ui/react";

/**
 * Helper component
 */
const LoadingMessage = React.memo(props => (
  <p>
    <Loader position="start" /> {props.message}
  </p>
));

/**
 * Global switch for app content
 */
export class AppContent extends React.Component {
  componentDidMount() {
    // If board id is already set at startup, we can directly run the whole
    // initialization.
    if (this.props.boardId) {
      this.props.initialize();
    }
  }

  render() {
    const {
      boardId,
      trelloError,
      isAuthorizing,
      isCreatingBoard,
      isFetchingBoard,
      isFetchingBoardLists,
      initialize
    } = this.props;

    if (trelloError) {
      return <p>An error occured with Trello: {trelloError.message}</p>;
    }

    if (!boardId)
      return (
        <Button color="primary" isLoading={isAuthorizing} onClick={initialize}>
          Authenticate
        </Button>
      );

    if (isCreatingBoard) {
      return <LoadingMessage message="Creating board" />;
    }

    if (isFetchingBoard) {
      return <LoadingMessage message="Loading board data" />;
    }

    if (isFetchingBoardLists) {
      return <LoadingMessage message="Loading board lists data" />;
    }

    return null;
  }
}

const mapState = state => ({
  boardId: state.trello.boardId,
  trelloError: state.trello.error,
  isAuthorizing: state.loading.effects.trello.authorize,
  isCreatingBoard: state.loading.effects.trello.createBoard,
  isFetchingBoard: state.loading.effects.trello.fetchBoard,
  isFetchingBoardLists: state.loading.effects.trello.fetchBoardLists
});

const mapDispatch = ({ trello: { initialize } }) => ({
  initialize
});

export default connect(
  mapState,
  mapDispatch
)(AppContent);
