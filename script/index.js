async function fetchHTML() {
    const page = document.body.dataset.page;
    const app = document.getElementById("app");
    
    const [
        nav,
        foot,
        mobileNav
    ] = await Promise.all([
        fetch("./components/navigation/navigation.html").then(res => res.text()),
        fetch("./components/footer/footer.html").then(res => res.text()),
        fetch("./components/navigation/mobileNav.html").then(res => res.text()),
    ])

    app.insertAdjacentHTML("beforeend", nav);

    if (page === "home") {
        const section = await Promise.all([
            fetch("./page/home/firstSection.html").then(res => res.text()),
            fetch("./page/home/secondSection.html").then(res => res.text()),
            fetch("./page/home/thirdSection.html").then(res => res.text()),
            fetch("./page/home/fourthSection.html").then(res => res.text()),
        ])
        section.forEach(sec => app.insertAdjacentHTML("beforeend", sec));
        toShopButton();
        customerMessage();
    }
    if (page === "shop") {
        const section = await Promise.all([
            fetch("./page/shop/shopFirstSection.html").then(res => res.text()),
            fetch("./page/shop/shopSecondSection.html").then(res => res.text()),
            fetch("./page/shop/shopThirdSection.html").then(res => res.text()),
            fetch("./page/shop/shopFourthSection.html").then(res => res.text()),
            fetch("./page/shop/shopFifthSection.html").then(res => res.text()),
            fetch("./page/shop/shopSixthSection.html").then(res => res.text()),
            fetch("./page/shop/shopSeventhSection.html").then(res => res.text()),
            fetch("./page/shop/shopEigthSection.html").then(res => res.text()),
            fetch("./page/shop/shopNinthSection.html").then(res => res.text()),
            fetch("./page/shop/shopInner/checkItem.html").then(res => res.text()),
            fetch("./page/shop/cartSection.html").then(res => res.text()),
             fetch("./page/shop/shopInner/cart.html").then(res => res.text()),
        ])
        section.forEach(sec => app.insertAdjacentHTML("beforeend", sec));
            //Smooth scroll to section if URL has a hash
        if (window.location.hash) {
            const targetId = window.location.hash.substring(1); //this remove the '#'
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
        filterCategory();
        sortByPrice();
        buyNowButtons();
        displayCart();
    }
    if (page === "about") {
        const section = await Promise.all([
            fetch("./page/about/aboutFirstSection.html").then(res => res.text()),
            fetch("./page/about/aboutSecondSection.html").then(res => res.text()),
            fetch("./page/about/aboutThirdSection.html").then(res => res.text()),
        ])
        section.forEach(sec => app.insertAdjacentHTML("beforeend", sec));
    }
    if (page === "contact") {
        const section = await Promise.all([
            fetch("./page/home/fourthSection.html").then(res => res.text()),
            fetch("./page/contact/contactSecondSection.html").then(res => res.text()),
            fetch("./page/contact/contactThirdSection.html").then(res => res.text()),
        ])
        section.forEach(sec => app.insertAdjacentHTML("beforeend", sec));
        FAQ();
    }
    app.insertAdjacentHTML("beforeend", foot);
    app.insertAdjacentHTML("beforeend", mobileNav);
    subscribe();

}

document.addEventListener("DOMContentLoaded", fetchHTML);

