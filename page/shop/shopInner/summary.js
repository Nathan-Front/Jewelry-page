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
    const scriptURL = "https://script.google.com/macros/s/AKfycbwrqag14qz_02_vJlqTFKuwIJCswRLAi9xHj_OyggG9ID25WB81wYExSGtgCbR-RCAk/exec";
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        //Select the honeypot value
        const honey = form.querySelector('input[name="_honey"]').value;
        //If 'honey' is NOT empty, it's a bot!
        if (honey) {
            console.log("Bot submission detected.");
            return; 
        }
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
            if (!res.ok) throw new Error("Request Failed"); //checks internet/server response status >= 200 and < 300
            const result = await res.json();
            if (!result.success) throw new Error("Apps Script failed"); //checks the Apps Script returned expected success result
            alert(`Order placed successfully!\nOrder ID: ${result.orderId}`);
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
