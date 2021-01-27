const navLinks = document.querySelectorAll(".nav-link");
const jumpToPark = document.querySelector(".jump-to-park");

navLinks.forEach(link => {
  link.classList.add("hidden");
});

jumpToPark.classList.add("hidden");