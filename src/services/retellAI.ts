import Retell from 'retell-sdk';

const RETELL_API_KEY = process.env.NEXT_PUBLIC_RETELL_API_KEY;
const AGENT_ID = 'agent_c49179b8a643f5ecb9b73dd274';

import { RetellWebClient } from "retell-client-js-sdk";




interface RetellResponse {
    transcript: string;
    success: boolean;
}

export async function makeReservationCall(
    restaurantPhone: string,
    reservationDetails: string
): Promise<RetellResponse> {
    if (!RETELL_API_KEY) {
        throw new Error('Retell API key is not configured');
    }

    const retellWebClient = new RetellWebClient();



    console.log('makeReservationCall', restaurantPhone, reservationDetails);
    try {
        // Initialize Retell client
        const retellClient = new Retell({
            apiKey: RETELL_API_KEY
        });

        // Make the outbound call
        const call = await retellClient.call.createWebCall({
            agent_id: AGENT_ID,
            retell_llm_dynamic_variables: {
                reservation_details: reservationDetails
            }
        });


        await retellWebClient.startCall({
            accessToken: call.access_token,
        });




        renderCallLogs(retellWebClient);

        console.log('makeReservationCall:createWebCall', call);

        // Wait for call to complete (you might want to implement webhook handling instead)
        await new Promise(resolve => setTimeout(resolve, 30000));

        // Get call details including transcript
        const callResponse = await retellClient.call.retrieve(call.call_id);

        return {
            transcript: callResponse.transcript || 'No transcript available',
            success: true
        };
    } catch (error) {
        console.error('Retell AI API error:', error);
        throw error;
    }
}


const renderCallLogs = async (retellWebClient: RetellWebClient) => {
    retellWebClient.on("call_started", () => {
        console.log("call started");
    });

    retellWebClient.on("call_ended", () => {
        console.log("call ended");
        // setIsCallActive(false);
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
    retellWebClient.on("update", () => {
        // console.log(update);
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
