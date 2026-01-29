document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".glass-section");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });
    sections.forEach(section => observer.observe(section));
    const counters = document.querySelectorAll(".rating-num");
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const update = () => {
            const increment = target / 80;
            if (count < target) {
                count += increment;
                counter.textContent = Math.floor(count);
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        };
        update();
    });
});
const serviceRows = document.querySelectorAll(".service-row");

serviceRows.forEach(row => {
    row.addEventListener("click", () => {

        serviceRows.forEach(r => r.classList.remove("active"));

        row.classList.add("active");
    });
});

const galleryItems = document.querySelectorAll(".fancy-gallery img");

galleryItems.forEach(img => {
    img.addEventListener("mouseenter", () => {
        img.style.opacity = "0.9";
    });

    img.addEventListener("mouseleave", () => {
        img.style.opacity = "1";
    });
});