const navbar = document.querySelector(".navbar");
const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
        navbar.classList.add("show");
        mobileMenu.classList.remove("show");
    } else {
        navbar.classList.remove("show");
    }
});

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        mobileMenu.classList.remove("show");
    }
});

const services = {

    cleaning: {
        image: "images/service1.jpg",
        title: "Teeth Cleaning",
        description: "Professional teeth cleaning removes plaque and tartar buildup while helping prevent gum disease, cavities, and bad breath.",
        benefits: [
            "Healthier gums",
            "Fresh breath",
            "Reduced plaque buildup"
        ]
    },

    whitening: {
        image: "images/service2.jpg",
        title: "Teeth Whitening",
        description: "Safe and effective whitening treatments designed to brighten stained or discolored teeth and enhance your smile.",
        benefits: [
            "Whiter teeth",
            "Boosted confidence",
            "Quick treatment results"
        ]
    },

    implant: {
        image: "images/service3.jpg",
        title: "Dental Implants",
        description: "Permanent tooth replacement solutions that restore appearance, comfort, and chewing functionality.",
        benefits: [
            "Natural appearance",
            "Long-lasting solution",
            "Improved chewing ability"
        ]
    },

    rootcanal: {
        image: "images/service4.jpg",
        title: "Root Canal",
        description: "Advanced treatment that removes infection and helps save natural teeth while relieving pain.",
        benefits: [
            "Preserves natural teeth",
            "Relieves pain",
            "Prevents further infection"
        ]
    },

    braces: {
        image: "images/service5.jpg",
        title: "Braces",
        description: "Modern braces treatment designed to improve teeth alignment, bite function, and smile appearance.",
        benefits: [
            "Straighter teeth",
            "Better bite alignment",
            "Enhanced smile confidence"
        ]
    },

    kids: {
        image: "images/service6.jpg",
        title: "Pediatric Dentistry",
        description: "Gentle and friendly dental care designed specifically for children and young patients.",
        benefits: [
            "Child-friendly environment",
            "Preventive dental care",
            "Healthy oral habits"
        ]
    }

};

const serviceCards = document.querySelectorAll(".service-card");
const modal = document.querySelector(".service-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalBenefits = document.getElementById("modal-benefits");
const closeModal = document.querySelector(".modal-close");

serviceCards.forEach(card => {

    card.addEventListener("click", () => {

        const service = services[card.dataset.service];
        modalImage.src = service.image;
        modalImage.alt = service.title;
        modalTitle.textContent = service.title;
        modalDescription.textContent = service.description;

        modalBenefits.innerHTML = service.benefits.map(item => `<li>${item}</li>`)
            .join("");
        modal.classList.add("show");
        document.body.style.overflow = "hidden";
    });

});

function closeServiceModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
}

closeModal.addEventListener("click", closeServiceModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeServiceModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (
        e.key === "Escape" &&
        modal.classList.contains("show")
    ) {
        closeServiceModal();
    }
});

// Doctors 
const teamFilters = document.querySelectorAll(".team-filter");
const dentistsGrid = document.querySelector(".dentists-grid");
const nursesGrid = document.querySelector(".nurses-grid");
const nurseToggleBtn = document.getElementById("nurse-toggle-btn");
const hiddenNurses = document.querySelectorAll(".hidden-nurse");
let nursesExpanded = false;

teamFilters.forEach(button => {
    button.addEventListener("click", () => {
        teamFilters.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");
        const target = button.dataset.target;

        dentistsGrid.classList.remove("active-team");
        nursesGrid.classList.remove("active-team");

        if (target === "dentists") {
            dentistsGrid.classList.add("active-team");
            teamToggle.style.display = "none";
            hiddenNurses.forEach(card => card.classList.remove("show"));
            nurseToggleBtn.textContent = "Show More";
            nursesExpanded = false;
        } else {
            nursesGrid.classList.add("active-team");
            teamToggle.style.display = "flex";
        }
    });
});

/* Show More */
const teamToggle =
    document.querySelector(".team-toggle");
nurseToggleBtn.addEventListener("click", () => {
    nursesExpanded = !nursesExpanded;
    hiddenNurses.forEach(card => card.classList.toggle("show"));
    nurseToggleBtn.textContent = nursesExpanded ? "Show Less" : "Show More";
});

/* Results Section */
const resultCards = document.querySelectorAll(".result-card");

resultCards.forEach(card => {
    const image = card.querySelector(".result-image");
    const badge = card.querySelector(".result-badge");
    const buttons = card.querySelectorAll(".result-btn");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");
            const isAfter = button.textContent.trim() === "After";
            image.classList.remove("slide-left", "slide-right");
            void image.offsetWidth;
            if (isAfter) {
                image.src = image.dataset.after;
                badge.textContent = "After";
                image.classList.add("slide-right");
            } else {
                image.src = image.dataset.before;
                badge.textContent = "Before";
                image.classList.add("slide-left");
            }
        });
    });
});

/* Review Section */
const testimonials = [
    {
        name: "Aung Aung",
        treatment: "Teeth Whitening Patient",
        review: "The dentists were professional and caring. My teeth whitening treatment exceeded expectations and the entire process was comfortable."
    }, {
        name: "Su Su",
        treatment: "Braces Treatment Patient",
        review: "The team explained every step clearly during my braces treatment. I am extremely happy with the results."
    }, {
        name: "Ko Ko",
        treatment: "Smile Makeover Patient",
        review: "From consultation to treatment, the service was excellent. The clinic is modern, clean, and welcoming."
    }, {
        name: "Mya Mya",
        treatment: "Dental Veneers Patient",
        review: "My smile makeover transformed my confidence. The staff were friendly and attentive throughout."
    }, {
        name: "Kyaw Kyaw",
        treatment: "General Dentistry Patient",
        review: "The environment was comfortable and relaxing. I highly recommend Moe Dental Clinic to anyone."
    }
];

const testimonialTrack = document.querySelector(".testimonial-track");
const prevBtn = document.getElementById("prev-testimonial");
const nextBtn = document.getElementById("next-testimonial");

let currentIndex = 0;

function getVisibleCount() {
    return window.innerWidth <= 768 ? 1 : 2;
}

function renderTestimonials() {
    testimonialTrack.innerHTML = "";
    const visibleCount = getVisibleCount();

    for (let i = 0; i < visibleCount; i++) {
        const testimonial = testimonials[(currentIndex + i) % testimonials.length];

        testimonialTrack.innerHTML += `
            <div class="testimonial-card">
                <div class="testimonial-quote">
                    "
                </div>

                <div class="testimonial-rating">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>

                <p class="testimonial-review">
                    "${testimonial.review}"
                </p>

                <div class="testimonial-footer">
                    <div class="testimonial-name">
                        ${testimonial.name}
                    </div>

                    <div class="testimonial-treatment">
                        ${testimonial.treatment}
                    </div>
                </div>
            </div>
        `;
    }
}

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    renderTestimonials();
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonials();
});

let testimonialInterval = setInterval(nextSlide, 5000);

function nextSlide() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    renderTestimonials();
}

const testimonialSection = document.querySelector(".testimonial-slider");
testimonialSection.addEventListener("mouseenter", () => clearInterval(testimonialInterval));
testimonialSection.addEventListener("mouseleave", () => {
    testimonialInterval = setInterval(nextSlide, 7000);
});

window.addEventListener("resize", renderTestimonials);
renderTestimonials();