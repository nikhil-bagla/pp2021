let videoRecordBtn = document.querySelector("#record-video");  //record button
let videoPlayer = document.querySelector("video");  //video tag
let constraints = { video: true, audio: true };    //to give video,audio acces
let captureBtn=document.querySelector("#click-picture");  //btn to click picture
let mediaRecorder;   
let recordState = false;
let chunks = [];  //browser sends data in chunks which we will use to make our recording

let filter='';
let currZoom=+1;
let zoomInBtn=document.querySelector("#in");
let zoomOutBtn=document.querySelector("#out");

zoomInBtn.addEventListener("click",function(){
    console.log(videoPlayer.style.transform);
    let vidScale=Number(
        videoPlayer.style.transform.split("(")[1].split(")")[0])
    
    if(vidScale<3){
        currZoom=vidScale+0.1;
        videoPlayer.style.transform=`scale(${currZoom})`;
    }
});

zoomOutBtn.addEventListener("click",function(){
    console.log(videoPlayer.style.transform);
    let vidScale=Number(
        videoPlayer.style.transform.split("(")[1].split(")")[0])
    
    if(vidScale>1){
        currZoom=vidScale-0.1;
        videoPlayer.style.transform=`scale(${currZoom})`;
    }
});


let allFilters=document.querySelectorAll(".filter");
for(let i=0;i<allFilters.length;i++){
    allFilters[i].addEventListener("click",function(e){
        filter=e.currentTarget.style.backgroundColor;
        removeFilter();  //if any filter is already there remove
        addFilterToScreen(filter);   //add new filter

    })
}



function addFilterToScreen(filterColor){

    let filter=document.createElement("div");
    filter.classList.add("on-screen-filter");
    filter.style.height="100vh";
    filter.style.width="100vw";
    filter.style.backgroundColor=`${filterColor}`;
    filter.style.position="fixed";
    filter.style.top="0px";
    document.querySelector("body").appendChild(filter);
}

function removeFilter(){

    let el=document.querySelector(".on-screen-filter");
    if(el){
        el.remove();
    }
}

videoRecordBtn.addEventListener("click", function () {
    if (mediaRecorder != undefined) {
        removeFilter();
        let innerDiv=videoRecordBtn.querySelector("#record-div");
        if (recordState == false) {
            recordState = true;
            innerDiv.classList.add("recording-animation");
            currZoom=1;
            videoPlayer.style.transform=`scale(${currZoom})`;
            mediaRecorder.start();    //start recording
        }
        else {
            recordState = false;
            innerDiv.classList.remove("recording-animation");
            mediaRecorder.stop();     //stop recording

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

captureBtn.addEventListener("click",function(){
    
    let innerDiv=captureBtn.querySelector("#click-div");
    innerDiv.classList.add("capture-animation");
    console.log("clicked");

    capture(filter);

    setTimeout(function(){
        innerDiv.classList.remove("capture-animation");
    },1000);
})

function capture(){
    let c=document.createElement("canvas");   //creating canvas
    c.width=videoPlayer.videoWidth;      //sets canvas width to video width
    c.height=videoPlayer.videoHeight;   //sets canvas height to video height
    let tool=c.getContext("2d");
    //origin shifting
    tool.translate(c.width/2,c.height/2);
    //scaling
    tool.scale(currZoom,currZoom);
    //moving back the origin
    tool.translate(-c.width/2,-c.height/2);
    tool.drawImage(videoPlayer,0,0);    //to capture image
    if(filter!=''){
        tool.fillStyle=filter;
        tool.fillRect(0,0,c.width,c.height);
    }
    
    let link=document.createElement("a");  //link to download img
    link.download='image.png';
    link.href=c.toDataURL();
    link.click();
    link.remove();
    c.remove();
}
