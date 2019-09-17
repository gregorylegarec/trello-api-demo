import React from "react";
import { connect } from "react-redux";

import { Button } from "saagie-ui/react";

/**
 * Manage Trello authentication to retrieve token
 */
export const TrelloAuthorization = React.memo(props => {
  const { authorize, authorizing } = props;
  return (
    <Button color="primary" isLoading={authorizing} onClick={authorize}>
      Authenticate
    </Button>
  );
});

// const mapState = state => ({
//   authorizing: state.loading.trello.effects.authorize
// });

const mapState = state => {
  console.debug({ state });
  return {
    authorizing: state.loading.effects.trello.authorize
  };
};

const mapDispatch = ({ trello: { authorize } }) => ({
  authorize
});

export default connect(
  mapState,
  mapDispatch
)(TrelloAuthorization);
