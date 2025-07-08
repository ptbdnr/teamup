import Link from 'next/link';
import { Logo } from '@/components/icons';
import { Button } from './ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6" />
            <span className="font-bold">TeamForge</span>
          </Link>
          <nav className="hidden items-center space-x-2 md:flex">
            <Button variant="link" asChild className="text-muted-foreground">
                <Link href="/team">My Team</Link>
            </Button>
            <Button variant="link" asChild className="text-muted-foreground">
                <Link href="/teams-graph">All Teams</Link>
            </Button>
             <Button variant="link" asChild className="text-muted-foreground">
                <Link href="/team-swap">Find Teams</Link>
            </Button>
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
             <Button asChild>
                <Link href="/profile">My Profile</Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
