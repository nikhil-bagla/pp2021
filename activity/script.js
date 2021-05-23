let videoRecordBtn = document.querySelector("#record-video");  //record button
let videoPlayer = document.querySelector("video");  //video tag
let constraints = { video: true, audio: true };    //to give video,audio acces

let mediaRecorder;   
let recordState = false;
let chunks = [];  //browser sends data in chunks which we will use to make our recording
videoRecordBtn.addEventListener("click", function () {
    if (mediaRecorder != undefined) {
        if (recordState == false) {
            recordState = true;
            mediaRecorder.start();    //start recording
            videoRecordBtn.innerText = "Recording";
        }
        else {
            recordState = false;
            mediaRecorder.stop();     //stop recording
            videoRecordBtn.innerText = "Record";
        }
    }
})
navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
    videoPlayer.srcObject = mediaStream;
    mediaRecorder = new MediaRecorder(mediaStream);  //mediaRecorder gives state like start amd stop
    mediaRecorder.ondataavailable = function (e) {   //tells that first chunk is sent,second is sent so on....
        chunks.push(e.data);
    }
    mediaRecorder.onstop = function () {
        let blob = new Blob(chunks, { type: "video/mp4" });
        chunks = [];  //so that new chunk can be downloaded
        let blobUrl = URL.createObjectURL(blob);  //makes url using blob which will be used to download recording
        var link = document.createElement("a");
        link.href = blobUrl;
        link.download = "video.mp4";
        link.click();
        link.remove();
    }
}).catch(function (err) {
    console.log(err);  //if we deny permission then error is displayed
})
