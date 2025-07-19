
  
  function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('show');
  }


  const slider = document.querySelector(".slide-track");
  const dotsNav = document.querySelector(".slider-nav");
  const slides = document.querySelectorAll(".slide");
  let currentIndex = 0;

  // Create dots
  slides.forEach((_, idx) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    if (idx === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(idx));
    dotsNav.appendChild(dot);
  });

  const dots = document.querySelectorAll(".slider-nav button");

  function goToSlide(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;
    dots[currentIndex].classList.remove("active");
    dots[index].classList.add("active");
    currentIndex = index;
  }

  function autoSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
  }

  let auto = setInterval(autoSlide, 4000); // Change slide every 4s

  // Optional: Pause on hover
  document.querySelector(".slider").addEventListener("mouseenter", () => clearInterval(auto));
  document.querySelector(".slider").addEventListener("mouseleave", () => auto = setInterval(autoSlide, 4000));


