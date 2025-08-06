import { tool } from "ai";
import { z } from "zod";

// const ComponentSchema: z.ZodType<{
//   id: string;
//   tagName: string;
//   lgStyles: Record<string, string>;
//   mdStyles: Record<string, string>;
//   smStyles: Record<string, string>;
//   baseStyles: Record<string, string>;
//   children: Component[];
// }> = z.lazy(() =>
//   z.object({
//     id: z.string().describe("Unique Id"),
//     tagName: z.string().describe("HTML tagname"),
//     lgStyles: z
//       .record(z.string())
//       .describe(
//         "styles applied on desktop. They cascade down to smaller viewports unless another style is set"
//       ),
//     mdStyles: z
//       .record(z.string())
//       .describe(
//         "styles applied on tablet. They cascade down to smaller viewports unless another style is set"
//       ),
//     smStyles: z
//       .record(z.string())
//       .describe(
//         "styles applied on mobile. They cascade down to smaller viewports unless another style is set"
//       ),
//     baseStyles: z
//       .record(z.string())
//       .describe(
//         "base styles applied at all viewports, unless specified differently by viewport styles"
//       ),
//     children: z.array(ComponentSchema).describe("children component"),
//   })
// );

// type Component = z.infer<typeof ComponentSchema>;

// export const getCanvas = tool({
//   description:
//     "Returns all components in the Canvas. The Canvas may contain many elements, and the result could be very large. Hence, this tool should be used only when necessary.",
//   outputSchema: z.array(ComponentSchema),
//   execute: async () => {

//     return [];
//   }
// });

export const log = tool({
  description: "logs something in the console",
  inputSchema: z.object({
    msg: z.string(),
  }),
  execute: async ({ msg }) => {
    console.log(msg);
  },
});

export const alert = tool({
  description: "Alerts something on the client",
  outputSchema: z.object({ status: z.string() }),
  inputSchema: z.object({ msg: z.string() }),
});

export const setComponentStyle = tool({
  description: "lets you update any style property of a component given its id",
  inputSchema: z.object({
    componentId: z
      .string()
      .describe("The Id of the component which will be modified"),
    property: z
      .string()
      .describe("A valid css property. e.g. background-color"),
    value: z.string().describe("A valid value for that CSS property."),
  }),
});
