// NAVIGATION

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");


if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.classList.toggle("active", isOpen);

  });


  navLinks.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("open");

      menuToggle.classList.remove("active");

      menuToggle.setAttribute("aria-expanded", "false");

      menuToggle.setAttribute(
        "aria-label",
        "Open navigation"
      );

    });

  });

}



// SCROLL REVEAL ANIMATIONS

const revealItems = document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

  const observer = new IntersectionObserver(

    (entries, currentObserver) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("is-visible");

          currentObserver.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.12
    }

  );


  revealItems.forEach((item) => {

    observer.observe(item);

  });

} else {

  revealItems.forEach((item) => {

    item.classList.add("is-visible");

  });

}



// AUTOMATIC FOOTER YEAR

const year = document.getElementById("year");

if (year) {

  year.textContent = new Date().getFullYear();

}
