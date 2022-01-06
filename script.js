// should not be seen bro

function removeOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

function removeAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
        if (arr[i] === value) {
            arr.splice(i, 1);
        } else {
            ++i;
        }
    }
    return arr;
}

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect()
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }
}

counter = 0
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d');

canvas.height = 400
canvas.width = 400

ctx.fillStyle = 'black'
ctx.fillRect(0, 0, canvas.width, canvas.height)

players = {}
psize = 15
vel = 5
//veldg = vel / 1.41421356237
veldg = vel * (1 / Math.sqrt(2))
//veldg += 0.000000000001
//x = null
//y = null
x = 0
y = y
framerate = 17

keydow = []
dir = '' // 

lcodes = 65
ucodes = 87
rcodes = 68
dcodes = 83

xmouse = 0
ymouse = 0
mdown = false

//codr = 

window.addEventListener('keydown', e => {

    e.preventDefault()
    keyc = e.keyCode
    if (keydow.indexOf(keyc) < 0) {

        keydow.push(keyc)
        //removeAll(keydow, (keyc + 2) % 4 + +!!((keyc + 2) % 4) * 36 + +!!!((keyc + 2) % 4) * 40)

    }
    //console.log(keydow)
})

window.addEventListener('keyup', e => {

    e.preventDefault()

    removeOnce(keydow, e.keyCode)

})


window.addEventListener('mousemove', mouseMove)

function mouseMove(e) {
    rect = canvas.getBoundingClientRect()
    xmouse = e.clientX - rect.left
    ymouse = e.clientY - rect.top
}

window.addEventListener('mousedown', e => {
    console.log("MOUSE DOWNED")
    mdown = true
    console.log(mdown)
})

window.addEventListener('mouseup', e => {
    mdown = false
    console.log(mdown)
})




function draw() {

    // l r u d ul ur dl dr

    //hor = ''
    //ver = ''

    // faster ? or just fancy
    /*
    dir = ''

    isl = !!(keydow.indexOf(lcodes) + 1) // 0   0   1   1
    isr = !!(keydow.indexOf(rcodes) + 1) // 0   1   0   1
    isu = !!(keydow.indexOf(ucodes) + 1) // 0   0   1   1
    isd = !!(keydow.indexOf(dcodes) + 1) // 0   1   0   1

    dir = 'l'.repeat(isl && !isr) + 'r'.repeat(isr && !isl) + 'u'.repeat(isu && !isd) + 'd'.repeat(isd && !isu)
    */

    dir = ''

    isl = keydow.indexOf(lcodes)
    isu = keydow.indexOf(ucodes)
    
    if (isl > -1 != keydow.indexOf(rcodes) > -1) {
        if (isl > -1)
            dir = 'l'
        else
            dir = 'r'
    }
    
    if (isu > -1 != keydow.indexOf(dcodes) > -1) {
        if (isu > -1)
            dir += 'u'
        else
            dir += 'd'
    }
    

    //dir = hor + ver
    /*
    console.log("DIRECTION -", dir)
    console.log(keydow)
    */

    switch(dir) {
        case 'l': {
            x -= vel
            break
        }
        case 'r': {
            x += vel
            break
        }
        case 'u': {
            y -= vel
            break
        }
        case 'd': {
            y += vel
            break
        }
        case 'lu': {
            x -= veldg
            y -= veldg
            break
        }
        case 'ru': {
            x += veldg
            y -= veldg
            break
        }
        case 'ld': {
            x -= veldg
            y += veldg
            break
        }
        case 'rd': {
            x += veldg
            y += veldg
            break
        }
    }

 
    //console.log(xmouse, ymouse)
    //console.log(getMousePos()



    ctx.fillStyle = '#f1f1f1'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = 'black'
    ctx.fillRect(x, y, psize, psize)

    for (const property in players) {
        ctx.fillStyle = 'pink'
        //console.log("HELLO", socket.id, property)
        if (property == socket.id) {
            ctx.fillStyle = 'lightblue'
        }
        ctx.fillRect(Math.round(players[property]['pos']['x']), Math.round(players[property]['pos']['y']), psize, psize)
        //console.log(property)
        
    };
}


// vi .


setInterval(draw, framerate)

const socket = io()

socket.on('con', (playerdata) => {
    //console.log("Client socket.id ", socket.id)
    //console.log("Playerdata ", playerdata)
    //console.log("Pos ", playerdata[])
    x = playerdata[[socket.id]]['pos']['x']
    y = playerdata[[socket.id]]['pos']['y']
})

socket.on('game', (svplayers) => {
    //console.log('Client got the message: ' + msg)
    counter++
    document.getElementById('hone').innerHTML = counter
    //
    players = svplayers

    socket.emit('gack', {'x': x, 'y': y})
    



    //console.log("Client players: " + players[[socket.id]]['pos'])


    //console.log(x, y)

    /*
    ctx.fillStyle = 'white'
    ctx.fillRect(x, y, psize, psize)
    */
})

        

