/*
A range slider is used to give a value from 1-100.


Based on that number, a loop is run that many times.
In this loop, divs are created and appended to a container
with a row-nowrap.
Those divs are aligned column-wise, and will have the same number
appended to them.
*/

var sketchBoard = document.getElementById("boardContainer");
var rangeSlider = document.getElementById("mySlider");

var rowItem = document.createElement('div');
rowItem.className = "rowItem";
rowItem.innerHTML = "&nbsp";

//Array of all rowItem
var rowItems;

var columnItem = document.createElement('div');
columnItem.className = "columnItem";
columnItem.innerHTML = "&nbsp";

//Initial board
createBoardWidth(rangeSlider.value);
drawing();

//Slider returns a value which determines size of sketch board
rangeSlider.addEventListener('mouseup',(e)=>{
    createBoardWidth(rangeSlider.value);
    drawing();
})

//Resets board when slider is activated
rangeSlider.addEventListener('mousedown',()=>{
    while (rowItem.firstChild){
        rowItem.removeChild(rowItem.firstChild);
    }
    while (boardContainer.firstChild){
        boardContainer.removeChild(boardContainer.firstChild);
    }
});

//Mode for 5 levels of shading
function shaderMode(item,mouseState){
    if(mouseState===0){
        if(item.className=="columnItem"){
            item.classList.add("drawing1");
            return;
        };
        if(item.classList.contains("drawing1")){
            item.classList.remove("drawing1")
            item.classList.add("drawing2")
            return;
        };
        if(item.classList.contains("drawing2")){
            item.classList.remove("drawing2");
            item.classList.add("drawing3");
            return;
        };
            
        if(item.classList.contains("drawing3")){   
            item.classList.remove("drawing3");                 
            item.classList.add("drawing4");
            return;
        };

        if(item.classList.contains("drawing4")){
            item.classList.remove("drawing4");
            item.classList.add("drawing5");
            return;
        };
    }
    if(mouseState===1){
        item.className="columnItem drawing5";
    }
    if(mouseState===2){
        if(item.className!=="columnItem"){
            item.className="columnItem";
        };
    };
};

//Detects current number of squares and assigns listener to 
//each one
function drawing(){
    let boardContainer = document.getElementById("boardContainer");
    let pixels = document.querySelectorAll('.columnItem');

    let mouseState = 0;

    boardContainer.addEventListener('contextmenu', e => e.preventDefault());

    boardContainer.addEventListener('mousedown',(e)=>e.preventDefault());

    boardContainer.addEventListener('mousedown',(e)=>{
        if(e.button === 0){
            mouseState = 1; 
        };
        if(e.button === 2){
            mouseState = 2;
        };
    });
    
    boardContainer.addEventListener('mouseup',()=>{
        mouseState = 0;
    });

    boardContainer.addEventListener('shiftKey',()=>{
        console.log("hi");
        mouseState = 2;
    });


    pixels.forEach(function(item){
        item.addEventListener('mouseover',()=>{
            shaderMode(item,mouseState);
        });
    }); 

    boardContainer.addEventListener('mousedown',(e=>{
        console.log(e);
    }))
    

};

//First, a loop creates the containers of the given width. Then,
//the containers are given children of the same number to create 
//the squares of the sketchboard.
function createBoardWidth(val){
    for(i=1;i<=val;i++){
        boardContainer.appendChild(rowItem.cloneNode());
    }
    
    rowItems = document.getElementsByClassName('rowItem')
    Array.from(rowItems).forEach((item)=>{
        for(i=1;i<=val;i++){
            item.appendChild(columnItem.cloneNode());
        }
    })
    }      