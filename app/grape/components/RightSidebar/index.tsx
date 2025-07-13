import * as React from "react";
import { StylesProvider } from "@grapesjs/react";
import { MAIN_BORDER_COLOR, cx } from "../common";
import CustomStyleManager from "./CustomStyleManager";

export default function RightSidebar({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  //   const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className={cx("min-w-10 row-start-1 flex flex-col", className)}>
      {/* <Tabs
        value={selectedTab}
        onChange={(_, v) => setSelectedTab(v)}
        variant="fullWidth"
      >
        <Tab {...defaultTabProps} label={<Icon size={1} path={mdiBrush} />} />
        <Tab {...defaultTabProps} label={<Icon size={1} path={mdiCog} />} />
        <Tab {...defaultTabProps} label={<Icon size={1} path={mdiLayers} />} />
        <Tab
          {...defaultTabProps}
          label={<Icon size={1} path={mdiViewGridPlus} />}
        />
        <Tab
          {...defaultTabProps}
          label={<Icon size={1} path={mdiTextBoxMultiple} />}
        />
      </Tabs> */}
      <div
        className={cx("overflow-y-auto flex-grow border-t", MAIN_BORDER_COLOR)}
      >
        <StylesProvider>
          {(props) => <CustomStyleManager {...props} />}
        </StylesProvider>
        {/* {selectedTab === 0 && (
          <>
            <SelectorsProvider>
              {(props) => <CustomSelectorManager {...props} />}
            </SelectorsProvider>
            <StylesProvider>
              {(props) => <CustomStyleManager {...props} />}
            </StylesProvider>
          </>
        )}
        {selectedTab === 1 && (
          <TraitsProvider>
            {(props) => <CustomTraitManager {...props} />}
          </TraitsProvider>
        )}
        {selectedTab === 2 && (
          <LayersProvider>
            {(props) => <CustomLayerManager {...props} />}
          </LayersProvider>
        )}
        {selectedTab === 3 && (
          <BlocksProvider>
            {(props) => <CustomBlockManager {...props} />}
          </BlocksProvider>
        )}
        {selectedTab === 4 && (
          <PagesProvider>
            {(props) => <CustomPageManager {...props} />}
          </PagesProvider>
        )} */}
      </div>
    </div>
  );
}
