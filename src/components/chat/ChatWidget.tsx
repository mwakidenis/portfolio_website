import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ArrowRight } from "lucide-react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

type ConversationStep = {
  id: string;
  messages?: ChatMessageProps[];
  options?: {
    text: string;
    nextId: string;
  }[];
  inputRequired?: boolean;
  onInput?: (input: string) => string | null;
  gif?: string;
};

const CONVERSATION_STEPS: Record<string, ConversationStep> = {
  start: {
    id: "start",
    messages: [
      {
        content: "Hello there! 👋",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content:
          "I'm DenisBot, Mwaki Denis's personal AI assistant. Good to see you... uhmm",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "What's your name? 😅",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
    ],
    inputRequired: true,
    onInput: (name) => {
      if (name.trim()) return "profile-created";
      return null;
    },
  },

  "profile-created": {
    id: "profile-created",
    messages: [
      {
        content: "Great to meet you! I hope you feel right at home. 🤗",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "So which mode shall we explore?",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
    ],
    options: [
      { text: "Story Mode", nextId: "story-mode" },
      { text: "Sandbox Mode", nextId: "sandbox-mode" },
      { text: "Action Mode", nextId: "action-mode" },
      { text: "Website Pricing", nextId: "pricing-mode" },
      { text: "End Conversation", nextId: "end-conversation" },
    ],
  },

  "story-mode": {
    id: "story-mode",
    messages: [
      {
        content: "What side of Mwaki's life would you like us to discuss?",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
    ],
    options: [
      { text: "General Life ♻", nextId: "general-life" },
      { text: "Professional Life ⬆", nextId: "professional-life" },
      { text: "Romantic Life ❤", nextId: "romantic-life" },
      { text: "Go Back ↩", nextId: "profile-created" },
    ],
  },

  "romantic-life": {
    id: "romantic-life",
    messages: [],
    gif: "/RomanticLaugh.gif",
    options: [{ text: "Nice Try! 😄", nextId: "try-again" }],
  },

  "try-again": {
    id: "try-again",
    messages: [
      {
        content: "Okay you've had your fun, be serious now. 🧍🏿‍♀️",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "What side of Mwaki's life would you like us to discuss?",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
    ],
    options: [
      { text: "General Life ♻", nextId: "general-life" },
      { text: "Professional Life ⬆", nextId: "professional-life" },
      { text: "Romantic Life ❤", nextId: "romantic-life" },
      { text: "Go Back ↩", nextId: "profile-created" },
    ],
  },

  "general-life": {
    id: "general-life",
    messages: [
      {
        content:
          "Mwaki Denis is passionate about technology and innovation. Outside of work, he enjoys exploring new tech trends, contributing to open source projects, and sharing knowledge with the tech community.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "Would you like to know more?",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
    ],
    options: [
      { text: "Yes absolutely!", nextId: "general-life-more" },
      { text: "No, That's enough", nextId: "story-mode" },
    ],
  },

  "professional-life": {
    id: "professional-life",
    messages: [
      {
        content:
          "Mwaki Denis is a passionate front-end developer with expertise in building responsive web applications. He practices various IT disciplines including UI/UX design, web development, and software development lifecycle management.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "Would you like to know more?",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
    ],
    options: [
      { text: "Yes absolutely!", nextId: "choose-tech" },
      { text: "No, That's enough", nextId: "story-mode" },
    ],
  },

  "choose-tech": {
    id: "choose-tech",
    messages: [
      {
        content: "That's the spirit!! 😎",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "What field would you like me to elaborate on?",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
    ],
    options: [
      { text: "UI/UX Design", nextId: "uiux-design" },
      { text: "Web Development", nextId: "web-development" },
      { text: "SDLC Management", nextId: "sdlc-management" },
      { text: "Go Back ↩", nextId: "story-mode" },
    ],
  },

  /* ✅ FIXED BLOCK */
  "web-development": {
    id: "web-development",
    messages: [
      {
        content: `Denis excels in web development with proficiency in React, TypeScript, and modern front-end frameworks. 
He builds responsive, accessible, and performant web applications with clean, maintainable code. 
His development approach emphasizes component-based architecture and efficient state management.`,
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "What aspect of web development would you like to know more about?",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
    ],
    options: [
      { text: "Frontend Technologies", nextId: "frontend-tech" },
      { text: "Development Philosophy", nextId: "dev-philosophy" },
      { text: "Go Back ↩", nextId: "choose-tech" },
    ],
  },

  "frontend-tech": {
    id: "frontend-tech",
    messages: [
      {
        content:
          "Denis specializes in React.js with TypeScript, Tailwind CSS, Redux, and Zustand, focusing on scalable and maintainable front-end systems.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
    ],
    options: [{ text: "Go Back ↩", nextId: "web-development" }],
  },

  "dev-philosophy": {
    id: "dev-philosophy",
    messages: [
      {
        content:
          "Denis believes in writing clean, maintainable code that solves real-world problems with performance and accessibility in mind.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
    ],
    options: [{ text: "Go Back ↩", nextId: "web-development" }],
  },

  "end-conversation": {
    id: "end-conversation",
    messages: [
      {
        content:
          "Thank you for chatting! Feel free to reach out again anytime. 👋",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
    ],
    options: [{ text: "Start New Chat", nextId: "start" }],
  },
};

const ChatWidget = ({ isOpen, onClose }: ChatWidgetProps) => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentStep, setCurrentStep] = useState("start");
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const step = CONVERSATION_STEPS[currentStep];
      if (step.messages) setMessages(step.messages);
      setShowOptions(!!step.options && !step.inputRequired);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const goToNextStep = (nextId: string) => {
    const step = CONVERSATION_STEPS[nextId];
    if (!step) return;

    setCurrentStep(nextId);
    if (step.messages) {
      setMessages((prev) => [...prev, ...step.messages!]);
    }
    setShowOptions(!!step.options && !step.inputRequired);
  };

  return (
    <Drawer open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent
        className={cn(
          "h-[70vh] sm:h-[600px] max-w-md mx-auto",
          isMobile ? "w-full" : "w-[400px]"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <ChatMessage key={i} {...m} />
            ))}
            {showOptions &&
              CONVERSATION_STEPS[currentStep].options?.map((o, i) => (
                <Button
                  key={i}
                  onClick={() => goToNextStep(o.nextId)}
                  variant="outline"
                  className="w-full mt-2 justify-between"
                >
                  {o.text} <ArrowRight />
                </Button>
              ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ChatWidget;
