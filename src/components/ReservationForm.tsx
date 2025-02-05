"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { ReservationFormData } from "@/types";
import { useState } from "react";

interface Props {
  onSubmit: (data: ReservationFormData) => void;
}

export function ReservationForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState<ReservationFormData>({
    name: "Darwin",
    phoneNumber: "55525525555",
    restaurantPhone: "55525525555",
    partySize: 2,
    date: "2025-01-26",
    timeRange: "6:30 PM - 7:30 PM",
    additionalNotes: "",
    restaurantName: "Taqueria La Fiesta",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 pt-4 w-full max-w-2xl mx-auto bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-200/50"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-purple-900">Your Name</Label>
          <Input
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-white/70 border-purple-200/50 focus:border-purple-400 focus:ring-purple-400"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-purple-900">Your Phone Number</Label>
          <Input
            required
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
            className="bg-white/70 border-purple-200/50 focus:border-purple-400 focus:ring-purple-400"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-purple-900">Restaurant Name</Label>
          <Input
            required
            type="text"
            value={formData.restaurantName}
            onChange={(e) =>
              setFormData({ ...formData, restaurantName: e.target.value })
            }
            className="bg-white/70 border-purple-200/50 focus:border-purple-400 focus:ring-purple-400"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-purple-900">Restaurant Phone Number</Label>
          <Input
            required
            type="tel"
            value={formData.restaurantPhone}
            onChange={(e) =>
              setFormData({ ...formData, restaurantPhone: e.target.value })
            }
            className="bg-white/70 border-purple-200/50 focus:border-purple-400 focus:ring-purple-400"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-purple-900">Party Size</Label>
          <Input
            required
            type="number"
            min="1"
            value={formData.partySize}
            onChange={(e) =>
              setFormData({ ...formData, partySize: parseInt(e.target.value) })
            }
            className="bg-white/70 border-purple-200/50 focus:border-purple-400 focus:ring-purple-400"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-purple-900">Date</Label>
          <Input
            required
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="bg-white/70 border-purple-200/50 focus:border-purple-400 focus:ring-purple-400"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-purple-900">Preferred Time Range</Label>
        <Input
          required
          placeholder="e.g., 6:30 PM - 7:30 PM"
          value={formData.timeRange}
          onChange={(e) =>
            setFormData({ ...formData, timeRange: e.target.value })
          }
          className="bg-white/70 border-purple-200/50 focus:border-purple-400 focus:ring-purple-400"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-purple-900">Additional Notes</Label>
        <Textarea
          value={formData.additionalNotes}
          onChange={(e) =>
            setFormData({ ...formData, additionalNotes: e.target.value })
          }
          placeholder="Any special requests or preferences?"
          className="h-24 bg-white/70 border-purple-200/50 focus:border-purple-400 focus:ring-purple-400"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-medium py-2 rounded-lg transition-all duration-200"
      >
        Make Reservation
      </Button>
    </form>
  );
}
