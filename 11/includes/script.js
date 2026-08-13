(function(){
"use strict";

const $=s=>document.querySelector(s), c=$("#console"), status=$("#status");
let exploit="lapse", auto=true, running=false;

function log(x){
  c.textContent=c.textContent.replace(/\s*$/,"")+"\n"+x;
  c.scrollTop=c.scrollHeight;
}

function setStatus(x){
  status.textContent=x;
  status.style.color=x==="READY"?"#58f12a":"#ffd34d";
}

$("#lapse").onclick=()=>{
  exploit="lapse";
  $("#lapse").classList.add("selected");
  $("#netctrl").classList.remove("selected");
  log("[+] Exploit: Lapse (Recommended)");
};

$("#netctrl").onclick=()=>{
  exploit="netctrl";
  $("#netctrl").classList.add("selected");
  $("#lapse").classList.remove("selected");
  log("[+] Exploit: NetCtrl (Alternative)");
};

$("#auto").onclick=()=>{
  auto=!auto;
  $("#auto .toggle").classList.toggle("on",auto);
  log("[+] Auto Jailbreak: "+(auto?"ON":"OFF"));
};

async function start(){
  if(running) return;
  running=true;
  setStatus("RUNNING");
  log("[+] Starting "+(exploit==="lapse"?"Lapse":"NetCtrl")+"...");

  try{
    window.exploitChain=exploit;
    if(typeof window.doJb==="function"){
      await window.doJb();
    }else{
      throw new Error("Jailbreak engine not loaded.");
    }
  }catch(e){
    log("[-] "+(e&&e.message?e.message:String(e)));
    setStatus("ERROR");
    running=false;
    return;
  }

  setStatus("READY");
  running=false;
}

$("#jailbreak").onclick=start;

// Auto Jailbreak: actually launch the existing jailbreak engine after the page
// and main.js have loaded. The previous version only printed "ON" and never called start().
window.addEventListener("load",()=>{
  if(!auto) return;
  log("[+] Auto Jailbreak: ON");
log("[+] Auto start in 5 seconds...");
setTimeout(()=>{
  if(auto && !running) start();
},5000);
});
})();
