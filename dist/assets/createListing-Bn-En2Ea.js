import{c as u,f as l,s as o,a as p,b as g,t as f,u as L}from"./updateNav-DTGeWYsz.js";import{a as v}from"./authGuard-C2GFzsuy.js";document.getElementById("addMedia").addEventListener("click",function(){const n=document.getElementById("mediaInputs"),e=document.createElement("div");e.classList.add("media-input-group");const s=document.createElement("input");s.type="text",s.name="mediaUrls[]",s.classList.add("shadow-md","mb-2");const a=document.createElement("button");a.type="button",a.textContent="Remove",a.classList.add("bg-brand-cta","text-white","p-1","ml-2","rounded","font-paragraph"),a.addEventListener("click",function(){n.removeChild(e)}),e.appendChild(s),e.appendChild(a),n.appendChild(e)});async function y(n){n.preventDefault();const e=n.target,s=e.title.value,a=e.tags.value.split(",").map(t=>t.trim().toLowerCase()).filter(t=>t),i=e.endsAt.value,r=e.description.value,d=e.querySelectorAll("input[name='mediaUrls[]']"),c=Array.from(d).map(t=>t.value.trim()).filter(t=>t).map(t=>({url:t,alt:"Image"})),m={title:s,tags:a,endsAt:i,description:r,media:c};try{const t=await u(l,"POST",m,!0);console.log("Listing created:",t),o({message:"Listing created successfully!",type:"success"}),setTimeout(()=>{window.location.href="/profile/"},2e3)}catch(t){o({message:"Failed to create listing: "+t.message,type:"error"})}}const h=document.forms.createListing;h.addEventListener("submit",y);v();p();g();f();L();
