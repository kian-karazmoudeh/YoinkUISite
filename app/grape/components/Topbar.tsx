import * as React from "react";
import { DevicesProvider, WithEditor } from "@grapesjs/react";
// import FormControl from '@mui/material/FormControl';

import { cx } from "./common";
import TopbarButtons from "./TopbarButtons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";

export default function Topbar({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx("flex items-center p-1", className)}>
      <DevicesProvider>
        {({ selected, select, devices }) => (
          <div className="rounded-full">
            <Select value={selected} onValueChange={(val) => select(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Device" />
              </SelectTrigger>
              <SelectContent>
                {devices.map((device) => (
                  <SelectItem value={device.id.toString()} key={device.id}>
                    {device.getName()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </DevicesProvider>
      <WithEditor>
        <TopbarButtons className="ml-auto px-2" />
      </WithEditor>
    </div>
  );
}
