let timerId = null;
const label = document.getElementById('autoJbLabel');
const checkbox = document.getElementById('autoJbInput');
const jeilbrekBtn = document.getElementById('jeilbrek');
const lapseRadio = document.getElementById('lapse-exploit');
const netctrlRadio = document.getElementById('netctrl-exploit');

let autoJbValue = true;
let exploitChain = "lapse";

document.getElementById('kernel-options').addEventListener('change', function(){});
lapseRadio.addEventListener("change", function(){ if(this.checked) exploitChain="lapse"; });
netctrlRadio.addEventListener("change", function(){ if(this.checked) exploitChain="netctrl"; });

jeilbrekBtn.addEventListener("click", function(){
    jeilbrekBtn.disabled = true;
    stopInterval();
    if (typeof doJb === "function") doJb();
});

checkbox.addEventListener("change", function(){
    autoJbValue = checkbox.checked;
    if (checkbox.checked && !jeilbrekBtn.disabled) jailbreakCountdown();
    else stopInterval();
});

function stopInterval(){
    if(timerId !== null){ clearInterval(timerId); timerId=null; }
    if(label) label.textContent = checkbox.checked ? "Auto Jailbreak" : "Auto Jailbreak Off";
}

function jailbreakCountdown(){
    stopInterval();
    let countdown=5;
    label.textContent=`Auto Jailbreaking in: ${countdown}`;
    timerId=setInterval(()=>{
        countdown--;
        label.textContent=`Auto Jailbreaking in: ${countdown}`;
        if(countdown<0){
            clearInterval(timerId); timerId=null;
            jeilbrekBtn.disabled=true;
            label.textContent="Executing";
            if(typeof doJb === "function") doJb();
        }
    },1000);
}

function cacheProgress(e){
    if(!e || !e.total)return;
    document.title="Caching: "+Math.round(e.loaded/e.total*100)+"%";
}
function displayCacheProgress(){
    setTimeout(()=>document.title="✓",1000);
    setTimeout(()=>document.title="CSSFontFace exploit",3000);
}

document.addEventListener("DOMContentLoaded",function(){
    lapseRadio.checked=true;
    netctrlRadio.checked=false;
    exploitChain="lapse";
    checkbox.checked=true;
    jailbreakCountdown();
    if(window.applicationCache){
        window.applicationCache.addEventListener("progress",cacheProgress,false);
        window.applicationCache.oncached=displayCacheProgress;
        window.applicationCache.onupdateready=displayCacheProgress;
    }
});
