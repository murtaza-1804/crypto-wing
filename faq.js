document.addEventListener("DOMContentLoaded", () => {
    const faqCards = document.querySelectorAll('.faq-card');

    faqCards.forEach(card => {
        const header = card.querySelector('.faq-header');
        const answer = card.querySelector('.b3');
        const plusIcon = card.querySelector('.plus-icon');
        const minusIcon = card.querySelector('.minus-icon');

        // Initially hide all answers, show plus icon, hide minus icon
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)';
        plusIcon.style.display = 'inline';
        minusIcon.style.display = 'none';

        header.addEventListener('click', () => {
            const isActive = answer.style.maxHeight && answer.style.maxHeight !== '0px';

            // Close all other open FAQ cards
            faqCards.forEach(otherCard => {
                const otherAnswer = otherCard.querySelector('.b3');
                const otherPlus = otherCard.querySelector('.plus-icon');
                const otherMinus = otherCard.querySelector('.minus-icon');
                if (otherCard !== card) {
                    otherAnswer.style.maxHeight = '0';
                    otherPlus.style.display = 'inline';
                    otherMinus.style.display = 'none';
                }
            });

            // Toggle current card
            if (!isActive) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                plusIcon.style.display = 'none';
                minusIcon.style.display = 'inline';
            } else {
                answer.style.maxHeight = '0';
                plusIcon.style.display = 'inline';
                minusIcon.style.display = 'none';
            }
        });
    });
});
