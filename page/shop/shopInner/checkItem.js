async function renderShopItems() {
    const mainImg = document.getElementById("main-image-display");
    const data = JSON.parse(sessionStorage.getItem("selectedItemImage"));
    if (!data) return;
    mainImg.src = data.source;
    closeItemDisplay();
    renderImage();
    itemCountDisplay();
}

async function closeItemDisplay() {
    const cancelBtn = document.getElementById("cancel-btn");
    const listImg = document.getElementById("popup-list-img");
    cancelBtn.addEventListener("click", () => {
        const itemDisplay = document.querySelector(".earrings-article");
        itemDisplay.classList.remove("activePopup");
        sessionStorage.removeItem("selectedItemImage");
        listImg.innerHTML = "";
        const overlay = document.querySelector(".overlay");
        overlay.classList.remove("activeOverlay");
        const body = document.body;
        body.classList.remove("no-scroll");
    });
}

async function renderImage(itemCategory) {
    const articleName = document.querySelector(".article-name");
    let imgSources = [];
    if (itemCategory === "Earring") {
        imgSources = [ 
            {src: "./images/shop/earings/gold.webp", alt: "Earring 1"},
            {src: "./images/shop/earings/gold2.webp", alt: "Earring 2"},
            {src: "./images/shop/earings/gold.webp", alt: "Earring 3"},
            {src: "./images/shop/earings/gold2.webp", alt: "Earring 4"},
            {src: "./images/shop/earings/gold.webp", alt: "Earring 5"},
        ];
    } else if (itemCategory === "Necklace") {
        imgSources = [
            {src: "./images/shop/necklace/chain.webp", alt: "Necklace 1"},
            {src: "./images/shop/necklace/birthstone.webp", alt: "Necklace 2"},
            {src: "./images/shop/necklace/necklace1.webp", alt: "Necklace 3"},
            {src: "./images/shop/necklace/pearl.webp", alt: "Necklace 4"},
            {src: "./images/shop/necklace/chain.webp", alt: "Necklace 5"},
        ];
    } else if (itemCategory === "Bracelet") {
        imgSources = [
            {src: "./images/shop/bracelet/beaded.webp", alt: "Bracelet 1"},
            {src: "./images/shop/bracelet/braided.webp", alt: "Bracelet 2"},
            {src: "./images/shop/bracelet/charm.webp", alt: "Bracelet 3"},
            {src: "./images/shop/bracelet/chain.webp", alt: "Bracelet 4"},
            {src: "./images/shop/bracelet/beaded.webp", alt: "Bracelet 5"},
        ];
    } else if (itemCategory === "Ring") {
        imgSources = [
            {src: "./images/shop/rings/threeStone.webp", alt: "Ring 1"},
            {src: "./images/shop/rings/solitaire.webp", alt: "Ring 2"},
            {src: "./images/shop/rings/diamondBand.webp", alt: "Ring 3"},
            {src: "./images/shop/rings/mood.webp", alt: "Ring 4"},
            {src: "./images/shop/rings/threeStone.webp", alt: "Ring 5"},
        ];
    } else if (itemCategory === "Bangle") {
        imgSources = [
            {src: "./images/shop/bangles/solidMetal.webp", alt: "Bangle 1"},
            {src: "./images/shop/bangles/cuff.webp", alt: "Bangle 2"},
            {src: "./images/shop/bangles/lacquer.webp", alt: "Bangle 3"},
            {src: "./images/shop/bangles/hinged.webp", alt: "Bangle 4"},
            {src: "./images/shop/bangles/solidMetal.webp", alt: "Bangle 5"},
        ];
    } else if (itemCategory === "Tiara") {
        imgSources = [
            {src: "./images/shop/tiara/fringe.webp", alt: "Tiara 1"},
            {src: "./images/shop/tiara/meander.webp", alt: "Tiara 2"},
            {src: "./images/shop/tiara/aigrette.webp", alt: "Tiara 3"},
            {src: "./images/shop/tiara/bandeau.webp", alt: "Tiara 4"},
            {src: "./images/shop/tiara/fringe.webp", alt: "Tiara 5"},
        ];
    } else if (itemCategory === "Anklet") {
        imgSources = [
            {src: "./images/shop/anklet/stringAnklet.webp", alt: "Anklet 1"},
            {src: "./images/shop/anklet/beadedAnklet.webp", alt: "Anklet 2"},
            {src: "./images/shop/anklet/braidedAnklet.webp", alt: "Anklet 3"},
            {src: "./images/shop/anklet/demiFineAnklet.webp", alt: "Anklet 4"},
            {src: "./images/shop/anklet/stringAnklet.webp", alt: "Anklet 5"},
        ];
    } else if (itemCategory === "Other") {
        imgSources = [
            {src: "./images/shop/others/watch.webp", alt: "Other 1"},
            {src: "./images/shop/others/pocket.webp", alt: "Other 2"},
            {src: "./images/shop/others/belt.webp", alt: "Other 3"},
            {src: "./images/shop/others/lighter.webp", alt: "Other 4"},
            {src: "./images/shop/others/watch.webp", alt: "Other 5"},
        ];
    }

    const listImg = document.getElementById("popup-list-img");
    imgSources.forEach((source) => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        const img = document.createElement("img");
        img.src = source.src;
        img.alt = source.alt;
        button.appendChild(img);
        li.appendChild(button);
        listImg.appendChild(li);
        button.addEventListener("click", () => {
            const mainImg = document.getElementById("main-image-display");
            mainImg.src = source.src;
        });
    });

    const data = JSON.parse(sessionStorage.getItem("selectedItemImage"));
    if (!data) return;
    const articleTitle= data.article;
    const articlePrice = data.price;
    const articleTitleDisplay = document.querySelector(".article-name");
    articleTitleDisplay.textContent = articleTitle;
    const articlePriceDisplay = document.querySelector(".article-price");
    articlePriceDisplay.textContent = `$${articlePrice}`;
}
function itemCountDisplay() {
    const increaseBtn = document.getElementById("increase-count");
    const decreaseBtn = document.getElementById("decrease-count");
    const countDisplay = document.getElementById("item-count");
    let count = 1;
    const data = JSON.parse(sessionStorage.getItem("selectedItemImage"));
    let totalPrice = 0;
    increaseBtn.addEventListener("click", () => {
        count++;
        countDisplay.textContent = count;
        totalPrice = count * data.price;
    });

    decreaseBtn.addEventListener("click", () => {
        if (count > 1) {
            count--;
            countDisplay.textContent = count;
            totalPrice = count * data.price;
        }
    });
}