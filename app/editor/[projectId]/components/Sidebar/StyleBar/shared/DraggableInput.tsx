"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface DraggableInputProps {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  onChange?: (value: number) => void;
  icon?: React.ReactNode;
}

const DraggableInput = ({
  initialValue = 0,
  min = -1000,
  max = 1000,
  step = 1,
  unit = "px",
  onChange,
  icon,
}: DraggableInputProps) => {
  const [value, setValue] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startValue, setStartValue] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      setStartX(e.clientX);
      setStartValue(value);
      document.body.style.userSelect = "none";
    },
    [value]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - startX;
      const deltaValue = Math.round(deltaX / 2) * step; // Adjust sensitivity by changing divisor
      const newValue = Math.max(min, Math.min(max, startValue + deltaValue));

      setValue(newValue);
      onChange?.(newValue);
    },
    [isDragging, startX, startValue, step, min, max, onChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.userSelect = "";
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(unit, "");
    const numericValue = parseFloat(inputValue) || 0;
    const clampedValue = Math.max(min, Math.min(max, numericValue));
    setValue(clampedValue);
    onChange?.(clampedValue);
  };

  const handleInputBlur = () => {
    // Ensure value is properly formatted when input loses focus
    const clampedValue = Math.max(min, Math.min(max, value));
    setValue(clampedValue);
    onChange?.(clampedValue);
  };

  // Add global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-8 bg-neutral-950 shrink-0 flex items-center px-2 py-1 border-white/12 border rounded-lg">
        <div className="mr-2 shrink-0 flex items-center">
          <span
            ref={spanRef}
            className="cursor-e-resize select-none"
            onMouseDown={handleMouseDown}
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
          value={`${value}${unit}`}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="leading-[20px] w-full text-sm fill-black stroke-[1px] box-border cursor-text overflow-clip bg-transparent text-white outline-none"
        />
      </div>
    </div>
  );
};

export default DraggableInput;
