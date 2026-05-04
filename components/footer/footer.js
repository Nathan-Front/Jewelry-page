function subscribe() {
    const scriptURL = "https://script.google.com/macros/s/AKfycbwm8k3mSFHtNzcpodXp6UQWqXAbt4oypaxsEHwLsO8UkXvrcCBYqKuXjRTThLTvLqtW/exec";
    const form = document.getElementById("subscribe-form");
    if (!form) {
        return; 
    }
    const loader = document.getElementById("loader");
    const btnText = document.getElementById("btn-text");
    const submitBtn = form.querySelector('button[type="submit"]');
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const subscribeForm = e.target;
        const emailInput = subscribeForm.querySelector("#subscribe-input");
        if (emailInput.value.trim() === "") {
            return;
        }

        //Select the honeypot value
        const honey = form.querySelector('input[name="_honey"]').value;
        //If 'honey' is NOT empty, it's a bot!
        if (honey) {
            console.log("Bot submission detected.");
            return; 
        }
        const validate = validateEmail(emailInput.value);
        if(!validate) {
            emailInput.classList.add("input-error");
            return;
        }
        const data = {
            email: emailInput.value
        }
        //Spinner and button state
        loader.classList.remove("hidden");
        btnText.innerText = "Sending...";   
        submitBtn.disabled = true;
        try {
            const response = await fetch(scriptURL, {
                method: "POST",
                body: JSON.stringify(data)
            });

            const result = await response.text();

            if (result === "Duplicate") {
                alert("Email already subscribed!");
            } else {
                alert("Thank you for subscribing!");
            }
            emailInput.classList.remove("input-error");
            emailInput.value = "";
        } catch (error) {
            alert("An error occurred. Please try again later.");
        } finally {
            loader.classList.add("hidden");    
            btnText.innerText = "Subscribe";    
            submitBtn.disabled = false;
        }
        
    });
}