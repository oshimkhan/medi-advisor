import { Card } from "./ui/card";
import { AlertCircle, Stethoscope, Brain, Heart } from "lucide-react";

export const WelcomeCard = () => {
  const features = [
    {
      icon: Stethoscope,
      title: "Symptom Analysis",
      description: "Describe your symptoms and get insights",
    },
    {
      icon: Brain,
      title: "Smart Recommendations",
      description: "Find the right medical specialist",
    },
    {
      icon: Heart,
      title: "Health Education",
      description: "Learn about conditions and treatments",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          MediAssist AI
        </h1>
        <p className="text-muted-foreground">
          Your Virtual Medical Assistant
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index} className="p-4 hover:shadow-md transition-shadow">
            <feature.icon className="w-8 h-8 text-primary mb-2" />
            <h3 className="font-semibold mb-1">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-warning/10 border-warning/20">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
          <div className="text-sm space-y-1">
            <p className="font-semibold text-warning-foreground">Important Disclaimer</p>
            <p className="text-muted-foreground">
              This AI assistant provides information only and is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns. In case of emergency, call 911 immediately.
            </p>
          </div>
        </div>
      </Card>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Start by describing your symptoms below 👇
        </p>
      </div>
    </div>
  );
};
