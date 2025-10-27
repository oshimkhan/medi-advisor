import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Trash2, MessageSquare, Clock, RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Conversation {
  id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
  message_count?: number;
  preview?: string;
}

const ChatHistory = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchConversations = async () => {
    setLoading(true);
    try {
      // If user is authenticated, fetch from database
      if (user) {
        const { data: conversationsData, error: conversationsError } = await supabase
          .from("chat_conversations")
          .select("*")
          .eq("user_id", user.id)
          .order("updated_at", { ascending: false });

        if (conversationsError) throw conversationsError;

        // Fetch message counts and previews for each conversation
        const conversationsWithDetails = await Promise.all(
          (conversationsData || []).map(async (conv) => {
            const { data: messagesData } = await supabase
              .from("chat_messages")
              .select("content, role")
              .eq("conversation_id", conv.id)
              .order("created_at", { ascending: false })
              .limit(3);

            const messageCount = messagesData?.length || 0;
            const lastMessage = messagesData?.find((m) => m.role === "user");
            const preview = lastMessage?.content?.substring(0, 100) || "No messages";

            return {
              ...conv,
              message_count: messageCount,
              preview,
            };
          })
        );

        setConversations(conversationsWithDetails);
      } else {
        // For guest users, fetch from localStorage
        const historyData = JSON.parse(localStorage.getItem('chat-history') || '[]');
        
        const formattedConversations = historyData.map((conv: any) => ({
          id: conv.id,
          title: conv.title || `Conversation ${new Date(conv.lastUpdated).toLocaleDateString()}`,
          created_at: conv.lastUpdated,
          updated_at: conv.lastUpdated,
          message_count: conv.messages?.length || 0,
          preview: conv.messages?.find((m: any) => m.role === "user")?.content?.substring(0, 100) || "No messages",
        }));

        setConversations(formattedConversations);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load chat history",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [user]);

  const handleDelete = async (conversationId: string) => {
    try {
      if (user) {
        // Delete from database for authenticated users
        const { error } = await supabase
          .from("chat_conversations")
          .delete()
          .eq("id", conversationId);

        if (error) throw error;
      } else {
        // Delete from localStorage for guest users
        const historyData = JSON.parse(localStorage.getItem('chat-history') || '[]');
        const updatedHistory = historyData.filter((c: any) => c.id !== conversationId);
        localStorage.setItem('chat-history', JSON.stringify(updatedHistory));
      }

      toast({
        title: "Deleted",
        description: "Conversation deleted successfully",
      });

      fetchConversations();
    } catch (error) {
      console.error("Error deleting conversation:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete conversation",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return "Today";
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 7) {
      return `${days} days ago`;
    } else if (days < 30) {
      const weeks = Math.floor(days / 7);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto py-8 max-w-4xl px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Chat History</h1>
            <p className="text-muted-foreground mt-2">
              Your past conversations with MediAssist AI
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchConversations} disabled={loading} variant="outline" size="sm">
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button onClick={() => navigate("/")} variant="default" size="sm">
              New Chat
            </Button>
          </div>
        </div>

        {loading && conversations.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Loading conversations...</p>
              </div>
            </CardContent>
          </Card>
        ) : conversations.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No conversations yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start a new conversation to get medical advice from MediAssist AI
                </p>
                <Button onClick={() => navigate("/")}>Start New Chat</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {conversations.map((conversation) => (
              <Card
                key={conversation.id}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => navigate(`/chat/${conversation.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                        <h3 className="font-semibold truncate">
                          {conversation.title || "New Conversation"}
                        </h3>
                      </div>
                      {conversation.preview && (
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {conversation.preview}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(conversation.updated_at)}
                        </div>
                        {conversation.message_count !== undefined && (
                          <span>{conversation.message_count} messages</span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(conversation.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHistory;

