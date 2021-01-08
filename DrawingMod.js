window.addEventListener("load", main,false);

function main() {
    let timerId;
    let scale = 50;
	let t = 0,
		dt = 0.01;
    let ctx = space.getContext("2d"),
        ctt = graph.getContext("2d");
    let y_top = [];
	let y_bottom = [];

function ret_pr(array) {
        return array[i-1]
    }

prepareData = (text) => {
    let y_top_ = [];
    let y_bottom_ = [];
    let tmp = text.split(/\r?\n/);

    for (let i = 0; i < tmp.length; i++){
        let pair = tmp[i].split(";");
        y_top_.push(parseFloat(pair[0]));
        y_bottom_.push(parseFloat(pair[1]));
    }
    return [y_top_, y_bottom_];
};

readFile = (input) => {
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function() {
        let data = prepareData(reader.result);
        y_top = data[0];
        y_bottom = data[1];
		//console.log(y_top);
    };
};



let i = 0;
    function ret(array) {
        //console.log(array[i]);
        return array[i]
    }

    function draw()
    {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(200, 200 - ret(y_top) * scale, 12, 0, 2 * Math.PI);
        ctx.arc(200, 200 - ret(y_bottom) * scale, 12, 0, 2 * Math.PI); 
        ctx.fill();

        i += 1;

        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(200, 200 - ret(y_top) * scale, 10, 0, 2 * Math.PI);
        ctx.arc(200, 200 - ret(y_bottom) * scale, 10, 0, 2 * Math.PI); 
        ctx.fill();
		ctt.beginPath();
        ctt.lineWidth = "2";
        ctt.moveTo((t - dt) * 10,200 - ret_pr(y_top) * scale);
        ctt.strokeStyle = 'green';
        ctt.lineTo(t * 10,200 - ret(y_top) * scale);
        ctt.stroke();

        ctt.beginPath();
        ctt.lineWidth = "2";
        ctt.moveTo((t - dt) * 10,200 - ret_pr(y_bottom) * scale);
        ctt.strokeStyle = 'blue';
        ctt.lineTo(t * 10,200 - ret(y_bottom) * scale);
        ctt.stroke();

        if (t > 40)
        {
            ctt.beginPath();
            ctt.fillStyle = 'white';
            ctt.rect(0,0,400,400);
            ctt.fill();
            t = 0;
            drawgraf();
        }
		t += dt;
    }

function drawgraf() {
        let ctthig = 400,
            cttlen = 400;

        ctt.beginPath();
        ctt.strokeStyle = 'black';
        ctt.lineWidth = "3";
        ctt.moveTo(0, ctthig / 2);
        ctt.lineTo(cttlen, ctthig / 2);
        ctt.lineTo(cttlen - 10, ctthig / 2 - 10);
        ctt.moveTo(cttlen, ctthig / 2);
        ctt.lineTo(cttlen - 10, ctthig / 2 + 10);
        ctt.moveTo(0, ctthig);
        ctt.lineTo(0, 0);
        ctt.lineTo(-10, 10);
        ctt.moveTo(0, 0);
        ctt.lineTo(10, 10);
        ctt.stroke();
    }
	
    StartButton.onclick = function()
    {
		drawgraf();
        timerId = setInterval(draw, 10);
    };

    StopButton.onclick = function()
    {
        clearInterval(timerId);
    };
	
	ClearButton.onclick = function()
    {
		t = 0;

        ctt.beginPath();
        ctt.fillStyle = 'white';
        ctt.rect(0,0,400,400);
        ctt.fill();
        clearInterval(timerId);
        i = 0;
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.rect(0,0,400,400);
        ctx.fill();
    }
}