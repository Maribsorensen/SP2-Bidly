import{d as l,a as c,c as m}from"./apiRequest-C9VMWLkl.js";async function g(s=12,a=1,t=""){const e=new URL(l);e.searchParams.append("limit",s),e.searchParams.append("page",a),e.searchParams.append("_seller","true"),e.searchParams.append("sort","created"),e.searchParams.append("order","desc"),t&&e.searchParams.append("_tag",t);const r=await c(e,"GET",null,!0);return r.data=r.data.filter(i=>i._active===!0),c(e,"GET",null,!0)}async function b(s){if(!s)throw new Error("Listing ID is required");const a=new URL(`${l}/${s}`);return a.searchParams.append("_bids","true"),a.searchParams.append("_seller","true"),c(a,"GET",null,!0)}async function w(s,a=12,t=1,e=""){const r=new URL(`${m}/${s}/listings`);return r.searchParams.append("limit",a),r.searchParams.append("page",t),r.searchParams.append("_seller","true"),r.searchParams.append("seller",s),e&&r.searchParams.append("tag",e),c(r,"GET",null,!0)}function P(s="Loading...",a=80){const t=document.createElement("div");t.setAttribute("aria-label","Loading..."),t.setAttribute("role","status"),t.className="absolute inset-10 flex items-center justify-center space-x-2";const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 256 256"),e.setAttribute("class","animate-spin stroke-brand-main"),e.style.width=`${a}px`,e.style.height=`${a}px`,[[128,32,128,64],[195.9,60.1,173.3,82.7],[224,128,192,128],[195.9,195.9,173.3,173.3],[128,224,128,192],[60.1,195.9,82.7,173.3],[32,128,64,128],[60.1,60.1,82.7,82.7]].forEach(([p,u,d,o])=>{const n=document.createElementNS("http://www.w3.org/2000/svg","line");n.setAttribute("x1",p),n.setAttribute("y1",u),n.setAttribute("x2",d),n.setAttribute("y2",o),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),n.setAttribute("stroke-width","24"),e.appendChild(n)});const i=document.createElement("span");return i.className="text-4xl font-medium text-brand-main",i.textContent=s,t.appendChild(e),t.appendChild(i),t}export{b as a,w as b,P as c,g as r};
