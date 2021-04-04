function mod(n, m) {
  return ((n % m) + m) % m;
}

var pauseButton = document.getElementById("slider_pause");
var slideRunning = true;
var currentSlide = 0; //first displayed slide is always 0 by default
var slider = document.getElementById("slider");
var sliderChilds = document.querySelectorAll(".slider_child");
var slidesAvailable = sliderChilds.length;
const slideDelay = 500; // in millis

//slide to offset slide from the current
function slide(offset){
    if(offset == 0)return;
    if(offset > 0){
        slideRight();
        if(offset-1 != 0){//if not last element
            sleep(slideDelay).then(() => {
                slide(offset-1);
            });
        }
    }else{
        slideLeft();
        if(offset+1 != 0){//if not last element
            sleep(slideDelay).then(() => {
                slide(offset+1);
            });
        }
    }
}

//swipe display of given elems
function swipe(oldElem, newElem){
    hideElem(oldElem);
    showElem(newElem);
}

function slideRight(){
    var targetSlide = mod(currentSlide+1, slidesAvailable);
    swipe(sliderChilds[currentSlide], sliderChilds[targetSlide]);
    currentSlide = targetSlide;
}

function slideLeft(){
    var targetSlide = mod(currentSlide-1, slidesAvailable);
    swipe(sliderChilds[currentSlide], sliderChilds[targetSlide]);
    currentSlide = targetSlide;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function hideElem(elem){
    elem.style.opacity = "0";
}

function showElem(elem){
    elem.style.opacity = "1";
}

function toggleSlideRunning(){
    slideRunning = !slideRunning;
    if(slideRunning){
        pauseButton.textContent = "||";
    }else{
        pauseButton.textContent = "|>";
    }
}

// --------------------------  MAIN  ---------------------------------------

//hide all slide excepts selected one
for(var i = 0 ; i < slidesAvailable ; i++){
    if(i != currentSlide){
        hideElem(sliderChilds[i]);
    }else{
        showElem(sliderChilds[i]);
    }
}

setInterval(() => {
    if(slideRunning){
        slideRight();
    }
}, 7000);
