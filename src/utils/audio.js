// Web Speech API helper for word pronunciations

export const speakWord = (text) => {
  if (!('speechSynthesis' in window)) {
    alert("Speech synthesis is not supported in this browser.");
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.85; // Slightly slower for clarity
  utterance.pitch = 1.0;
  utterance.lang = 'en-US';

  // Get available voices and prefer US/UK English
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find(v => v.lang === 'en-US' || v.lang === 'en-GB') || voices[0];
  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  window.speechSynthesis.speak(utterance);
};
