class HowItWorksProgression {
    constructor() {
        this.currentStep = 0;
        this.totalSteps = 3;
        this.progressDuration = 5000; // 5 seconds
        this.cards = document.querySelectorAll('.how-cards');
        this.images = document.querySelectorAll('.why-images img');
        this.progressBars = document.querySelectorAll('.progress-fill');
        this.init();
    }

    init() {
        // Start the progression
        this.startProgression();
    }

    startProgression() {
        this.activateStep(this.currentStep);
        this.animateProgress(this.currentStep);
    }

    activateStep(stepIndex) {
        // Update cards opacity - only the current step is 100%, all others are 40%
        this.cards.forEach((card, index) => {
            if (index === stepIndex) {
                card.classList.add('active');
                card.style.opacity = '1';
            } else {
                card.classList.remove('active');
                card.style.opacity = '0.4';
            }
        });

        // Update images
        this.images.forEach((image, index) => {
            if (index === stepIndex) {
                image.classList.add('active');
            } else {
                image.classList.remove('active');
            }
        });
    }

    animateProgress(stepIndex) {
        const progressBar = this.progressBars[stepIndex];
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / this.progressDuration, 1);

            progressBar.style.width = `${progress * 100}%`;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Progress complete, move to next step
                setTimeout(() => {
                    this.nextStep();
                }, 200);
            }
        };

        requestAnimationFrame(animate);
    }

    nextStep() {
        this.currentStep++;

        if (this.currentStep < this.totalSteps) {
            this.activateStep(this.currentStep);
            this.animateProgress(this.currentStep);
        } else {
            // All steps completed
            this.onComplete();
        }
    }

    onComplete() {
        // Keep only the last card at 100% opacity
        this.cards.forEach((card, index) => {
            if (index === this.totalSteps - 1) {
                card.style.opacity = '1';
                card.classList.add('active');
            } else {
                card.style.opacity = '0.4';
                card.classList.remove('active');
            }
        });

        // Optional: restart the cycle after a delay
        setTimeout(() => {
            this.restart();
        }, 3000);
    }

    restart() {
        this.currentStep = 0;

        // Reset all progress bars
        this.progressBars.forEach(bar => {
            bar.style.width = '0%';
        });

        // Reset cards
        this.cards.forEach((card, index) => {
            if (index === 0) {
                card.classList.add('active');
                card.style.opacity = '1';
            } else {
                card.classList.remove('active');
                card.style.opacity = '0.4';
            }
        });

        // Reset images
        this.images.forEach((image, index) => {
            if (index === 0) {
                image.classList.add('active');
            } else {
                image.classList.remove('active');
            }
        });

        // Start again
        setTimeout(() => {
            this.startProgression();
        }, 1000);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new HowItWorksProgression();
});