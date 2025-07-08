'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { CardContent, CardFooter } from './ui/card';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const router = useRouter();

  const calculateTimeLeft = (): TimeLeft | null => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // Set initial value on client-side to avoid hydration mismatch
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      if (newTimeLeft) {
        setTimeLeft(newTimeLeft);
      } else {
        clearInterval(timer);
        router.push('/team');
      }
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate, router]);
  
  const formatTimeUnit = (unit: number) => unit.toString().padStart(2, '0');

  return (
    <>
      <CardContent>
        <div className="flex justify-center gap-4 text-center my-8">
            {timeLeft ? (
                <>
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg w-24">
                        <span className="text-4xl font-bold text-primary">{formatTimeUnit(timeLeft.days)}</span>
                        <span className="text-sm text-muted-foreground">Days</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg w-24">
                        <span className="text-4xl font-bold text-primary">{formatTimeUnit(timeLeft.hours)}</span>
                        <span className="text-sm text-muted-foreground">Hours</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg w-24">
                        <span className="text-4xl font-bold text-primary">{formatTimeUnit(timeLeft.minutes)}</span>
                        <span className="text-sm text-muted-foreground">Minutes</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg w-24">
                        <span className="text-4xl font-bold text-primary">{formatTimeUnit(timeLeft.seconds)}</span>
                        <span className="text-sm text-muted-foreground">Seconds</span>
                    </div>
                </>
            ) : (
                <div className="p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-primary">Loading...</p>
                </div>
            )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <Button onClick={() => router.push('/projects')} size="lg">
          Skip and See Project Ideas now
        </Button>
        <p className="text-xs text-muted-foreground">(This is a temporary feature for testing)</p>
      </CardFooter>
    </>
  );
}
