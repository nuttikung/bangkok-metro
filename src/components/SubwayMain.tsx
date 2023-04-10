import React from "react";
import BottomDrawer from "./BottomDrawer";
import SearchDialog from "./SearchDialog";

const SubwayMain: React.FunctionComponent = () => {
  return (
    <div className="container mx-auto">
      <SearchDialog />
      <BottomDrawer />
    </div>
  );
};

export default SubwayMain;
