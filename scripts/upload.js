/* function newGif() {
  const constraints = navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { facingMode: "user"},
  });
  
  constraints.then((videoStream) => {
    video.srcObject = videoStream;
    video.play();
  });
} */
const video = document.querySelector(".video-up");

const start = document.querySelector("#start-btn");
const recordButton = document.querySelector(".video-buttons");
const stopButton = document.querySelector(".stop-btn");
const stopContainer = document.querySelector(".stop-container");
const stopTimer = document.querySelector(".stop-timer");

start.addEventListener("click", () => {
  let stream = navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: 1280,
      height: 720,
    },
  });

  stream.then((videoStream) => {
    video.srcObject = videoStream;
    video.play();

    let record = new RecordRTC(videoStream, {
      type: "video",
      frameRate: "60",
      recorderType: MediaStreamRecorder,
      width: 640,
      height: 360,
      quality: 10,
      timeSlice: 1000,
      onTimeStamp: function (time, timeArray) {
        let duration = new Date().getTime() - timeArray[0] / 1000;

        if (duration < 0) return;
        stopTimer.innerHTML = duration;
      },
    });

    recordButton.addEventListener("click", () => {
      record.startRecording();
      document.querySelector(".video-title").innerText = "Capturando Tu Guifo";
      recordButton.style.display = "none";
      stopContainer.style.display = "flex";
    });

    stopButton.addEventListener("click", () => {
      record.stopRecording(() => {
        let blob = record.getBlob();
        video.srcObject = null;
        video.src = URL.createObjectURL(blob);
        video.controls = true;
      });
    });
  });

  document.querySelector(".new-gif").style.display = "none";
  document.querySelector(".video-container").style.display = "flex";
});

/* recordButton.addEventListener("click", () => {
  let record = new RecordRTC(stream)

  document.querySelector(".video-title").innerText = "Capturando Tu Guifo";
  recordButton.style.display = "none";
  stopContainer.style.display = "flex";
}); */
