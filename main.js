function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  imagenes = ml5.imageClassifier('MobileNet',modelocargado);
}

function modelocargado() {
    console.log('Model Loaded!');
}

function draw() {
  image(video, 0, 0, 600, 500);
  imagenes.classify(video, gotResult);
}
var valor_inicial = '';

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    if((results[0].confidence > 0.5) && (valor_inicial != results[0].label)){
      console.log(results);
      valor_inicial = results[0].label;
      var voz = window.speechSynthesis;
      hablar = 'El objeto es  - '+results[0].label;
      var texto = new SpeechSynthesisUtterance(hablar);
      voz.speak(texto);

      document.getElementById("objeto").innerHTML = results[0].label;
      document.getElementById("confianza").innerHTML = results[0].confidence.toFixed(3);
    }
  }
}
