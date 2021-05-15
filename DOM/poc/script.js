let collection = document.body.children;
// for(let node in collection){   
//     console.log(node);
// }
for (let node of collection) {
    console.log(node);
}
// collection.forEach(element => {  //works same as for of loop above
//     console.log(element);
// });

// alert(document.body.childNodes.filter); ///undefined
// alert(Array.from(document.body.childNodes).filter); //works fine

// document.body.style.backgroundColor = "lightblue";
document.body.firstElementChild.style.color = "#001f3f";
let list = document.querySelector(".list");
let lesson = document.querySelector(".lesson");
let lesson2 = document.querySelector(".list2");

document.querySelectorAll("li").forEach(li => {  // alternative forEach(function(li){})
    li.style.fontFamily = "verdana";
    li.style.letterSpacing = "1px";
    li.style.fontSize = "0.8rem";
})

list.addEventListener("click", function () {
    let newul = document.createElement("div");
    newul.innerHTML = `<ul>
        <li>for in vs for of loop</li>
        <li>for in gives us extra properties which we dont want so we use for of loop always</li>
        <li> "document.body.childNodes" looks like an array. But actually it’s not an array, but rather a collection – a
            special array-like iterable object.</li>
        <li>Array methods won’t work, because it’s not an array:
            alert(document.body.childNodes.filter); // undefined (there's no filter method!)</li>
            <li>we can use Array.from to create a “real” array from the collection, if we want array methods:
            
                alert( Array.from(document.body.childNodes).filter ); // function</li>
            <li>The topmost tree nodes are available directly as document properties:
            
                <html> = document.documentElement
                The topmost document node is document.documentElement. That’s the DOM node of the <html> tag.
            
                <body> = document.body
                    Another widely used DOM node is the
            
                    <body> element – document.body.
            
                        <head> = document.head
                            The
            
                            <head> tag is available as document.head.</li>
            <li>The links are similar to those given above, just with Element word inside:
            
                children – only those children that are element nodes.
                firstElementChild, lastElementChild – first and last element children.
                previousElementSibling, nextElementSibling – neighbor elements.
                parentElement – parent element.</li>
            </ul> `;
    document.body.appendChild(newul);
    list.style.display = "none";
    let back = document.createElement("div");
    back.innerHTML = `Back`;
    back.setAttribute("class", "back");
    document.body.appendChild(back);

    back.addEventListener("click", function () {
        back.style.display = "none";
        list.style.display = "block";
        newul.style.display = "none";
    })


})

lesson2.addEventListener("click", function () {
    let div = document.createElement("div");
    div.innerHTML = `<ul>
    <li>
            By far the most used are querySelector and querySelectorAll, but getElement(s)By* can be sporadically helpful or found in the old scripts.
    </li>
    <li>There is elem.matches(css) to check if elem matches the given CSS selector.</li>
    <li>There is elem.closest(css) to look for the nearest ancestor that matches the given CSS-selector. The elem itself is also checked.</li>
    <li>elemA.contains(elemB) returns true if elemB is inside elemA (a descendant of elemA) or when elemA==elemB.</li>
</ul>`
    document.body.appendChild(div);
    lesson2.style.display = "none";
    let back = document.createElement("div");
    back.innerHTML = `Back`;
    back.setAttribute("class", "back");
    document.body.appendChild(back);

    back.addEventListener("click", function () {
        back.style.display = "none";
        lesson2.style.display = "block";
        div.style.display = "none";
    })
})
        // alert(document.body.lastElementChild);

