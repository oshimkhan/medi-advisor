import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Trash2, RefreshCw } from "lucide-react";

interface LoginHistoryRecord {
  id: string;
  login_at: string;
  ip_address: string | null;
  user_agent: string | null;
}

const LoginHistory = () => {
  const [loginHistory, setLoginHistory] = useState<LoginHistoryRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchLoginHistory = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("login_history")
        .select("*")
        .order("login_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      setLoginHistory(data || []);
    } catch (error) {
      console.error("Error fetching login history:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load login history",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoginHistory();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDeviceInfo = (userAgent: string | null) => {
    if (!userAgent) return "Unknown";
    
    if (userAgent.includes("Mobile")) {
      return "Mobile Device";
    } else if (userAgent.includes("Tablet")) {
      return "Tablet";
    } else {
      return "Desktop";
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Login History</h1>
          <p className="text-muted-foreground mt-2">
            View your recent login activity and sessions
          </p>
        </div>
        <Button onClick={fetchLoginHistory} disabled={loading} variant="outline">
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Logins</CardTitle>
          <CardDescription>
            Last {loginHistory.length} login attempts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && loginHistory.length === 0 ? (
            <div className="text-center py-8">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">Loading login history...</p>
            </div>
          ) : loginHistory.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No login history found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loginHistory.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      {formatDate(record.login_at)}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {record.ip_address || "N/A"}
                    </TableCell>
                    <TableCell>
                      {getDeviceInfo(record.user_agent)}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginHistory;

