import * as React from "react";
import { useEditor } from "@grapesjs/react";

import type {
  Property,
  PropertyComposite,
  PropertyRadio,
  PropertySelect,
  PropertySlider,
  PropertyStack,
} from "grapesjs";
import { BTN_CLS, ROUND_BORDER_COLOR, cx } from "../common";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
  prop: Property;
}

export default function StylePropertyField({
  prop,
  ...rest
}: StylePropertyFieldProps) {
  const editor = useEditor();
  const handleChange = (value: string) => {
    prop.upValue(value);
  };

  const onChange = (ev: any) => {
    handleChange(ev.target.value);
  };

  const openAssets = () => {
    const { Assets } = editor;
    Assets.open({
      select: (asset, complete) => {
        console.log({ complete });
        prop.upValue(asset.getSrc(), { partial: !complete });
        complete && Assets.close();
      },
      types: ["image"],
      accept: "image/*",
    });
  };

  const type = prop.getType();
  const defValue = prop.getDefaultValue();
  const canClear = prop.canClear();
  const hasValue = prop.hasValue();
  const value = prop.getValue();
  const valueString = hasValue ? value : "";
  const valueWithDef = hasValue ? value : defValue;

  let inputToRender = (
    <Input placeholder={defValue} value={valueString} onChange={onChange} />
  );

  switch (type) {
    case "radio":
      {
        const radioProp = prop as PropertyRadio;
        inputToRender = (
          <RadioGroup value={value} onChange={onChange}>
            {radioProp.getOptions().map((option) => (
              <div
                className="flex items-center gap-3"
                key={radioProp.getOptionId(option)}
              >
                <RadioGroupItem
                  value={radioProp.getOptionId(option)}
                  key={radioProp.getOptionId(option)}
                />
                <Label htmlFor={radioProp.getOptionId(option)}>Default</Label>
              </div>
            ))}
          </RadioGroup>
        );
      }
      break;
    case "select":
      {
        const selectProp = prop as PropertySelect;
        inputToRender = (
          <Select value={value} onValueChange={(val) => handleChange(val)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {selectProp.getOptions().map((option) => (
                <SelectItem
                  key={selectProp.getOptionId(option)}
                  value={selectProp.getOptionId(option)}
                >
                  {selectProp.getOptionLabel(option)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }
      break;
    case "color":
      {
        inputToRender = (
          <Input
            placeholder={defValue}
            value={valueString}
            onChange={onChange}
            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment position="start">
            //       <div
            //         className={`w-[15px] h-[15px] ${ROUND_BORDER_COLOR}`}
            //         style={{ backgroundColor: valueWithDef }}
            //       >
            //         <input
            //           type="color"
            //           className="w-[15px] h-[15px] cursor-pointer opacity-0"
            //           value={valueWithDef}
            //           onChange={(ev) => handleChange(ev.target.value)}
            //         />
            //       </div>
            //     </InputAdornment>
            //   ),
            // }}
          />
        );
      }
      break;
    case "slider":
      {
        const sliderProp = prop as PropertySlider;
        inputToRender = (
          <Slider
            value={[parseFloat(value)]}
            min={sliderProp.getMin()}
            max={sliderProp.getMax()}
            step={sliderProp.getStep()}
            onValueChange={(val) => handleChange(val[0].toString())}
          />
        );
      }
      break;
    case "file":
      {
        inputToRender = (
          <div className="flex flex-col items-center gap-3">
            {value && value !== defValue && (
              <div
                className="w-[50px] h-[50px] rounded inline-block bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: `url("${value}")` }}
                onClick={() => handleChange("")}
              />
            )}
            <button type="button" onClick={openAssets} className={BTN_CLS}>
              Select Image
            </button>
          </div>
        );
      }
      break;
    case "composite":
      {
        const compositeProp = prop as PropertyComposite;
        inputToRender = (
          <div className={cx("flex flex-wrap p-2", ROUND_BORDER_COLOR)}>
            {compositeProp.getProperties().map((prop) => (
              <StylePropertyField key={prop.getId()} prop={prop} />
            ))}
          </div>
        );
      }
      break;
    case "stack":
      {
        const stackProp = prop as PropertyStack;
        const layers = stackProp.getLayers();
        const isTextShadow = stackProp.getName() === "text-shadow";
        inputToRender = (
          <div
            className={cx(
              "flex flex-col p-2 gap-2 min-h-[54px]",
              ROUND_BORDER_COLOR
            )}
          >
            {layers.map((layer) => (
              <div key={layer.getId()} className={ROUND_BORDER_COLOR}>
                <div className="flex gap-1 px-2 py-1 items-center">
                  <button onClick={() => layer.move(layer.getIndex() - 1)}>
                    up
                  </button>
                  <button onClick={() => layer.move(layer.getIndex() + 1)}>
                    down
                  </button>
                  <button className="flex-grow" onClick={() => layer.select()}>
                    {layer.getLabel()}
                  </button>
                  <div
                    className={cx(
                      "bg-white min-w-[17px] min-h-[17px] text-black text-sm flex justify-center",
                      ROUND_BORDER_COLOR
                    )}
                    style={layer.getStylePreview({
                      number: { min: -3, max: 3 },
                      camelCase: true,
                    })}
                  >
                    {isTextShadow && "T"}
                  </div>
                  <button onClick={() => layer.remove()}>delete</button>
                </div>
                {layer.isSelected() && (
                  <div className="p-2 flex flex-wrap">
                    {stackProp.getProperties().map((prop) => (
                      <StylePropertyField key={prop.getId()} prop={prop} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      }
      break;
  }

  return (
    <div
      {...rest}
      className={cx("mb-3 px-1", prop.isFull() ? "w-full" : "w-1/2")}
    >
      <div className={cx("flex mb-2 items-center", canClear && "text-sky-300")}>
        <div className="flex-grow capitalize">{prop.getLabel()}</div>
        {canClear && <button onClick={() => prop.clear()}>close</button>}
        {type === "stack" && (
          <button
            onClick={() => (prop as PropertyStack).addLayer({}, { at: 0 })}
          >
            stack
          </button>
        )}
      </div>
      {inputToRender}
    </div>
  );
}
