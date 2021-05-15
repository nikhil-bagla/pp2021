// initially grid build
let columns = 26;
let rows = 100;
// 65
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
let sheetArr = [];
// rows-> 100
// col - > 26
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
            bgColor:"",
            hAlign:"center"
        }
        rowArr.push(cellObj);     
    }
    grid.appendChild(row);
    sheetArr.push(rowArr);
}
console.log(sheetArr)