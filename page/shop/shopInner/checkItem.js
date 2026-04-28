async function renderShopItems(data) {
    const mainImg = document.getElementById("main-image-display");
    //const data = JSON.parse(sessionStorage.getItem("selectedItemImage"));
    //if (!data) return;
    mainImg.src = data.source;
    closeItemDisplay();
    renderImage();
    itemCountDisplay();
}

async function addToCart() {
    const addToCartBtn = document.getElementById("add-to-cart-btn");
    addToCartBtn.addEventListener("click", () => {
        const cart = JSON.parse(sessionStorage.getItem("cartItem")) || [];
        const imageSelectedStorage = JSON.parse(sessionStorage.getItem("selectedItemImage")) || {};
        const articleName = document.querySelector(".article-name").textContent;
        const articlePrice = document.querySelector(".article-price").textContent;
        const itemCount = document.querySelector("#item-count").textContent;
        const itemExist = cart.find(item => item.name === articleName);
        if (itemExist) {
            alert("Same item is already in your cart.");
            hideItemModal();
            removeOverlay();
            sessionStorage.removeItem("selectedItemImage");
            return;
        } 
        const cartItem = {
            name: articleName,
            image: imageSelectedStorage.source || "",
            price: articlePrice.replace("$", ""),
            quantity: parseInt(itemCount),
            subTotal: parseFloat(articlePrice.replace("$", "")) * parseInt(itemCount)
        };
        cart.push(cartItem);
        sessionStorage.setItem("cartItem", JSON.stringify(cart));
        alert(`${articleName} has been added to your cart.`);
        hideItemModal();
        removeOverlay();
        displayCartCount();
        cartContent();
        sessionStorage.removeItem("selectedItemImage"); 
    });  
}

function displayCartCount() {
   const cartItem = JSON.parse(sessionStorage.getItem("cartItem")) || [];
   if (cartItem) {
       const cartCount = document.getElementById("cart-count");
       const total = cartItem.reduce((total, item) => total + item.quantity, 0);
       cartCount.textContent = total;
       const cartItemCounter = document.getElementById("cart-item-counter");
       cartItemCounter.textContent = total + (total <= 1 ? " item" : " items");
   }
}

async function closeItemDisplay() {
    const cancelBtn = document.getElementById("cancel-btn");
    const listImg = document.getElementById("popup-list-img");
    cancelBtn.addEventListener("click", () => {
        hideItemModal();
        sessionStorage.removeItem("selectedItemImage");
        //sessionStorage.removeItem("cartItem");
        listImg.innerHTML = "";
        removeOverlay();
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
    listImg.innerHTML = "";
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
    const increaseBtn = document.querySelector(".increase-count");
    const decreaseBtn = document.querySelector(".decrease-count");
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

function cartContent() {
    const cartItem = JSON.parse(sessionStorage.getItem("cartItem")) || [];
    const cartList = document.getElementById("your-cart");
    if (!cartList) return;
    cartList.innerHTML = "";
    cartItem.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML =`
            <img src="${item.image}" alt="${item.name}" />
            <div>
                <h4>${item.name}</h4>
                <p>Price: ${item.price}</p>
                <div>
                    <button class="decrease-quantity">-</button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button class="increase-quantity">+</button>
                </div>
                
                <button type="button" class="remove-item">Remove</button>
            </div>
        `;
        cartList.appendChild(li);
    });
    cartQuantityUpdate();
    cartItemDelete();
    subTotal();
}

function onPageReloadCart() {
    const cartItem = JSON.parse(sessionStorage.getItem("cartItem")) || [];
    const cartCount = document.querySelector("#cart-count");
    if (!cartCount) return;
    const totalCount = cartItem.reduce((sum, item) => sum + item.quantity, 0);
    if (totalCount > 0) {
        cartCount.textContent = totalCount;
        const cartItemCounter = document.getElementById("cart-item-counter");
        cartItemCounter.textContent = totalCount + (totalCount === 1 ? " item" : " items");
    } 
}

function cartQuantityUpdate() {
    const cartItem = JSON.parse(sessionStorage.getItem("cartItem")) || [];
    const decreaseBtns = document.querySelectorAll(".decrease-quantity");
    const increaseBtns = document.querySelectorAll(".increase-quantity");
    decreaseBtns.forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            const item = e.currentTarget.closest("li");
            const span = item.querySelector(".item-quantity");
            span.textContent = parseInt(span.textContent) - 1;
            if (parseInt(span.textContent) > 0) {
                cartItem[index].quantity--;
            }
            sessionSubTotalUpdate(cartItem, index);
            cartContent();
            onPageReloadCart();
            checkoutSummary();
        });
    });
    increaseBtns.forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            const item = e.currentTarget.closest("li");
            const span = item.querySelector(".item-quantity");
            span.textContent = parseInt(span.textContent) + 1;
            cartItem[index].quantity++;
            sessionSubTotalUpdate(cartItem, index);
            cartContent();
            onPageReloadCart(); 
            checkoutSummary();
        });
    });
}
function sessionSubTotalUpdate(cartItem, index) {
    let total = parseFloat(cartItem[index].quantity) * parseFloat(cartItem[index].price);
    cartItem[index].subTotal = total;
    sessionStorage.setItem("cartItem", JSON.stringify(cartItem));
}

function cartItemDelete() {
    let cartItem = JSON.parse(sessionStorage.getItem("cartItem")) || [];
    const removeBtns = document.querySelectorAll(".remove-item");
    removeBtns.forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            const item = e.currentTarget.closest("li");
            const itemName = item.querySelector("h4").textContent;
            cartItem =cartItem.filter(item => item.name !== itemName);
            alert(`${itemName} has been removed from your cart.`);
            sessionStorage.setItem("cartItem", JSON.stringify(cartItem));
            cartContent();
            onPageReloadCart();
            displayCartCount();
            checkoutSummary();
            if (cartItem.length === 0) {
                if(window.location.pathname !== "/shop.html") {
                    window.location.href = "shop.html";
                    return;
                } 
                removeOverlay();
                noClickHideCart();
            }
        });
    });
}

function subTotal() {
    const cartItem = JSON.parse(sessionStorage.getItem("cartItem")) || [];
    const subTotalElement = document.querySelector(".sub-total-span");
    if (!subTotalElement) return;
    const total = cartItem.reduce((sum, item) => sum + item.subTotal, 0);
    subTotalElement.textContent = `${total.toFixed(2)}`;
}

function checkout() {
    const checkoutBtn = document.getElementById("to-checkout");
    checkoutBtn.addEventListener("click", () => {
        const cartItem = JSON.parse(sessionStorage.getItem("cartItem")) || [];
        if (cartItem.length > 0) {
            if(window.location.pathname !== "/checkout.html") {
                window.location.href = "checkout.html";
            } else {
                removeOverlay();
                noClickHideCart();
                return;
            }
        } else {
            alert("You dont have item in your cart.");
            removeOverlay();
            noClickHideCart();
            return;
        }
    });
}

function checkoutSummary() {
    const cartItem = JSON.parse(sessionStorage.getItem("cartItem")) || [];
        const orderSummary = document.querySelector("#cart-items-summary");
        if (!orderSummary) return;
        orderSummary.innerHTML = "";
        cartItem.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `
                <img src="${item.image}" alt="${item.name}" />
                <p>${item.name}</p>
                <p>$${item.price}</p>
                <p>${item.quantity}</p>
                <p>$${item.subTotal.toFixed(2)}</p>
            `;
            orderSummary.appendChild(li);
        });
        const totalElement = document.querySelector("#total-price-summary");
        let total = cartItem.reduce((sum, item) => sum + item.subTotal, 0) * 0.10;
        let grandTotal = cartItem.reduce((sum, item) => sum + item.subTotal, 0) + total;
        totalElement.textContent = `${grandTotal.toFixed(2)}`;
}


//From country API
async function loadCountries() {
    const dropdown = document.getElementById('country-dropdown');
    if (!dropdown) return;
    try {
        //Adding a timeout to the fetch so it doesn't hang forever
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); //5 second timeout
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2', { signal: controller.signal });
        if (!response.ok) throw new Error('Network response was not ok');
        const countries = await response.json();
        clearTimeout(timeoutId);
        //Sort alphabetically
        countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
        dropdown.innerHTML = '<option value="" selected disabled>Select a country</option>';
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.cca2;
            option.textContent = country.name.common;
            dropdown.appendChild(option);
        });

    } catch (error) {
        console.error('Error fetching countries:', error);
        //Fallback: If API is down, show a few major countries manually
        dropdown.innerHTML = `
            <option value="" selected disabled>Select a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="OTHER">Other (API Offline)</option>
        `;
    }
}

