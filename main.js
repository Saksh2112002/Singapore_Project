"use strict";

document.addEventListener("DOMContentLoaded", () => {
  
  document.querySelector(".menu-icon")?.addEventListener("click", () => {
    document.getElementById("navLinks").classList.toggle("active");
  });

 
  (() => {
    const slider = document.querySelector(".testimonial-slider");
    if (!slider) return;

    const cards = [...document.querySelectorAll(".testimonial-card")];
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    let index = 0;
    const DELAY = 3000;
    let timer;

    const goTo = (i) => {
      const card = cards[i];
      if (!card) return;

      slider.scrollTo({
        left: card.offsetLeft - slider.offsetLeft,
        behavior: "smooth",
      });

      cards.forEach((c, n) => c.classList.toggle("active", n === i));
    };

    const next = () => {
      index = (index + 1) % cards.length;
      goTo(index);
    };

    const prev = () => {
      index = (index - 1 + cards.length) % cards.length;
      goTo(index);
    };

    prevBtn?.addEventListener("click", prev);
    nextBtn?.addEventListener("click", next);

    const startAuto = () => (timer = setInterval(next, DELAY));
    const stopAuto = () => clearInterval(timer);

    slider.addEventListener("mouseenter", stopAuto);
    slider.addEventListener("mouseleave", startAuto);

    goTo(index);
    startAuto();
  })();

  
  const qs = (sel) => document.querySelector(sel);
  const showErr = (el, box, msg) => {
    el.classList.add("invalid");
    box.textContent = msg;
    box.style.display = "block";
  };
  const clearErr = (el, box) => {
    el.classList.remove("invalid");
    box.style.display = "none";
  };

/* dropdowns   */
(function(){
  const MOBILE_MAX = 768;
  const dropdowns  = document.querySelectorAll('.dropdown');
  const nav        = document.querySelector('.nav-links');   

  
  const closeAll = () => dropdowns.forEach(d => d.classList.remove('open'));

  /*  open / close on tap  */
  dropdowns.forEach(dd => {
    const head = dd.querySelector('a');             

    /* 1. tap heading */
    head.addEventListener('click', e => {
      if (window.innerWidth > MOBILE_MAX) return;   
      e.preventDefault(); e.stopPropagation();

      const willOpen = !dd.classList.contains('open');
      closeAll();                                    
      if (willOpen) dd.classList.add('open');        
    });

    /* 2. tap any link *inside* the menu closes it */
    dd.querySelectorAll('.dropdown-menu a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= MOBILE_MAX) closeAll();
      });
    });
  });


  document.addEventListener('click', e => {
    if (window.innerWidth > MOBILE_MAX) return;
    if (!e.target.closest('.dropdown')) closeAll();
  });

 
  nav.addEventListener('click', e => {
    if (e.target.closest('.menu-icon')) closeAll();   
  });

 
  window.addEventListener('resize', () => {
    if (window.innerWidth > MOBILE_MAX) closeAll();
  });
})();


  /*  4. LOGIN MODAL  */
  (() => {
    const modal = qs("#loginModal");
    if (!modal) return;

    const openBtn = qs("#loginBtn");
    const closeBtn = qs("#closeModal");
    const form = qs("#loginForm");
    const email = qs("#email");
    const password = qs("#password");
    const eErr = qs("#emailErr");
    const pErr = qs("#pwdErr");
    const submit = qs("#loginBtnSubmit");
    const eyeIcon = qs("#togglePwd");

    const open = () => {
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    };

    const close = () => {
      modal.classList.remove("show");
      document.body.style.overflow = "";
    };

    openBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      open();
    });

    closeBtn?.addEventListener("click", close);
    window.addEventListener("click", (e) => {
      if (e.target === modal) close();
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });

    const validate = () => {
      let ok = true;

      if (!email.value.trim()) {
        showErr(email, eErr, "Please enter email.");
        ok = false;
      } else clearErr(email, eErr);

      const pw = password.value.trim();
      let msg = "";
      if (!pw) msg = "Please enter password.";
      else if (pw.length < 6) msg = "Min 6 characters.";
      else if (pw.length > 12) msg = "Max 12 characters.";

      if (msg) {
        showErr(password, pErr, msg);
        ok = false;
      } else clearErr(password, pErr);

      submit.disabled = !ok;
      return ok;
    };

    [email, password].forEach((input) =>
      input.addEventListener("input", validate)
    );

    eyeIcon?.addEventListener("click", () => {
      const isPwd = password.type === "password";
      password.type = isPwd ? "text" : "password";
      eyeIcon.className = isPwd ? "ri-eye-line" : "ri-eye-off-line";
    });

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate()) return;

      alert("Login successful!");
      form.reset();
      submit.disabled = true;
      close();
      localStorage.setItem("currentUser", email.value);
      qs("#logoutLink")?.style.setProperty("display", "block");
    });
  })();

  /*  5. SIGNUP MODAL  */
  (() => {
    const modal = qs("#signupModal");
    if (!modal) return;

    const openBtn = qs("#signupBtn");
    const closeBtn = qs("#closeSignup");
    const form = qs("#signupForm");
    const submit = qs("#signupBtnSubmit");
    const logout = qs("#logoutLink");

    const username = qs("#regUsername");
    const mobile = qs("#regMobile");
    const email = qs("#regEmail");
    const pwd = qs("#regPwd");
    const pwd2 = qs("#regPwd2");

    const uErr = qs("#regUsernameErr");
    const mErr = qs("#regMobileErr");
    const eErr = qs("#regEmailErr");
    const pErr = qs("#regPwdErr");
    const p2Err = qs("#regPwd2Err");

    const touched = new Set();

    const validateField = (field) => {
      const val = field.value.trim();
      let msg = "";

      switch (field.id) {
        case "regUsername":
          if (!val) msg = "Please enter username.";
          break;
        case "regMobile":
          if (!val) msg = "Enter mobile number.";
          else if (!/^\d{10}$/.test(val)) msg = "Enter valid 10-digit number.";
          break;
        case "regEmail":
          if (!val) msg = "Please enter email.";
          break;
        case "regPwd":
          if (!val) msg = "Enter password.";
          else if (val.length < 6) msg = "Min 6 characters.";
          else if (val.length > 12) msg = "Max 12 characters.";
          break;
        case "regPwd2":
          if (!val) msg = "Confirm password.";
          else if (val !== pwd.value.trim()) msg = "Passwords do not match.";
          break;
      }

      const errBox = {
        regUsername: uErr,
        regMobile: mErr,
        regEmail: eErr,
        regPwd: pErr,
        regPwd2: p2Err,
      }[field.id];

      if (msg) {
        showErr(field, errBox, msg);
        return false;
      } else {
        clearErr(field, errBox);
        return true;
      }
    };

    const validateForm = (force = false) => {
      const fields = [username, mobile, email, pwd, pwd2];
      let valid = true;

      fields.forEach((f) => {
        if (force || touched.has(f.id)) {
          if (!validateField(f)) valid = false;
        }
      });

      submit.disabled = !valid;
      return valid;
    };

    [username, mobile, email, pwd, pwd2].forEach((f) => {
      f.addEventListener("input", () => {
        touched.add(f.id);
        validateForm();
      });
      f.addEventListener("blur", () => {
        touched.add(f.id);
        validateForm();
      });
    });

    const open = () => {
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    };

    const close = () => {
      modal.classList.remove("show");
      document.body.style.overflow = "";
    };

    openBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      open();
    });

    closeBtn?.addEventListener("click", close);
    window.addEventListener("click", (e) => {
      if (e.target === modal) close();
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });

    /* SUBMIT SIGNUP */
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateForm(true)) return;

      alert("Signup successful!");
      localStorage.setItem("currentUser", username.value);
      logout.style.display = "block";
      form.reset();
      touched.clear();
      validateForm();
      close();
    });

    /* LOGOUT */
    logout?.addEventListener("click", (e) => {
      e.preventDefault();
      alert("You have been logged out.");
      localStorage.removeItem("currentUser");
      location.reload();
    });

   
    if (localStorage.getItem("currentUser")) {
      logout.style.display = "block";
    }
  })();
});
