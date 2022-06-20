/* ------------------------------- Useful data ------------------------------ */

const imgPath = "img/";

/* ------------------------------ HTML Elements ----------------------------- */

const htmlAnim = {
    container: document.querySelector('.anim'),
    drip: document.querySelector('.drip'),
    logo: document.querySelector('.logo')
};

const htmlMain = {
    // Nav
    container: document.querySelector('main'),
    prevBtn: document.querySelector('#prev_btn'),
    nextBtn: document.querySelector('#next_btn'),
    mainBtn: document.querySelector('.main-btn'),
    btnBorder: document.querySelector('#btn_border'),

    // Aside
    firstCircle: document.getElementsByClassName("nav-circle")[0],
    secondCircle: document.getElementsByClassName("nav-circle")[1],
    infoText: document.getElementById("info")
}

/* --------------------------------- Events --------------------------------- */

// Start the animation when the page is loaded
window.addEventListener("load", () => {
    setTimeout(() => {
        // Check if the user already played the animation today
        const playAnim = getCookie("playAnim");
        if (playAnim === "") {
            setCookie("playAnim", "ok", 1);
            htmlAnim.drip.classList.add('falling');
            setTimeout(() => {
                htmlAnim.drip.classList.remove('falling');
                htmlAnim.logo.classList.add('show');
                htmlAnim.container.addEventListener("click", mainBtnClick);
            }, 2000);
        } else {
            htmlAnim.logo.classList.add('show');
            htmlAnim.container.addEventListener("click", mainBtnClick);
        }
    }, 500);
});

// Show the main content after clicking the animation button
function mainBtnClick() {
    htmlAnim.container.style.display = "none";
    htmlMain.container.classList.add("show-main");
}

// The previous button listener
function previous() {
    if (htmlMain.prevBtn.classList.contains("disabled")) return;

    // Update the main button
    htmlMain.btnBorder.src = `${imgPath}bs_shape_border_green.png`;
    htmlMain.mainBtn.src = `${imgPath}add_btn.png`;

    // Update nav buttons
    htmlMain.nextBtn.classList.remove("disabled");
    htmlMain.prevBtn.classList.add("disabled");

    // Update aside
    htmlMain.firstCircle.classList.add("active");
    htmlMain.secondCircle.classList.remove("active");
    htmlMain.infoText.innerText = "Je veux créer !";
}
htmlMain.prevBtn.addEventListener('click', previous);
htmlMain.firstCircle.addEventListener('click', previous);

// The next button listener
function next() {
    if (htmlMain.nextBtn.classList.contains("disabled")) return;

    // Update the main button
    htmlMain.btnBorder.src = `${imgPath}bs_shape_border_blue.png`;
    htmlMain.mainBtn.src = `${imgPath}watch_btn.png`;

    // Update nav buttons
    htmlMain.prevBtn.classList.remove("disabled")
    htmlMain.nextBtn.classList.add("disabled")

    // Update aside
    htmlMain.secondCircle.classList.add("active");
    htmlMain.firstCircle.classList.remove("active");
    htmlMain.infoText.innerText = "Je veux profiter !";
}
htmlMain.nextBtn.addEventListener('click', next);
htmlMain.secondCircle.addEventListener('click', next);

// The main button listener
htmlMain.mainBtn.addEventListener('click', () => {
    const action = htmlMain.btnBorder.src.includes('green') ? 'add' : 'watch';
    const path = action === 'add' ? 'create' : 'explore';
    window.location.href = `/${path}`;
});

/* -------------------------------- Functions ------------------------------- */

/**
 * Set a cookie
 * @param {String} cname The cookie name
 * @param {String} cvalue The cookie value
 * @param {Number} exdays Number of days before expiration
 */
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * Get a cookie
 * @param {String} cname The cookie name
 * @returns The cookie value, empty string if it doesn't exist
 */
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}