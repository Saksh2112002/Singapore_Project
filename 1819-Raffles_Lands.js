function toggleFacts() {
      const box = document.getElementById("factsBox");
      const btn = document.querySelector(".toggle-facts");
      if (box.style.display === "block") {
        box.style.display = "none";
        btn.textContent = "Show Did You Know Facts";
      } else {
        box.style.display = "block";
        btn.textContent = "Hide Did You Know Facts";
      }
    }