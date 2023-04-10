import React from "react";
import SubwayMap from "./components/SubwayMain";
import DialogProvider from "./contexts/DialogContext";
import SearchProvider from "./contexts/SearchContext";
import StationProvider from "./contexts/StationContext";
import UiProvider from "./contexts/UiContext";

const App: React.FunctionComponent = () => {
  return (
    <UiProvider>
      <DialogProvider>
        <SearchProvider>
          <StationProvider>
            <SubwayMap />
          </StationProvider>
        </SearchProvider>
      </DialogProvider>
    </UiProvider>
  );
};

export default App;
