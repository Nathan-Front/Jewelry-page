async function checkoutOrder() {
    const form = document.getElementById("checkout-form");
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const emailInput = document.getElementById("email");
    const contact = document.getElementById("contact");
    const country = document.getElementById("country-dropdown");
    const zip = document.getElementById("zip");
    const address = document.getElementById("address");
    const address2 = document.getElementById("address2");
    const grandTotal = document.getElementById("total-price-summary");
    const scriptURL = "https://script.google.com/macros/s/AKfycbw5uyj2PTZWIRjOYrUTlkvtKk4-sURqA_nVhmmMVlSdWXiUvaLoOZyNgn-iE4VHimqH/exec";
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        validateEmail(emailInput.value);
        if (!validateEmail(emailInput.value)) {
            emailInput.classList.add("input-error");
            return;
        }
        const data = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: emailInput.value,
            contact: contact.value,
            country: country.value,
            zip: zip.value,
            address: address.value,
            address2: address2.value,
        };
        const cartItem = JSON.parse(sessionStorage.getItem("cartItem")) || [];
        const merge = {
            ...data,
            date: new Date().toLocaleDateString(),
            item: cartItem.map(i => i.name).join(", "),
            price: cartItem.map(i => i.price).join(", "),
            quantity: cartItem.map(i => i.quantity).join(", "),
            image: cartItem.map(i => i.image).join(", "),
            subTotal: cartItem.map(i => i.subTotal).join(", "),
            grandTotal: grandTotal.textContent
        };
        const submitBtn = form.querySelector(`button[type="submit"]`)
        const loader = document.getElementById("order-submit-loader");
        const orderBtnTxt = document.getElementById("order-btn-text");
        loader.classList.remove("hidden");
        orderBtnTxt.textContent = "Processing please wait.";
        submitBtn.disabled = true;

        try {
            const res = await fetch(scriptURL, {
                method: "POST",
                body: JSON.stringify(merge)
            });
            if (!res.ok) throw new error("Request Failed"); //checks internet/server response status >= 200 and < 300
            const result = await res.text();
            if (result !== "Success") throw new Error("Apps Script failed"); //checks the Apps Script returned expected success result
            alert("Your order has been placed successfully!");
            form.reset()
            emailInput.classList.remove("input-error");
            sessionStorage.removeItem("cartItem");
            window.location.href = "shop.html";
            displayCartCount();
            cartContent();
        } catch (error) {
            alert("An error occurred. Please try again later.");
        } finally {
            loader.classList.add("hidden");
            orderBtnTxt.textContent = "Send Order";
            submitBtn.disabled = false;
            
        }
    });
}
