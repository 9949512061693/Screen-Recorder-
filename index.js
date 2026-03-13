let video = document.querySelector('video');
let recordButtonCont = document.querySelector('.record-action-cont');
let recordBtn = document.querySelector(".record-btn");
let captureActionCont = document.querySelector(".capture-action-cont");
let captureBtn = document.querySelector(".capture-btn");
let transparentColor = "transparent";

let recorderFlag = false;
let recorder;
let chunks = [];

let constraints = {
    audio: false,
    video: true,
};

navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {

        video.srcObject = stream;

        recorder = new MediaRecorder(stream);

        recorder.addEventListener("start", () => {
            chunks = [];
        });

        recorder.addEventListener("dataavailable", (e) => {
            chunks.push(e.data);
        });

        recorder.addEventListener("stop", () => {

            let blob = new Blob(chunks, { type: "video/mp4" });
            let videoUrl = URL.createObjectURL(blob);

            let a = document.createElement("a");
            a.href = videoUrl;
            a.download = "stream.mp4";
            a.click();

        });

        video.addEventListener("pause", () => {
            if (recorderFlag) {
                recorder.pause();
                stopTimer();
            }
        });

        video.addEventListener("play", () => {
            if (recorderFlag) {
                recorder.resume();
                startTimer();
            }
        });

        recordButtonCont.addEventListener("click", () => {

            if (!recorder) return;

            recorderFlag = !recorderFlag;

            if (recorderFlag) {

                recorder.start();
                recordBtn.classList.add("scale-record");
                startTimer();

            } else {

                recorder.stop();
                recordBtn.classList.remove("scale-record");
                stopTimer();

                elapsedTime = 0;
                timer.innerText = "00:00:00";
                timer.style.display = "none";

            }

        });

    });


// ---------------- TIMER ----------------

let timer = document.querySelector(".timer");
let timerId;

let startTime;
let elapsedTime = 0;

function startTimer() {

    clearInterval(timerId);

    timer.style.display = "flex";
    timer.style.fontSize = "2rem";

    startTime = Date.now();

    function displayTimer() {
        let endTime = Date.now();
        let totalSeconds = Math.floor((endTime - startTime + elapsedTime) / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds = totalSeconds % 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        hours = hours < 10 ? `0${hours}` : hours;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        timer.innerText = `${hours}:${minutes}:${seconds}`;
    }
    timerId = setInterval(displayTimer, 1000);
}


function stopTimer() {
    clearInterval(timerId);
    elapsedTime += Date.now() - startTime;
}

captureActionCont.addEventListener("click", (e) => {
    captureActionCont.classList.add("capture-record");
    const canvasEl = document.createElement("canvas");
    canvasEl.width = video.videoWidth;
    canvasEl.height = video.videoHeight;
    const tool = canvasEl.getContext("2d");
    tool.drawImage(video, 0, 0, canvasEl.width, canvasEl.height);
    tool.fillStyle = transparentColor;
    tool.fillRect(0, 0, canvasEl.width, canvasEl.height);
    let imageUrl = canvasEl.toDataURL("image/jpeg", 1.0);

    let a = document.createElement("a");
    a.href = imageUrl;
    a.download = "Image.jpg";
    a.click();
    setTimeout(() => {
        captureActionCont.classList.remove("capture-record");
    }, 500);
});


let filter = document.querySelector(".filter-layer");

let allfilters = document.querySelectorAll('.filter');
allfilters.forEach((filterEl) => {
    filterEl.addEventListener("click", () => {
        transparentColor = getComputedStyle(filterEl).getPropertyValue("background-color");
        filter.style.backgroundColor = transparentColor;
    })
});

