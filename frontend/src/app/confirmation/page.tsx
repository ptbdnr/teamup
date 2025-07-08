import Header from "@/components/Header";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Timer } from "lucide-react";

export default function ConfirmationPage() {
  const registrationDeadline = new Date();
  registrationDeadline.setDate(registrationDeadline.getDate() + 3); // Set deadline 3 days from now

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl text-center">
          <CardHeader>
            <Timer className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-3xl font-bold">You're All Set!</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              Your profile is submitted. Please allow others to also complete their profiles.
              Projects will be created when the timer runs out. Get ready to collaborate!
            </CardDescription>
          </CardHeader>
          <CountdownTimer targetDate={registrationDeadline.toISOString()} />
        </Card>
      </main>
    </div>
  );
}
