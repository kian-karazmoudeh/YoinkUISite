"use client";

import { motion } from "framer-motion";
import PromptInput from "./PromptInput";
import { useChat } from "@ai-sdk/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { lastAssistantMessageIsCompleteWithToolCalls } from "ai";
import { useEditorStore } from "../../../store";
import { useShallow } from "zustand/react/shallow";
import { setComponentStyle } from "./tools";

const Agent = () => {
  const { editor } = useEditorStore(
    useShallow((state) => ({ editor: state.editor }))
  );
  const [input, setInput] = useState("");
  const { messages, sendMessage, addToolResult } = useChat({
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,

    onToolCall: async ({ toolCall }) => {
      if (toolCall.toolName == "alert") {
        const input: { msg: string } = toolCall.input as { msg: string };

        alert(input.msg);

        addToolResult({
          tool: "alert",
          toolCallId: toolCall.toolCallId,
          output: { status: "success" },
        });
      } else if (toolCall.toolName == "setComponentStyle") {
        const input: { componentId: string; property: string; value: string } =
          toolCall.input as {
            componentId: string;
            property: string;
            value: string;
          };
        setComponentStyle(input.componentId, input.property, input.value);

        addToolResult({
          tool: "setComponentStyle",
          toolCallId: toolCall.toolCallId,
          output: { status: "success" },
        });
      }
    },
  });

  useEffect(() => {
    if (editor) {
      console.log(editor.getWrapper());
    }
  }, [editor]);

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
                case "tool-setComponentStyle":
                  {
                    const callId = part.toolCallId;

                    switch (part.state) {
                      case "input-streaming":
                        return (
                          <div key={callId}>componentStyle tool loading...</div>
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
