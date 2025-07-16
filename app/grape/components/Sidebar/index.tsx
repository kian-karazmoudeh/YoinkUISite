import { Editor } from "grapesjs";
import Blocks from "./Blocks";
import StylesBar from "./StylesBar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type SidebarProps = {
  selectedComponent: any;
  styleValues: any;
  updateComponentStyle: (property: string, value: string) => void;
  handleSliderChange: (property: string, value: string) => void;
  editor: Editor;
};

const Sidebar = ({
  selectedComponent,
  styleValues,
  updateComponentStyle,
  handleSliderChange,
  editor,
}: SidebarProps) => {
  return (
    <div className="w-80 h-full bg-[#18191A] border border-[#26272B] overflow-y-auto flex flex-col rounded-md min-h-0 p-3">
      <Tabs
        defaultValue="blocks"
        className="flex-1 flex flex-col h-full min-h-0"
      >
        <TabsList className="mb-2 bg-[#262728] w-full">
          <TabsTrigger value="blocks">Blocks</TabsTrigger>
          <TabsTrigger value="styles">Styles</TabsTrigger>
          <TabsTrigger value="layers">Layers</TabsTrigger>
        </TabsList>
        <TabsContent value="blocks" className="flex-1 h-full min-h-0">
          <Blocks editor={editor} />
        </TabsContent>
        <TabsContent value="styles" className="flex-1 h-full min-h-0">
          <StylesBar
            selectedComponent={selectedComponent}
            styleValues={styleValues}
            updateComponentStyle={updateComponentStyle}
            handleSliderChange={handleSliderChange}
          />
        </TabsContent>
        <TabsContent value="layers" className="flex-1 h-full min-h-0">
          <div>hello</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Sidebar;
