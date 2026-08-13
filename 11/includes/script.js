let timerId = null;
const label = document.getElementById('autoJbLabel');
const checkbox = document.getElementById('autoJbInput');
const jeilbrekBtn = document.getElementById('jeilbrek');
const UAElement = document.getElementById("UA");

// Defaults: Auto Jailbreak ON, Lapse selected.
// The user can temporarily switch either option during the current page session.
let autoJbValue = true;
let exploitChain = "lapse";

const netctrlRadio = document.getElementById("netctrl-exploit");
const lapseRadio = document.getElementById("lapse-exploit");
const kexForm = document.getElementById('kernel-options');

// Show user agent without requiring a visible UA field.
if (UAElement) {
    UAElement.innerText = "Running on: " + navigator.userAgent;
}

kexForm.addEventListener("change", function (event) {
    if (event.target && event.target.name === "kernel") {
        exploitChain = event.target.value;
    }
});

// jailbreak execution
jeilbrekBtn.addEventListener("click", function (){
    jeilbrekBtn.disabled = true;
    stopInterval();
    doJb();
});

checkbox.addEventListener('change', function () {
    autoJbValue = checkbox.checked;

    if (checkbox.checked === true && jeilbrekBtn.disabled === false) {
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
    label.textContent = checkbox.checked ? "Auto Jailbreak" : "Auto Jailbreak Off";
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
            doJb();
        }
    }, 1000);
}

function cacheProgress(e) {
    if (!e || !e.total) return;
    var Percent = Math.round(e.loaded / e.total * 100);
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
    if (window.applicationCache) {
        window.applicationCache.addEventListener("progress", cacheProgress, false);
        window.applicationCache.oncached = function () { displayCacheProgress(); };
        window.applicationCache.onupdateready = function () { displayCacheProgress(); };
    }

    // Always start this page with Lapse selected.
    exploitChain = "lapse";
    lapseRadio.checked = true;
    netctrlRadio.checked = false;

    // Auto Jailbreak is ON by default.
    checkbox.checked = true;

    jailbreakCountdown();
});
