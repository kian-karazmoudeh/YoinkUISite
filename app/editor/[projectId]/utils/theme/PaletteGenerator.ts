import { ColorData, ColorGroup } from "./types";
import { Pallet } from "../../types";
import { GroupColors } from "../../components/Sidebar/Themes/utils/GroupColors";

export class PaletteGenerator {
  generatePalette(colorData: Map<string, ColorData>): Pallet[] {
    const bgColorGroups = this.groupBackgroundColors(colorData);
    return this.processColorGroups(bgColorGroups, colorData);
  }

  private groupBackgroundColors(
    colorData: Map<string, ColorData>
  ): ColorGroup[] {
    const bgColorGroups = GroupColors(Array.from(colorData.keys()));

    const groupsWithArea = bgColorGroups.map((group) => {
      const groupColors = group.map((color) => ({
        color,
        area: colorData.get(color)?.area || 0,
      }));

      groupColors.sort((a, b) => b.area - a.area);

      return {
        colors: groupColors.map((c) => c.color),
        totalArea: groupColors.reduce((sum, c) => sum + c.area, 0),
      };
    });

    groupsWithArea.sort((a, b) => b.totalArea - a.totalArea);
    return groupsWithArea;
  }

  private processColorGroups(
    bgGroups: ColorGroup[],
    colorData: Map<string, ColorData>
  ): Pallet[] {
    return bgGroups.map((bgGroup) => {
      const allTextColors = new Set<string>();

      bgGroup.colors.forEach((bgColor) => {
        const textColors = colorData.get(bgColor)?.textColors || new Map();
        textColors.forEach((_, textColor) => allTextColors.add(textColor));
      });

      const textColorGroups = GroupColors(Array.from(allTextColors), 30);
      const textGroupsWithArea = this.calculateTextGroupAreas(
        textColorGroups,
        bgGroup.colors,
        colorData
      );

      return {
        background: bgGroup.colors,
        text: textGroupsWithArea.map((g) => g.colors),
      };
    });
  }

  private calculateTextGroupAreas(
    textColorGroups: string[][],
    backgroundColors: string[],
    colorData: Map<string, ColorData>
  ): ColorGroup[] {
    const groupsWithArea = textColorGroups.map((group) => {
      const groupArea = group.reduce((totalArea, textColor) => {
        let colorArea = 0;
        backgroundColors.forEach((bgColor) => {
          colorArea += colorData.get(bgColor)?.textColors.get(textColor) || 0;
        });
        return totalArea + colorArea;
      }, 0);

      return {
        colors: group,
        totalArea: groupArea,
      };
    });

    groupsWithArea.sort((a, b) => b.totalArea - a.totalArea);
    return groupsWithArea;
  }
}
