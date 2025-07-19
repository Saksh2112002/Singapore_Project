
  
  function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
  }

  
  const track = document.getElementById("slideTrack");
  const slides = document.querySelectorAll(".slide");
  const nav = document.getElementById("sliderNav");
  let current = 0;

  
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.classList.toggle("active", i === 0);
    dot.addEventListener("click", () => {
      current = i;
      updateSlider();
    });
    nav.appendChild(dot);
  });

  function updateSlider() {
    track.style.transform = `translateX(-${current * 100}%)`;
    document.querySelectorAll(".slider-nav button").forEach((btn, i) => {
      btn.classList.toggle("active", i === current);
    });
  }

  function autoSlide() {
    current = (current + 1) % slides.length;
    updateSlider();
  }

  setInterval(autoSlide, 5000); 



