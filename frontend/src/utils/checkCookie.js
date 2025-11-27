export default function checkCookie() {
    document.cookie = "testcookie=1";
    const enabled = document.cookie.indexOf("testcookie") !== -1;
    document.cookie = "testcookie=1; Max-Age=0";
    return enabled;
}