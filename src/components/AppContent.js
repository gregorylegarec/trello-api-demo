import React from "react";
import { connect } from "react-redux";

export const AppContent = props => {
  const { trelloApiToken } = props;
  if (!trelloApiToken) return <div>No token</div>;
};

const mapState = state => ({
  trelloApiToken: state.trello.token
});

export default connect(mapState)(AppContent);
