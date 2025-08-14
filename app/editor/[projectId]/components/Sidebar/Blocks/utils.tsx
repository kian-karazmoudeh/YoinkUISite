import { Editor, ProjectData } from "grapesjs";
import { LayoutGrid, Box, Type, Image } from "lucide-react";
import { YoinkFile } from "./types";

export const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "layout":
      return <LayoutGrid className="w-5 h-5 text-purple-400" />;
    case "basic":
      return <Box className="w-5 h-5 text-blue-400" />;
    case "typography":
      return <Type className="w-5 h-5 text-green-400" />;
    case "media":
      return <Image className="w-5 h-5 text-yellow-400" />;
    default:
      return <Box className="w-5 h-5 text-gray-400" />;
  }
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const pageToBlock = (
  parsedContent: ProjectData,
  editor: Editor,
  yoink: YoinkFile
) => {
  if (parsedContent.pages && parsedContent.pages.length > 0) {
    const frames = parsedContent.pages[0].frames;
    const styles = parsedContent.styles;

    if (
      frames &&
      frames.length > 0 &&
      frames[0].component &&
      frames[0].component.components
    ) {
      let components = frames[0].component.components;

      interface Style {
        selectors: string[];
        style: Record<string, string>;
      }

      interface Component {
        attributes?: {
          id?: string;
          [key: string]: any;
        };
        style?: Record<string, string>;
        components?: Component[] | Component;
        [key: string]: any;
      }

      // Function to recursively process components and add styles
      const processComponents = (
        comps: Component | Component[]
      ): Component | Component[] => {
        if (Array.isArray(comps)) {
          return comps.map((comp) => processComponents(comp) as Component);
        } else if (comps && typeof comps === "object") {
          // Find matching style for the component
          if (comps.attributes?.id) {
            const matchingStyle = styles?.find((style: Style) =>
              style.selectors?.includes(`#${comps.attributes!.id}`)
            );

            if (matchingStyle?.style) {
              comps.style = { ...comps.style, ...matchingStyle.style };
            }
          }

          // Process nested components if they exist
          if (comps.components) {
            comps.components = processComponents(comps.components);
          }

          return comps;
        }
        return comps;
      };

      // Process all components with their styles
      components = processComponents(components);

      editor.BlockManager.add(yoink.name, {
        label: yoink.name,
        category: "Imported",
        content: components,
      });
    }
  }
};
