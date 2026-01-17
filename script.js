let PROD,VAL

function comprar(p,v){
PROD=p
VAL=v
prod.innerText=p
val.innerText="R$ "+v
modal.style.display="block"
}

function fechar(){
modal.style.display="none"
qr.src=""
pixcode.value=""
}

async function pagarCartao(){
let r=await fetch("/checkout",{
 method:"POST",
 headers:{"Content-Type":"application/json"},
 body:JSON.stringify({produto:PROD,valor:VAL})
})
let j=await r.json()
location=j.url
}

async function pagarPix(){
let r=await fetch("/pix",{
 method:"POST",
 headers:{"Content-Type":"application/json"},
 body:JSON.stringify({produto:PROD,valor:VAL})
})
let j=await r.json()
qr.src="data:image/png;base64,"+j.qr
pixcode.value=j.copia
}