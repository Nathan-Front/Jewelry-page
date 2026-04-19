async function fetchHTML() {
    const body = document.body;
    const resNav = await fetch("./components/navigation/navigation.html");
    const navHTML = await resNav.text();
    body.insertAdjacentHTML("afterbegin", navHTML);

    const resHome = await fetch("./page/home/home.html");
    const homeHTML = await resHome.text();
    const parser = new DOMParser();
    const home = parser.parseFromString(homeHTML, "text/html");
    const homeMain = home.getElementById("home-main");
    body.appendChild(homeMain);

    const resFirst = await fetch("./page/home/firstSection.html");
    const firstHTML = await resFirst.text();
    homeMain.insertAdjacentHTML("afterbegin", firstHTML);

    const resSecond = await fetch("./page/home/secondSection.html");
    const secondHTML = await resSecond.text();
    homeMain.insertAdjacentHTML("afterend", secondHTML);

    const resFoot = await fetch("./components/footer/footer.html");
    const footHTML = await resFoot.text();
    body.insertAdjacentHTML("beforeend", footHTML);
}
document.addEventListener("DOMContentLoaded", fetchHTML);

