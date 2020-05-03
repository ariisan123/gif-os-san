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
const stopButton = document.querySelector(".stop-btn-div");
const stopContainer = document.querySelector(".stop-container");
const stopTimer = document.querySelector(".stop-timer");
const finish = document.querySelector(".retry-upload");

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
      width: 1280,
      height: 720,
      quality: 10,
      timeSlice: 1000,
      onTimeStamp: function (time, timeArray) {
        function twoDigits(number) {
          if (number < 10) {
            return `0${number}`;
          } else {
            return number;
          }
        }

        let minutes = 0;
        let seconds = Math.round((time - timeArray[0]) / 1000);
        while (seconds - 60 > -1) {
          minutes++;
          seconds = Math.round((time - timeArray[0]) / 1000) - 60 * minutes;
        }

        if (seconds < 0) return;
        stopTimer.innerHTML = `00 : ${twoDigits(minutes)} : ${twoDigits(
          seconds
        )}`;
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
      stopButton.style.display = "none";
      finish.style.display = "flex";
    });
  });

  document.querySelector(".new-gif").style.display = "none";
  document.querySelector(".video-container").style.display = "flex";
});
