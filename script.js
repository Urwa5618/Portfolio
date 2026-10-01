const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

hamburger.addEventListener("click", function () {

    navLinks.classList.toggle("nav-active");
    hamburger.classList.toggle("active");

});


navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        navLinks.classList.remove("nav-active");
        hamburger.classList.remove("active");

    });

});


const themeToggle = document.querySelector(".theme-toggle");

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {

        themeToggle.textContent = "☀️";
        localStorage.setItem("theme", "light");

    } else {

        themeToggle.textContent = "🌙";
        localStorage.setItem("theme", "dark");

    }

});


const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light-mode");
    themeToggle.textContent = "☀️";

} else {

    document.body.classList.remove("light-mode");
    themeToggle.textContent = "🌙";

}


const projectFilters = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

projectFilters.forEach(function (button) {

    button.addEventListener("click", function () {

        projectFilters.forEach(function (btn) {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const filter = button.getAttribute("data-filter");

        projects.forEach(function (project) {

            const category = project.getAttribute("data-category");

            if (filter === "all" || category === filter) {

                project.style.display = "block";

            } else {

                project.style.display = "none";

            }

        });

    });

});


const sections = document.querySelectorAll("section");
const navigationLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navigationLinks.forEach(function (link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {

            link.classList.add("active");

        }

    });

});


const animatedElements = document.querySelectorAll(
    ".section-heading, .about-container, .skill-category, .project-card, .timeline-item, .certificate-card, .contact-container"
);

const observer = new IntersectionObserver(

    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {
        threshold: 0.15
    }

);


animatedElements.forEach(function (element) {

    observer.observe(element);

});


const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const formData = new FormData(contactForm);

    try {

        const response = await fetch(
            "https://api.web3forms.com/submit",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        if (data.success) {

            alert("Message sent successfully!");

            contactForm.reset();

        } else {

            alert("Something went wrong. Please try again.");

        }

    } catch (error) {

        alert("Unable to send message. Please try again.");

    }

});