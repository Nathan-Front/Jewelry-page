function toShopButton() {
    const toShopBtn = document.querySelectorAll(".to-shop-item");
    toShopBtn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const category = e.currentTarget.dataset.category;
            window.location.href = `shop.html#${category}-section`;
        })
    })
}


function customerMessage() {
    const scriptURL = "https://script.google.com/macros/s/AKfycbzPsUyYVER0EArOvD-gUo2xLnPWzkbm52mp37UPqEKbCheDTKKayV4aWlIe7aHaT5b_/exec";
    const userName = document.getElementById("name-input");
    const userMail = document.getElementById("mail-input");
    const userContact = document.getElementById("contact-input");
    const userMessage = document.getElementById("message-input");
    
    const form = document.getElementById("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        //Select the honeypot value
        const honey = form.querySelector('input[name="_honey"]').value;
        //If 'honey' is NOT empty, it's a bot!
        if (honey) {
            console.log("Bot submission detected.");
            return; 
        }
        const validate = validateEmail(userMail.value);
        if(!validate) {
            userMail.classList.add("input-error");
            return;
        }
        const data = {
            name: userName.value,
            email: userMail.value,
            contact: userContact.value,
            message: userMessage.value
        }
        try {
            fetch(scriptURL, {
                method: "POST",
                body: JSON.stringify(data)
            });
            alert("Thank you for your message!");
            userName.value = "";
            userMail.value = "";
            userContact.value = "";
            userMessage.value = "";
        } catch (error) {
            alert("An error occurred. Please try again later.");
        }
    })
}