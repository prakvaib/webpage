const slides = [
  {eyebrow:"LOTS AND LOTS OF", title:"KITCHEN", sub:"Essentials", c1:"#f47721", c2:"#f9a05b"},
  {eyebrow:"MAKE ROOM FOR", title:"HOME", sub:"Favourites", c1:"#e96b32", c2:"#f5b45e"},
  {eyebrow:"LITTLE THINGS,", title:"BIG JOY", sub:"Every day", c1:"#e87b38", c2:"#f2a36c"}
];
let currentSlide = 0;
const hero = document.querySelector(".hero");
const dots = document.getElementById("slideDots");
function showSlide(index){
  currentSlide = (index + slides.length) % slides.length;
  const slide = slides[currentSlide];
  document.getElementById("heroEyebrow").textContent = slide.eyebrow;
  document.getElementById("heroTitle").textContent = slide.title;
  document.getElementById("heroSub").textContent = slide.sub;
  hero.style.background = `linear-gradient(115deg,${slide.c1} 0 43%,${slide.c2} 43% 100%)`;
  dots.querySelectorAll("button").forEach((dot,i)=>dot.classList.toggle("active",i===currentSlide));
}
slides.forEach((_,i)=>{
  const dot=document.createElement("button");
  dot.type="button"; dot.setAttribute("aria-label",`Show slide ${i+1}`);
  dot.addEventListener("click",()=>showSlide(i)); dots.appendChild(dot);
});
document.getElementById("prevSlide").addEventListener("click",()=>showSlide(currentSlide-1));
document.getElementById("nextSlide").addEventListener("click",()=>showSlide(currentSlide+1));
showSlide(0);

const menuToggle=document.getElementById("menuToggle");
const navLinks=document.getElementById("navLinks");
menuToggle.addEventListener("click",()=>{
  const open=navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",String(open));
});

let cartCount=0;
const toast=document.getElementById("toast");
let toastTimer;
function showToast(message){
  toast.textContent=message; toast.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove("show"),2200);
}
document.querySelectorAll("[data-add]").forEach(button=>{
  button.addEventListener("click",()=>{
    cartCount++;
    document.getElementById("cartCount").textContent=cartCount;
    showToast(`${button.dataset.add} added to your demo cart`);
  });
});
document.getElementById("cartButton").addEventListener("click",()=>{
  showToast(`Your demo cart has ${cartCount} item${cartCount===1?"":"s"}.`);
});

document.getElementById("searchForm").addEventListener("submit",event=>{
  event.preventDefault();
  const query=document.getElementById("searchInput").value.trim().toLowerCase();
  let visible=0;
  document.querySelectorAll(".product-card").forEach(card=>{
    const match=!query || card.dataset.name.includes(query) || card.innerText.toLowerCase().includes(query);
    card.hidden=!match; if(match) visible++;
  });
  document.getElementById("noResults").hidden=visible!==0;
  document.getElementById("products").scrollIntoView({behavior:"smooth",block:"center"});
});
