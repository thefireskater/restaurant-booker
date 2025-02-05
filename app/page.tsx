"use client";

import { useState } from "react";
import { ReservationForm } from "@/components/ReservationForm";
import { CallTranscript } from "@/components/CallTranscript";
import { BookingStatus, CallResults, Transcript } from "@/types";
import { makeReservationCall } from "@/services/retellAI";
import { ReservationFormData } from "@/types";
import { CallResultsView } from "@/components/CallResults";
import { Hero } from "@/components/Hero";

export default function NewBooking() {
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>("form");
  const [transcript, setTranscript] = useState<Transcript>([
    {
      role: "assistant",
      content:
        "Hello! I'm your restaurant reservation assistant. I'll help you make a reservation by calling the restaurant on your behalf. Please fill out the form below to get started.",
    },
  ]);
  const [callResults, setCallResults] = useState<CallResults | null>(null);

  const handleSubmit = async (formData: ReservationFormData) => {
    try {
      setBookingStatus("calling");

      await makeReservationCall({
        formData,
        updateTranscript: setTranscript,
        onCallEnd: () => {
          setBookingStatus("completed");
        },
        onCallStart: () => {
          setBookingStatus("calling");
        },
        setCallResults: setCallResults,
      });
    } catch (error) {
      console.error("Error making reservation call:", error);
      setBookingStatus("error");
    }
  };

  return (
    <div className="space-y-6">
      <div className=" flex items-center justify-center">
        {bookingStatus === "form" ? (
          <div className="relative space-y-6 flex flex-col md:flex-row justify-between items-center w-full gap-4 bg-white/20 backdrop-blur-sm rounded-xl p-6 overflow-hidden">
            {/* Aurora Background Effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -inset-[10px]">
                <div
                  className="absolute top-0 left-0 w-[1000px] h-[1000px] 
                bg-gradient-to-r from-purple-400/30 to-indigo-400/30 
                rounded-full blur-[128px] animate-aurora"
                />
                <div
                  className="absolute bottom-0 right-0 w-[1000px] h-[1000px] 
                bg-gradient-to-r from-indigo-400/30 to-purple-400/30 
                rounded-full blur-[128px] animate-aurora-delay"
                />
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center w-full gap-4">
              <Hero />
              <ReservationForm onSubmit={handleSubmit} />
            </div>
          </div>
        ) : (
          <div className="space-y-6 flex flex-col items-center w-full">
            <CallTranscript
              status={bookingStatus}
              transcript={transcript}
              onRetry={() => setBookingStatus("form")}
            />
            <CallResultsView
              status={bookingStatus}
              results={callResults}
              onRetry={() => setBookingStatus("form")}
            />
          </div>
        )}
      </div>
    </div>
  );
}
