import{a as l}from"./authGuard-C2GFzsuy.js";import{a as u,d as p}from"./apiRequest-C9VMWLkl.js";import{s as i}from"./main-Cbw1pNsF.js";document.getElementById("addMedia").addEventListener("click",function(){const s=document.getElementById("mediaInputs"),e=document.createElement("div");e.classList.add("media-input-group");const n=document.createElement("input");n.type="text",n.name="mediaUrls[]",n.classList.add("shadow-md","mb-2");const a=document.createElement("button");a.type="button",a.textContent="Remove",a.classList.add("bg-brand-cta","text-white","p-1","ml-2","rounded","font-paragraph"),a.addEventListener("click",function(){s.removeChild(e)}),e.appendChild(n),e.appendChild(a),s.appendChild(e)});async function g(s){s.preventDefault();const e=s.target,n=e.title.value,a=e.tags.value.split(",").map(t=>t.trim().toLowerCase()).filter(t=>t),o=e.endsAt.value,r=e.description.value,d=e.querySelectorAll("input[name='mediaUrls[]']"),c=Array.from(d).map(t=>t.value.trim()).filter(t=>t).map(t=>({url:t,alt:"Image"})),m={title:n,tags:a,endsAt:o,description:r,media:c};try{const t=await u(p,"POST",m,!0);console.log("Listing created:",t),i({message:"Listing created successfully!",type:"success"}),setTimeout(()=>{window.location.href="/profile/"},2e3)}catch(t){i({message:"Failed to create listing: "+t.message,type:"error"})}}const f=document.forms.createListing;f.addEventListener("submit",g);l();
