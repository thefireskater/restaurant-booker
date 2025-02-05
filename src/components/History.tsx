import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data - move to a data layer later
const mockBookings = [
  {
    id: 1,
    restaurant: "Joe's Diner",
    date: "2024-03-20",
    status: "completed",
    lastMessage: "Reservation confirmed for 4 people at 7:00 PM",
  },
  {
    id: 2,
    restaurant: "Sushi Roku",
    date: "2024-03-19",
    status: "failed",
    lastMessage: "Unable to complete reservation",
  },
  {
    id: 3,
    restaurant: "Pizza Palace",
    date: "2024-03-18",
    status: "completed",
    lastMessage: "Reservation confirmed for 2 people at 6:30 PM",
  },
];

export function History() {
  return (
    <ScrollArea className="h-[450px]">
      <div className="space-y-1 px-1">
        {mockBookings.map((booking) => (
          <Link
            key={booking.id}
            href={`/library/${booking.id}`}
            className={cn(
              "flex items-center gap-2 w-full rounded-lg p-2",
              "hover:bg-accent/50 transition-colors",
              "text-sm text-muted-foreground hover:text-foreground",
              "group"
            )}
          >
            <MessageSquare
              className={cn(
                "w-4 h-4 shrink-0",
                booking.status === "completed"
                  ? "text-green-500"
                  : "text-yellow-500"
              )}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium truncate">{booking.restaurant}</p>
              </div>
              <p className="text-xs truncate">
                {new Date(booking.date).toLocaleDateString()}
              </p>
            </div>
            <span
              className={cn(
                "text-xs px-1.5 py-0.5 rounded-full hidden group-hover:block",
                booking.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              )}
            >
              {booking.status}
            </span>
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}
