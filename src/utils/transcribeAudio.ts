export async function transcribeAudio(audioBlob) {
  const formData = new FormData();
  formData.append('file', audioBlob, 'recording.wav');

  // Sending the audio to the server for transcription
  const response = await fetch('http://localhost:3000/api/transcribe', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  console.log('Transcription result:', data.transcription);
  return data;
}
