//variables
const tweets = document.querySelector('#lista-tweets');



//EventListeners
eventListeners();

function eventListeners(){
const form = document.querySelector('#formulario').addEventListener('submit',añadirtweet);
//Borrar Tweets
tweets.addEventListener('click', borrarTweet);
//Contenido en el dom
document.addEventListener('DOMContentLoaded', localStoragelisto);

}



//Funciones
function añadirtweet(e){   
 e.preventDefault();
 // Declarar e inicializar las variables "tweet" y "li" para añadir los tweets a la seccion "Mis tweets" 
 const tweet = document.querySelector('#tweet').value;
 //Crear boton eleminar
 const btnBorrar= document.createElement('a');
 btnBorrar.className ='borrar-tweet';
 btnBorrar.textContent='X';
 const li = document.createElement('li');
 li.textContent = tweet;
//Añadiendo el boton al enlace para borrar
 li.appendChild(btnBorrar);
 //Añadiendo los tweets
 tweets.appendChild(li);
 
 
 //Agregar a local storage usando como parametro la variable 'tweet en el siguiente llamado de la funcion'
 addtweetLocalstorage(tweet);

}




//Borrar tweet del DOM
function borrarTweet(e){
  e.preventDefault();
    if (e.target.className === 'borrar-tweet'){
       e.target.parentNode.remove();
       borrarTweetlocalstorage(e.target.parentElement.textContent);
       
    }
    
  }

  //Mostrar los tweets en el DOM
  function localStoragelisto (){
    let tweetss;

    tweetss = getTweetsLocalstorage();

    tweetss.forEach(function(tweet){
      //Crear boton eleminar
     const btnBorrar= document.createElement('a');
     btnBorrar.className ='borrar-tweet';
     btnBorrar.textContent='X';
     const li = document.createElement('li');
     li.textContent = tweet;
     //Añadiendo el boton al enlace para borrar
     li.appendChild(btnBorrar);
     //Añadiendo los tweets
     tweets.appendChild(li);
    });
 
    

  }

  //Agregar tweet al local storage
  function addtweetLocalstorage (tweet){
    let tweets;
    // Se guarda el valor de la funcion en la variable "tweets".
    tweets = getTweetsLocalstorage();
    //Se añade el 'value' del selector del textarea, en el arreglo trasnformado por JSON.parse, obtenido del local storage. (En el caso de que en el 'local storage hubiese valor')
    tweets.push(tweet);
    //Se añade el arreglo en forma de string por medio JSON.stringify al local storage.
    localStorage.setItem('tweets',JSON.stringify(tweets));
  }

  function getTweetsLocalstorage(){
    let tweets;
    //Se verifica si está vacio el local storage
    if(localStorage.getItem('tweets') === null){
     // Se inicializa la variable como una 'Array' vacio.
      tweets = [];
    } else{
    // Se obtiene el valor en el local storage como un arreglo (Cuando existe en el local storage)
     tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    // Se retorna la variable
    return tweets;
  }

  //Eliminar tweet del local storage
  function borrarTweetlocalstorage (letraAny){
    let tweets, tweetBorrar;
    //Elimina la "X" del tweet que hace parte del contenido del target al darle "click" en la "x" del DOM con "substring". 
    tweetBorrar = letraAny.substring(0,letraAny.length - 1);
    //Se reutiliza la función para obtener los valores del arreglo del local storage.
    tweets = getTweetsLocalstorage();
    //Se comparan los dos valores para determinar si el valor recorrido del arreglo, corresponde con el que se quiere borrar.
    tweets.forEach(function(cualquier, index){
      if(tweetBorrar === cualquier ){
        //Se elimina el valor en cuestion, del arreglo obtenido del local storage con "splice".
        tweets.splice(index, 1);
      }
    });
    // Se añade el arreglo al local storage, con los nuevos valores (habiendo eliminado uno).  
    localStorage.setItem('tweets', JSON.stringify(tweets));
  }