window.onload = function (){
    let divcontenido=document.querySelector(".contenido");

    async function cargaJuegos(){
        const response= await fetch("./scripts/juegos.json");
        const juegos=await response.json();

        imprimir(juegos)
    }

    function imprimir(juegos){

        


        for(let juego of juegos){
            let divjuego=document.createElement("div");
            divjuego.className="juego";
            let divposicion=document.createElement("div");
            divposicion.className="cartaposicion";
            let divfront=document.createElement("div");
            divfront.className="cartafront";
            let divback=document.createElement("div");
            divback.className="cartaback";
            
            //Creamos lo elementos del front
            let myimg=document.createElement("img");
            myimg.src=`./img/${juego.foto}`;
            divfront.appendChild(myimg);

            let myh1=document.createElement("h1");
            myh1.textContent=juego.nombre;
            divfront.appendChild(myh1);

           //Creamos los elementos del back
            let spnombre=document.createElement("span");
            spnombre.className="spnombre";
            spnombre.textContent=juego.nombre;
            divback.appendChild(spnombre);

            let spgenero=document.createElement("span");
            spgenero.className="spgenero";
            spgenero.textContent=`Genero: ${juego.genero}`;
            divback.appendChild(spgenero);

            let spunidades=document.createElement("span");
            spunidades.className="spunidades";
            spunidades.textContent=`Unidades: ${juego.unidades}`;
            divback.appendChild(spunidades);

            let spprecio=document.createElement("span");
            spprecio.className="spprecio";
            spprecio.textContent=juego.precio+juego.moneda;
            divback.appendChild(spprecio);

            let spcomprar=document.createElement("span");
            spcomprar.className="spcomprar";
            spcomprar.textContent="Comprar";
            spcomprar.addEventListener("click",comprar);
            divback.appendChild(spcomprar);

            //Apendeamos todo
            divposicion.appendChild(divfront);
            divposicion.appendChild(divback);
            divjuego.appendChild(divposicion);
            divcontenido.appendChild(divjuego);
        }
    }

    cargaJuegos();
    misproductos= new Map();
    function comprar(){
        
        let nombrejuego=this.parentNode.children[0].textContent;
        var preciojuego=this.parentNode.children[3].textContent;
        preciojuego=preciojuego.substring(0,preciojuego.length-1);
        preciojuego = parseFloat(preciojuego).toFixed(2);
       
        console.log(nombrejuego+" "+preciojuego);
        // misproductos.set()
    }

}