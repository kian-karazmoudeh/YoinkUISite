import { DeviceName } from "../types";
import { getDeviceKey, parseStyleValues } from "./helpers";

export function changeStyleStateHandler(
  selectedComponent: any,
  componentStyles: any,
  deviceName: DeviceName,
  setStyleValues: any,
  defaultStyles: Record<string, string> | undefined
) {
  const uid = selectedComponent.getAttributes()["data-yoink-uid"];
  const baseStyles = componentStyles[uid]?.base || {};
  const deviceKey = getDeviceKey(deviceName);
  const viewportStyles = componentStyles[uid]?.[deviceKey] || {};
  if (defaultStyles) {
    setStyleValues(
      parseStyleValues({ ...defaultStyles, ...baseStyles, ...viewportStyles })
    );
  } else {
    setStyleValues(parseStyleValues({ ...baseStyles, ...viewportStyles }));
  }
}
