const SIZES=["PP","P","M","G","GG","XG"];
const PRODUCTS=[
 {n:"Blusa Linho Premium",p:89.9,o:129.9,b:"Oferta",s:["PP","P","M","G","GG"],c:"url(images/produto-1.jpg)"},
 {n:"Vestido Midi Elegante",p:159.9,b:"Novidade",s:["P","M","G","GG","XG"],c:"url(images/produto-2.jpg)"},
 {n:"Camisa Estruturada",p:119.9,o:169.9,b:"Oferta",s:["P","M","G","GG"],c:"url(images/produto-3.jpg)"},
 {n:"Calça Wide Leg",p:139.9,o:189.9,s:["PP","P","M","G","GG","XG"],c:"url(images/produto-4.jpg)"}
];
const fmt=v=>"R$"+v.toFixed(2).replace(".",",");
let sel=null,count=0,term="";
const grid=document.getElementById("grid"),fl=document.getElementById("filters");
SIZES.forEach(s=>{const b=document.createElement("button");b.textContent=s;b.setAttribute("aria-pressed","false");
 b.onclick=()=>{sel=sel===s?null:s;[...fl.querySelectorAll("button")].forEach(x=>x.setAttribute("aria-pressed",String(x.textContent===sel)));render()};fl.appendChild(b)});
function toast(t){const e=document.getElementById("toast");e.textContent=t;e.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("show"),1800)}
function render(){
 const list=PRODUCTS.filter(x=>(!sel||x.s.includes(sel))&&x.n.toLowerCase().includes(term));
 grid.innerHTML="";
 if(!list.length){grid.innerHTML='<p class="empty">Nenhum produto encontrado. Tente outro tamanho ou termo.</p>';return}
 list.forEach(x=>{
  const c=document.createElement("article");c.className="card";
  c.innerHTML=`<div class="ph" style="background:${x.c}">${x.b?`<span class="badge ${x.b==="Oferta"?"b-of":"b-nv"}">${x.b}</span>`:""}</div>
  <div class="info"><div class="name">${x.n}</div>
  <div class="price">${fmt(x.p)}${x.o?`<s>${fmt(x.o)}</s>`:""}</div>
  <div class="sizes">${x.s.map(s=>`<span class="${s===sel?"on":""}">${s}</span>`).join("")}</div>
  <button class="add">+ Carrinho</button></div>`;
  c.querySelector(".add").onclick=()=>{count++;document.getElementById("count").textContent=count;toast(x.n+" adicionado ao carrinho")};
  grid.appendChild(c)})}
document.getElementById("q").oninput=e=>{term=e.target.value.trim().toLowerCase();render()};
document.getElementById("cartBtn").onclick=()=>toast(count?count+" item(ns) no carrinho":"Seu carrinho está vazio");
document.getElementById("help").onclick=()=>toast("Fale com a gente: ajuda@vestebem.com.br");
render();