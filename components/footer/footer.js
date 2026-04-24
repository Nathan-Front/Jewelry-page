function subscribe() {
    const scriptURL = "https://script.google.com/macros/s/AKfycbxYFem8jewuv1ApcRQfBYPDYQIaZePy6WA_8icUmQll-FLd_ukD61-OrX7m5sS_D5eR/exec";
    const form = document.getElementById("subscribe-form");
    if (!form) {
        return; 
    }
    const emailInput = document.getElementById("subscribe-input");
    const loader = document.getElementById("loader");
    const btnText = document.getElementById("btn-text");
    const submitBtn = form.querySelector('button[type="submit"]');
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (emailInput.value.trim() === "") {
            return;
        }
        //Spinner and button state
        loader.classList.remove("hidden");
        btnText.innerText = "Checking...";   
        submitBtn.disabled = true;

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