// var WINDON_WIDTH = 1024;
// var WINDON_HEIGHT = 768;
var RADIUS = 8;//半径
var MARGIN_TOP = 60;//文字间的距离
var MARGIN_LEFT = 30;

// const endTime = new Date(2019, 10, 25, 19, 11, 52);
var endTime = new Date();
endTime.setTime(new Date().getTime() + 3600 * 1000);
var curShowTimeSeconds = 0;

var balls = [];
const colors = ['#aff', '#aaf', '#aaa', '#faa', '#ffa', '#afa', '#aff', '#aaf', '#faf', 'green'];

window.onload = function () {
    WINDON_WIDTH = document.body.clientWidth;
    WINDON_HEIGHT = document.documentElement.clientHeight || document.body.clientHeight;

    MARGIN_LEFT = Math.round(WINDON_WIDTH / 10);
    RADIUS = Math.round(WINDON_WIDTH * 4 / 5 / 108) - 1;
    MARGIN_TOP = Math.round(WINDON_HEIGHT / 5);

    var canvas = document.getElementById('canvas');
    var contex = canvas.getContext('2d');


    canvas.height = WINDON_HEIGHT;
    canvas.width = WINDON_WIDTH;

    contex.beginPath();
    contex.moveTo(0, 0);
    contex.lineTo(WINDON_WIDTH, 0);
    contex.lineTo(WINDON_WIDTH, WINDON_HEIGHT);
    contex.lineTo(0, WINDON_HEIGHT);
    contex.lineTo(0, 0);
    // contex.fillStyle = '#faf'
    // contex.fill();
    contex.strokeStyle = 'red'
    contex.lineWidth = 2;
    contex.stroke();
    // contex.closePath();

    //当前时间秒
    curShowTimeSeconds = getCurrentShowTimeSeconds();

    this.setInterval(function () {
        render(contex);
        update();

    }, 50)

}


function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    //倒计时时间计算
    // var ret = endTime.getTime() - curTime.getTime();
    // ret = Math.round(ret / 1000);
    // return ret >= 0 ? ret : 0;

    //时钟时间计算
    var ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
    return ret;
}

function update() {

    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var netMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
    var nextSeconds = nextShowTimeSeconds % 60;

    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
    var curSeconds = curShowTimeSeconds % 60;

    if (nextSeconds != curSeconds) {
        if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {//当前小时的十位数字发生变化
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10));
        }
        if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {//当前小时的个位数字发生变化
            addBalls(MARGIN_LEFT + (7 * 2 + 1) * (RADIUS + 1), MARGIN_TOP, parseInt(curHours % 10));
        }
        if (parseInt(curMinutes / 10) != parseInt(netMinutes / 10)) {//当前分钟的十位数字发生变化
            addBalls(MARGIN_LEFT + (18 * 2 + 1 * 3) * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
        }
        if (parseInt(curMinutes % 10) != parseInt(netMinutes % 10)) {//当前分钟的个位数字发生变化
            addBalls(MARGIN_LEFT + (25 * 2 + 1 * 4) * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
        }
        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {//当前秒数的十位数字发生变化
            addBalls(MARGIN_LEFT + (36 * 2 + 1 * 6) * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
        }
        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {//当前秒数的个位数字发生变化
            addBalls(MARGIN_LEFT + (43 * 2 + 1 * 7) * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds % 10));
        }
        curShowTimeSeconds = nextShowTimeSeconds;
    }

    updateBalls();

}

function render(cxt) {

    cxt.clearRect(0, 0, WINDON_WIDTH, WINDON_HEIGHT);

    var hours = parseInt(curShowTimeSeconds / 3600);
    // console.log('hours',hours)
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
    // console.log('minutes',minutes)
    var seconds = curShowTimeSeconds % 60;
    // console.log('seconds',seconds)

    //时
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt);//十位
    renderDigit(MARGIN_LEFT + (7 * 2 + 1) * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt);//个位

    renderDigit(MARGIN_LEFT + (14 * 2 + 1 * 2) * (RADIUS + 1), MARGIN_TOP, 10, cxt);//冒号

    //分
    renderDigit(MARGIN_LEFT + (18 * 2 + 1 * 3) * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);//十位
    renderDigit(MARGIN_LEFT + (25 * 2 + 1 * 4) * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt);//个位

    renderDigit(MARGIN_LEFT + (32 * 2 + 1 * 5) * (RADIUS + 1), MARGIN_TOP, 10, cxt);//冒号

    //秒
    renderDigit(MARGIN_LEFT + (36 * 2 + 1 * 6) * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);//十位
    renderDigit(MARGIN_LEFT + (43 * 2 + 1 * 7) * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);//个位


    for (var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
        cxt.closePath();

        cxt.fill();
    }
}

//使小球变化
function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        //碰撞检测
        if (balls[i].y >= WINDON_HEIGHT - RADIUS) {
            balls[i].y = WINDON_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;
        }
    }

    //性能优化，去除已经消失在屏幕外的小球的数据
    var cnt = 0;
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDON_WIDTH) {
            balls[cnt++] = balls[i];
        }
    }

    // console.log('qian', balls.length)
    while (balls.length > Math.min(300, cnt)) {
        balls.pop();
        // console.log('hou', balls.length)
    }

}

function addBalls(x, y, num) {
    //计算生成的新的小球
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,//计算当前x轴运动方向是为正还是为负
                    vy: -5,//向上抛的动作
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
                balls.push(aBall);
            }
        }
    }
}

function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = 'blue';

    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}