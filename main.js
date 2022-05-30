prediction_1 = " "
prediction_2 = " "

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png_format',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capture_image" src="' + data_uri + '">';
    });
}

console.log('ml5 version',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/njFt_zMQH/model.json',modelLoaded);

function modelLoaded(){
    console.log('modelLoaded');
}

function speak(){
    var Synth = window.speechSynthesis;

    speak_data1 = "First Prediction Is " + prediction_1;
    speak_data2 = "Second Prediction Is " + prediction_2;

    utter_this = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    Synth.speak(utter_this);
}

function check(){
    img = document.getElementById('capture_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, result){
    if(error)  {
        console.error(error);
    }
    else{
        console.log(result)
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        speak();
        if(result[0].label == "Happy"){
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }
        if(result[0].label == "Sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if(result[0].label == "Angry"){
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }
        if(result[1].label == "Happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }
        if(result[1].label == "Sad"){
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }
        if(result[1].label == "Angry"){
            document.getElementById("update_emoji2").innerHTML = "&#128548;";
        }
    }
}