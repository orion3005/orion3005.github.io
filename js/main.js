document.addEventListener("DOMContentLoaded", () => {
  // Select the audio and mute button elements
  const audio = document.getElementById("rainAudio");
  const muteButton = document.getElementById("muteButton");

  // Position the mute button on the page
  muteButton.style.position = "fixed";
  muteButton.style.top = "10px";
  muteButton.style.right = "10px";

  // Restore audio state from localStorage
  const savedAudioState = localStorage.getItem("audioState");
  if (savedAudioState) {
    const audioState = JSON.parse(savedAudioState);

    // Restore mute state
    audio.muted = audioState.isMuted;
    muteButton.textContent = audio.muted ? "🔇" : "🔊";

    // Restore playback time (if the audio was playing)
    if (audioState.currentTime) {
      audio.currentTime = audioState.currentTime;
    }

    // Resume playing if it was playing before
    if (audioState.isPlaying) {
      audio.play();
    }
  }

  // Add an event listener to toggle mute/unmute
  muteButton.addEventListener("click", () => {
    audio.muted = !audio.muted;
    muteButton.textContent = audio.muted ? "🔇" : "🔊"; // Update button icon
    saveAudioState(); // Save state whenever mute is toggled
  });

  // Save audio state when playback time changes
  audio.addEventListener("timeupdate", saveAudioState);

  // Save audio state to localStorage
  function saveAudioState() {
    const audioState = {
      isMuted: audio.muted,
      isPlaying: !audio.paused,
      currentTime: audio.currentTime,
    };
    localStorage.setItem("audioState", JSON.stringify(audioState));
  }

  // Save the audio state before the page unloads
  window.addEventListener("beforeunload", saveAudioState);
});
