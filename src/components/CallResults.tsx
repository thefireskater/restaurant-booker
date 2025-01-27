import { type CallResults, type BookingStatus } from '@/types'
import { Button } from '@/components/ui/button'

interface Props {
    status: BookingStatus
    results: CallResults | null
    onRetry: () => void
}

export function CallResultsView({ status, results, onRetry }: Props) {
    if (status !== 'completed' || !results) {
        return null
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-semibold mb-4">Booking Status</h2>

            {results.reservation_booked ? (
                <div className="flex items-center text-green-600">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p>Reservation successfully booked!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center text-red-600">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <p>Unable to book reservation</p>
                    </div>
                    <Button onClick={onRetry} className="bg-blue-600 hover:bg-blue-700 text-white">
                        Try Again
                    </Button>
                </div>
            )}
        </div>
    )
}
