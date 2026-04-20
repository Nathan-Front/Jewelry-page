async function fetchHTML() {
    const body = document.body;
   
    const resHome = await fetch("./home.html");
    const homeHTML = await resHome.text();
    const parser = new DOMParser();
    const home = parser.parseFromString(homeHTML, "text/html");
    const homeMain = home.getElementById("home-main");
    body.appendChild(homeMain);

    const [
        nav,
        first,
        second,
        third,
        fourth,
        foot,
        mobileNav
    ] = await Promise.all([
        fetch("./components/navigation/navigation.html").then(res => res.text()),
        fetch("./page/home/firstSection.html").then(res => res.text()),
        fetch("./page/home/secondSection.html").then(res => res.text()),
        fetch("./page/home/thirdSection.html").then(res => res.text()),
        fetch("./page/home/fourthSection.html").then(res => res.text()),
        fetch("./components/footer/footer.html").then(res => res.text()),
        fetch("./components/navigation/mobileNav.html").then(res => res.text()),

    ])

    homeMain.insertAdjacentHTML("afterbegin", nav);
    homeMain.insertAdjacentHTML("beforeend", first);
    homeMain.insertAdjacentHTML("beforeend", second);
    homeMain.insertAdjacentHTML("beforeend", third);
    homeMain.insertAdjacentHTML("beforeend", fourth);
    homeMain.insertAdjacentHTML("beforeend", foot);
    homeMain.insertAdjacentHTML("beforeend", mobileNav);
}
document.addEventListener("DOMContentLoaded", fetchHTML);

