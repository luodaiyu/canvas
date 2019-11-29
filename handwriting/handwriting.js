var canvasWidth = Math.min(800, $(window).width() - 20);
var canvasHeight = canvasWidth;

var isMouseDown = false;
var lastLoc = { x: 0, y: 0 };
var lastTimestamp = 0;
var lastLineWidth = -1;
var storkeColor = 'black';

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

//设置画布宽高，不带单位
canvas.width = canvasWidth;
canvas.height = canvasHeight;

$('#controller').css('width', canvasWidth + 'px');

drawGrid();
$('#clear_btn').click(function(e) {
    context.clearRect(0, 0, canvasWidth, canvasHeight); //清除画布
    drawGrid(); //重新绘制
})

$('.color_btn').click(function(e) {
    $('.color_btn').removeClass("color_btn_selected");
    $(this).addClass('color_btn_selected');
    storkeColor = $(this).css('background-color');
})


//触控事件
canvas.addEventListener('touchstart', function(e) {
    e.preventDefault();
    var touch = e.touches[0];
    beginStorke({ x: touch.pageX, y: touch.pageY });
})
canvas.addEventListener('touchmove', function(e) {
    e.preventDefault();
    var touch = e.touches[0];
    if (isMouseDown) {
        moveStorke({ x: touch.pageX, y: touch.pageY })
    }
})
canvas.addEventListener('touchend', function(e) {
    e.preventDefault();
    endStorke();
})



//js鼠标事件
canvas.onmousedown = function(e) {
    e.preventDefault();
    beginStorke({ x: e.clientX, y: e.clientY })
}
canvas.onmouseup = function(e) {
    e.preventDefault();
    endStorke();
}
canvas.onmouseout = function(e) {
    e.preventDefault();
    endStorke();
}
canvas.onmousemove = function(e) {
    e.preventDefault();
    if (isMouseDown) {
        moveStorke({ x: e.clientX, y: e.clientY })
    }
}


function beginStorke(point) {
    isMouseDown = true;
    lastLoc = windownToCanvas(point.x, point.y);
    lastTimestamp = new Date().getTime();
}

function endStorke() {
    isMouseDown = false;
}

function moveStorke(point) {
    var curLoc = windownToCanvas(point.x, point.y);
    var curTimestamp = new Date().getTime();
    var s = calcDistance(curLoc, lastLoc);
    var t = curTimestamp - lastTimestamp;
    var lineWidth = calcLineWidth(t, s);

    //draw
    context.beginPath();
    context.moveTo(lastLoc.x, lastLoc.y)
    context.lineTo(curLoc.x, curLoc.y)

    context.strokeStyle = storkeColor;
    context.lineWidth = lineWidth; //当线条宽度大的时候会出现毛边白色，不好看
    context.lineCap = 'round'; //解决毛边，加个帽子
    context.stroke();

    lastLoc = curLoc;
    lastTimestamp = curTimestamp;
    lastLineWidth = lineWidth;
}


var maxLineWidth = 30;
var minLineWidth = 1;
var maxStoreV = 10;
var minStoreV = 0.1;

function calcLineWidth(t, s) {
    var v = s / t;
    var resultLineWidth
    if (v < minStoreV)
        resultLineWidth = maxLineWidth;
    else if (v >= maxStoreV)
        resultLineWidth = minLineWidth
    else
        resultLineWidth = maxLineWidth - (v - minStoreV) / (maxStoreV - minStoreV) * (maxLineWidth - minLineWidth)
    if (lastLineWidth == -1)
        return resultLineWidth;

    return lastLineWidth * 2 / 3 + resultLineWidth * 1 / 3

}

//两个坐标点之间的距离公式(x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)的平方根
function calcDistance(loc1, loc2) {
    return Math.sqrt((loc1.x - loc2.x) * (loc1.x - loc2.x) + (loc1.y - loc2.y) * (loc1.y - loc2.y));
}


//获得鼠标在canvas的坐标点
function windownToCanvas(x, y) {
    var bbox = canvas.getBoundingClientRect(); //获得该元素包围壳外的信息
    return { x: Math.round(x - bbox.left), y: Math.round(y - bbox.top) }
}

function drawGrid() {

    context.save(); //保存原始状态

    //1
    context.strokeStyle = 'red'

    context.beginPath(); //开始绘制路径
    context.moveTo(3, 3)
    context.lineTo(canvasWidth - 3, 3)
    context.lineTo(canvasWidth - 3, canvasHeight - 3)
    context.lineTo(3, canvasHeight - 3)
    context.closePath()

    context.lineWidth = 6
    context.stroke()

    //2
    context.beginPath();
    context.moveTo(0, 0)
    context.lineTo(canvasWidth, canvasHeight)

    context.moveTo(canvasWidth, 0)
    context.lineTo(0, canvasHeight)

    context.moveTo(0, canvasHeight / 2)
    context.lineTo(canvasWidth, canvasHeight / 2)

    context.moveTo(canvasWidth / 2, 0)
    context.lineTo(canvasWidth / 2, canvasHeight)

    context.lineWidth = 1
    context.stroke()

    context.restore(); //恢复状态。为了不影响接下来的绘制
}