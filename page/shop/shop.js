function filterCategory() {
    const radios = document.querySelectorAll('input[name="category"]');
    const sections = document.querySelectorAll(".shop-item-section");

    radios.forEach((radio) => {
        radio.addEventListener("change", (e) => {
            const selectedCategory = e.target.value;

            sections.forEach((section) => {
                if (selectedCategory === "all-section" || section.id === selectedCategory) {
                    section.style.display = "block";
                } else {
                    section.style.display = "none";
                }
            });
        });
    });
}

function sortByPrice() {
    const sortItem = document.querySelectorAll(".filter-buttons");
    const itemsContainer = document.querySelector(".shop-items-container");
    sortItem.forEach((button) => {
        button.addEventListener("click", (e) => {
            const itemBtn = e.currentTarget;
            const listWrap = document.querySelector(".item-list-wrap");
            const listItems = Array.from(listWrap.querySelectorAll("li"));
            if(itemBtn.id === "low-to-high" || itemBtn.id === "high-to-low") {
                listItems.sort((a, b) => {
                    const priceA = parseFloat(a.dataset.price);
                    const priceB = parseFloat(b.dataset.price);
                    return itemBtn.id === "low-to-high" ? priceA - priceB : priceB - priceA;
                });
               
            } else if (itemBtn.id === "latest-to-oldest" || itemBtn.id === "oldest-to-latest") {
                listItems.sort((a, b) => {
                    const dateA = new Date(a.dataset.date).getTime();
                    const dateB = new Date(b.dataset.date).getTime();
                    return itemBtn.id === "latest-to-oldest" ? dateB - dateA : dateA - dateB;
                });
            } else if (itemBtn.id === "popular-to-least-popular" || itemBtn.id === "least-popular-to-popular") {
                listItems.sort((a, b) => {
                    const ratingA = parseFloat(a.dataset.rating);
                    const ratingB = parseFloat(b.dataset.rating);
                    return itemBtn.id === "popular-to-least-popular" ? ratingB - ratingA : ratingA - ratingB;
                });
            }
            listItems.forEach((item) => listWrap.appendChild(item));

        });
    });
}

