const video = document.querySelector(".video-up");
const videoDiv = document.querySelector('.video-div');
const videoTitle = document.querySelector(".video-title");
const start = document.querySelector("#start-btn");

const recordButton = document.querySelector(".video-buttons");
const stopButton = document.querySelector(".stop-btn-div");

const stopContainer = document.querySelector(".stop-container");
const stopTimer = document.querySelector(".stop-timer");

const finishContainer = document.querySelector(".retry-upload");
const retry = document.querySelector(".retry");
const upload = document.querySelector(".upload");
const playBtn = document.querySelector(".play");
const videoProgress = document.querySelectorAll(".progress");
const uploadContainer = document.querySelector('.upload-container');
const uploadProgress = document.querySelectorAll('.progress-up');
const cancelBtn = document.querySelector('.cancel-btn');
const finishBtn = document.querySelector('.finish-btn')

const gifDiv = document.querySelector('.gif-div');
const gifImg = document.querySelector('.gif-img');
const uploadedBtns = document.querySelector('.uploaded-buttons');
const copyBtn = document.querySelector('.copy-url');
const downloadBtn = document.querySelector('.download-gif');

const cancelController = new AbortController();
const cancelSignal = cancelController.signal;

const mediaOptions = {
  audio: false,
  video: {
    width: 640,
    height: 360,
  },
};

let gifObject = {
  id: String,
  url: String,
  embed: String
};
let mediaStream;
let videoRecorder;
let gifRecorder;
let gifBlob;
let gifFile;
let videoDuration = [];
let progressCounter = 1;
let gifURL;
let gifId;

let barAnimation;

start.addEventListener("click", async () => {
  mediaStream = await navigator.mediaDevices.getUserMedia(mediaOptions);
  video.srcObject = mediaStream;
  video.play();
  document.querySelector(".new-main").style.display = "none";
  document.querySelector(".video-container").style.display = "flex";
  finishContainer.style.display = 'none';
  stopTimer.style.display = 'none';
});

recordButton.addEventListener("click", () => {
  videoRecorder = new RecordRTC(mediaStream, {
    type: "video",
    frameRate: "30",
    recorderType: MediaStreamRecorder,
    mimeType: "video/webm",
    width: 960,
    height: 540,
    quality: 10,
    timeSlice: 1000,
    onTimeStamp: function (time, timeArray) {
      let minutes = 0;
      let seconds = Math.round((time - timeArray[0]) / 1000);

      while (seconds - 60 > -1) {
        minutes++;
        seconds = Math.round((time - timeArray[0]) / 1000) - 60 * minutes;
      }

      stopTimer.innerHTML = `00 : ${twoDigits(minutes)} : ${twoDigits(seconds)}`;
    },
  });

  gifRecorder = new GifRecorder(mediaStream, {
    width: 320,
    height: 240,
    quality: 10,
    frameRate: 70
  })

  newDate(videoDuration)

  videoRecorder.startRecording();
  gifRecorder.record()

  videoTitle.innerText = "Capturando Tu Guifo";
  stopContainer.style.display = "flex";
  recordButton.style.display = "none";
  finishContainer.style.display = "none";
  stopButton.style.display = 'flex';
  stopTimer.style.display = 'flex';

});

stopButton.addEventListener("click", () => {
  videoRecorder.stopRecording(() => {
    video.srcObject = null;
    video.src = URL.createObjectURL(videoRecorder.getBlob());
    mediaStream.stop();

    newDate(videoDuration)
    videoDuration = Math.floor((videoDuration[1] - videoDuration[0]) / 1000);
  });

  gifRecorder.stop(blob => {
    gifBlob = blob;
    gifFile = new FormData;
    gifFile.append('file', blob, 'myGif.gif')
  });

  stopContainer.style.display = 'none';
  stopButton.style.display = "none";
  videoTitle.innerText = 'Vista Previa';
  finishContainer.style.display = "flex";
});

playBtn.addEventListener('click', () => {
  if (video.paused || video.ended) {
    video.play()
    if (progressCounter >= 18) {
      progressCounter = 1;
      videoProgress.forEach(element => {
        element.classList.remove("progress-fill")
      })
    }

    let progressInterval = setInterval(function () {
      if ((video.currentTime / progressCounter) >= (videoDuration / 17) && progressCounter <= 17) {
        videoProgress[progressCounter - 1].classList.add('progress-fill')
        console.log('intervalo ' + progressCounter);
        progressCounter++
      } else if (progressCounter == 18 || video.paused) {
        clearInterval(progressInterval)
        console.log('intervalo cerardo');
      }
    }, 100)
  } else {
    video.pause()
  }
})

upload.addEventListener("click", () => {
  uploadGif(endpoints.upload, gifFile, stopBarAnimation, barAnimation)
    .then(data => {
      stopBarAnimation(barAnimation)
      uploadProgress.forEach(element => {
        element.classList.remove('progress-fill')
      })
      if (data != undefined) {
        videoTitle.innerText = 'Guifo Subido Con Éxito';
        uploadContainer.style.display = 'none';
        cancelBtn.style.display = 'none';
        videoDiv.style.display = 'none';

        finishBtn.style.display = 'block';

        uploadedBtns.style.display = 'flex';
        gifDiv.style.display = 'flex';
        gifImg.src = URL.createObjectURL(gifBlob);


        gifId = data.id;
        setStorageGif(getStorageGifs('gifs'), gifObject)
      }
    })
    .catch(err => {
      console.log(err);
    })

  video.style.display = 'none';
  stopTimer.style.display = 'none';
  finishContainer.style.display = 'none';
  videoTitle.innerText = 'Subiendo Guifo';

  uploadContainer.style.display = 'flex';
  cancelBtn.style.display = 'block';

  let uploadBarCount = 0;
  barAnimation = uploadBarAnimation(uploadBarCount);
});

retry.addEventListener('click', async () => {
  await videoRecorder.destroy();
  await gifRecorder.clearRecordedData();

  recordButton.style.display = 'flex';
  finishContainer.style.display = 'none';
  stopTimer.style.display = 'none';

  mediaStream = await navigator.mediaDevices.getUserMedia(mediaOptions);
  video.srcObject = mediaStream;
  video.play();
  videoTitle.innerText = "Un Checkeo Antes de Empezar";
  videoDuration = [];
  progressCounter = 1;

  videoProgress.forEach(element => {
    element.classList.remove('progress-fill')
  })
})

cancelBtn.addEventListener('click', () => {
  abortSignal.abort();
  abortSignal = new AbortController();
  videoDiv.style.display = "flex";
  video.style.display = "flex";
  gifDiv.style.display = "none";
  uploadedBtns.style.display = "none";
  uploadContainer.style.display = "none";
  cancelBtn.style.display = "none";
  retry.click();
})

copyBtn.addEventListener('click', () => {
  window.navigator.clipboard.writeText(getGifUrl(gifId))
  alert('URL Copiada! :)')
})

downloadBtn.addEventListener('click', () => {
  invokeSaveAsDialog(gifBlob)
})


window.onload = () => {
  verifyTheme()
}