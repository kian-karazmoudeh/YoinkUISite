import Category from "../shared/Category";
import DraggableInput from "../shared/DraggableInput";
import ExpandToggle from "../shared/ExpandToggle";
import Gap from "./Gap";
import Margin from "./Margin";
import Padding from "./Padding";

const Layout = () => {
  return (
    <Category title="Layout">
      <Gap />
      <Margin />
      <Padding />
    </Category>
  );
};

export default Layout;
