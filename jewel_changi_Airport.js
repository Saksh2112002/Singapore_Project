
    function toggleMenu() {
      const navLinks = document.getElementById("navLinks");
      navLinks.classList.toggle("show");
    }

    (function() {
      const slider = document.querySelector('.slider');
      if (!slider) return;
      const track = slider.querySelector('.slide-track');
      const slides = Array.from(slider.querySelectorAll('.slide'));
      const nav = slider.querySelector('.slider-nav');
      let index = 0, auto;

      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => go(i, true));
        nav.appendChild(dot);
      });

      const dots = nav.querySelectorAll('button');

      function go(i, stopAuto) {
        index = (i + slides.length) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((d, di) => d.classList.toggle('active', di === index));
        if (stopAuto) {
          clearInterval(auto);
          startAuto();
        }
      }

      function next() { go(index + 1); }
      function startAuto() { auto = setInterval(next, 5000); }
      startAuto();

      let startX = 0, diff = 0;
      track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
      track.addEventListener('touchmove', e => { diff = e.touches[0].clientX - startX; }, { passive: true });
      track.addEventListener('touchend', () => {
        if (Math.abs(diff) > 50) {
          diff < 0 ? next() : go(index - 1);
        }
        diff = 0;
      });
    })();
