import { tool } from "ai";
import { z } from "zod";

const ComponentSchema: z.ZodType<{
  id: string;
  type: string;
  lgStyles: Record<string, string>;
  mdStyles: Record<string, string>;
  smStyles: Record<string, string>;
  // baseStyles: Record<string, string>;
  children: GrapeComponent[];
}> = z.lazy(() =>
  z.object({
    id: z.string().describe("Unique Id"),
    type: z
      .string()
      .describe("Node type. Either HTML element or textNode, etc."),
    lgStyles: z
      .record(z.string())
      .describe(
        "styles applied on desktop. They cascade down to smaller viewports unless another style is set"
      ),
    mdStyles: z
      .record(z.string())
      .describe(
        "styles applied on tablet. They cascade down to smaller viewports unless another style is set"
      ),
    smStyles: z
      .record(z.string())
      .describe(
        "styles applied on mobile. They cascade down to smaller viewports unless another style is set"
      ),
    // baseStyles: z
    //   .record(z.string())
    //   .describe(
    //     "base styles applied at all viewports, unless specified differently by viewport styles"
    //   ),
    children: z.array(ComponentSchema).describe("children component"),
    content: z.string().describe("Text content inside an element").nullable(),
  })
);

type GrapeComponent = z.infer<typeof ComponentSchema>;

export const getCanvas = tool({
  description:
    "Returns all components in the Canvas. The Canvas may contain many elements, and the result could be very large. Hence, this tool should be used only when absolutely necessary",
  outputSchema: ComponentSchema,
  inputSchema: z.object({}),
});

export const getComponentsByQuery = tool({
  description:
    "Returns all components matching the query. E.g div, h1, #idbg...",
  inputSchema: z.object({
    query: z
      .string()
      .describe(
        "the query to run to fetch matching components. Query can be a tagname or id"
      ),
  }),
  outputSchema: z.array(ComponentSchema),
});

export const setComponentStyles = tool({
  description:
    "lets you update multiple style properties of multiple components given their Ids. e.g. { changes: { componentId: string, styles: {prop: value} }}",
  inputSchema: z.object({
    changes: z
      .array(
        z.object({
          componentId: z
            .string()
            .describe("The Id of the component which will be modified"),
          styles: z
            .record(z.string())
            .describe(
              "Key Value pairs correcsponding to CSS properties and values"
            ),
        })
      )
      .describe(
        "Array of style changes to be made to one or more components given their IDs"
      ),
  }),
});

export const tools = {
  getCanvas,
  setComponentStyles,
  getComponentsByQuery,
};
