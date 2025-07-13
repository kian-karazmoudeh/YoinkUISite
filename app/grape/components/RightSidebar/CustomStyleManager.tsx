import * as React from "react";
import { StylesResultProps } from "@grapesjs/react";
import { MAIN_BG_COLOR } from "../common";
import StylePropertyField from "./StylePropertyField";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// const accordionIcon = <Icon path={mdiMenuDown} size={0.7} />;

export default function CustomStyleManager({
  sectors,
}: Omit<StylesResultProps, "Container">) {
  return (
    <div className="text-left">
      {sectors.map((sector) => (
        <Accordion key={sector.getId()} collapsible type="single">
          <AccordionItem value={sector.getId()}>
            <AccordionTrigger>{sector.getName()}</AccordionTrigger>
            <AccordionContent>
              {sector.getProperties().map((prop) => (
                <StylePropertyField key={prop.getId()} prop={prop} />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
