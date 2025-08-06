import { useEditorStore } from "../../../store";

// const convertComponentToAiSchemaFormat = () => {

// }

export const getCanvas = () => {
  const editor = useEditorStore.getState().editor;

  if (editor) {
  } else {
    return [];
  }
};

export const setComponentStyle = (
  componentId: string,
  propery: string,
  value: string
) => {
  try {
    const editor = useEditorStore.getState().editor;
    const updateComponentStyle = useEditorStore.getState().updateComponentStyle;
    if (editor) {
      const components = editor.getWrapper()?.find(`#${componentId}`);

      if (components && components.length == 1) {
        const component = components[0];

        editor.select(component);
        updateComponentStyle(propery, value);
        return { status: "Success" };
      }
    }
  } catch {
    return { status: "Error" };
  }

  return { status: "Error" };
};
