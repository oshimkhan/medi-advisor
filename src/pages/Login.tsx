import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { Chrome, Phone } from "lucide-react";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [mode, setMode] = useState<"phone" | "verify">("phone");
  const { signInWithGoogle, signInWithPhone } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  const handlePhoneSignIn = async () => {
    if (!phone.trim()) return;
    await signInWithPhone(phone);
    setMode("verify");
  };

  const handleCodeVerification = async () => {
    const { supabase } = await import("@/integrations/supabase/client");
    const { error } = await supabase.auth.verifyOtp({
      phone,
      token: code,
      type: "sms",
    });

    if (error) {
      console.error("Error verifying code:", error);
      return;
    }

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <CardTitle className="text-2xl">Welcome to MediAssist AI</CardTitle>
          <CardDescription>
            Sign in to access your medical assistant
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleGoogleSignIn}
            className="w-full"
            variant="outline"
          >
            <Chrome className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {mode === "phone" ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handlePhoneSignIn();
                    }
                  }}
                />
              </div>
              <Button onClick={handlePhoneSignIn} className="w-full" variant="outline">
                <Phone className="mr-2 h-4 w-4" />
                Continue with Phone
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCodeVerification();
                    }
                  }}
                />
              </div>
              <Button onClick={handleCodeVerification} className="w-full">
                Verify Code
              </Button>
              <Button
                onClick={() => setMode("phone")}
                className="w-full"
                variant="ghost"
              >
                Change Phone Number
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

