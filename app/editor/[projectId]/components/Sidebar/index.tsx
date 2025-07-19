import Blocks from "./Blocks";
import StylesBar from "./StylesBar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useEditorStore } from "../../store/editorStore";
import { useShallow } from "zustand/react/shallow";

const Sidebar = () => {
  const { activeTab, setActiveTab } = useEditorStore(
    useShallow((state) => ({
      activeTab: state.activeTab,
      setActiveTab: state.setActiveTab,
    }))
  );
  return (
    <div className="w-80 h-full bg-[#18191A] border border-[#26272B] overflow-y-auto flex flex-col rounded-md min-h-0 p-3">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col h-full min-h-0"
      >
        <TabsList className="mb-2 bg-[#262728] w-full">
          <TabsTrigger value="blocks">Blocks</TabsTrigger>
          <TabsTrigger value="styles">Styles</TabsTrigger>
        </TabsList>
        <TabsContent value="blocks" className="flex-1 h-full min-h-0">
          <Blocks />
        </TabsContent>
        <TabsContent value="styles" className="flex-1 h-full min-h-0">
          <StylesBar />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Sidebar;
