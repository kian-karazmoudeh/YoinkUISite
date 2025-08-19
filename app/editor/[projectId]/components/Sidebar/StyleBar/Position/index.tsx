import { useEditorStore } from "@/app/editor/[projectId]/store";
import Category from "../shared/Category";
import PositionType from "./PositionType";
import { useShallow } from "zustand/react/shallow";
import PositionOffset from "./PositionOffset";

const Offsets = ["fixed", "absolute", "sticky"];

const Position = () => {
  const { styleValues } = useEditorStore(
    useShallow((state) => ({
      styleValues: state.styleValues,
      updateComponentStyle: state.updateComponentStyleProperty,
    }))
  );
  return (
    <Category title="Position">
      {Offsets.includes(styleValues["position"]) && <PositionOffset />}
      <PositionType />
    </Category>
  );
};

export default Position;
