import { Button } from "@/components/ui/button"
import { User, Users, Menu } from "lucide-react"
import Link from "next/link"

export function DirectoryHeader() {
  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Alumni Portal</span>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            <Link href="/directory">
              <Button variant="ghost">Directory</Button>
            </Link>
            <Link href="/connections">
              <Button variant="ghost">Connections</Button>
            </Link>
            <Link href="/community">
              <Button variant="ghost">Community</Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </nav>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
