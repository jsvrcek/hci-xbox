import React, {useState, useEffect} from 'react';
import {MicFill} from "react-bootstrap-icons";
import {LoadingSpinner} from "./LoadingSpinner.tsx";
import {transcribeAudio} from "../utils/transcribeAudio.ts";


interface ChildProps {
    isLoading: boolean;
    setIsLoading: (boolean) => void;
    selected: boolean;
}

export const MicButton: React.FC<ChildProps> = ({isLoading, setIsLoading, selected}) => {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

    useEffect(() => {
        let recorder: MediaRecorder | null = null;
        let audioStream: MediaStream | null = null;

        const initRecording = async () => {
            try {
                // Request access to microphone
                audioStream = await navigator.mediaDevices.getUserMedia({audio: true});
                recorder = new MediaRecorder(audioStream);

                recorder.ondataavailable = (event) => {
                    setAudioChunks((prevChunks) => [...prevChunks, event.data]);
                };

                recorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, {type: 'audio/wav'});
                    const audioUrl = URL.createObjectURL(audioBlob);
                    console.log('Audio URL:', audioUrl);

                    // You can now send audioBlob or audioUrl to an API for transcription, etc.
                };

                setMediaRecorder(recorder);
            } catch (err) {
                console.error('Error accessing microphone:', err);
            }
        };

        if (isRecording && !mediaRecorder) {
            initRecording();
        }

        return () => {
            // Cleanup
            if (audioStream) {
                audioStream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [isRecording, mediaRecorder, audioChunks]);

    const startRecording = () => {
        if(isLoading){
            return
        }
        if (mediaRecorder) {
            mediaRecorder.start();
            setAudioChunks([]); // Clear previous audio chunks
        }
        setIsRecording(true);
    };

    const stopRecording = async () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
        setIsRecording(false);
        setIsLoading(true);
        const audioBlob = new Blob(audioChunks, {type: 'audio/wav'});

        try {
            const transcription = transcribeAudio(audioBlob)
            setIsLoading(false);
            return transcription;
        } catch (error) {
            console.error('Error submitting audio:', error);
        }
    };

    return (
        <div>
            <button
                onClick={isRecording ? stopRecording : startRecording}
                className="rounded-full flex items-center justify-center"
            >
                {isLoading ? <div className="h-6 w-6"><LoadingSpinner/></div> :
                    <MicFill className={`h-6 w-6 ${isRecording ? "text-red-400" : "text-gray-300"} ${selected === 'back' && "border-4 border-blue-500"}`}/>}
            </button>
        </div>
    );
};

export default MicButton;
