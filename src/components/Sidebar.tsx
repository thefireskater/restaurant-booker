import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, PlusCircle } from "lucide-react";
import { History } from "./History";

export const Sidebar = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative h-screen w-[280px] border-r",
        "hidden lg:block",
        "bg-white/20 backdrop-blur-sm",
        className
      )}
    >
      {/* Aurora Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px]">
          <div
            className="absolute top-0 left-0 w-[500px] h-[500px] 
              bg-gradient-to-r from-purple-400/30 to-indigo-400/30 
              rounded-full blur-[128px] animate-aurora"
          />
          <div
            className="absolute bottom-0 right-0 w-[500px] h-[500px] 
              bg-gradient-to-r from-indigo-400/30 to-purple-400/30 
              rounded-full blur-[128px] animate-aurora-delay"
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="px-3 py-4">
          <div className="space-y-1">
            <Button
              asChild
              variant="default"
              className="w-full justify-start gap-2 h-auto py-3 bg-gradient-to-r from-purple-400 to-indigo-400 text-white hover:opacity-90"
            >
              <Link href="/bookings/new" className="flex items-center">
                <PlusCircle className="w-4 h-4 mr-2" />
                <span>New Reservation</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* History Section - Flex grow to take available space */}
        <div className="flex-1 px-3 overflow-hidden">
          <h2 className="mb-2 px-4 text-sm font-medium text-muted-foreground">
            Recent Reservations
          </h2>
          <History />
        </div>

        {/* Bottom Navigation */}
        <div className="mt-auto p-3 border-t border-purple-200/20 bg-white/10 backdrop-blur-sm">
          <div className="space-y-1">
            <Button
              asChild
              variant="ghost"
              className="w-full justify-start gap-2 h-auto py-3 hover:bg-purple-400/10"
            >
              <Link href="/" className="flex items-center">
                <Home className="w-4 h-4 mr-2" />
                <span>Home</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
