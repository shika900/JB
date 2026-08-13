(function(){
"use strict";
const q=s=>document.querySelector(s), logEl=q("#console"), btn=q("#jailbreak"), auto=q("#autoJb"), status=q("#status");
let exploit="lapse", timer=null;
function log(s){logEl.textContent=logEl.textContent.replace(/\s*$/,"")+"\n"+s;logEl.scrollTop=logEl.scrollHeight}
document.querySelectorAll('input[name="exploit"]').forEach(r=>r.addEventListener("change",()=>{
 exploit=r.value;
 document.querySelectorAll(".row").forEach(x=>x.classList.remove("selected"));
 r.closest(".row").classList.add("selected");
 log("[+] Exploit: "+(exploit==="lapse"?"Lapse":"NetCtrl"));
}));
function run(){
 if(btn.disabled)return;
 btn.disabled=true;status.textContent="RUNNING";status.style.color="#ffd34d";
 log("[+] Initializing PS4 9.00 / 11.02 Jailbreak...");
 log("[+] Exploit: "+(exploit==="lapse"?"Lapse":"NetCtrl"));
 const steps=exploit==="lapse"
 ? ["[+] Preparing WebKit context...","[+] Triggering Lapse exploit...","[+] Waiting for kernel response...","[+] Kernel stage completed."]
 : ["[+] Preparing NetCtrl context...","[+] Triggering NetCtrl exploit...","[+] Waiting for kernel response...","[+] Kernel stage completed."];
 steps.forEach((s,i)=>setTimeout(()=>log(s),(i+1)*650));
 setTimeout(()=>{log("[+] Exploit completed.");status.textContent="READY";status.style.color="#57f329";btn.disabled=false},3500);
}
btn.addEventListener("click",run);
function autoStart(){
 if(!auto.checked)return;
 let n=5;log("[+] Auto Jailbreak enabled.");
 timer=setInterval(()=>{if(n===0){clearInterval(timer);timer=null;run();return}log("[+] Auto start in "+n+"...");n--},1000)
}
document.addEventListener("DOMContentLoaded",()=>setTimeout(autoStart,600));
window.doJb=window.doJb||run;
})();