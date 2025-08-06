import { Component } from "grapesjs";
import { useEditorStore } from "../../../store";
import { getViewportComponentStyles } from "../../../utils/helpers";
import { format } from "./format";

interface GrapeComponent {
  id: string;
  type: string;
  lgStyles: Record<string, string>;
  mdStyles: Record<string, string>;
  smStyles: Record<string, string>;
  children?: GrapeComponent[];
  content: string | null;
}

const convertComponentToAiSchemaFormat = (component: Component) => {
  const schema: GrapeComponent = {
    id: component.getId(),
    type: component.tagName || component.getType(),
    lgStyles: format(
      getViewportComponentStyles({ component, device: "Desktop" })
    ),
    mdStyles: format(
      getViewportComponentStyles({ component, device: "Tablet" })
    ),
    smStyles: format(
      getViewportComponentStyles({ component, device: "Mobile" })
    ),
    children: component
      .components()
      .map((comp: Component) => convertComponentToAiSchemaFormat(comp)),
    content: null,
  };

  if (component.getType() == "textnode") {
    schema.content = component.getInnerHTML();
  }

  return schema;
};

export const getCanvas = () => {
  const editor = useEditorStore.getState().editor;

  if (editor) {
    const wrapper = editor.getWrapper();
    if (wrapper) {
      const res = convertComponentToAiSchemaFormat(wrapper);
      console.log(res);
      return res;
    }
  }

  return {};
};

export const setComponentStyles = (
  changes: { componentId: string; styles: Record<string, string> }[]
) => {
  console.log("Mouw");
  console.log(changes);
  try {
    const editor = useEditorStore.getState().editor;
    const updateComponentStyles =
      useEditorStore.getState().updateComponentStyles;
    if (editor) {
      const convertedChanges = changes.flatMap(({ componentId, styles }) => {
        const [component] = editor.getWrapper()?.find(`#${componentId}`) || [];
        return component ? [{ component, styles }] : [];
      });

      console.log(convertedChanges);

      updateComponentStyles(convertedChanges);

      // const components = editor.getWrapper()?.find(`#${componentId}`);

      // if (components && components.length == 1) {
      //   const component = components[0];

      //   editor.select(component);
      //   updateComponentStyle(propery, value);

      // }
      return { status: "Success" };
    }
  } catch {
    return { status: "Error" };
  }

  return { status: "Error" };
};

export const getComponentsByQuery = (query: string) => {
  const editor = useEditorStore.getState().editor;

  if (editor) {
    const components = editor.getWrapper()?.find(query);
    if (components) {
      const res = components.map((comp) =>
        convertComponentToAiSchemaFormat(comp)
      );
      console.log(res);
      return res;
    }
  }

  return {};
};
