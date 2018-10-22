var gSets = {
    brushStyle:'rect',
    color: '#000000s',
    bgColor: '#ffffff',
    currPos: {},
    prevPos: {},
    isDown: false,
}

function updateCurrPos(ev) {
    if(!gSets.isDown) return;
    gSets.prevPos = gSets.currPos;
    //sets the new position
    ev = ev || window.event;
    var currPos = {
        x: ev.clientX,
        y:ev.clientY
    }
    gSets.currPos = currPos;
    // if(!gSets.prevPos.x) gSets.prevPos = currPos;
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




