var canvasWidth = Math.min(800, $(window).width() - 20);
// var canvasWidth = 800;
var canvasHeight = canvasWidth;


//获得canvas元素及其上下文环境对象
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

//设置画布的宽高
canvas.width = canvasWidth;
canvas.height = canvasHeight;

context.beginPath();
context.moveTo(0, 0);
context.lineTo(canvasHeight, 0);
context.lineTo(canvasHeight, canvasHeight);
context.lineTo(0, canvasHeight);
context.lineTo(0, 0);
context.lineWidth = 2;
// context.fillStyle = '#aaf';
// context.fill();
context.stroke();
context.closePath();

//设置七巧板数据
var qi = [
    [
        [{ x: 0, y: 0 }, { x: 0, y: canvasHeight }, { x: canvasHeight / 2, y: canvasHeight / 2 }], { bgcolor: '#aff' }
    ],
    [
        [{ x: 0, y: canvasHeight }, { x: canvasHeight, y: canvasHeight }, { x: canvasHeight / 2, y: canvasHeight / 2 }], { bgcolor: '#aaf' }
    ],
    [
        [{ x: 0, y: 0 }, { x: canvasHeight * 1 / 4, y: canvasHeight * 1 / 4 }, { x: canvasHeight / 2, y: 0 }], { bgcolor: '#aaa' }
    ],
    [
        [{ x: canvasHeight / 2, y: 0 }, { x: canvasHeight / 4, y: canvasHeight / 4 }, { x: canvasHeight / 2, y: canvasHeight / 2 }, { x: canvasHeight * 3 / 4, y: canvasHeight / 4 }], { bgcolor: '#faa' }
    ],
    [
        [{ x: canvasHeight * 3 / 4, y: canvasHeight / 4 }, { x: canvasHeight / 2, y: canvasHeight / 2 }, { x: canvasHeight / 2, y: canvasHeight / 2 }, { x: canvasHeight * 3 / 4, y: canvasHeight * 3 / 4 }], { bgcolor: '#afa' }
    ],
    [
        [{ x: canvasHeight * 3 / 4, y: canvasHeight * 3 / 4 }, { x: canvasHeight * 3 / 4, y: canvasHeight / 4 }, { x: canvasHeight, y: canvasHeight / 2 }, { x: canvasHeight, y: canvasHeight }], { bgcolor: '#ffa' }
    ],
    [
        [{ x: canvasHeight / 2, y: 0 }, { x: canvasHeight, y: 0 }, { x: canvasHeight, y: canvasHeight / 2 }], { bgcolor: '#faf' }
    ]
];


//开始绘画
for (var i = 0; i < qi.length; i++) {
    var block = qi[i];
    context.beginPath();
    context.moveTo(block[0][0].x, block[0][0].y);
    // console.log(i,'x:', block[0][0].x, 'y:', block[0][0].y)
    for (var j = 1; j < block[0].length; j++) {
        context.lineTo(block[0][j].x, block[0][j].y)
        // console.log(block[0][j].x, block[0][j].y);
    }
    context.fillStyle = block[1].bgcolor;
    context.fill();
    context.closePath();
}