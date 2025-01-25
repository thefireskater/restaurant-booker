import { BookingStatus } from '@/types'
import { Button } from '@/components/ui/button'

interface Props {
    status: BookingStatus
    transcript: string
    onRetry: () => void
}

export function CallTranscript({ status, transcript, onRetry }: Props) {
    return (
        <div className="space-y-4">
            {status === 'calling' && (
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Making the call to the restaurant...</p>
                </div>
            )}

            {status === 'completed' && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Call Transcript</h2>
                    <div className="whitespace-pre-wrap text-gray-600">
                        {transcript}
                    </div>
                </div>
            )}

            {status === 'error' && (
                <div className="text-center py-8">
                    <p className="text-red-600 mb-4">Something went wrong while making the call.</p>
                    <Button onClick={onRetry} className="bg-blue-600 hover:bg-blue-700 text-white">
                        Try Again
                    </Button>
                </div>
            )}
        </div>
    )
} 