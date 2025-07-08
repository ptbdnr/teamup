
'use client'

import Link from 'next/link';
import { useState } from 'react';
import { Logo } from '@/components/icons';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { User, Target, Users } from 'lucide-react';
import { Menu } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { href: "/profile", icon: <User />, label: "My Profile" },
    { href: "/projects", icon: <Target />, label: "Project Ideas" },
    { href: "/team", icon: <Users />, label: "My Team" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pl-2">
      <div className="container flex h-14 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="mr-6 pl-6 flex items-center space-x-2">
            <Logo />
            <span className="font-bold">TeamForge</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-2 md:flex">
            {navigationItems.map((item) => (
              <Button key={item.href} variant="link" asChild className="text-muted-foreground">
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="px-0 pr-6 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="pr-0">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex px-2 py-1 text-lg gap-3"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}{item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
