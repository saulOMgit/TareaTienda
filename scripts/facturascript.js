window.onload = function(){
    //Necesitamos un mapa para volcar los datos del Local Storage
    miMapa= new Map();
    let mitabla=document.querySelector("table");
    //Obtenemos los datos del carrito de la compra
    if(localStorage.key!=null){
        for (let i=0; i< localStorage.length;i++){
            let clave=localStorage.key(i);
            let valor=JSON.parse(localStorage[clave]);
            miMapa.set(clave,valor);
        }
        //Para cada uno de los productos pintamos nombre, cantidad y precio en una fila de la tabla por producto.
        let cantidadpagada=0
        for([clave, valor]of miMapa){
            console.log(clave+valor.nombre);

            let mifila=document.createElement("tr");
            mifila.classList.add("productos");
            let td=document.createElement("td");
            let td2=document.createElement("td");
            let td3=document.createElement("td");
            td.textContent=valor.nombre;
            td2.textContent=valor.cantidad;
            td3.textContent=parseFloat(valor.precio*valor.cantidad)+"€";


            cantidadpagada+=parseFloat(valor.precio*valor.cantidad);

            mitabla.appendChild(mifila);
            mifila.appendChild(td);
            mifila.appendChild(td2);
            mifila.appendChild(td3);
        }

        
        let filatotales=document.createElement("tr");
        filatotales.classList.add("total");
        let celdatotales=document.createElement("td");
        celdatotales.textContent=cantidadpagada+"€";
        mitabla.appendChild(filatotales);
        filatotales.innerHTML=`<td></td><td></td>`
        filatotales.appendChild(celdatotales);


        //Funcionalidad de imprimir
        let btnimprimir=document.querySelector(".imprint").addEventListener("click",facturapdf)
        function facturapdf(){
            let mifactura=document.querySelector(".contenedor");
            html2pdf().set({
                margin:0.5,
                filename: "CompraCompletada.pdf",
                image:{
                    type:"png",
                    quality:0.9
                },
                html2canvas: {
                    scale: 3,
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a4",
                    orientation: "landscape",
                }
            })
            .from(mifactura).save();
        }
    }
}