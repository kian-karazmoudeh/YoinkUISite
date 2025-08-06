import Blocks from "./Blocks";
import StylesBar from "./StyleBar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useEditorStore } from "../../store";
import { useShallow } from "zustand/react/shallow";
// import PromotionalCard from "../Promotional/Card";
import LayerManager from "./LayerManager";

const Sidebar = () => {
  const { activeTab, setActiveTab } = useEditorStore(
    useShallow((state) => ({
      activeTab: state.activeTab,
      setActiveTab: state.setActiveTab,
    }))
  );
  return (
    <div className="flex flex-col gap-4 h-full w-80">
      <div className="w-full h-full bg-[#0F0E11] border border-[#26272B] overflow-y-auto flex flex-col rounded-md min-h-0">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col h-full min-h-0 gap-0"
        >
          <TabsList className="m-2 bg-[#262728]">
            <TabsTrigger value="blocks">Blocks</TabsTrigger>
            <TabsTrigger value="styles">Styles</TabsTrigger>
            <TabsTrigger value="layers">Layers</TabsTrigger>
          </TabsList>
          <TabsContent
            value="blocks"
            className="flex-1 h-full min-h-0 border-t border-t-[#26272B]"
          >
            <Blocks />
          </TabsContent>
          <TabsContent
            value="styles"
            className="flex-1 h-full min-h-0 border-t border-t-[#26272B]"
          >
            <StylesBar />
          </TabsContent>
          <TabsContent
            value="layers"
            className="flex-1 h-full min-h-0 border-t border-t-[#26272B]"
          >
            <LayerManager />
          </TabsContent>
        </Tabs>
      </div>
      {/* <PromotionalCard /> */}
    </div>
  );
};

export default Sidebar;
