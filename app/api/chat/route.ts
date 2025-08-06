import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages, tool } from "ai";
import { tools } from "./tools";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: `You are a world class Designer helping the user design their web page.
      When making design changes, consider proper design pricipals such as color palletes, white space, color contrast, etc.
      The number one mistake to avoid is bad contrast between elements and text. Make sure to use a diverse color pallete when necessary.
      Use the tools available to you to make the best design possible.`,
    messages: convertToModelMessages(messages),
    tools,
  });

  // const steps = await result.steps;

  // for (const step of steps) {
  //   console.log("Step:", step);
  // }

  return result.toUIMessageStreamResponse();
}
