'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { ReservationFormData } from '@/types'

interface Props {
    onSubmit: (data: ReservationFormData) => void
}

export function ReservationForm({ onSubmit }: Props) {
    const [formData, setFormData] = useState<ReservationFormData>({
        name: 'Darwin',
        phoneNumber: '55525525555',
        restaurantPhone: '55525525555',
        partySize: 2,
        date: '2025-01-26',
        timeRange: '6:30 PM - 7:30 PM',
        additionalNotes: '',
        restaurantName: 'Taqueria La Fiesta'
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Your Name</label>
                    <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Your Phone Number</label>
                    <Input
                        required
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Restaurant Phone Number</label>
                    <Input
                        required
                        type="tel"
                        value={formData.restaurantPhone}
                        onChange={(e) => setFormData({ ...formData, restaurantPhone: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Restaurant Name</label>
                    <Input
                        required
                        type="text"
                        value={formData.restaurantName}
                        onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                    />
                </div>


                <div>
                    <label className="block text-sm font-medium mb-1">Party Size</label>
                    <Input
                        required
                        type="number"
                        min="1"
                        value={formData.partySize}
                        onChange={(e) => setFormData({ ...formData, partySize: parseInt(e.target.value) })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Date</label>
                    <Input
                        required
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Preferred Time Range</label>
                    <Input
                        required
                        placeholder="e.g., 6:30 PM - 7:30 PM"
                        value={formData.timeRange}
                        onChange={(e) => setFormData({ ...formData, timeRange: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Additional Notes</label>
                    <Textarea
                        value={formData.additionalNotes}
                        onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                        placeholder="Any special requests or preferences?"
                    />
                </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Make Reservation
            </Button>
        </form>
    )
} 