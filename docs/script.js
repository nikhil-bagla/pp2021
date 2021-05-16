let iconContainer=document.querySelector(".icon-container");
let sheetList=document.querySelector(".sheet-list");
let firstSheet=document.querySelector(".sheet");
firstSheet.addEventListener("click",handleClick);   //to handle firsheet active attribute

iconContainer.addEventListener("click",function(){     //to add sheet on clicking '+' icon
    //create new Sheet
    let newSheet=document.createElement("div");
    //create element
    let allSheets=document.querySelectorAll(".sheet");
    let lastSheet=allSheets[allSheets.length-1];
    let idx=lastSheet.getAttribute("idx");
    newSheet.setAttribute("idx",Number(idx)+1);  //as idx was in string form so its converted into number
    //text set
    newSheet.innerText=`Sheet- ${Number(idx)+2}`;
    //set class
    newSheet.setAttribute("class","sheet");
    //append
    sheetList.appendChild(newSheet);
    //check all sheets
    allSheets=document.querySelectorAll(".sheet");
    setLastActive(allSheets);
    //future click all sheets
    newSheet.addEventListener("click",handleClick);
})
function setLastActive(allSheets){    //to set last sheet active
    for(let i=0;i<allSheets.length;i++){
        allSheets[i].classList.remove("active");  //removes active from all the sheets wherever it maybe
    }
    allSheets[allSheets.length-1].classList.add("active");  //adds active class to the last sheet

}
function handleClick(e){
    let sheet=e.currentTarget;  //gets current sheet where we've clicked
    // console.log(e);
    let allSheets=document.querySelectorAll(".sheet");
    for(let i=0;i<allSheets.length;i++){
        allSheets[i].classList.remove("active");
    }
    sheet.classList.add("active");

}