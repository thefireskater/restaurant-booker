export type BookingStatus = 'form' | 'calling' | 'completed' | 'error'

export interface ReservationFormData {
    name: string
    phoneNumber: string
    restaurantPhone: string
    partySize: number
    date: string
    timeRange: string
    additionalNotes?: string
} 