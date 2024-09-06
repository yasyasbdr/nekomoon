var score = 0;
var force = 1;

var pinkukoPrix = 100;
var compteurBonusPinkuko = 0;
var aoikoPrix = 100;
var compteurBonusAoiko = 0;
var midorikoPrix = 10000;
var compteurBonusMidoriko = 0;

var i=0;

// Fonction pour récupérer les paramètres de l'URL
function getQueryParam(param) {
  let urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

window.onload = function () {
  // Récupérer le pseudo depuis l'URL
  let pseudonyme = getQueryParam('username');

  if (pseudonyme) {
    // Sauvegarder le pseudo dans le sessionStorage
    sessionStorage.setItem('username', pseudonyme);
    sessionStorage.setItem('score', 0); // Initialise le score à 0 si non présent
  } else {
    pseudonyme = sessionStorage.getItem('username');
  }

  // Afficher le pseudo dans le jeu
  document.getElementById("pseudonyme").innerText = pseudonyme;

  // Récupérer et afficher le score depuis le sessionStorage
  let score = Number(sessionStorage.getItem('score'));
  document.getElementById("score").innerHTML = "Score : " + score.toLocaleString();
};

//Affichage des fenêtres info et règles du jeu
function afficherInfos(){
    var fenetreInfoMenu = document.getElementById("fenetreInfoMenu");
    fenetreInfoMenu.classList.toggle("active");
    document.getElementById("divLogoEtFormulaire").classList.toggle("disableSelect");
    document.getElementById("header").classList.toggle("disableSelect");
  }
  
  function afficherReglesDuJeu() {
    var fenetreReglesDuJeu = document.getElementById("fenetreReglesDuJeu");
    fenetreReglesDuJeu.classList.toggle("active");
    document.getElementById("divLogoEtFormulaire").classList.toggle("disableSelect");
    document.getElementById("header").classList.toggle("disableSelect");
  }
//

//Changer de skins:
function mettreSkinVert() {
  document.getElementById("skinVert").classList.add("selected");
  document.getElementById("skinViolet").classList.remove("selected");
  document.getElementById("skinBleu").classList.remove("selected");

  var skin = document.getElementById("skinDuClicker");
  skin.src = 'images/nekomoon-vert.png';
}

function mettreSkinViolet() {
  document.getElementById("skinVert").classList.remove("selected");
  document.getElementById("skinViolet").classList.add("selected");
  document.getElementById("skinBleu").classList.remove("selected");

  var skin = document.getElementById("skinDuClicker");
  skin.src = 'images/nekomoon-violet.png';
}

function mettreSkinBleu() {
  document.getElementById("skinVert").classList.remove("selected");
  document.getElementById("skinViolet").classList.remove("selected");
  document.getElementById("skinBleu").classList.add("selected");

  var skin = document.getElementById("skinDuClicker");
  skin.src = 'images/nekomoon-bleu.png';
}
//


//Augmenter le score
function augmenterScore() {
  score = score + 1;
  document.getElementById("scorecompteur").innerHTML = score.toLocaleString() + " ȼ";
  document.getElementById("score").innerHTML = "Score : " + score.toLocaleString();
  
  if (score >= pinkukoPrix) {document.getElementById("imgpinkuko").classList.remove("pasdebloque");}
  if (score >= aoikoPrix) {document.getElementById("imgaoiko").classList.remove("pasdebloque");}

  if (score >= 10) {
    document.getElementById("succesUn").classList.remove("succesnonobtenu");
    document.getElementById("pasDeSucces").style.visibility = "hidden";
  }

  if (score >= 100) {
    document.getElementById("succesDeux").classList.remove("succesnonobtenu");
  }

  setInterval (function() {//Pour que les conditions soient vérifiées toutes les demi secondes
    if (score >= midorikoPrix) {document.getElementById("imgmidoriko").classList.remove("pasdebloque");}
    if (score >= 1000) {
      document.getElementById("succesTrois").classList.remove("succesnonobtenu");
    }
  
    if (score >= 100000) {
      document.getElementById("succesQuatre").classList.remove("succesnonobtenu");
    }
  }, 500);

  if (compteurBonusPinkuko > 0) {
    score = score + (compteurBonusPinkuko * 10);
  }

  if (compteurBonusMidoriko > 0) {
    score = score + (compteurBonusMidoriko * 1000);
  }
}
//

function addscore() {
  let user = pseudonyme;
  let force = false;
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = traitement;
  httpRequest.open('POST', 'https://sae-301.azurewebsites.net/save-score.php', force);
  httpRequest.setRequestHeader("Content-Type", "application/json");
  let data = JSON.stringify({ "username": user, "score": score, "force": force });
  httpRequest.send(data);
}

function traitement() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
          let response = JSON.parse(httpRequest.responseText);
      } else {
         console.log("Le score actuel est trop faible");
      }
  }
}


//Acheter des bonus
function acheterPinkuko() {
  //+ rendre actif img pinkuko et visibility hidden pour le nombre
  if (score >= pinkukoPrix) {
    document.getElementById("compteurBonusPinkuko").style.visibility = "visible";
    score = score - pinkukoPrix;
    compteurBonusPinkuko = compteurBonusPinkuko + 1;
    pinkukoPrix = Math.round(pinkukoPrix * 1.5);

    document.getElementById("score").innerHTML = "Score : " + score.toLocaleString();
    document.getElementById("scorecompteur").innerHTML = score.toLocaleString() + " ȼ";
    document.getElementById("pinkukoPrix").innerHTML = pinkukoPrix.toLocaleString() + " ȼ";
    document.getElementById("compteurBonusPinkuko").innerHTML = compteurBonusPinkuko;
  }
}

function acheterAokiko(secondes) {
  if (score >= aoikoPrix) {
    i++
    if (i==1) {
      document.body.style.backgroundImage = 'url("images/nekomoon_blue_background.png")';
      document.getElementById("skinVert").classList.remove("selected");
      document.getElementById("skinViolet").classList.remove("selected");
      document.getElementById("skinBleu").classList.add("selected");
      var skin = document.getElementById("skinDuClicker");
      skin.src = 'images/nekomoon-bleu.png';
      document.getElementById("compteurDeClicMoon").style.backgroundColor="#2B2D52";
    }

    document.getElementById("compteurBonusAoiko").style.visibility = "visible";
    score = score - aoikoPrix;
    compteurBonusAoiko = compteurBonusAoiko + 1;
    aoikoPrix = Math.round(aoikoPrix * 1.5);

    document.getElementById("score").innerHTML = "Score : " + score.toLocaleString();
    document.getElementById("scorecompteur").innerHTML = score.toLocaleString() + " ȼ";
    document.getElementById("aoikoPrix").innerHTML = aoikoPrix.toLocaleString() + " ȼ";
    document.getElementById("compteurBonusAoiko").innerHTML = compteurBonusAoiko;
  }
  
  setInterval (function() {
  score = score + 10;
  document.getElementById("score").innerHTML = "Score : " + score.toLocaleString();
  document.getElementById("scorecompteur").innerHTML = score.toLocaleString() + " ȼ";
}, 1000);//(ajoute 10 clics toutes les secondes)
}

function acheterMidoriko() {
  //+ rendre actif img pinkuko et visibility hidden pour le nombre
  if (score >= midorikoPrix) {
    document.body.style.backgroundImage = 'url("images/nekomoon_green_background.png")';
    document.getElementById("skinVert").classList.add("selected");
    document.getElementById("skinViolet").classList.remove("selected");
    document.getElementById("skinBleu").classList.remove("selected");
    var skin = document.getElementById("skinDuClicker");
    skin.src = 'images/nekomoon-vert.png';
    document.getElementById("compteurDeClicMoon").style.backgroundColor="#074100";

    document.getElementById("compteurBonusMidoriko").style.visibility = "visible";
    score = score - midorikoPrix;
    compteurBonusMidoriko = compteurBonusMidoriko + 1;
    midorikoPrix = Math.round(midorikoPrix * 3);

    document.getElementById("score").innerHTML = "Score : " + score.toLocaleString();
    document.getElementById("scorecompteur").innerHTML = score.toLocaleString() + " ȼ";
    document.getElementById("midorikoPrix").innerHTML = midorikoPrix.toLocaleString() + " ȼ";
    document.getElementById("compteurBonusMidoriko").innerHTML = compteurBonusMidoriko;
  }

  setInterval (function() {
    score = score + 1000;
    document.getElementById("score").innerHTML = "Score : " + score.toLocaleString();
    document.getElementById("scorecompteur").innerHTML = score.toLocaleString() + " ȼ";
  }, 1000);
}
//


//session

function test(){
  addscore();
  sessionStorage.setItem('score', score);
  window.location.href = 'classement.html';
}


function saveinfo(){
  let username = document.getElementById('inputusername').value;
  sessionStorage.setItem('username', username);
  sessionStorage.setItem('score', 0);
  console.log(username);
}

var pseudonyme;

window.onload = function () {
  pseudonyme = sessionStorage.getItem("username");
  console.log(pseudonyme);
  score = Number(sessionStorage.getItem("score"));
  console.log(score);
  document.getElementById("pseudonyme").innerText = pseudonyme;
};





var matB = new Array(
  new Array(6),
  new Array(-2),
  new Array(3),
  new Array(15),
  new Array(2),
  new Array(-6),
  new Array(5)
  ) ;