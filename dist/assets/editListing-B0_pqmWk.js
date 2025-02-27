import{a as f}from"./authGuard-C2GFzsuy.js";import{a as l,d as c}from"./apiRequest-C9VMWLkl.js";import{s as r}from"./main-C6zY-29k.js";async function y(){const s=new URLSearchParams(window.location.search).get("id");if(!s){r({message:"Listing ID not found, please try again...",type:"error"});return}try{const o=await l(`${c}/${s}`,"GET",null,!0);if(!o||!o.data){r({message:"Failed to fetch listing data",type:"error"});return}const t=o.data,n=document.forms.editListing;if(!n){r({message:"Edit form not found on the page",type:"error"});return}n.title.value=t.title||"",n.tags.value=t.tags?t.tags.join(", "):"",n.endsAt.value=t.endsAt?t.endsAt.slice(0,16):"",n.description.value=t.description||"";const d=document.getElementById("mediaInputs");if(d.innerHTML="",t.media&&t.media.length>0)t.media.forEach(a=>{const i=document.createElement("input");i.type="text",i.name="mediaUrls[]",i.classList.add("shadow-md","m-2"),i.value=a.url||"",d.appendChild(i)});else{const a=document.createElement("input");a.type="text",a.name="mediaUrls[]",a.classList.add("shadow-md","mb-2"),d.appendChild(a)}}catch(o){r({message:"Error loading listing: "+o.message,type:"error"})}}async function h(m){m.preventDefault();const s=m.target,t=new URLSearchParams(window.location.search).get("id");if(!t){r({message:"Listing ID not found, please try again...",type:"error"});return}const n=s.title.value,d=s.tags.value.split(",").map(e=>e.trim().toLowerCase()).filter(e=>e),a=s.endsAt.value,i=s.description.value,u=document.querySelectorAll("input[name='mediaUrls[]']"),p=Array.from(u).map(e=>e.value.trim()).filter(e=>e).map(e=>({url:e,alt:"Image"})),g={title:n,tags:d,endsAt:a,description:i,media:p};try{await l(`${c}/${t}`,"PUT",g,!0),r({message:"Listing updated successfully!",type:"success"}),setTimeout(()=>{window.location.href="/profile/"},2e3)}catch(e){r({message:"Failed to update listing: "+e.message,type:"error"})}}y();const L=document.forms.editListing;L.addEventListener("submit",h);f();
