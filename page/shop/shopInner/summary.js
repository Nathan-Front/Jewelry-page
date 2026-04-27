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
    const scriptURL = "https://script.google.com/macros/s/AKfycbxA68yWJqbZrQBpJWReBPGORY1MKjwpEvSvj1MpKTUBflyMSZ1fp6ZzUdoQhDXS-afW/exec";
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
            date: new Date().toISOString(),
            item: cartItem.map(i => i.name).join(", "),
            price: cartItem.map(i => i.price).join(", "),
            quantity: cartItem.map(i => i.quantity).join(", "),
            image: cartItem.map(i => i.image).join(", "),
            subTotal: cartItem.map(i => i.subTotal).join(", "),
            grandTotal: cartItem.reduce((sum, i) => sum + (i.price * i.quantity), 0)
        };
          try {
            const res = await fetch(scriptURL, {
    method: "POST",
    mode: 'no-cors',
    body: JSON.stringify(merge)
});

const result = await res.text();
            alert("Your order has been placed successfully!");
        } catch (error) {
            alert("An error occurred. Please try again later.");
        }
    });
}
