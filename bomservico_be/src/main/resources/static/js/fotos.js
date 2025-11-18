function enviarDados(){
    const fuser = document.getElementById("userform");
    fetch("http://localhost:8080/apis/add-user",{ method: 'POST', body: new FormData(fuser)})
        .then(response=>response.text())
        .then(result=>console.log(result))
        .catch(error=> console.error(error))
}

function carregarColecao(){
    const url="http://localhost:8080/apis/get-colecao"
    fetch(url)
        .then(resp=>resp.json())
        .then(info=>{
            let imageList=""
            for (e of info){
                imageList+=`<p><img src="${e}"/></p>>`
            }
            alert(imageList)
            document.getElementById("colecao").innerHTML=imageList
        });
}