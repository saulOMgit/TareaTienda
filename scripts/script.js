window.onload = function (){
    let divcontenido=document.querySelector(".contenido");
    // Cargamos el contenido de nuestro Json
    async function cargaJuegos(){
        const response= await fetch("./scripts/juegos.json");
        const juegos=await response.json();

        imprimir(juegos)
    }

    function imprimir(juegos){
        //Para cada juego, metemos toda su informacion en las cartas
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
    
    //Creamos un mapa donde iran guardados los articulos comprados
    misproductos= new Map();
    
    function comprar(){
        //Guardo via traversing parametros que me van ayudar mas adelante
        let nombrejuego=this.parentNode.children[0].textContent;
        var preciojuego=this.parentNode.children[3].textContent;
        let caratula=this.parentNode.parentNode.children[0].children[0].src;
        
        preciojuego=preciojuego.substring(0,preciojuego.length-1);

        preciojuego = parseFloat(preciojuego.replace(",","."),2);
        
        
        //construimos un objeto que utilizaremos mas adelante para el tema factura
        let juegocomprado = {
            nombre: nombrejuego,
            precio:preciojuego,
            cantidad:1
        }
        
        //Si el jeugo ha sido comprado alguna vez se actualiza la cantidad
        if (misproductos.has(nombrejuego)){           
            
            juegocomprado.cantidad=misproductos.get(nombrejuego).cantidad+1;
            
            misproductos.set(nombrejuego,juegocomprado);
            let spcantidad2=document.querySelector(`.${nombrejuego.replaceAll(" ","")}cantidad`);
            spcantidad2.textContent=parseInt(spcantidad2.textContent)+1;
        } else{
            //si no, se guarda la informacion
             misproductos.set(nombrejuego,juegocomprado);
            let divproductos=document.querySelector(".productos");
             let productocarrito=document.createElement("div");
             productocarrito.classList.add("productocarrito");
             let myimg=document.createElement("img");
                myimg.src=caratula;
             let spnombre=document.createElement("span");
             spnombre.textContent=nombrejuego;
             spnombre.classList.add("titulocarrito");

             let spprecio=document.createElement("span");
             spprecio.textContent=`${juegocomprado.precio}€`;
             

                let spcantidad=document.createElement("span");
             spcantidad.textContent=1;
             spcantidad.classList.add(`${nombrejuego.replaceAll(" ","")}cantidad`);

             
             productocarrito.appendChild(myimg);
             productocarrito.appendChild(spnombre);
             productocarrito.innerHTML+=`<span>Precio:</span>`;
             productocarrito.appendChild(spprecio);
             productocarrito.innerHTML+=`<span>Cantidad:</span>`;
             productocarrito.appendChild(spcantidad);
             divproductos.appendChild(productocarrito);
        
             productocarrito.innerHTML+=`<i class="fa-solid fa-file-excel quitar"></i>`;
        }
        
        //pintamos la cantidad de objetos y su coste
        let contadorCantidad=0;
        let contadorPrecio=0;
         for ([juego,objeto] of misproductos){
             console.log(juego+" "+objeto.precio+" "+objeto.cantidad);
             contadorPrecio+=objeto.precio*objeto.cantidad;
             contadorCantidad+=objeto.cantidad;
         }
        spnumeroelementos.textContent=contadorCantidad;
        
        
        cantidadtotal.textContent=contadorPrecio;
       
         //Damos funcion a las papeleras de eliminacion
        eventoQuitar();

    }
    let spnumeroelementos=document.querySelector(".numeroelementos");
    let cantidadtotal=document.querySelector(".pagame");

    //funcionalidad de desplegar/plegar el div de carrito
    let botonCarrito=document.querySelector(".refcarrito")
    botonCarrito.addEventListener("click",muestraCarrito);
    let divcarrito=document.querySelector(".divcarrito");
    function muestraCarrito(){
       
        divcarrito.classList.toggle("divcarritoin");
    }

    //funcinalidad de quitar producto

    function eventoQuitar(){
        let iQuitar= document.querySelectorAll(".quitar");
         iQuitar.forEach((botones) => {
             botones.addEventListener("click",quitarJuego);
         }) 
    }
    // Esta funcion hace 3 cosas diferentes
        //Eliminar el contenido del mapa
        //Eliminar el producto visualmente
        //Eliminar la cantidad de unidades como las de el valor de los productos eliminados
    function quitarJuego(){
        let nombrejuego=this.parentNode.children[1].textContent;
        let cantidadquitada=parseInt(this.previousElementSibling.textContent);
        let preciojuego=misproductos.get(nombrejuego).precio*cantidadquitada;
        spnumeroelementos.textContent=parseInt(spnumeroelementos.textContent)-cantidadquitada;
        // cantidadtotal.textContent=parseFloat(cantidadtotal.textContent-preciojuego,2);
        cantidadtotal.textContent=Math.round(parseFloat(cantidadtotal.textContent-preciojuego,2)*100)/100;

       misproductos.delete(nombrejuego);
       this.parentNode.remove();
    }

    //Damos funcion al boton de generar factura
    document.querySelector(".botfactura").addEventListener("click",factura);
    function factura()
    {
        //limpiamos el localstorage
         localStorage.clear();
        for ([nombre,objeto] of misproductos){
            //convertimos su contenido a JSON para trabajar con el mas adelante
            localStorage.setItem(nombre, JSON.stringify(objeto));
        }
        window.location.href="factura.html";
    }
}