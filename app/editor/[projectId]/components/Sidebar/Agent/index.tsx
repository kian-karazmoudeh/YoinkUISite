"use client";

import { motion } from "framer-motion";
import PromptInput from "./PromptInput";
import { useChat } from "@ai-sdk/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { lastAssistantMessageIsCompleteWithToolCalls } from "ai";
import { getCanvas, getComponentsByQuery, setComponentStyles } from "./tools";

const Agent = () => {
  const [input, setInput] = useState("");
  const { messages, sendMessage, addToolResult } = useChat({
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,

    onToolCall: async ({ toolCall }) => {
      if (toolCall.toolName == "setComponentStyles") {
        console.log(toolCall.input);
        const {
          changes,
        }: {
          changes: { componentId: string; styles: Record<string, string> }[];
        } = toolCall.input as {
          changes: {
            componentId: string;
            styles: Record<string, string>;
          }[];
        };
        setComponentStyles(changes);

        addToolResult({
          tool: "setComponentStyles",
          toolCallId: toolCall.toolCallId,
          output: { status: "success" },
        });
      } else if (toolCall.toolName == "getComponentsByQuery") {
        const { query } = toolCall.input as { query: string };

        const components = getComponentsByQuery(query);

        addToolResult({
          tool: "getComponent",
          toolCallId: toolCall.toolCallId,
          output: components,
        });
      } else if (toolCall.toolName == "getCanvas") {
        const canvas = getCanvas();

        addToolResult({
          tool: "getCanvas",
          toolCallId: toolCall.toolCallId,
          output: canvas,
        });
      }
    },
  });

  return (
    <div className="flex-1 p-6 overflow-hidden flex flex-col h-full min-h-0">
      <motion.div
        className="flex-1 overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#26272B #18191A",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {messages.map((message) => (
          <div key={message.id} className="whitespace-pre-wrap">
            {message.role === "user" ? "User: " : "AI: "}
            {message.parts.map((part, i) => {
              switch (part.type) {
                case "text":
                  return <div key={`${message.id}-${i}`}>{part.text}</div>;
                  break;
                case "tool-alert":
                  {
                    const callId = part.toolCallId;

                    switch (part.state) {
                      case "input-streaming":
                        return <div key={callId}>alert tool loading...</div>;
                        break;
                      case "input-available":
                        return <div key={callId}>loading...</div>;
                        break;
                      case "output-available":
                        return <div key={callId}>success</div>;
                        break;
                    }
                  }
                  break;
                case "tool-setComponentStyles":
                  {
                    const callId = part.toolCallId;

                    switch (part.state) {
                      case "input-streaming":
                        return (
                          <div key={callId}>
                            componentStyles tool loading...
                          </div>
                        );
                        break;
                      case "input-available":
                        return <div key={callId}>loading...</div>;
                        break;
                      case "output-available":
                        return <div key={callId}>success</div>;
                        break;
                    }
                  }
                  break;
                case "tool-getCanvas":
                  {
                    const callId = part.toolCallId;

                    switch (part.state) {
                      case "input-streaming":
                        return (
                          <div key={callId}>getCanvas tool loading...</div>
                        );
                        break;
                      case "input-available":
                        return <div key={callId}>loading...</div>;
                        break;
                      case "output-available":
                        return <div key={callId}>success</div>;
                        break;
                    }
                  }
                  break;
                case "tool-getComponentsByQuery":
                  {
                    const callId = part.toolCallId;

                    switch (part.state) {
                      case "input-streaming":
                        return (
                          <div key={callId}>
                            getComponentsByQuery tool loading...
                          </div>
                        );
                        break;
                      case "input-available":
                        return <div key={callId}>loading...</div>;
                        break;
                      case "output-available":
                        return <div key={callId}>success</div>;
                        break;
                    }
                  }
                  break;
              }
            })}
          </div>
        ))}

        <PromptInput
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            sendMessage({ text: input });
            setInput("");
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput(e.currentTarget.value)
          }
          value={input}
        />
      </motion.div>
    </div>
  );
};

export default Agent;
