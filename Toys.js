Status = "";
toys_image = "";
objects = [];

function preload() {
    toys_image = loadImage("Toys.JPG");
} 

function setup() {
    canvas = createCanvas(640,350);
    canvas.position(315,200);
    object_detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    Status = true;
    object_detector.Detect(toys_image,gotResults);
}

function gotResults() {
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(toys_image,0,0,640,350);
    if(Status != "") {
        for(i = 0;i < objects.length;i++) {
            document.getElementById("status").innerHTML = "Status : Detecting Objects";

            fill("#fc0303");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x, objects[i].y);
            noFill();
            stroke("#fc0303");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}