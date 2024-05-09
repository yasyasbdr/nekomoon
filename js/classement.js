function classement() {
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = fonction_classement;
    let lienapi = `https://sae-301.azurewebsites.net/get-leaderboard.php`;
    httpRequest.open('GET', lienapi, true);
    httpRequest.setRequestHeader("authorization", true);
    httpRequest.send();
}

function fonction_classement() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            let reponse = JSON.parse(httpRequest.responseText);
            document.getElementById('classement').innerHTML = "<tr id='top-ligne'><th>Rang</th><th>Pseudo</th><th>Score</th></tr>";
            for (let i = 0; i < reponse.length; i++) {
                let ligne = reponse[i];
                const tableau = document.createElement("tr");
                tableau.innerHTML = '<td>'+(i + 1)+'</td>' + '<td>'+ ligne.username + '</td>' + '<td>'+ ligne.score.toLocaleString() + '</td>';
                if(i == 0){
                    tableau.innerHTML = '<td class="premierDuClassement">'+(i + 1)+'</td>' + '<td class="premierDuClassement">'+ ligne.username + '</td>' + '<td class="premierDuClassement">'+ ligne.score.toLocaleString() + '</td>';
                }
                document.getElementById('classement').appendChild(tableau);
            }
        } else {
            console.log("Impossible d'accéder au classement.");
        }
    }
}

setInterval (function() {
    classement();
}, 1000);

window.onload = classement();
