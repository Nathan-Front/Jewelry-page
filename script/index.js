async function fetchHTML() {
    const page = document.body.dataset.page;
    const app = document.getElementById("app");
    
    const [
        nav,
        foot,
        mobileNav,
        cart
    ] = await Promise.all([
        fetch("./components/navigation/navigation.html").then(res => res.text()),
        fetch("./components/footer/footer.html").then(res => res.text()),
        fetch("./components/navigation/mobileNav.html").then(res => res.text()),
        fetch("./components/cart/cart.html").then(res => res.text()),
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

    //Lazy loading
    function observeSection(path, element) {
    const observer = new IntersectionObserver(async(entries, obs) => {
            entries.forEach(async entry => {
                if (entry.isIntersecting) {
                    await lazyLoadSection(path, element);
                    obs.unobserve(element);
                }
            });
        }, {
            rootMargin: "200px"
        });
        observer.observe(element);
    }
    async function lazyLoadSection(path, target) {
        const html = await fetch(path).then(res => res.text());
        target.innerHTML = html;
        if(path.includes("shop")) {
            filterCategory();
            sortItemCategory();
            buyNowButtons();
            //displayCart();
            //hideCart();
            
        }
        //Smooth scroll for section URLs with a hash
        if (window.location.hash) {
            const targetId = window.location.hash.substring(1); //this remove the '#'
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }
    if (page === "shop") {
         const section = await Promise.all([
            /*fetch("./page/shop/shopFirstSection.html").then(res => res.text()),
            fetch("./page/shop/shopSecondSection.html").then(res => res.text()),
            fetch("./page/shop/shopThirdSection.html").then(res => res.text()),
            fetch("./page/shop/shopFourthSection.html").then(res => res.text()),
            fetch("./page/shop/shopFifthSection.html").then(res => res.text()),
            fetch("./page/shop/shopSixthSection.html").then(res => res.text()),
            fetch("./page/shop/shopSeventhSection.html").then(res => res.text()),
            fetch("./page/shop/shopEigthSection.html").then(res => res.text()),
            fetch("./page/shop/shopNinthSection.html").then(res => res.text()),*/
            fetch("./page/shop/shopFirstSection.html").then(res => res.text()),
            fetch("./page/shop/shopInner/checkItem.html").then(res => res.text()),
            //fetch("./page/shop/cartSection.html").then(res => res.text()),
            
        ])
        section.forEach(sec => app.insertAdjacentHTML("beforeend", sec));

       const sections = [
            "./page/shop/shopSecondSection.html",
            "./page/shop/shopThirdSection.html",
            "./page/shop/shopFourthSection.html",
            "./page/shop/shopFifthSection.html",
            "./page/shop/shopSixthSection.html",
            "./page/shop/shopSeventhSection.html",
            "./page/shop/shopEigthSection.html",
            "./page/shop/shopNinthSection.html",
        ];
        sections.forEach(path => {
            const div = document.createElement("div");
            div.classList.add("lazy-section");
            app.appendChild(div);

            observeSection(path, div);
        });
       
        addToCart();
        /*filterCategory();
        sortItemCategory();
        buyNowButtons();
        displayCart();
        hideCart();
        addToCart();
        cartContent();
        onPageReloadCart();
        checkout();*/
    }
    if (page === "summary") {
        const section = await Promise.all([
            fetch("./page/shop/shopInner/summary.html").then(res => res.text()),
            //fetch("./page/shop/cartSection.html").then(res => res.text()),
            //fetch("./page/shop/shopInner/cart.html").then(res => res.text()),
        ])
        section.forEach(sec => app.insertAdjacentHTML("beforeend", sec));
        checkoutSummary();
        loadCountries();
        // wait for DOM insertion to fully settle (no guessing)
        requestAnimationFrame(() => {
            initCheckoutPage();
            
        });
        
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
        customerMessage();
        FAQ();
    }
    if (page === "policy") {
        const section = await Promise.all([
            fetch("./page/policy/policyFirstSection.html").then(res => res.text()),
            fetch("./page/policy/policySecondSection.html").then(res => res.text()),
            fetch("./page/policy/policyThirdSection.html").then(res => res.text()),
        ]);
        section.forEach(sec => app.insertAdjacentHTML("beforeend", sec));
    }
    app.insertAdjacentHTML("beforeend", foot);
    app.insertAdjacentHTML("beforeend", mobileNav);
    app.insertAdjacentHTML("beforeend", cart);
    subscribe();
    cartContent();
    onPageReloadCart();
    checkout();
    displayCart();
    hideCart();



}

document.addEventListener("DOMContentLoaded", fetchHTML);

