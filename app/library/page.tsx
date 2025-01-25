import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Library() {
    // Mock data - replace with actual database fetch
    const mockBookings = [
        {
            id: 1,
            restaurant: "Joe's Diner",
            date: '2024-03-20',
            status: 'completed',
        },
        // Add more mock bookings as needed
    ]

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Reservation History</h1>
                    <Link href="/bookings/new">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            New Reservation
                        </Button>
                    </Link>
                </div>

                <div className="space-y-4">
                    {mockBookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-xl font-semibold">{booking.restaurant}</h3>
                            <p className="text-gray-600">Date: {booking.date}</p>
                            <p className="text-gray-600">Status: {booking.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
} 