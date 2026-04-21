function FAQ() {
    const faqParent = document.querySelector("#faq");
    faqParent.addEventListener("click", (e) => {
        const btn = e.target.closest(".faq-button");
        if (!btn) return;
        const currentAnswer = btn.nextElementSibling;
        const allAnswers = faqParent.querySelectorAll(".faq-answer");
        allAnswers.forEach((answer) => {
            if (answer === currentAnswer) {
                if (answer.style.maxHeight) {
                    answer.style.maxHeight = null;
                } else {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
}
