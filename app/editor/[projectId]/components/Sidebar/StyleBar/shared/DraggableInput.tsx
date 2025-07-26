"use client";

import { useEditorStore } from "@/app/editor/[projectId]/store";
import { isValidCssValue } from "@/app/editor/[projectId]/utils/helpers";
import { useState, useRef, useCallback, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

interface DraggableInputProps {
  value?: string;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: string) => void;
  icon?: React.ReactNode;
}

const DraggableInput = ({
  value = "0",
  min = 0,
  max,
  step = 1,
  onChange,
  icon,
}: DraggableInputProps) => {
  const { selectedComponents, currentDevice } = useEditorStore(
    useShallow((state) => ({
      selectedComponents: state.selectedComponents,
      currentDevice: state.currentDevice,
    }))
  );

  const [localValue, setLocalValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startValue, setStartValue] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);

  const handleDragMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      setStartX(e.clientX);
      setStartValue(0);
      document.body.style.userSelect = "none";
    },
    [localValue]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      const deltaValue = Math.round(deltaX / 2) * step; // Adjust sensitivity by changing divisor
      let newValue;
      if (max) {
        newValue = Math.max(min, Math.min(max, startValue + deltaValue));
      } else {
        newValue = Math.max(min, startValue + deltaValue);
      }
      const newString = `${newValue}px`;
      setLocalValue(newString);
      onChange?.(newString);
    },
    [isDragging, startX, startValue, step, min, max, onChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.userSelect = "";
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);

    // Only propagate valid values to the canvas
    if (isValidCssValue(val)) {
      onChange?.(val);
    }
  };

  const handleBlur = () => {
    // On blur, fallback to a safe value if invalid
    if (!isValidCssValue(localValue)) {
      onChange?.("auto");
      setLocalValue("auto");
    }
  };

  // Add global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      // When dragging starts, add global mousemove and mouseup listeners
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    setLocalValue(value);
  }, [selectedComponents, currentDevice]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-8 bg-neutral-950 shrink-0 flex items-center px-2 py-1 border-white/12 border rounded-lg">
        <div className="mr-2 shrink-0 flex items-center">
          <span
            ref={spanRef}
            className="cursor-e-resize select-none"
            onMouseDown={handleDragMouseDown}
          >
            {icon || (
              <svg
                height="16"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="16"
                className="text-zinc-400 fill-black stroke-[1px] box-border align-middle overflow-hidden size-4"
              >
                <path
                  d="M14 1V15H12.5V1H14ZM5.00488 5.89746C5.05621 5.39333 5.48232 5 6 5H10L10.1025 5.00488C10.573 5.05278 10.9472 5.42703 10.9951 5.89746L11 6V10L10.9951 10.1025C10.9472 10.573 10.573 10.9472 10.1025 10.9951L10 11H6C5.48232 11 5.05621 10.6067 5.00488 10.1025L5 10V6L5.00488 5.89746ZM9.5 9.5V6.5H6.5L6.5 9.5H9.5ZM3.5 1L3.5 15H2L2 1H3.5Z"
                  className="fill-zinc-400 stroke-[1px] inline box-border"
                ></path>
              </svg>
            )}
          </span>
        </div>
        <input
          type="text"
          value={localValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="leading-[20px] w-full text-sm box-border cursor-text overflow-clip bg-transparent text-white outline-none"
        />
      </div>
    </div>
  );
};

export default DraggableInput;
