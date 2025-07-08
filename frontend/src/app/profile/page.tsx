import Header from "@/components/Header";
import { ProfileForm } from "./ProfileForm";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <Card className="mb-8 bg-primary/10 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Bot className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-2xl">Create Your Profile with AI</CardTitle>
                <CardDescription>
                  Simply chat with our AI assistant below. Tell it about your skills, background and interests.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
        <ProfileForm />
      </main>
    </div>
  );
}
