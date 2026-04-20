async function fetchContents() {
    const body = document.body;
    const [
        nav,
        first,
        second,
        third,
        fourth,
        fifth,
        sixth,
        seventh,
        eighth,
        footer,
        mobileNav
    ] = await Promise.all([
        fetch("./components/navigation/navigation.html").then(res => res.text()),
        fetch("./page/shop/shopFirstSection.html").then(res => res.text()),
        fetch("./page/shop/shopSecondSection.html").then(res => res.text()),
        fetch("./page/shop/shopThirdSection.html").then(res => res.text()),
        fetch("./page/shop/shopFourthSection.html").then(res => res.text()),
        fetch("./page/shop/shopFifthSection.html").then(res => res.text()),
        fetch("./page/shop/shopSixthSection.html").then(res => res.text()),
        fetch("./page/shop/shopSeventhSection.html").then(res => res.text()),
        fetch("./page/shop/shopEigthSection.html").then(res => res.text()),
        fetch("./components/footer/footer.html").then(res => res.text()),
        fetch("./components/navigation/mobileNav.html").then(res => res.text())
    ]);

    body.insertAdjacentHTML("afterbegin", nav);
    body.insertAdjacentHTML("beforeend", first);
    body.insertAdjacentHTML("beforeend", second);
    body.insertAdjacentHTML("beforeend", third);
    body.insertAdjacentHTML("beforeend", fourth);
    body.insertAdjacentHTML("beforeend", fifth);
    body.insertAdjacentHTML("beforeend", sixth);
    body.insertAdjacentHTML("beforeend", seventh);
    body.insertAdjacentHTML("beforeend", eighth);
    body.insertAdjacentHTML("beforeend", footer);
    body.insertAdjacentHTML("beforeend", mobileNav);
}

document.addEventListener("DOMContentLoaded", fetchContents);