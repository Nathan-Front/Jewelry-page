async function renderShopItems(itemCategory) {
    const mainImg = document.getElementById("main-image-display");
    const imageSelectedStorage = JSON.parse(localStorage.getItem("selectedItemImage")) || [];
    if (!imageSelectedStorage.length) return;
    mainImg.src = imageSelectedStorage;
    closeItemDisplay();
    renderImage(itemCategory);
}

async function closeItemDisplay() {
    const cancelBtn = document.getElementById("cancel-btn");
    const listImg = document.getElementById("popup-list-img");
    cancelBtn.addEventListener("click", () => {
        const itemDisplay = document.querySelector(".earrings-article");
        itemDisplay.classList.remove("activePopup");
        localStorage.removeItem("selectedItemImage");
        listImg.innerHTML = "";
        const overlay = document.querySelector(".overlay");
        overlay.classList.remove("activeOverlay");
        const body = document.body;
        body.classList.remove("no-scroll");
    });
}

async function renderImage(itemCategory) {
    let imgSources = [];
    if (itemCategory === "earring") {
        imgSources = [ 
            {src: "./images/shop/earings/gold.webp", alt: "Earring 1"},
            {src: "./images/shop/earings/gold2.webp", alt: "Earring 2"},
            {src: "./images/shop/earings/gold.webp", alt: "Earring 3"},
            {src: "./images/shop/earings/gold2.webp", alt: "Earring 4"},
            {src: "./images/shop/earings/gold.webp", alt: "Earring 5"},
        ];
    } else if (itemCategory === "necklace") {
        imgSources = [
            {src: "./images/shop/earings/gold.webp", alt: "Ring 1"},
            {src: "./images/shop/earings/gold.webp", alt: "Ring 2"},
            {src: "./images/shop/earings/gold.webp", alt: "Ring 3"},
            {src: "./images/shop/earings/gold.webp", alt: "Ring 4"},
            {src: "./images/shop/earings/gold.webp", alt: "Ring 5"},
        ];
    } else if (itemCategory === "bracelet") {
        imgSources = [
            {src: "./images/shop/bracelet/beaded.webp", alt: "Bracelet 1"},
            {src: "./images/shop/bracelet/braided.webp", alt: "Bracelet 2"},
            {src: "./images/shop/bracelet/charm.webp", alt: "Bracelet 3"},
            {src: "./images/shop/bracelet/chain.webp", alt: "Bracelet 4"},
            {src: "./images/shop/bracelet/beaded.webp", alt: "Bracelet 5"},
        ];
    } else if (itemCategory === "ring") {
        imgSources = [
            {src: "./images/shop/rings/threeStone.webp", alt: "Ring 1"},
            {src: "./images/shop/rings/solitaire.webp", alt: "Ring 2"},
            {src: "./images/shop/rings/diamondBand.webp", alt: "Ring 3"},
            {src: "./images/shop/rings/mood.webp", alt: "Ring 4"},
            {src: "./images/shop/rings/threeStone.webp", alt: "Ring 5"},
        ];
    } else if (itemCategory === "bangle") {
        imgSources = [
            {src: "./images/shop/bangles/solidMetal.webp", alt: "Bangle 1"},
            {src: "./images/shop/bangles/cuff.webp", alt: "Bangle 2"},
            {src: "./images/shop/bangles/lacquer.webp", alt: "Bangle 3"},
            {src: "./images/shop/bangles/hinged.webp", alt: "Bangle 4"},
            {src: "./images/shop/bangles/solidMetal.webp", alt: "Bangle 5"},
        ];
    } else if (itemCategory === "tiara") {
        imgSources = [
            {src: "./images/shop/tiara/fringe.webp", alt: "Tiara 1"},
            {src: "./images/shop/tiara/meander.webp", alt: "Tiara 2"},
            {src: "./images/shop/tiara/aigrette.webp", alt: "Tiara 3"},
            {src: "./images/shop/tiara/bandeau.webp", alt: "Tiara 4"},
            {src: "./images/shop/tiara/fringe.webp", alt: "Tiara 5"},
        ];
    } else if (itemCategory === "anklet") {
        imgSources = [
            {src: "./images/shop/anklet/stringAnklet.webp", alt: "Anklet 1"},
            {src: "./images/shop/anklet/beadedAnklet.webp", alt: "Anklet 2"},
            {src: "./images/shop/anklet/braidedAnklet.webp", alt: "Anklet 3"},
            {src: "./images/shop/anklet/demiFineAnklet.webp", alt: "Anklet 4"},
            {src: "./images/shop/anklet/stringAnklet.webp", alt: "Anklet 5"},
        ];
    } else if (itemCategory === "other") {
        imgSources = [
            {src: "./images/shop/others/watch.webp", alt: "Other 1"},
            {src: "./images/shop/others/pocket.webp", alt: "Other 2"},
            {src: "./images/shop/others/belt.webp", alt: "Other 3"},
            {src: "./images/shop/others/lighter.webp", alt: "Other 4"},
            {src: "./images/shop/others/watch.webp", alt: "Other 5"},
        ];
    }

    const listImg = document.getElementById("popup-list-img");
    imgSources.forEach((source, index) => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        const img = document.createElement("img");
        img.src = source.src;
        img.alt = source.alt;
        button.appendChild(img);
        li.appendChild(button);
        listImg.appendChild(li);
    });
}