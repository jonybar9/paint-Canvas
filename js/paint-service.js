var gSets = {
    brushStyle:'rect',
    color: '#000000',
    bgColor: '#ffffff',
    currPos: {},
    prevPos: {},
    isDown: false,
}

function updateCurrPos(ev) {
    gSets.prevPos = gSets.currPos;
    //sets the new position
    ev = ev || window.event;
    var currPos = {
        x: ev.clientX,
        y:ev.clientY
    }
    gSets.currPos = currPos;
    //return if the mouse is not clicked
    if(!gSets.isDown) return;

    //if mouse is clicked, paint
    useBrush();        
}

function getClickPos(ev) {
    let pos = {
        x: ev.clientX,
        y: ev.clientY
    }
    return pos;    
}


function getSettings () {
    return gSets;
}




