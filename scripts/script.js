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
    // misproductos = localStorage.getItem('miCarro');
    // console.log(misproductos);
    // if (!misproductos){
    misproductos= new Map();
    //}
    function comprar(){
        
        let nombrejuego=this.parentNode.children[0].textContent;
        var preciojuego=this.parentNode.children[3].textContent;
        let caratula=this.parentNode.parentNode.children[0].children[0].src;
        
        preciojuego=preciojuego.substring(0,preciojuego.length-1);

        preciojuego = parseFloat(preciojuego.replace(",","."),2);
        console.log(preciojuego);
        

        let juegocomprado = {
            nombre: nombrejuego,
            precio:preciojuego,
            cantidad:1
        }

        // console.log(juegocomprado.nombre+" "+juegocomprado.precio);
        
        if (misproductos.has(nombrejuego)){
            let datosanteriores= misproductos.get(nombrejuego).precio;
            juegocomprado.precio+=datosanteriores;
            
            juegocomprado.cantidad=misproductos.get(nombrejuego).cantidad+1;
            
            misproductos.set(nombrejuego,juegocomprado);
            let spcantidad2=document.querySelector(`.${nombrejuego.replaceAll(" ","")}cantidad`);
            spcantidad2.textContent=parseInt(spcantidad2.textContent)+1;
        } else{
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
             spprecio.textContent=juegocomprado.precio;
             

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
            //  divcarrito.appendChild(divproductos);
             productocarrito.innerHTML+=`<i class="fa-solid fa-file-excel"></i>`;

        }
        let spnumeroelementos=document.querySelector(".numeroelementos");
        let contadorCantidad=0
         for ([juego,objeto] of misproductos){
             console.log(juego+" "+objeto.precio+" "+objeto.cantidad);
             contadorCantidad+=objeto.cantidad;
         }
        spnumeroelementos.textContent=contadorCantidad;

        // localStorage.setItem('miCarro', misproductos);
        // let prueba = localStorage.getItem('miCarro')
        // console.log(typeof prueba)
        //  for ([juego,objeto] of prueba){
        //      console.log(juego+" "+objeto.precio);
        //  }

    }

    let botonCarrito=document.querySelector(".refcarrito")
    botonCarrito.addEventListener("click",muestraCarrito);
    let divcarrito=document.querySelector(".divcarrito");
    function muestraCarrito(){
       
        divcarrito.classList.toggle("divcarritoin");
    }
}