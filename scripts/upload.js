function newGif() {
  const video = document.querySelector(".video-up");

  video.autoplay = true;
  const constraints = navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { facingMode: "user" },
  });

  constraints.then((MediaStream) => {
    video.srcObject = MediaStream;
  });
}

const start = document.querySelector("#start-btn");
const recordButton = document.querySelector(".video-btn");

function recordGif() {
  let record = RecordRTC(stream, {
    type: "gif",
    frameRate: 30,
    quality: 10,
    onGifRecordingStarted: function () {
      console.log("started");
    },
  }
  record.startRecording()
  );
}

start.addEventListener("click", () => {
  newElement(".new-main", "div", "video-container");
  newElement(".video-container", "span", "video-title");
  document.querySelector(".video-title").innerText =
    "Un Chequeo Antes de Empezar";
  newElement(".video-container", "div", "video-div");
  newElement(".video-div", "video", "video-up");
  newElement(".video-container", "div", "video-buttons");
  newElement(".video-buttons", "span", "video-span");
  newElement(".video-buttons", "button", "video-btn");
  document.querySelector(".video-btn").innerText = "Capturar";

  document.querySelector(".new-gif").style.display = "none";

  newGif();
});
