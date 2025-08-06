import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages } from "ai";
import { alert, log, setComponentStyle } from "./tools";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: convertToModelMessages(messages),
    tools: { log, alert, setComponentStyle },
  });

  return result.toUIMessageStreamResponse();
}
