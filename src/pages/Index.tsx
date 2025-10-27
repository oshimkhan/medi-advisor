import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { WelcomeCard } from "@/components/WelcomeCard";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { History, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Save message to localStorage (for guests) or database (for authenticated users)
  const saveMessageToDB = async (message: Message) => {
    // For authenticated users, save to database
    if (user && conversationId) {
      try {
        const { error } = await supabase.from("chat_messages").insert({
          conversation_id: conversationId,
          role: message.role,
          content: message.content,
        });

        if (error) throw error;
      } catch (error) {
        console.error("Error saving message:", error);
      }
      return;
    }

    // For guest users, save to localStorage
    try {
      const historyKey = 'chat-history';
      const existingHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
      
      const conversation = {
        id: conversationId || Date.now().toString(),
        messages: [...messages, message],
        lastUpdated: new Date().toISOString(),
      };

      const updatedHistory = [
        conversation,
        ...existingHistory.filter((c: any) => c.id !== conversationId)
      ];

      localStorage.setItem(historyKey, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  // Create or update conversation
  const createOrUpdateConversation = async (title?: string) => {
    // For authenticated users, save to database
    if (user) {
      try {
        if (!conversationId) {
          const { data, error } = await supabase
            .from("chat_conversations")
            .insert({
              user_id: user.id,
              title: title || null,
            })
            .select()
            .single();

          if (error) throw error;
          setConversationId(data.id);
          return data.id;
        } else {
          if (messages.length === 0 && title) {
            await supabase
              .from("chat_conversations")
              .update({ title })
              .eq("id", conversationId);
          }
          return conversationId;
        }
      } catch (error) {
        console.error("Error creating conversation:", error);
        return null;
      }
    }

    // For guest users, use localStorage
    if (!conversationId) {
      const newId = Date.now().toString();
      setConversationId(newId);
      return newId;
    }

    return conversationId;
  };

  const sendMessage = async (userInput: string) => {
    // Ensure we have a conversation
    const convId = await createOrUpdateConversation();
    if (!convId && user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create conversation",
      });
      return;
    }

    const userMessage: Message = { role: "user", content: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Save user message (to database or localStorage)
    await saveMessageToDB(userMessage);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/medical-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: [...messages, userMessage] }),
        }
      );

      if (response.status === 429) {
        toast({
          variant: "destructive",
          title: "Rate limit exceeded",
          description: "Please try again in a moment.",
        });
        setIsLoading(false);
        return;
      }

      if (response.status === 402) {
        toast({
          variant: "destructive",
          title: "Payment required",
          description: "Please add credits to your AI workspace.",
        });
        setIsLoading(false);
        return;
      }

      if (!response.ok || !response.body) {
        throw new Error("Failed to get response");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;
      let assistantContent = "";

      const upsertAssistant = (chunk: string) => {
        assistantContent += chunk;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return prev.map((m, i) =>
              i === prev.length - 1 ? { ...m, content: assistantContent } : m
            );
          }
          return [...prev, { role: "assistant", content: assistantContent }];
        });
      };

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as
              | string
              | undefined;
            if (content) upsertAssistant(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as
              | string
              | undefined;
            if (content) upsertAssistant(content);
          } catch {
            /* ignore */
          }
        }
      }

      // Save assistant message (to database or localStorage)
      if (assistantContent && conversationId) {
        await saveMessageToDB({ role: "assistant", content: assistantContent });
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get response. Please try again.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-background to-muted/20">
      <header className="bg-card border-b border-border p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">MediAssist AI</h1>
              <p className="text-xs text-muted-foreground">Virtual Medical Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate("/chat-history")}
              variant="outline"
              size="sm"
            >
              <History className="w-4 h-4 mr-2" />
              History
            </Button>
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-10 w-10 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user.email?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.email}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.phone || "No phone"}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/chat-history")}>
                    <History className="w-4 h-4 mr-2" />
                    Chat History
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/login-history")}>
                    <History className="w-4 h-4 mr-2" />
                    Login History
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={async () => {
                    await signOut();
                    navigate("/login");
                  }} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {!user && (
              <Button
                onClick={() => navigate("/login")}
                variant="ghost"
                size="sm"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollRef}>
          <div className="container mx-auto max-w-4xl">
            {messages.length === 0 ? (
              <WelcomeCard />
            ) : (
              <div className="space-y-4 p-6">
                {messages.map((message, index) => (
                  <ChatMessage key={index} role={message.role} content={message.content} />
                ))}
                {isLoading && <TypingIndicator />}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="border-t border-border bg-card">
        <div className="container mx-auto max-w-4xl">
          <ChatInput onSend={sendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Index;
