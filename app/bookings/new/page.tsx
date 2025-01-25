'use client'

import { useState } from 'react'
import { ReservationForm } from '@/components/ReservationForm'
import { CallTranscript } from '@/components/CallTranscript'
import { BookingStatus } from '@/types'

export default function NewBooking() {
    const [bookingStatus, setBookingStatus] = useState<BookingStatus>('form')
    const [transcript, setTranscript] = useState<string>('')

    const handleSubmit = async (formData: any) => {
        try {
            setBookingStatus('calling')
            // TODO: Implement Retell.ai API call
            // Mock response for now
            await new Promise(resolve => setTimeout(resolve, 2000))
            setTranscript('Mock transcript of the call...')
            setBookingStatus('completed')
        } catch (error) {
            setBookingStatus('error')
        }
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">New Reservation</h1>

                {bookingStatus === 'form' && (
                    <ReservationForm onSubmit={handleSubmit} />
                )}

                {bookingStatus !== 'form' && (
                    <CallTranscript
                        status={bookingStatus}
                        transcript={transcript}
                        onRetry={() => setBookingStatus('form')}
                    />
                )}
            </div>
        </main>
    )
} 