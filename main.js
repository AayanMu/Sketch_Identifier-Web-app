function preload(){
    classifier= ml5.imageClassifier('DoodleNet');
}

function setup(){
    canvas= createCanvas(300, 300);
    canvas.center();
    background('white');
    canvas.mouseReleased(mc);
    synth= window.speechSynthesis;
}

function draw(){
    strokeWeight(5);
    stroke(0);

    if(mouseIsPressed){
   line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function mc(){
    classifier.classify(canvas, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }

    else{
        console.log(results);
        document.getElementById('object').innerHTML= "Object: "+ results[0].label;
        percent= floor(results[0].confidence* 100)
        document.getElementById('confidence').innerHTML= "Accuracy: "+ percent +" %";
        ut= new SpeechSynthesisUtterance(results[0].label);
        synth.speak(ut);
    }
}

function clear_canvas(){
    background('white');
}
