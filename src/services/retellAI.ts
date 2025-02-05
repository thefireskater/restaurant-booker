import Retell from 'retell-sdk';

const RETELL_API_KEY = process.env.NEXT_PUBLIC_RETELL_API_KEY;
const AGENT_ID = 'agent_abb0513f269b3a4dfc6b6a8ec1';

import { RetellWebClient } from "retell-client-js-sdk";


import { CallResults, ReservationFormData, Transcript } from '@/types'
import { PhoneCallResponse } from 'retell-sdk/resources/call.mjs';

interface RetellResponse {
    transcript: string;
    success: boolean;
}



export async function makeReservationCall({
    formData,
    updateTranscript,
    onCallEnd,
    onCallStart,
    setCallResults
}: {
    formData: ReservationFormData,
    updateTranscript: (transcript: Transcript) => void,
    onCallEnd: () => void,
    onCallStart: () => void,
    setCallResults: (callResults: CallResults) => void
}
) {
    if (!RETELL_API_KEY) {
        throw new Error('Retell API key is not configured');
    }

    const retellWebClient = new RetellWebClient();



    console.log('makeReservationCall', formData);
    try {
        // Initialize Retell client
        const retellClient = new Retell({
            apiKey: RETELL_API_KEY
        });

        // Make the outbound call

        // const call = await retellClient.call.createWebCall({
        //     agent_id: AGENT_ID,
        //     retell_llm_dynamic_variables: {
        //         name: formData.name,
        //         party_size: formData.partySize.toString(),
        //         date: formData.date,
        //         time_range: formData.timeRange,
        //         additional_notes: formData.additionalNotes,
        //         restaurant_name: formData.restaurantName
        //     }
        // });


        // await retellWebClient.startCall({
        //     accessToken: call.access_token,
        // });


        // renderCallLogs(retellWebClient, {
        //     updateTranscript,
        //     onCallEnd,
        //     onCallStart
        // });


        const call = await retellClient.call.createPhoneCall({
            from_number: "+16504594509",
            to_number: "+12162622772", //TODO: formData.restaurantPhone",
            retell_llm_dynamic_variables: {
                name: formData.name,
                party_size: formData.partySize.toString(),
                date: formData.date,
                time_range: formData.timeRange,
                additional_notes: formData.additionalNotes,
                restaurant_name: formData.restaurantName
            }
        })

        onCallStart();

        // // Get call details including transcript
        const interval = setInterval(async () => {
            const callResponse = await retellClient.call.retrieve(call.call_id);




            if (callResponse.call_status === 'ended') {

                setCallResults(callResponse.call_analysis?.custom_analysis_data as CallResults);
                updateTranscript(callResponse.transcript_object || []);
                clearInterval(interval);
                onCallEnd();
            }
            if (callResponse.call_status === 'error') {
                clearInterval(interval);
                onCallEnd();
            }
        }, 5000);

    } catch (error) {
        console.error('Retell AI API error:', error);
        throw error;
    }
}


const renderCallLogs = async (retellWebClient: RetellWebClient,

    {
        updateTranscript,
        onCallEnd,
        onCallStart
    }: {
        updateTranscript: (transcript: Transcript) => void,
        onCallEnd: () => void,
        onCallStart: () => void
    }
) => {
    retellWebClient.on("call_started", () => {
        console.log("call started");
        onCallStart();
    });

    retellWebClient.on("call_ended", () => {
        console.log("call ended");
        onCallEnd();
    });

    // When agent starts talking for the utterance
    // useful for animation
    retellWebClient.on("agent_start_talking", () => {
        console.log("agent_start_talking");
    });

    // When agent is done talking for the utterance
    // useful for animation
    retellWebClient.on("agent_stop_talking", () => {
        console.log("agent_stop_talking");
    });

    // Real time pcm audio bytes being played back, in format of Float32Array
    // only available when emitRawAudioSamples is true

    retellWebClient.on("audio", () => {
        // console.log(audio);
    });

    // Update message such as transcript
    // You can get transcrit with update.transcript
    // Please note that transcript only contains last 5 sentences to avoid the payload being too large
    retellWebClient.on("update", (update: { type: string, transcript: Transcript }) => {
        console.log('update', update);
        updateTranscript(update.transcript);
    });

    retellWebClient.on("metadata", () => {
        // console.log(metadata);
    });

    retellWebClient.on("error", (error) => {
        console.error("An error occurred:", error);
        // Stop the call
        retellWebClient.stopCall();
    });
}      
