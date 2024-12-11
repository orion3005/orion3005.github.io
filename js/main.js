document.addEventListener("DOMContentLoaded", () => {
  const muteButton = document.getElementById("muteButton");
  muteButton.style.position = "fixed";
  muteButton.style.top = "10px";
  muteButton.style.right = "10px";
});

// Select the audio and mute button elements
const audio = document.getElementById("rainAudio");
const muteButton = document.getElementById("muteButton");

// Add an event listener to toggle mute/unmute
muteButton.addEventListener("click", () => {
  if (audio.muted) {
    audio.muted = false;
    muteButton.textContent = "🔊"; // Change to unmute icon
  } else {
    audio.muted = true;
    muteButton.textContent = "🔇"; // Change to mute icon
  }
});
