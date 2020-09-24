/*
   2C = Two of Clubs (Treboles)
   2D = Two of Diamonds (Diamantes)
   2H = Two of Hearts (Corazones)
   2S = Two of Spades (Espadas)

*/

let deck = [];
const tipos = ['C','D','H','S'];
const Letras =['A','J','Q', 'K'];

let puntosJugador = 0;
    puntosComputadora = 0;

//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');

const puntosHtml = document.querySelectorAll('small');

const divCartasJugador =  document.querySelector('#jugador-cartas'); 

const divCartasComputadora =document.querySelector('#computadora-cartas')

const btnDetener = document.querySelector('#btnDetener');
// Esta funcion crea un nuevo deck desordenado a causa de de la funcion "shuffle()" que proviene de la libreria de underscore.

const btnNuevo = document.querySelector('#btnNuevoJuego');

const crearDeck = () =>{
    for(let i = 2; i<= 10; i++ ){ 
       for(let tipo of tipos){
        deck.push(i + tipo);
       }
    }
    
    for(let tipo of tipos){
      for(let letra of Letras){
         deck.push(letra + tipo );   
      }
    }
   
   deck = _.shuffle(deck); //Funcion que permite "revolver la baraja" ya creada. (Libreria Underscore)
   console.log(deck);
   
   return deck;
   
}


crearDeck();

//Esta funcion me permite tomar una carta.

const pedirCarta = () => { //con esta funcion saco una carta del Deck o de la baraja.
    
    if (deck.length === 0){
        throw 'No hay cartas en el deck';
    } else {
    const carta = deck.pop();
     
    
    return carta; }
}



const valorCarta = (carta) => { //Con esta función le asigno el valor de cada carta. 2 = 2, 3 = 3, 10 = 10, A = 11, J = 10. Q = 10, K = 10 

   const valor = carta.substring(0,carta.length-1);
   
   return (isNaN(valor)) ? ( valor === 'A') ? 11 : 10 
   : valor * 1; //Se multiplica * 1 porque el valor es de tipo string y al multiplicarlo por la unidad se comvierte en number.

   // isNaN() Esta función me permite evaluar si un valor es un numero o no, retornando un booleano. 

   
}

//turno de la computadora
const turnoComputadora = (puntosMinimos) =>{
   do{
      
      const carta = pedirCarta(); //  le asigno la carta que saqué del deck

      puntosComputadora = valorCarta(carta) + puntosComputadora;
      puntosHtml[1].innerText= puntosComputadora;
    
       //divCartasJugador.append();  
       const imgCarta = document.createElement('img');
       imgCarta.src = `assets/cartas/${carta}.png`;
       imgCarta.className = 'carta';
       divCartasComputadora.append(imgCarta);
       
       if ( puntosMinimos > 21){
          break;
       }

   }while((puntosComputadora < puntosMinimos) && (puntosMinimos<= 21 ));
     
   setTimeout(() =>{ //Este setTimeout es para que los alerst no se ejecuten primero que la logica del juego.

    
       if(puntosComputadora === puntosMinimos){
          alert('Nadie Gana');
       } else if (puntosMinimos > 21){
      alert('La computadora gana');
       }else if (puntosComputadora > 21){
      alert('El jugador Gana');
       }else{
          alert(' La computadora gana');
       }

}, 40); 
}
 


//Eventos!!

btnPedir.addEventListener('click', () => {
  const carta = pedirCarta(); //  le asigno la carta que saqué del deck

  puntosJugador = valorCarta(carta) + puntosJugador;
  puntosHtml[0].innerText= puntosJugador;

   //divCartasJugador.append();  
   const imgCarta = document.createElement('img');
   imgCarta.src = `assets/cartas/${carta}.png`;
   imgCarta.className = 'carta';
   divCartasJugador.append(imgCarta);
   
   if (puntosJugador > 21){
     console.warn('Lo siento mucho, perdiste');
     btnPedir.disabled = true;
     btnDetener.disabled = true;
     turnoComputadora(puntosJugador);
   }else if (puntosJugador === 21){
     console.warn('21, genial!');
     btnPedir.disabled = true;
     btnDetener.disabled = true;
     turnoComputadora(puntosJugador);
     
   } 
   
  


} );

btnDetener.addEventListener('click', () =>{
   btnPedir.disabled = true;
   btnDetener.disabled = true;
   turnoComputadora(puntosJugador);
   
});
 


btnNuevo.addEventListener('click', () =>{
  
  console.clear(); 
  deck = [];
  deck = crearDeck();

  puntosJugador = 0;
  puntosComputadora = 0; 

  puntosHtml[0].innerHTML = 0;
  puntosHtml[1].innerHTML = 0;
  
  divCartasJugador.innerHTML = '';
  divCartasComputadora.innerHTML = '';
  
  btnDetener.disabled = false;
  btnPedir.disabled = false;

});


 