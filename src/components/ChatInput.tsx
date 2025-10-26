import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput = ({ onSend, isLoading }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-card border-t border-border">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe your symptoms... (e.g., 'I have a headache and fever for 2 days')"
        className="min-h-[60px] max-h-[120px] resize-none"
        disabled={isLoading}
      />
      <Button
        type="submit"
        size="icon"
        className="h-[60px] w-[60px] bg-gradient-to-br from-primary to-secondary hover:opacity-90 transition-opacity"
        disabled={isLoading || !input.trim()}
      >
        <Send className="w-5 h-5" />
      </Button>
    </form>
  );
};
