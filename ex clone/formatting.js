let bold = document.querySelector(".fa-bold");
let italic = document.querySelector(".fa-italic");
let underline = document.querySelector(".fa-underline");
let fontSize = document.querySelector(".font-size");
let fontFamily = document.querySelector(".font-family");
let alignmentbtns = document.querySelectorAll(".alignment-container>*");
let leftBtn=document.querySelector(".left");
let rightBtn=document.querySelector(".right");
let centerBtn=document.querySelector(".center");
let color=document.querySelector(".color");
let bgcolor=document.querySelector(".bg-color");

/////////formatting////////////////////////////////////////

bold.addEventListener("click", function () {
    // address get -> address
    // ui elemnt
    let uiCell = getcell();
    let { rid, cid } = getRIdIdfromAddress();
    // console.log(rid,cid);
    // sheet array
    let cellObj = sheetArr[rid][cid];
    if (cellObj.isBold == true) {
        uiCell.style.fontWeight = "normal";
        bold.classList.remove("menu-active");
        cellObj.isBold = false
    } else {
        uiCell.style.fontWeight = "bold";
        bold.classList.add("menu-active");
        cellObj.isBold = true;
    }
})

italic.addEventListener("click", function () {
    // address get -> address
    // ui elemnt
    let uiCell = getcell();
    let { rid, cid } = getRIdIdfromAddress();
    // console.log(rid,cid);
    // sheet array
    let cellObj = sheetArr[rid][cid];
    if (cellObj.isItalic == true) {
        uiCell.style.fontStyle = "normal";
        italic.classList.remove("menu-active");
        cellObj.isItalic = false
    } else {
        uiCell.style.fontStyle = "italic";
        italic.classList.add("menu-active");
        cellObj.isItalic = true;
    }
})
underline.addEventListener("click", function () {
    // address get -> address
    // ui elemnt
    let uiCell = getcell();
    let { rid, cid } = getRIdIdfromAddress();
    // console.log(rid,cid);
    // sheet array
    let cellObj = sheetArr[rid][cid];
    if (cellObj.isUnderline == true) {
        uiCell.style.textDecoration = "none";
        underline.classList.remove("menu-active");
        cellObj.isUnderline = false;
    } else {
        uiCell.style.textDecoration = "underline";
        underline.classList.add("menu-active");
        cellObj.isUnderline = true;
    }
})

//////////////////////////////////////////////////////////////

fontSize.addEventListener("change", function () {
    let cfontSize = fontSize.value;
    let uiCell = getcell();
    let { rid, cid } = getRIdIdfromAddress();
    let cellObj = sheetArr[rid][cid];
    //ui change
    uiCell.style.fontSize = cfontSize + "px";
    //cellobject
    cellObj.fontSize = cfontSize;

})

fontFamily.addEventListener("change", function () {
    let cfontFamily = fontFamily.value;
    let uiCell = getcell();
    let { rid, cid } = getRIdIdfromAddress();
    let cellObj = sheetArr[rid][cid];
    //ui change
    uiCell.style.fontFamily = cfontFamily;
    //cellobject
    cellObj.fontFamily = cfontFamily;

})

/////////////////alignment////////////////////////////////
leftBtn.addEventListener("click", function () {

    let uiCell = getcell();
    let { rid, cid } = getRIdIdfromAddress();
    let cellObj = sheetArr[rid][cid];
    uiCell.style.textAlign = "left";
    for (let i = 0; i < alignmentbtns.length; i++) {
        alignmentbtns[i].classList.remove("menu-active");
    }
    leftBtn.classList.add("menu-active");
    // db update 
    cellObj.halign = "left";
})

rightBtn.addEventListener("click", function () {

    let uiCell = getcell();
    let { rid, cid } = getRIdIdfromAddress();
    let cellObj = sheetArr[rid][cid];
    uiCell.style.textAlign = "right";
    for (let i = 0; i < alignmentbtns.length; i++) {
        alignmentbtns[i].classList.remove("menu-active");
    }
    rightBtn.classList.add("menu-active");
    // db update 
    cellObj.halign = "right";
})

centerBtn.addEventListener("click", function () {

    let uiCell = getcell();
    let { rid, cid } = getRIdIdfromAddress();
    let cellObj = sheetArr[rid][cid];
    uiCell.style.textAlign = "center";
    for (let i = 0; i < alignmentbtns.length; i++) {
        alignmentbtns[i].classList.remove("menu-active");
    }
    leftBtn.classList.add("menu-active");
    // db update 
    cellObj.halign = "center";
})

/////////////////////////////////////////////////////////

//////////////////////color///////////////////////////////

color.addEventListener("change", function () {
    let ccolor = color.value;
    let uiCell = getcell();
    let { rid, cid } = getRIdIdfromAddress();
    let cellObj = sheetArr[rid][cid];
    //ui change
    uiCell.style.color = ccolor;
    //cellobject
    cellObj.color = ccolor;

})

bgcolor.addEventListener("change", function () {
    let cbgcolor = bgcolor.value;
    let uiCell = getcell();
    let { rid, cid } = getRIdIdfromAddress();
    let cellObj = sheetArr[rid][cid];
    //ui change
    uiCell.style.backgroundColor = cbgcolor;
    //cellobject
    cellObj.bgcolor = cbgcolor;

})

/////////////////////////////////////////////////////////
function getcell() {
    let address = addressElem.value;
    let { rid, cid } = getRIdIdfromAddress();
    console.log(rid, cid);
    return document.querySelector(`.grid .cell[rid="${rid}"][ cid="${cid}"]`)
}
function getRIdIdfromAddress() {

    let address = addressElem.value;
    // A->z
    // 1->100
    let cid = Number(address.charCodeAt(0)) - 65;
    let rid = Number(address.slice(1)) - 1;
    return { cid, rid };
}

let Allcells = document.querySelectorAll(".grid .cell");
let addressElem = document.querySelector(".address");
for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("click", function () {
        let cid = Allcells[i].getAttribute("cid");
        let rid = Allcells[i].getAttribute("rid");
        cid = Number(cid);
        rid = Number(rid);
        // console.log(rid,cid);
        addressElem.value = `${String.fromCharCode(65 + cid)}${rid + 1}`;
        let cellObj = sheetArr[rid][cid];
        // console.log(cellObj);
        //toolbar 
        if (cellObj.isBold == true) {
            bold.classList.add("menu-active");
        } else {
            bold.classList.remove("menu-active");

        }
        if (cellObj.isItalic == true) {
            italic.classList.add("menu-active");
        } else {
            italic.classList.remove("menu-active");

        }
        if (cellObj.isUnderline == true) {
            underline.classList.add("menu-active");
        } else {
            underline.classList.remove("menu-active");

        }
        //fontSize,fontFamily
        fontSize.value = cellObj.fontSize;
        fontFamily.value = cellObj.fontFamily;
        
        //alignment
        for(let i=0;i<alignmentbtns.length;i++){
            alignmentbtns[i].classList.remove("menu-active");
        }

        if(cellObj.halign=="left"){
            leftBtn.classList.add("menu-active");
        }
        else if(cellObj.halign=="right"){
            rightBtn.classList.add("menu-active");
        }
        else if(cellObj.halign=="center"){
            centerBtn.classList.add("menu-active");
        }
        
        //color
        color.value = cellObj.color;
        bgcolor.value = cellObj.bgcolor;
    }
    )
}
Allcells[0].click();