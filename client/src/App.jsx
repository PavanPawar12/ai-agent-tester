import { useState } from "react";
import axios from "axios";

import {
  Bot,
  Calculator,
  Check,
  ChevronRight,
  Circle,
  Clock3,
  Code2,
  Command,
  Eraser,
  Globe,
  LoaderCircle,
  MessageSquare,
  Search,
  Send,
  Sparkles,
  Terminal,
  X,
  Zap,
} from "lucide-react";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) {
      return;
    }

    const userMessage = message.trim();

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setMessage("");

    setActivities([
      {
        type: "thinking",
        message: "Understanding the request",
      },
    ]);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/chat",
        {
          message: userMessage,
        }
      );

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: response.data.response,
        },
      ]);

      setActivities(response.data.activities || []);
    } catch (error) {
      console.error("Chat error:", error);

      setActivities([
        {
          type: "error",
          message: "Unable to communicate with the agent",
        },
      ]);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "Something went wrong. Please make sure the backend server is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearConversation = () => {
    setMessages([]);
    setActivities([]);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const setExample = (text) => {
    setMessage(text);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-300px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto flex h-screen max-w-[1600px] flex-col overflow-hidden border-x border-white/[0.06] bg-[#09090b]">

        {/* ========================================================= */}
        {/* HEADER */}
        {/* ========================================================= */}

        <header className="flex h-[68px] shrink-0 items-center justify-between border-b border-white/[0.07] bg-[#0c0c0f]/90 px-5 backdrop-blur-xl">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06]">
              <Bot size={19} className="text-violet-400" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-semibold tracking-tight">
                  AgentForge
                </h1>

                <span className="rounded-md border border-violet-400/20 bg-violet-400/10 px-1.5 py-0.5 text-[9px] font-medium text-violet-300">
                  BETA
                </span>
              </div>

              <p className="text-[10px] text-zinc-500">
                AI Agent Workspace
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="hidden items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.025] px-3 py-1.5 text-[10px] text-zinc-400 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
              Groq connected
            </div>

            <button
              onClick={clearConversation}
              className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[11px] text-zinc-400 transition hover:border-white/15 hover:bg-white/[0.07] hover:text-white"
            >
              <Eraser size={13} />
              <span className="hidden sm:block">
                Clear
              </span>
            </button>

          </div>

        </header>


        {/* ========================================================= */}
        {/* MAIN */}
        {/* ========================================================= */}

        <div className="flex min-h-0 flex-1">

          {/* ===================================================== */}
          {/* LEFT SIDEBAR */}
          {/* ===================================================== */}

          <aside className="hidden w-[230px] shrink-0 border-r border-white/[0.07] bg-[#0b0b0e] p-4 md:block">

            {/* Agent */}

            <div className="mb-7">

              <div className="mb-3 px-2 text-[9px] font-semibold tracking-[0.15em] text-zinc-600">
                AGENT
              </div>

              <div className="group flex items-center gap-3 rounded-xl border border-violet-400/10 bg-violet-400/[0.06] p-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300">
                  <Bot size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-zinc-200">
                    General Agent
                  </p>

                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                    <span className="text-[9px] text-zinc-500">
                      Llama 3.3 70B
                    </span>
                  </div>
                </div>

                <ChevronRight
                  size={13}
                  className="text-zinc-600"
                />

              </div>

            </div>


            {/* Tools */}

            <div>

              <div className="mb-3 px-2 text-[9px] font-semibold tracking-[0.15em] text-zinc-600">
                TOOLS
              </div>

              <ToolItem
                icon={<Calculator size={15} />}
                name="Calculator"
                active
              />

              <ToolItem
                icon={<Globe size={15} />}
                name="Weather"
                comingSoon
              />

              <ToolItem
                icon={<Search size={15} />}
                name="Web Search"
                comingSoon
              />

            </div>


            {/* Bottom */}

            <div className="absolute bottom-5 hidden w-[198px] md:block">

              <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">

                <div className="mb-2 flex items-center gap-2">
                  <Terminal size={13} className="text-zinc-500" />

                  <span className="text-[9px] font-medium text-zinc-500">
                    AGENT STATUS
                  </span>
                </div>

                <div className="flex items-center gap-2">

                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-800">
                    <div className="h-full w-full rounded-full bg-emerald-500/70" />
                  </div>

                  <span className="text-[9px] text-emerald-400">
                    Ready
                  </span>

                </div>

              </div>

            </div>

          </aside>


          {/* ===================================================== */}
          {/* CHAT */}
          {/* ===================================================== */}

          <main className="flex min-w-0 flex-1 flex-col">

            {/* Chat header */}

            <div className="flex shrink-0 items-center justify-between border-b border-white/[0.06] px-5 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05]">
                  <MessageSquare
                    size={15}
                    className="text-zinc-400"
                  />
                </div>

                <div>
                  <h2 className="text-xs font-semibold text-zinc-200">
                    General Agent
                  </h2>

                  <p className="mt-0.5 text-[9px] text-zinc-600">
                    Tool-enabled AI assistant
                  </p>
                </div>

              </div>

              <div className="hidden items-center gap-2 text-[9px] text-zinc-600 sm:flex">
                <Command size={11} />
                AI Workspace
              </div>

            </div>


            {/* Messages */}

            <div className="flex-1 overflow-y-auto">

              {messages.length === 0 ? (

                <EmptyState
                  setExample={setExample}
                />

              ) : (

                <div className="mx-auto max-w-3xl px-5 py-8">

                  {messages.map((msg, index) => (

                    <Message
                      key={index}
                      message={msg}
                    />

                  ))}

                  {loading && (
                    <div className="mb-7 flex gap-3">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-violet-400/10 bg-violet-400/[0.06]">
                        <Bot
                          size={15}
                          className="text-violet-400"
                        />
                      </div>

                      <div>

                        <div className="mb-2 text-[9px] font-medium text-zinc-600">
                          AI AGENT
                        </div>

                        <div className="flex items-center gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3">

                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.3s]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.15s]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400" />

                        </div>

                      </div>

                    </div>
                  )}

                </div>

              )}

            </div>


            {/* Input */}

            <div className="border-t border-white/[0.06] bg-[#0b0b0e]/90 p-4 backdrop-blur-xl">

              <div className="mx-auto max-w-3xl">

                <div className="group flex items-end gap-2 rounded-xl border border-white/[0.09] bg-white/[0.025] p-2 transition focus-within:border-violet-400/30 focus-within:bg-white/[0.035]">

                  <textarea
                    value={message}
                    onChange={(event) =>
                      setMessage(event.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    placeholder="Ask your AI agent anything..."
                    rows={1}
                    disabled={loading}
                    className="max-h-32 min-h-[38px] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 disabled:cursor-not-allowed"
                  />

                  <button
                    onClick={sendMessage}
                    disabled={!message.trim() || loading}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500 text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    {loading ? (
                      <LoaderCircle
                        size={15}
                        className="animate-spin"
                      />
                    ) : (
                      <Send size={15} />
                    )}
                  </button>

                </div>

                <p className="mt-2 text-center text-[9px] text-zinc-700">
                  Enter to send · Shift + Enter for new line
                </p>

              </div>

            </div>

          </main>


          {/* ===================================================== */}
          {/* ACTIVITY */}
          {/* ===================================================== */}

          <aside className="hidden w-[280px] shrink-0 border-l border-white/[0.07] bg-[#0b0b0e] lg:flex lg:flex-col">

            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-4">

              <div>
                <h2 className="text-xs font-semibold text-zinc-200">
                  Agent Activity
                </h2>

                <p className="mt-1 text-[9px] text-zinc-600">
                  Execution timeline
                </p>
              </div>

              {loading && (
                <span className="flex items-center gap-1.5 rounded-md border border-amber-400/10 bg-amber-400/[0.06] px-2 py-1 text-[8px] text-amber-400">
                  <LoaderCircle
                    size={9}
                    className="animate-spin"
                  />
                  Running
                </span>
              )}

            </div>


            <div className="flex-1 overflow-y-auto p-4">

              {activities.length === 0 ? (

                <div className="flex h-full flex-col items-center justify-center px-5 text-center">

                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025]">
                    <Zap
                      size={17}
                      className="text-zinc-600"
                    />
                  </div>

                  <p className="text-[10px] leading-5 text-zinc-600">
                    Agent activity will appear here when
                    you send a request.
                  </p>

                </div>

              ) : (

                <div>

                  {activities.map(
                    (activity, index) => (

                      <ActivityItem
                        key={index}
                        activity={activity}
                        index={index}
                        last={
                          index ===
                          activities.length - 1
                        }
                      />

                    )
                  )}

                </div>

              )}

            </div>

          </aside>

        </div>

      </div>
    </div>
  );
}


/* ============================================================= */
/* TOOL ITEM */
/* ============================================================= */

function ToolItem({
  icon,
  name,
  active,
  comingSoon,
}) {
  return (
    <div
      className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 ${
        active
          ? "bg-white/[0.04] text-zinc-300"
          : "text-zinc-600"
      }`}
    >

      <div
        className={
          active
            ? "text-violet-400"
            : "text-zinc-700"
        }
      >
        {icon}
      </div>

      <span className="flex-1 text-[11px]">
        {name}
      </span>

      {active && (
        <span className="text-[8px] font-medium text-emerald-500">
          ACTIVE
        </span>
      )}

      {comingSoon && (
        <span className="text-[8px] text-zinc-700">
          SOON
        </span>
      )}

    </div>
  );
}


/* ============================================================= */
/* EMPTY STATE */
/* ============================================================= */

function EmptyState({ setExample }) {
  return (
    <div className="flex h-full min-h-[450px] items-center justify-center px-5">

      <div className="w-full max-w-xl text-center">

        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/10 bg-violet-400/[0.06] shadow-[0_0_40px_rgba(139,92,246,0.08)]">

          <Sparkles
            size={23}
            className="text-violet-400"
          />

        </div>

        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-violet-400/70">
          AI Agent
        </p>

        <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
          What can I help you with?
        </h2>

        <p className="mx-auto mt-3 max-w-md text-xs leading-6 text-zinc-600">
          Ask a question and the agent will decide
          when to use its available tools.
        </p>


        <div className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-2">

          <button
            onClick={() =>
              setExample(
                "What is 125 multiplied by 48?"
              )
            }
            className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 text-left transition hover:border-violet-400/20 hover:bg-violet-400/[0.04]"
          >

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-400/10 text-orange-400">
              <Calculator size={15} />
            </div>

            <div>
              <p className="text-[11px] font-medium text-zinc-300">
                Calculate something
              </p>

              <p className="mt-1 text-[9px] text-zinc-600">
                Test the calculator tool
              </p>
            </div>

          </button>


          <button
            onClick={() =>
              setExample(
                "Explain the MERN stack in simple words."
              )
            }
            className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 text-left transition hover:border-violet-400/20 hover:bg-violet-400/[0.04]"
          >

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-400/10 text-blue-400">
              <Code2 size={15} />
            </div>

            <div>
              <p className="text-[11px] font-medium text-zinc-300">
                Ask a question
              </p>

              <p className="mt-1 text-[9px] text-zinc-600">
                Test the AI directly
              </p>
            </div>

          </button>

        </div>

      </div>

    </div>
  );
}


/* ============================================================= */
/* MESSAGE */
/* ============================================================= */

function Message({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`mb-7 flex gap-3 ${
        isUser ? "justify-end" : ""
      }`}
    >

      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-violet-400/10 bg-violet-400/[0.06]">
          <Bot
            size={15}
            className="text-violet-400"
          />
        </div>
      )}

      <div
        className={`max-w-[80%] ${
          isUser ? "items-end" : ""
        }`}
      >

        <div
          className={`mb-2 text-[9px] font-medium uppercase tracking-wider ${
            isUser
              ? "text-right text-zinc-600"
              : "text-zinc-600"
          }`}
        >
          {isUser ? "You" : "AI Agent"}
        </div>

        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
            isUser
              ? "rounded-br-md bg-violet-500 text-white"
              : "rounded-bl-md border border-white/[0.06] bg-white/[0.025] text-zinc-300"
          }`}
        >
          {message.content}
        </div>

      </div>

    </div>
  );
}


/* ============================================================= */
/* ACTIVITY ITEM */
/* ============================================================= */

function ActivityItem({
  activity,
  index,
  last,
}) {
  const getIcon = () => {
    switch (activity.type) {
      case "thinking":
        return (
          <LoaderCircle
            size={13}
            className="text-violet-400"
          />
        );

      case "tool":
        return (
          <Calculator
            size={13}
            className="text-orange-400"
          />
        );

      case "result":
        return (
          <Check
            size={13}
            className="text-blue-400"
          />
        );

      case "complete":
        return (
          <Check
            size={13}
            className="text-emerald-400"
          />
        );

      case "error":
        return (
          <X
            size={13}
            className="text-red-400"
          />
        );

      default:
        return (
          <Circle
            size={13}
            className="text-zinc-500"
          />
        );
    }
  };

  return (
    <div className="relative flex gap-3">

      {!last && (
        <div className="absolute left-[14px] top-8 h-[calc(100%-8px)] w-px bg-white/[0.07]" />
      )}

      <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-[#0b0b0e]">
        {getIcon()}
      </div>

      <div className="pb-6">

        <p className="text-[10px] font-medium text-zinc-300">
          {activity.message}
        </p>

        <p className="mt-1 text-[8px] text-zinc-700">
          Step {index + 1}
        </p>

      </div>

    </div>
  );
}

export default App;