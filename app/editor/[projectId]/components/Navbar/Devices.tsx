import { LaptopMinimal, Monitor, Smartphone } from "lucide-react";
import { useEditorStore } from "../../store";
import { useShallow } from "zustand/react/shallow";

const Devices = () => {
  const { currentDevice, handleDeviceChange } = useEditorStore(
    useShallow((state) => ({
      currentDevice: state.currentDevice,
      handleDeviceChange: state.setCurrentDevice,
    }))
  );
  return (
    <div className="relative flex h-8 rounded-lg mx-auto bg-zinc-900 p-[2px]">
      <div
        className="absolute inset-y-[2px] w-[calc(33.3%_-_2px)] rounded-md bg-zinc-950 shadow-[_#0000001a_0px_1px_3px_0px,_#0000001a_0px_1px_2px_-1px]"
        style={{
          transition: "left 0.2s ease-in-out",
          left: `${
            currentDevice === "Desktop"
              ? "2px"
              : currentDevice === "Tablet"
              ? "33.3%"
              : "66.6%"
          }`,
        }}
      ></div>
      <button
        className="relative flex cursor-pointer items-center justify-center bg-transparent px-2 text-center"
        onClick={() => handleDeviceChange("Desktop")}
        style={{
          color: currentDevice === "Desktop" ? "inherit" : "#8f8f99",
        }}
      >
        <Monitor className="size-4" />
        <span className="block cursor-pointer pr-2 pl-1 text-sm"> Desktop</span>
      </button>
      <button
        className="relative flex cursor-pointer items-center justify-center bg-transparent px-2 text-center"
        onClick={() => handleDeviceChange("Tablet")}
        style={{
          color: currentDevice === "Tablet" ? "inherit" : "#8f8f99",
        }}
      >
        <LaptopMinimal className="size-4" />
        <span className="block cursor-pointer pr-2 pl-1 text-sm"> Tablet</span>
      </button>
      <button
        className="relative flex cursor-pointer items-center justify-center bg-transparent px-2 text-center text-[#8f8f99]"
        onClick={() => handleDeviceChange("Mobile")}
        style={{
          color: currentDevice === "Mobile" ? "inherit" : "#8f8f99",
        }}
      >
        <Smartphone className="size-4" />
        <span className="block cursor-pointer pr-2 pl-1 text-sm"> Mobile</span>
      </button>
    </div>
  );
};

export default Devices;
