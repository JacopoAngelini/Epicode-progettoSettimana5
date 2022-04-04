alert('Benvenuto al memory game!\nUna piccola avvertenza: dai il tempo alle carte di girarsi nuovamente quando non sono uguali!\n\nCon grande umiltà vorrei specificare che ho rifatto il progetto da zero perchè volevo sfidare me stesso avendo carta bianca, capisco esca un pochino dalla consegna forse perchè ci è stato dato un aiuto ma ho voluto provare senza. siate clementi per favore, buon divertimento!')
var arrayAnimali = ['🐱', '🦉', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐱', '🦉', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', ];
var nodiPostiCarte = document.querySelectorAll('#gioco .cartabox > p');
var controlloFinale = 0;
var resetTimer = 0;

// timer inizio

var sec = 0;
var min = 0;
var a = 0;
var clear = setInterval(timer, 1000);
var clear1;

function timer() {

  if (sec < 60) {
    document.getElementById('timer').innerHTML = 'Timer : ' + min + ' min ' + sec + ' sec ';
    sec++;
  } else {
    min++;
    document.getElementById('timer').innerHTML = 'Timer : ' + min + ' min ' + 0 + ' sec ';
    sec = 0;
  }

}



// timer fine

function randomizza() {
  arrayNumeri = Array.from(Array(20).keys());

  function shuffle(numero) {
    for (var j, x, i = numero.length; i; j = parseInt(Math.random() * i), x = numero[--i], numero[i] = numero[j], numero[j] = x);
    return numero;
  };
  var numeriMix = shuffle(arrayNumeri);

  for (let a = 0; a < 20; a++) {
    nodiPostiCarte[a].innerText = arrayAnimali[numeriMix[a]];
  }
}
randomizza();

// funzione tasto ricomincia
function ricomincia() {
  sec = 0;
  min = 0;
  controlloFinale = 0;
  document.getElementById('gioco').style.backgroundColor = '#ffc107';
  document.getElementById('button').style.backgroundColor = '#6c757d';
  document.getElementById('timer').style.color = 'white';
  for (var index = 0; index < 20; index++) {
    nodiPostiCarte[index].style.transform = 'rotateY(' + 90 + 'deg)';
    nodiPostiCarte[index].style.opacity = 1;
  }
  randomizza();
  clearInterval(clear);
  clearInterval(clear1);

  clear1 = setInterval(timer, 1000);
  resetTimer = 0;



}


var carteGirate = 0;
var passaggio = null;
var carta1;
var carta2;
var primoIndex;
var secondoIndex = 0;

function giraEaccoppia(index) {

  //memorizza le due carte se non già accoppiate correttamente
  if (nodiPostiCarte[index].style.opacity != 0.5)
    carteGirate++; {
    if (carteGirate == 1) {
      carta1 = nodiPostiCarte[index].innerHTML;
      primoIndex = index;
      passaggio = 0;
      console.log('carta 1 ' + carta1 + 'pos' + index);
    } else if (passaggio == 0 && primoIndex != index) {
      carta2 = nodiPostiCarte[index].innerHTML;
      console.log('carta 2 ' + carta2 + 'pos' + index);
      secondoIndex = index;
      passaggio = 1;
    }
  }

  //gira carte se non già accoppiate correttamente, la cosa ceh differenzia le carte accoppiate bene da quelle
  //non è appunto l'opacità quindi la uso come parametro di controllo
  if (nodiPostiCarte[index].style.opacity != 0.5) {
    var rotation = 90;
    id = setInterval(gira, 1);

    function gira() {
      if (rotation == 0) {
        clearInterval(id);
      } else {
        rotation--;
        nodiPostiCarte[index].style.transform = 'rotateY(' + rotation + 'deg)';
      }

      // rigiro carte solo se so di essere passato nel confronto ed entrato nella condizione negativa
      if (nodiPostiCarte[secondoIndex].style.color == 'red') {
        setTimeout(() => {
          nodiPostiCarte[secondoIndex].style.transform = 'rotateY(90deg)';
          nodiPostiCarte[primoIndex].style.transform = 'rotateY(90deg)';
        }, 600);
        nodiPostiCarte[secondoIndex].style.color = '';
      }

    }
  }

  // confronta le due carte memorizzate, se giuste aumenta il contatore  per verificare quando concludere la partita con la funzione chiamata 'finale'
  if (passaggio == 1) {
    carteGirate = 0;
    passaggio = null;

    if (carta1 == carta2) {
      nodiPostiCarte[secondoIndex].style.opacity = 0.5;
      nodiPostiCarte[primoIndex].style.opacity = 0.5;
      controlloFinale++;
      console.log(controlloFinale);
    } else {
      nodiPostiCarte[secondoIndex].style.color = 'red';
      //dato che le icone non cambiano text-color ho usato questa proprietà per far girare
      //nuovamente le carte direttamente nella funzione gira dato che lasciandole in questo else
      //di fianco, la seconda carta sarebbe rimasta girata dato che l'ultima cosa che il programma esegue
      //è proprio la funzione gira. poco ortodosso lo so, ma funzionante.
    }
  }

}

// controllo per verificare la fine del gioco e display della fine
function finale() {
  if (controlloFinale == 10) {
    var secF = sec;
    var minF = min;
    document.getElementById('gioco').style.backgroundColor = '#f8f9fa';
    document.getElementById('button').style.backgroundColor = '#198754';
    document.getElementById('timer').style.color = '#198754';
    document.getElementById('timer').innerHTML = 'Complimenti! Hai concluso il gioco in: ' + minF + ' min ' + secF + ' sec ';
    clearInterval(clear);
    clearInterval(clear1);
    resetTimer = 1;

  }
}
