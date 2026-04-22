function toShopButton() {
    const toShopBtn = document.querySelectorAll(".to-shop-item");
    toShopBtn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const toShopLink = e.target.closest("[data-category]");
            if (toShopLink && toShopLink.dataset.category === "earrings") {
                window.location.href = "shop.html#earrings-section";
            } else if (toShopLink && toShopLink.dataset.category === "necklace") {
                window.location.href = "shop.html#necklace-section";
            } else if (toShopLink && toShopLink.dataset.category === "bracelet") {
                window.location.href = "shop.html#bracelet-section";
            } else if (toShopLink && toShopLink.dataset.category === "rings") {
                window.location.href = "shop.html#rings-section";
            } else if (toShopLink && toShopLink.dataset.category === "bangles") {
                window.location.href = "shop.html#bangles-section";
            } else if (toShopLink && toShopLink.dataset.category === "tiaras") {
                window.location.href = "shop.html#tiaras-section";
            } else if (toShopLink && toShopLink.dataset.category === "anklets") {
                window.location.href = "shop.html#anklets-section";
            } else if (toShopLink && toShopLink.dataset.category === "others") {
                window.location.href = "shop.html#others-section";
            }
            
        })
    })
}