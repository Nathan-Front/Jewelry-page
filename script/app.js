
function updatePayPalState() {
    const contact = document.getElementById("contact").value;
    const address = document.getElementById("address").value;
    const address2 = document.getElementById("address2").value;

    const isValid =
        contact.trim() !== "" &&
        address.trim() !== "" &&
        address2.trim() !== "";

    const container = document.querySelector("#paypal-button-container");

    if (container) {
        container.style.pointerEvents = isValid ? "auto" : "none";
        container.style.opacity = isValid ? "1" : "0.5";
    }
}
function initCheckoutPage() {
    const contact = document.getElementById("contact");
    const address = document.getElementById("address");
    const address2 = document.getElementById("address2");
    if (!contact || !address || !address2) {
        console.warn("Checkout elements not ready yet");
        return;
    }
    contact.addEventListener("input", updatePayPalState);
    address.addEventListener("input", updatePayPalState);
    address2.addEventListener("input", updatePayPalState);

    updatePayPalState();
    initPaypalButtons();
}
function initPaypalButtons() {
   
    const container = document.querySelector("#paypal-button-container");

   if (!container) {
      console.log("container not found");
      return;
   }
    container.innerHTML = "";
   
   window.paypal.Buttons({
      style: {
         shape: "rect",
         layout: "vertical",
         color: "gold",
         label: "paypal"
      },
      onClick: (data, actions) => {
         const contact = document.getElementById("contact").value;
         const address = document.getElementById("address").value;
         const address2 = document.getElementById("address2").value;
           
         if (!contact.trim() || !address.trim() || !address2.trim()) {
             alert("Please fill the form first");
             return actions.reject();
         }
      
         return actions.resolve();
      },
      async createOrder() {
        
         const cartItem = JSON.parse(sessionStorage.getItem("cartItem")) || [];
         const response = await fetch("http://localhost:8080/api/orders", {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
                //orderRef: "LUM-" + Date.now(),
                cart:cartItem.map(item => ({
                    id: item.name.toLowerCase().replace(/\s+/g, "-"),
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                }))
            })
         });
         const data = await response.json();
        return data.id;
      },

      async onApprove(data) {
        
         const response = await fetch(
            `http://localhost:8080/api/orders/${data.orderID}/capture`,
            { method: "POST" }
         );

         const cart = JSON.parse(sessionStorage.getItem("cartItem")) || [];
         const captureData = await response.json();
         
         if (captureData.paypal.status === "COMPLETED") {
            
            setTimeout(() => {
               alert(
                  `Your order for ${cart
                  .map(item => `${item.name} ${item.quantity}${item.quantity > 1 ? ` items`:` item`}`)
                  .join(", ")} has been accepted.\nOrder ID: ${captureData.orderId.orderId}`
               );
            }, 500);

            summary();
         }
         //console.log(await response.json());
         console.log(captureData);
      }
      
   }).render("#paypal-button-container");
   
}