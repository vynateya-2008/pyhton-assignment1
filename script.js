const menuBtn = document.getElementById("menuBtn");

const navLinks = document.getElementById("navLinks");

const scrollProgress = document.getElementById("scrollProgress");

const navItems = document.querySelectorAll(".nav-link");


// MOBILE NAVIGATION

menuBtn.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("active");

    menuBtn.setAttribute("aria-expanded", String(isOpen));

    menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

    menuBtn.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

});


// CLOSE MENU AFTER CLICKING LINKS

navItems.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.setAttribute("aria-label", "Open navigation");

        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';

    });

});


// SCROLL REVEAL ANIMATIONS

const revealElements = document.querySelectorAll(
    ".reveal, .skill-card"
);

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


if ("IntersectionObserver" in window && !reduceMotion) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("is-visible");

    });

}


// SCROLL PROGRESS BAR

function updateScrollUI() {

    const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollable > 0
        ? (window.scrollY / scrollable) * 100
        : 0;

    scrollProgress.style.width = `${progress}%`;


    // ACTIVE NAVIGATION SECTION

    let currentSection = "home";

    document.querySelectorAll("main section[id]").forEach(section => {

        if (window.scrollY >= section.offsetTop - 160) {

            currentSection = section.id;

        }

    });


    navItems.forEach(link => {

        const active =
            link.getAttribute("href") === `#${currentSection}`;

        link.classList.toggle("active", active);

    });

}


// SCROLL AND RESIZE EVENTS

window.addEventListener("scroll", updateScrollUI, {
    passive: true
});

window.addEventListener("resize", updateScrollUI);

updateScrollUI();
