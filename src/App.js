import React from "react";
import { AppLayoutPage, PageHeader } from "saagie-ui/react";

import AppContent from "./components/AppContent";

function App() {
  return (
    <AppLayoutPage>
      <PageHeader title="Trello API demo" />
      <AppContent />
    </AppLayoutPage>
  );
}

export default App;
