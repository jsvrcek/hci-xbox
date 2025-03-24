import React, {useState, useEffect, useRef} from 'react';
import {MicFill} from "react-bootstrap-icons";
import {LoadingSpinner} from "./LoadingSpinner.tsx";
import {setSearchText} from "../redux/slices/search.ts";
import {useDispatch, useSelector} from "react-redux";
import {setEntered} from "../redux/slices/selection.ts";
import type {RootState} from "../redux/store.ts";


interface ChildProps {
    isLoading: boolean;
    record: boolean;
}

export const MicButton: React.FC<ChildProps> = ({isLoading, record}) => {

    const dispatch = useDispatch();
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const audioChunks = useRef<Blob[]>([]);
    const [recording, setRecording] = useState(false);
    const {entered} = useSelector((state: RootState) => state.selection);


    useEffect(() => {
        if (recording) {
            void stopRecording();
            setRecording(false);
        } else if (entered) {
            void startRecording();
            setRecording(true);
        }
        dispatch(setEntered(false));
    }, [record]);

    async function transcribeAudio(audioBlob) {
        const formData = new FormData();
        const file = new File([audioBlob], "audio.webm", {type: "audio/webm"});
        console.log("Uploading File:", file.name, file.type); // Debugging
        formData.append("file", file);

        // Sending the audio to the server for transcription
        const response = await fetch('http://localhost:3000/api/transcribe', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        console.log('Transcription result:', data.transcription);
        return data.transcription;
    }

    // Start recording
    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true});
        const mimeType = MediaRecorder.isTypeSupported("audio/webm")
            ? "audio/webm"
            : "audio/mp4";
        const recorder = new MediaRecorder(stream, {mimeType});

        recorder.ondataavailable = (event) => {
            audioChunks.current.push(event.data);
        };

        recorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks.current, {type: mimeType});
            audioChunks.current = [];

            // Send to OpenAI API
            const result = await transcribeAudio(audioBlob);
            if (result) {
                dispatch(setSearchText(result));
            }
        };

        recorder.start();
        mediaRecorder.current = recorder;
        setRecording(true);
    };

    // Stop recording
    const stopRecording = () => {
        mediaRecorder.current?.stop();
        setRecording(false);
    };

    return (
        <button
            onClick={recording ? stopRecording : startRecording}
            className="rounded-full flex items-center justify-center align-center"
        >
            {isLoading ? <LoadingSpinner/> :
                <MicFill
                    className={`h-6 w-6 ${recording ? "text-red-400" : "text-gray-300"} text-center align-center items-center justify-center text-center`}/>}
        </button>
    );
};

export default MicButton;
