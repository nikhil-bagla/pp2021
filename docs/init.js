// initially grid build
let columns = 26;
let rows = 100;

// 65
//ui ka change
let topRow = document.querySelector(".top-row");      //A-Z
let leftCol = document.querySelector(".left-col");    //1-100
let grid = document.querySelector(".grid");           


for (let i = 0; i < columns; i++){           //top row creation(A-Z)
     let div = document.createElement("div");
    div.innerText = String.fromCharCode(65 + i);    //converts ascii to char
    div.setAttribute("class", "cell");
    topRow.appendChild(div);
}
for (let i = 1; i <= rows; i++) {      //leftcol (1-100)
    let div = document.createElement("div");
    div.innerText = i;
    div.setAttribute("class", "block");
    leftCol.appendChild(div);
}

let sheetListArr=[];  //to store multiple sheetArr
let sheetArr;  //tp store db of a sheet initially empty
let iconContainer=document.querySelector(".icon-container");
let sheetList=document.querySelector(".sheet-list");
let firstSheet=document.querySelector(".sheet");
firstSheet.addEventListener("click",handleClick);   //to handle firsheet active attribute
firstSheet.click();

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
    newSheet.click();   //so that new sheet is selected upon creation
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
    let idx=sheet.getAttribute("idx");
    //db sheet change ui sync
    if(idx==0 && sheetList.length==0){
        initSheetDB();
        // for all operation
        sheetArr=sheetListArr[0];
    }
    else{
        //create a new sheet 
        if(sheetListArr[idx]==undefined){
            initSheetDB();
            sheetArr=sheetListArr[idx];
            
        }
        else{
            //switch sheet
            sheetArr=sheetListArr[idx];
        }
        setUI(sheetArr);
    }
}

// rows-> 100
// col - > 26
//first Sheet
function initSheetDB(){
    let sheetArr = [];
    for (let i = 0; i < rows; i++) {
        let row = document.createElement("div");
        let rowArr = [];    //to store cellObj or state of each cell
        row.setAttribute("class", "row");
        for (let j = 0; j < columns; j++) {
            // UI
            let cell = document.createElement("div");
            cell.setAttribute("class", "cell");
            cell.setAttribute("rid", i);
            cell.setAttribute("cid", j);
            cell.setAttribute("contenteditable", "true");
            row.appendChild(cell);
    
            let cellObj = {      //object which stores states of each cell
                isBold: false,
                isItalic:false,
                isUnderline:false,
                fontFamily:"sans-serif",
                fontSize:16,
                color:"black",
                bgcolor:"",
                hAlign:"center",
                value: "",
                formula:"",
                children:[]
            }
            rowArr.push(cellObj);     
        }
        grid.appendChild(row);
        sheetArr.push(rowArr);
    }
    sheetListArr.push(sheetArr);
}
// console.log(sheetArr)
function setUI(sheetArr){    

    for (let i = 0; i < rows; i++) {
       
        for (let j = 0; j < columns; j++) {
            
            // let cellObj = {      //object which stores states of each cell
            //     isBold: false,
            //     isItalic:false,
            //     isUnderline:false,
            //     fontFamily:"sans-serif",
            //     fontSize:16,
            //     color:"black",
            //     bgcolor:"",
            //     hAlign:"center",
            //     value: "",
            //     formula:"",
            //     children:[]
            // }     

            let cellElem = document.querySelector(`.grid .cell[rid="${i}"][cid="${j}"]`);
            let cellObj = sheetArr[i][j];
            cellElem.innerText = cellObj.value;
            cellElem.style.fontWeight = cellObj.isBold == true ? "bold" : "normal";
            cellElem.style.fontSize = cellObj.fontSize + "px";
    }
    }
    document.querySelector(`.grid .cell[rid="${0}"][cid="${0}"]`).click();  //to implement ui features on every sheet
}