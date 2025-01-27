'use client'

import { useState } from 'react'
import { ReservationForm } from '@/components/ReservationForm'
import { CallTranscript } from '@/components/CallTranscript'
import { BookingStatus, CallResults, Transcript } from '@/types'
import { makeReservationCall } from '@/services/retellAI'
import { ReservationFormData } from '@/types'
import { CallResultsView } from '@/components/CallResults'
export default function NewBooking() {
    const [bookingStatus, setBookingStatus] = useState<BookingStatus>('form')
    const [transcript, setTranscript] = useState<Transcript>([{ role: 'user', content: 'Hello' }])
    const [callResults, setCallResults] = useState<CallResults | null>(null)

    const handleSubmit = async (formData: ReservationFormData) => {
        try {
            setBookingStatus('calling')

            await makeReservationCall({
                formData,
                updateTranscript: setTranscript,
                onCallEnd: () => {
                    setBookingStatus('completed')
                },
                onCallStart: () => {
                    setBookingStatus('calling')
                },
                setCallResults: setCallResults
            })
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
                    <>
                        <CallTranscript
                            status={bookingStatus}
                            transcript={transcript}
                            onRetry={() => setBookingStatus('form')}
                        />
                        <CallResultsView
                            status={bookingStatus}
                            results={callResults}
                            onRetry={() => setBookingStatus('form')}
                        />
                    </>
                )}

            </div>
        </main>
    )
} 