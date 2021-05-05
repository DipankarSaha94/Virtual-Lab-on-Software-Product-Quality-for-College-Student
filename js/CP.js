

const initCanvas = (id) => {
    return new fabric.Canvas(id, {
        width: 500,
        height: 500,
        selection: false
    });
}

const setBackground = (url, canvas) => {
    fabric.Image.fromURL(url, (img) => {
        canvas.backgroundImage = img
        canvas.renderAll()
    })
}

const toggleMode = (mode) => {
    if (mode === modes.pan) {
        if (currentMode === modes.pan) {
            currentMode = ''
        } else {
            currentMode = modes.pan
            canvas.isDrawingMode = false
            canvas.renderAll()
        }
    } else if (mode === modes.drawing) {
        if (currentMode === modes.drawing) {
            currentMode = ''
            canvas.isDrawingMode = false
            canvas.renderAll()
        } else {
            currentMode = modes.drawing
            canvas.freeDrawingBrush.color = color
            canvas.isDrawingMode = true
            canvas.renderAll()
        }      
    }
}

const setPanEvents = (canvas) => {
    canvas.on('mouse:move', (event) => {
        // console.log(event)
        if (mousePressed && currentMode === modes.pan) {
            canvas.setCursor('grab')
            canvas.renderAll()
            const mEvent = event.e
            const delta = new fabric.Point(mEvent.movementX, mEvent.movementY)
            canvas.relativePan(delta)
        }
    })
    // keep track of mouse down/up
    canvas.on('mouse:down', (event) => {
        mousePressed = true;
        if (currentMode === modes.pan) {
            canvas.setCursor('grab')
            canvas.renderAll()
        }
    })
    canvas.on('mouse:up', (event) => {
        mousePressed = false
        canvas.setCursor('default')
        canvas.renderAll()
    })
}


const clearCanvas = (canvas, state) => {
    state.val = canvas.toSVG()
    canvas.getObjects().forEach((o) => {
        if(o !== canvas.backgroundImage) {
            canvas.remove(o)
        }
    })
}

const restoreCanvas = (canvas, state, bgUrl) => {
    if (state.val) {
        fabric.loadSVGFromString(state.val, objects => {
            console.log(objects)
            objects = objects.filter(o => o['xlink:href'] !== bgUrl)
            canvas.add(...objects)
            canvas.requestRenderAll()
        })
    }
}



const createRect1 = (canvas) => {
    console.log("rect")
    const canvCenter = canvas.getCenter()
    const rect = new fabric.Rect({
        width: 50,
        height: 50,
        fill: 'white',
        left: canvCenter.left,
        top: -50,
	angle: 45,
        originX: 'center',
        originY: 'center',
        cornerColor: 'white'
    })
    canvas.add(rect)
   
    canvas.renderAll()
    rect.animate('top', canvas.height - 50, {
        onChange: canvas.renderAll.bind(canvas),
        onComplete: () => {
            rect.animate('top', canvCenter.top, {
                onChange: canvas.renderAll.bind(canvas),
                easing: fabric.util.ease.easeOutBounce,
                duration: 200
            })
        }
      });

}

const createRect2 = (canvas) => {
    console.log("rect2")
    const canvCenter = canvas.getCenter()
    const rect2 = new fabric.Rect({
        width: 60,
        height: 40,
        fill: 'white',
        left: canvCenter.left,
        top: -50,
        originX: 'center',
        originY: 'center',
        cornerColor: 'white'
    })
    canvas.add(rect2)
    canvas.renderAll()
    rect2.animate('top', canvas.height - 50, {
        onChange: canvas.renderAll.bind(canvas),
        onComplete: () => {
            rect2.animate('top', canvCenter.top, {
                onChange: canvas.renderAll.bind(canvas),
                easing: fabric.util.ease.easeOutBounce,
                duration: 200
            })
        }
      });
}

const createEllps = (canvas) => {
    console.log("elips")
    const canvCenter = canvas.getCenter()
    const elips = new fabric.Ellipse({
        rx: 30,
	ry: 20,
        fill: 'white',
        left: canvCenter.left,
        top: -50,
        originX: 'center',
        originY: 'center',
        cornerColor: 'white'
    })
    canvas.add(elips)
    canvas.renderAll()
    elips.animate('top', canvas.height - 50, {
        onChange: canvas.renderAll.bind(canvas),
        onComplete: () => {
            elips.animate('top', canvCenter.top, {
                onChange: canvas.renderAll.bind(canvas),
                easing: fabric.util.ease.easeOutBounce,
                duration: 200
            })
        }
      });
}



const canvas = initCanvas('canvas')
const svgState = {}
let mousePressed = false
let color = '#000000'
const group = {}
const bgUrl = 'https://cdn.pixabay.com/photo/2017/03/17/19/37/sky-2152463_960_720.jpg'

$('nav li').hover(
	function() {
		$('ul', this).stop().slideDown(200);
	},
	function() {
		$('ul', this).stop().slideUp(200);
	}
);
$("#start").click(function() {
	$('html, body').animate({
		scrollTop: $("#container2").offset().top
	}, 1000);
});
function pass_func1() {
			$("#buttonAlertSuc").slideDown(1000).delay(2000).slideUp(1000);
		$("#cb1").delay(200).slideDown(1500);
	
	var pic = "images/Ans1.png"
        document.getElementById('bigpic').src = pic.replace('90x90', '225x225');
	}

let currentMode;

const modes = {
    pan: 'pan',
    drawing: 'drawing'
}
const reader = new FileReader()

setBackground(bgUrl, canvas)
setPanEvents(canvas)

const inputFile = document.getElementById('myImg');
inputFile.addEventListener('change', imgAdded)

reader.addEventListener("load", () => {
    fabric.Image.fromURL(reader.result, img => {
        canvas.add(img)
        canvas.requestRenderAll()
    })
})


