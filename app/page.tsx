import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Restaurant Reservation Assistant</h1>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
            <p className="text-gray-600 mb-6">
              Let our AI assistant help you make restaurant reservations. Simply provide the details,
              and our bot will make the call on your behalf.
            </p>
            <Link href="/bookings/new">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Make New Reservation
              </Button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Recent Reservations</h2>
            <Link href="/library">
              <Button variant="outline" className="w-full">
                View Reservation History
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
