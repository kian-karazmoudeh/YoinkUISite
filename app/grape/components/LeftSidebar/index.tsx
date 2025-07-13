import { BlocksProvider } from "@grapesjs/react";
import CustomBlockManager from "./CustomBlockManager";

const LeftSidebar = () => {
  return (
    <div className="row-start-1">
      <BlocksProvider>
        {(props) => <CustomBlockManager {...props} />}
      </BlocksProvider>
    </div>
  );
};

export default LeftSidebar;
