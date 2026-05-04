//From country API
/*
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
}*/

async function summary() {
    const script = "https://script.google.com/macros/s/AKfycbyi50iPRPKgFo3HANPpG6ZyybdNWaeIjYeli7ZNOf6h4RgX4Z1ZLFVfDu23jpLVANCW/exec";
    const contact = document.getElementById("contact").value;
    const address = document.getElementById("address").value;
    const address2 = document.getElementById("address2").value;
    const formInput = {
        contact: contact,
        address1: address,
        address2: address2
    }
    try {
        const res = await fetch(script, {
            method: "POST",
            body: JSON.stringify(formInput)
        });
        if (!res.ok) throw new Error("Request Failed"); //checks internet/server response status >= 200 and < 300
        const result = await res.json();
        if (!result.success) throw new Error("Apps Script failed"); //checks the Apps Script returned expected success result

        sessionStorage.removeItem("cartItem");
        window.location.href = "shop.html";
        displayCartCount();
        cartContent();
    } catch (error) {
        alert("An error occurred. Please try again later.");
    } finally {
        contact = "";
        address = "";
        address2 = "";
    }
}