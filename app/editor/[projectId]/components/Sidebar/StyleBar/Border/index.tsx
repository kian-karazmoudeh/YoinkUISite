import Category from "../shared/Category";
import BorderWidth from "./BorderWidth";
import BorderStyle from "./BorderStyle";
import BorderColor from "./BorderColor";

const Border = () => {
  return (
    <Category title="Border">
      <BorderStyle />
      <BorderWidth />
      <BorderColor />
    </Category>
  );
};

export default Border;
