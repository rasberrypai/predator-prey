let dataSize = 0;
let autoZoom = true;
function drawGraph(){
  let visibleDataPoints;
  switch (dataSize){
    case 0:
      visibleDataPoints = data[0].length;
      break;
    default:
      visibleDataPoints = dataSize;
  }
  let maxValue = 0;
  let zoomThreshold = autoZoom ? visibleDataPoints : data[0].length;
  for(let i = 0; i < zoomThreshold && i < data[0].length; i++){
    let a = data[0].length > zoomThreshold ? i + data[0].length - zoomThreshold : i;
    if(data[0][a] > maxValue)
      maxValue = data[0][a];
    if(data[1][a] > maxValue)
      maxValue = data[1][a];
  }
  let widthIncrement = (canvasWidth-5)/visibleDataPoints;
  let heightIncrement = (canvasHeight-5)/maxValue;
  strokeWeight(2);
  for(let i = 0; i < visibleDataPoints && i < data[0].length-1; i++){
    stroke(color("red"));
    let x1 = i * widthIncrement;
    let x2 = (i+1) * widthIncrement;
    let a = data[0].length > visibleDataPoints ? i + data[0].length - visibleDataPoints - 1 : i;

    let y1 = data[0][a]*heightIncrement;
    let y2 = data[0][a+1]*heightIncrement;
    line(x1,canvasHeight-y1,x2,canvasHeight-y2);

    fill(color("red"));
    if(a == data[0].length-2){
      ellipse(x2,canvasHeight-y2,4,4);
    }

    stroke(color("green"));
    y1 = data[1][a]*heightIncrement;
    y2 = data[1][a+1]*heightIncrement;
    line(x1,canvasHeight-y1,x2,canvasHeight-y2);

    fill(color("green"));
    if(a == data[1].length-2)
      ellipse(x2,canvasHeight-y2,4,4);
  }
}
function ChangeVisiblePoints(){
  dataSize = parseInt(document.getElementById("visible-points").value);
}
function SetAutoZoom(){
  autoZoom = document.getElementById("graph-zoom").checked;
}
