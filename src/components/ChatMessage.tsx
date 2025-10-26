import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-lg transition-all duration-300",
        isUser ? "bg-primary/5 ml-8" : "bg-card mr-8"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser ? "bg-primary" : "bg-gradient-to-br from-primary to-secondary"
        )}
      >
        {isUser ? (
          <User className="w-5 h-5 text-primary-foreground" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          {isUser ? "You" : "MediAssist AI"}
        </p>
        <div className="text-foreground whitespace-pre-wrap leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
};
