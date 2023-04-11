import React from "react";
import SubwayMain from "./components/SubwayMain";
import SubwayMap from "./components/SubwayMap";
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
            <SubwayMain />
          </StationProvider>
        </SearchProvider>
      </DialogProvider>
    </UiProvider>
  );
};

export default App;
