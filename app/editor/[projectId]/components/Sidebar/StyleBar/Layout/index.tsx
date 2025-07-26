import { useShallow } from "zustand/react/shallow";
import Category from "../shared/Category";
import Display from "./Display";
import Gap from "./Gap";
import Margin from "./Margin";
import Padding from "./Padding";
import { useEditorStore } from "@/app/editor/[projectId]/store";

const Layout = () => {
  const { styleValues } = useEditorStore(
    useShallow((state) => ({
      styleValues: state.styleValues,
    }))
  );
  return (
    <Category title="Layout">
      <Display />
      {["flex", "grid", "inline-flex", "inline-grid"].includes(
        styleValues["display"]
      ) && <Gap />}
      <Margin />
      <Padding />
    </Category>
  );
};

export default Layout;
