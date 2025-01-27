export type BookingStatus = 'form' | 'calling' | 'completed' | 'error'

export interface ReservationFormData {
    name: string
    phoneNumber: string
    restaurantPhone: string
    partySize: number
    date: string
    timeRange: string
    additionalNotes?: string,
    restaurantName: string
}

export type Transcript = {
    role: string
    content: string
}[]

export type CallResults = {
    reservation_booked: boolean
}