import { getDeviceKey, parseStyleValues } from "./helpers";

export function changeStyleStateHandler(
  selectedComponent: any,
  componentStyles: any,
  deviceName: any,
  setStyleValues: any
) {
  const uid = selectedComponent.getAttributes()["data-yoink-uid"];
  const baseStyles = componentStyles[uid]?.base || {};
  const deviceKey = getDeviceKey(deviceName);
  const viewportStyles = componentStyles[uid]?.[deviceKey] || {};
  setStyleValues(parseStyleValues({ ...baseStyles, ...viewportStyles }));
}
