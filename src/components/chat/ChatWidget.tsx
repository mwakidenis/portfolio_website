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

// Conversation flow and persona structure
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
  "start": {
    id: "start",
    messages: [
      {
        content: "Hello there! 👋",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "I'm DenisBot, Denis Mwaki's personal AI assistant. Good to see you... uhmm",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "What's your name? 😅",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    inputRequired: true,
    onInput: (name) => {
      if (name.trim()) {
        return "profile-created";
      }
      return null;
    }
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
      }
    ],
    options: [
      { text: "Story Mode", nextId: "story-mode" },
      { text: "Sandbox Mode", nextId: "sandbox-mode" },
      { text: "Action Mode", nextId: "action-mode" },
      { text: "Website Pricing", nextId: "pricing-mode" },
      { text: "End Conversation", nextId: "end-conversation" },
    ]
  },
  "story-mode": {
    id: "story-mode",
    messages: [
      {
        content: "What side of Denis Mwaki's life would you like us to discuss?",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "General Life ♻", nextId: "general-life" },
      { text: "Professional Life ⬆", nextId: "professional-life" },
      { text: "Romantic Life ❤", nextId: "romantic-life" },
      { text: "Go Back ↩", nextId: "profile-created" },
    ]
  },
  "romantic-life": {
    id: "romantic-life",
    messages: [],
    gif: "/RomanticLaugh.gif",
    options: [
      { text: "Nice Try! 😄", nextId: "try-again" },
    ]
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
        content: "What side of Denis Mwaki's life would you like us to discuss?",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "General Life ♻", nextId: "general-life" },
      { text: "Professional Life ⬆", nextId: "professional-life" },
      { text: "Romantic Life ❤", nextId: "romantic-life" },
      { text: "Go Back ↩", nextId: "profile-created" },
    ]
  },
  "general-life": {
    id: "general-life",
    messages: [
      {
        content: "Denis Mwaki is passionate about technology and innovation. Outside of work, he enjoys exploring new tech trends, contributing to open source projects, and sharing knowledge with the tech community.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "Would you like to know more?",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Yes absolutely!", nextId: "general-life-more" },
      { text: "No, That's enough", nextId: "story-mode" },
    ]
  },
  // ... continue all steps, replacing "Marklewis" / "Marklogic" with "Denis Mwaki" / "DenisBot"
  // This includes professional-life, sandbox-mode, action-mode, pricing-mode, etc.
};

const ChatWidget = ({ isOpen, onClose }: ChatWidgetProps) => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [currentStep, setCurrentStep] = useState("start");
  const [showOptions, setShowOptions] = useState(false);
  const [userName, setUserName] = useState("");
  const [showGif, setShowGif] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialStep = CONVERSATION_STEPS[currentStep];
      if (initialStep.messages) {
        setMessages(initialStep.messages);
      }
      setShowOptions(!!initialStep.options && !initialStep.inputRequired);
      if (initialStep.gif) {
        setShowGif(initialStep.gif);
      }
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages, isOpen, showOptions, showGif]);

  const goToNextStep = (nextStepId: string) => {
    const step = CONVERSATION_STEPS[nextStepId];
    if (!step) return;

    setCurrentStep(nextStepId);

    const option = CONVERSATION_STEPS[currentStep]?.options?.find(opt => opt.nextId === nextStepId);
    if (option) {
      const userMessage: ChatMessageProps = {
        content: option.text,
        timestamp: new Date(),
        sender: "user",
        status: "delivered"
      };
      setMessages(prev => [...prev, userMessage]);
    }

    if (step.messages && step.messages.length > 0) {
      setTimeout(() => {
        setMessages(prev => [...prev, ...step.messages!]);
        setShowOptions(!!step.options && !step.inputRequired);
      }, 500);
    } else {
      setShowOptions(!!step.options && !step.inputRequired);
    }

    if (step.gif) {
      setShowGif(step.gif);
    } else {
      setShowGif(null);
    }

    // Handle section navigation
    if (nextStepId === "goto-projects") {
      const projectsElement = document.getElementById("projects-section");
      if (projectsElement) {
        setTimeout(() => {
          projectsElement.scrollIntoView({ behavior: "smooth" });
          onClose();
        }, 1000);
      }
    }
    if (nextStepId === "goto-skills") {
      const skillsElement = document.getElementById("skills-section");
      if (skillsElement) {
        setTimeout(() => {
          skillsElement.scrollIntoView({ behavior: "smooth" });
          onClose();
        }, 1000);
      }
    }
    if (nextStepId === "goto-blog") {
      setTimeout(() => {
        window.location.href = "/blog";
      }, 1000);
    }
    if (nextStepId === "goto-contact") {
      const contactElement = document.getElementById("contact-section");
      if (contactElement) {
        setTimeout(() => {
          contactElement.scrollIntoView({ behavior: "smooth" });
          onClose();
        }, 1000);
      }
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newMessage.trim() && !CONVERSATION_STEPS[currentStep].inputRequired) return;

    const userMessage: ChatMessageProps = {
      content: newMessage,
      timestamp: new Date(),
      sender: "user",
      status: "sending"
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsSending(true);

    try {
      const currentStepData = CONVERSATION_STEPS[currentStep];

      if (currentStep === "start") {
        setUserName(newMessage);
        toast.success(`Welcome, ${newMessage}!`);
      }

      let nextStepId = null;
      if (currentStepData.onInput) {
        nextStepId = currentStepData.onInput(newMessage);
      }

      setMessages(prev =>
        prev.map(msg =>
          msg === userMessage ? { ...msg, status: "delivered" } : msg
        )
      );

      if (nextStepId) {
        setTimeout(() => {
          goToNextStep(nextStepId!);
        }, 500);
      }

    } catch (error) {
      setMessages(prev =>
        prev.map(msg =>
          msg === userMessage ? { ...msg, status: "error" } : msg
        )
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className={cn(
        "h-[70vh] sm:h-[600px] max-w-md mx-auto rounded-t-xl",
        isMobile ? "w-full" : "w-[400px] fixed bottom-0 left-4 sm:left-6"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <img src="/myPic.jpg" alt="Denis Mwaki" className="h-full w-full object-cover" />
                </div>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
              </div>
              <div>
                <h3 className="font-medium">DenisBot</h3>
                <p className="text-xs text-muted-foreground">Denis Mwaki's personal assistant</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}

            {showGif && (
              <div className="flex justify-center my-4 animate-fade-in">
                <img 
                  src={showGif} 
                  alt="Chat Animation" 
                  className="rounded-lg max-w-full max-h-48 object-contain" 
                />
              </div>
            )}

            {showOptions && CONVERSATION_STEPS[currentStep].options && (
              <div className="flex flex-col gap-2 mt-4 animate-fade-in">
                {CONVERSATION_STEPS[currentStep].options!.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => goToNextStep(option.nextId)}
                    variant="outline"
                    className="justify-start hover:bg-primary/10 transition-all"
                  >
                    {option.text} 
                    {!option.text.includes("Go Back") && <ArrowRight className="ml-auto" />}
                  </Button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {CONVERSATION_STEPS[currentStep].inputRequired && (
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isSending}
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={isSending || !newMessage.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </form>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ChatWidget;
