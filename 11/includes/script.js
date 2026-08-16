let timerId = null;
const label = document.getElementById('autoJbLabel');
const checkbox = document.getElementById('autoJbInput');
const jeilbrekBtn = document.getElementById('jeilbrek');
const UAElement = document.getElementById("UA");
const consoleEl = document.getElementById("console");
const spinnerEl = document.getElementById("loading-spinner");

const storedAutoJb = localStorage.getItem("autoJb");
let autoJbValue = storedAutoJb !== null ? storedAutoJb === "true" : true;

// choose one of kernel exploits
var exploitChain = localStorage.getItem("exploitChain") || "lapse";
const netctrlRadio = document.getElementById("netctrl-exploit");
const lapseRadio = document.getElementById("lapse-exploit");
const kexForm = document.getElementById('kernel-options');

// Show user agent
UAElement.innerText += " " + navigator.userAgent;

// ===== Console typing helper =====
function typeToConsole(text) {
    const span = document.createElement('span');
    span.className = 'log-entry';
    consoleEl.appendChild(span);

    let i = 0;
    const typeInterval = setInterval(() => {
        span.textContent += text.charAt(i);
        i++;
        consoleEl.scrollTop = consoleEl.scrollHeight;
        if (i >= text.length) {
            clearInterval(typeInterval);
            span.textContent += '\n';
        }
    }, 15);
}

// Override alert/log to use typing effect
const originalAlert = window.alert;
window.alert = function(msg) {
    typeToConsole("[Alert] " + msg);
};

// Hook console.log to appear in our console
const originalLog = console.log;
console.log = function(...args) {
    originalLog.apply(console, args);
    const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
    if (consoleEl) typeToConsole(msg);
};

kexForm.addEventListener("change", function (event) {
    localStorage.setItem("exploitChain", event.target.value);
    exploitChain = event.target.value;
});

// jailbreak execution with animations
jeilbrekBtn.addEventListener("click", function (e){
    // Ripple effect
    jeilbrekBtn.classList.remove('ripple-active');
    void jeilbrekBtn.offsetWidth; // force reflow
    jeilbrekBtn.classList.add('ripple-active');
    setTimeout(() => jeilbrekBtn.classList.remove('ripple-active'), 600);

    jeilbrekBtn.disabled = true;
    stopInterval();

    // Show spinner
    if (spinnerEl) spinnerEl.classList.remove('hidden');

    // Type to console
    typeToConsole("Starting exploit chain: " + exploitChain + "...");

    doJb();
});

checkbox.addEventListener('change', function () {
    localStorage.setItem("autoJb", checkbox.checked);
    if (checkbox.checked == true && jeilbrekBtn.disabled == false) {
        jailbreakCountdown();
        return;
    }

    stopInterval();
});

function stopInterval(){
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
    label.textContent = "Auto Jailbreak";
}

function jailbreakCountdown() {
    stopInterval();

    let countdown = 5;
    label.textContent = `Auto Jailbreaking in: ${countdown}`;
    timerId = setInterval(() => {
        countdown--;
        label.textContent = `Auto Jailbreaking in: ${countdown}`;

        if (countdown < 0) {
            jeilbrekBtn.disabled = true;
            clearInterval(timerId);
            timerId = null;
            label.textContent = 'Executing';

            if (spinnerEl) spinnerEl.classList.remove('hidden');
            typeToConsole("Auto-jailbreak triggered. Starting exploit...");

            doJb();
        }
    }, 1000);
}

function cacheProgress(e) {
    var Percent = (Math.round(e.loaded / e.total * 100));
    document.title = "Caching: " + Percent + "%";
}

function displayCacheProgress() {
    setTimeout(function () {
        document.title = "\u2713";
    }, 1000);
    setTimeout(function () {
        document.title = "CSSFontFace exploit";
    }, 3000);
}

document.addEventListener("DOMContentLoaded", function() {
    // Cache handling
    if (window.applicationCache) {
        window.applicationCache.addEventListener("progress", cacheProgress, false);
        window.applicationCache.oncached = function (e) { displayCacheProgress(); };
        window.applicationCache.onupdateready = function (e) { displayCacheProgress(); };
    }

    // choose prefered exploit chain
    if (exploitChain == "netctrl") {
        netctrlRadio.checked = true;
    } else {
        lapseRadio.checked = true;
    }

    // apply autojb localStorage value
    checkbox.checked = autoJbValue;

    if (autoJbValue) jailbreakCountdown();
});
