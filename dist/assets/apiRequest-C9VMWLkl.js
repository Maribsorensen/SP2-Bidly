const a="https://v2.api.noroff.dev",c=`${a}/auth`,l=`${c}/login`,_=`${c}/register`,r=`${a}/auction`,u=`${r}/listings`,P=`${r}/profiles`,f="6bc5ec58-a1ee-41c7-885f-b4a1c70b0044";async function T(i,A="GET",n=null,I=!1){const s={"Content-Type":"application/json"};if(I){const o=localStorage.getItem("token");o&&(s.Authorization=`Bearer ${o}`),s["X-Noroff-API-Key"]=f}const e={method:A,headers:s};n&&(e.body=JSON.stringify(n));const t=await fetch(i,e);if(t.status===204)return null;if(!t.ok){const o=await t.json();throw new Error(o.message||"API request failed")}return t.json()}export{l as A,T as a,_ as b,P as c,u as d};
