'use client'

import { useState } from 'react'
import { ReservationForm } from '@/components/ReservationForm'
import { CallTranscript } from '@/components/CallTranscript'
import { BookingStatus } from '@/types'
import { makeReservationCall } from '@/services/retellAI'

export default function NewBooking() {
    const [bookingStatus, setBookingStatus] = useState<BookingStatus>('form')
    const [transcript, setTranscript] = useState<string>('')

    const handleSubmit = async (formData) => {
        try {
            setBookingStatus('calling')
            const callTranscript = await makeReservationCall(formData.restaurantPhone, formData.reservationDetails)
            setTranscript(callTranscript.transcript)
            setBookingStatus('completed')
        } catch (error) {
            console.error('Error making reservation call:', error)
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