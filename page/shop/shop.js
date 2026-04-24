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
    const allSection = document.querySelectorAll(".shop-item-section");
    
    const originalOrder = new Map();
    allSection.forEach((section) => {
        const listWrap = section.querySelector(".item-list-wrap");
        if (listWrap) {
            originalOrder.set(section, Array.from(listWrap.querySelectorAll("li")));
        }
    });
    sortItem.forEach((button) => {
        button.addEventListener("click", (e) => {
            const itemBtn = e.currentTarget;
            allSection.forEach((section) => {
                const oldMsg = section.querySelector(".no-release-msg");
                if (oldMsg) oldMsg.remove();
                let itemsFound = 0;
                const listWrap = section.querySelector(".item-list-wrap");
                if (!listWrap) return;
                const listItems = Array.from(listWrap.querySelectorAll("li"));
                if (itemBtn.id === "reset-sort")  {
                    listItems.forEach(item => item.classList.remove("hidden"));
                    const original = originalOrder.get(section);
                    original.forEach((item) => listWrap.appendChild(item));
                    return;
                } else if(itemBtn.id === "low-to-high") {
                    listItems.sort((a, b) => {
                        const priceA = parseFloat(a.dataset.price);
                        const priceB = parseFloat(b.dataset.price);
                        return itemBtn.id === "low-to-high" ? priceA - priceB : priceB - priceA;
                    });
                
                } else if (itemBtn.id === "latest-to-oldest") {
                    listItems.sort((a, b) => {
                        const dateA = new Date(a.dataset.date).getTime();
                        const dateB = new Date(b.dataset.date).getTime();
                        return itemBtn.id === "latest-to-oldest" ? dateB - dateA : dateA - dateB;
                    });
                } else if (itemBtn.id === "popular-to-least-popular") {
                    listItems.sort((a, b) => {
                        const ratingA = parseFloat(a.dataset.rating);
                        const ratingB = parseFloat(b.dataset.rating);
                        return itemBtn.id === "popular-to-least-popular" ? ratingB - ratingA : ratingA - ratingB;
                    });
                } else if (itemBtn.id === "new-release") {
                    const today = new Date();
                    //Calculate the date 30 days ago
                    const oneMonthAgo = new Date();
                    oneMonthAgo.setDate(today.getDate() - 30);
                    listItems.forEach((item) => {
                        const itemDate = new Date(item.dataset.date);
                        if (itemDate >= oneMonthAgo && itemDate <= today) {
                            item.classList.remove("hidden");
                            itemsFound++;
                        } else {
                            item.classList.add("hidden");  
                        }
                    });
                    if (itemsFound === 0) {
                        const noReleaseMsg = document.createElement("p");
                        noReleaseMsg.classList.add("no-release-msg");
                        noReleaseMsg.textContent = "No new releases in the last 30 days.";
                        section.appendChild(noReleaseMsg);
                    }
                }
                listItems.forEach((item) => listWrap.appendChild(item));
            });
        });
    });
}

