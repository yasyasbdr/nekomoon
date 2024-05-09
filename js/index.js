
document.getElementById("btnJouer").setAttribute("disabled",true)
function activerBtn(input) {
  console.log(input.value.length)
  console.log(input.value)
  if (input.value.length >= 5){
    document.getElementById("btnJouer").removeAttribute("disabled")
  }
  else {
    document.getElementById("btnJouer").setAttribute("disabled",true)
  }
}

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

//Afficher la bulle d'info du input pseudo
function afficherBulleDinfo() {
  document.getElementById("infoInput").classList.toggle("active");
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