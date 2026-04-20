async function fetchContents() {
    const body = document.body;
    const resShop = await fetch("./shop.html");
    const shopHTML = await resShop.text();
    const parser = new DOMParser();
    const shop = parser.parseFromString(shopHTML, "text/html");
    const shopMain = shop.getElementById("shop-main");
    body.appendChild(shopMain);
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

    shopMain.insertAdjacentHTML("afterbegin", nav);
    shopMain.insertAdjacentHTML("beforeend", first);
    shopMain.insertAdjacentHTML("beforeend", second);
    shopMain.insertAdjacentHTML("beforeend", third);
    shopMain.insertAdjacentHTML("beforeend", fourth);
    shopMain.insertAdjacentHTML("beforeend", fifth);
    shopMain.insertAdjacentHTML("beforeend", sixth);
    shopMain.insertAdjacentHTML("beforeend", seventh);
    shopMain.insertAdjacentHTML("beforeend", eighth);
    shopMain.insertAdjacentHTML("beforeend", footer);
    shopMain.insertAdjacentHTML("beforeend", mobileNav);
}

document.addEventListener("DOMContentLoaded", fetchContents);