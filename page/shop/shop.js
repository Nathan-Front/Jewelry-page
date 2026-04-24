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

