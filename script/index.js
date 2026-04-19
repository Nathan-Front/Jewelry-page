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
    homeMain.insertAdjacentHTML("beforeend", firstHTML);

    const resSecond = await fetch("./page/home/secondSection.html");
    const secondHTML = await resSecond.text();
    homeMain.insertAdjacentHTML("beforeend", secondHTML);

    const resThird = await fetch("/page/home/thirdSection.html");
    const thirdHTML = await resThird.text();
    homeMain.insertAdjacentHTML("beforeend", thirdHTML);

    const resFourth = await fetch("/page/home/fourthSection.html");
    const fourthHTML = await resFourth.text();
    homeMain.insertAdjacentHTML("beforeend", fourthHTML);

    const resFoot = await fetch("./components/footer/footer.html");
    const footHTML = await resFoot.text();
    body.insertAdjacentHTML("beforeend", footHTML);

    const resMobileNav = await fetch("./components/navigation/mobileNav.html");
    const mobileNav = await resMobileNav.text();
    body.insertAdjacentHTML("beforeend", mobileNav);
}
document.addEventListener("DOMContentLoaded", fetchHTML);

