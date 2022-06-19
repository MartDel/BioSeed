/* -------------------------------------------------------------------------- */
/*                                   Events                                   */
/* -------------------------------------------------------------------------- */

window.addEventListener("load", () => {
    setTimeout(() => {
        const playAnim = getCookie("playAnim");
        if (playAnim === "") {
            setCookie("playAnim", "ok", 1);
            document.querySelector('.drip').classList.add('falling');
            setTimeout(() => {
                document.querySelector('.drip').classList.remove('falling');
                document.querySelector('.logo').classList.add('show');
            }, 2000);
        } else {
            document.querySelector('.logo').classList.add('show');
        }
    }, 500);
});

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

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