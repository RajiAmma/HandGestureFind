prediction1="";
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
    });
    camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';
    });
}
console.log("ml5 Version-",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/0kfVDeQnm/model.json",modelLoaded);
function modelLoaded(){
    console.log("Model is Loaded");
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The first Prediction is "+prediction1;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}
function gotResult(error,results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        prediction1=results[0].label;
        speak();
        if(results[0].label == "Victory Symbol Open"){
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }
        if(results[0].label == "Victory Symbol Closed"){
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }
        if(results[0].label == "Thumbs Up Symbol"){
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }
        if(results[0].label == "Super Symbol"){
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
    }
}