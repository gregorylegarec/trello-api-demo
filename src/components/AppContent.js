import React from "react";
import { connect } from "react-redux";

import TrelloAuthorization from './TrelloAuthorization'

/**
 * Global switch for app content
 * @param {[type]} props [description]
 */
export const AppContent = React.memo(props => {
  const { trelloApiToken } = props;
  if (!trelloApiToken) return <TrelloAuthorization />;
});

const mapState = state => ({
  trelloApiToken: state.trello.token
});

export default connect(mapState)(AppContent);
