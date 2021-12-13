const getPixelRatio = (context) => {
  var backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;

  return (window.devicePixelRatio || 1) / backingStore;
};

export function CreateBorder(canvas, context) {
    let ratio = getPixelRatio(context);
    let width = getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    let height = getComputedStyle(canvas)
    .getPropertyValue("height")
    .slice(0, -2);

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    context.beginPath();
    context.setLineDash([]);
    context.moveTo(0, 0);
    context.lineTo(canvas.width, 0);
    context.moveTo(0, canvas.height);
    context.lineTo(canvas.width, canvas.height);
    context.moveTo(0, 0);
    context.lineTo(0, canvas.height);
    context.moveTo(canvas.width, 0);
    context.lineTo(canvas.width, canvas.height);
    context.stroke();

    DrawDottedLine(context, canvas);
}

export function DrawDottedLine(context, canvas){
    context.beginPath();
    context.setLineDash([5, 10]);
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.stroke();
}

export function CreatePlayer(context, x, y, w, h) {    
    const backgroundColor = 'black';

    context.beginPath();
    context.fillStyle = backgroundColor;
    context.fillRect(x, y, w, h);
    context.stroke();
}

export function CreateBall(context, x, y, r) {   
    const backgroundColor = 'black';

    context.beginPath();
    context.setLineDash([]);
    context.fillStyle = backgroundColor;
    context.arc(x, y, r, 0, 2 * Math.PI, true);
    context.fill();
    context.stroke();
}