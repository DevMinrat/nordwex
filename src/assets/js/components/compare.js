const compareSectTitle = document.querySelectorAll(
    ".compare-info__section-heading"
  ),
  compareSectContent = document.querySelectorAll(
    ".compare-info__section-content"
  );

if (compareSectTitle.length > 0) {
  for (let i = 0; i < compareSectTitle.length; i++) {
    compareSectContent[0].style.maxHeight = compareSectContent[0].scrollHeight + "px";
    compareSectTitle[0].classList.add("active");

    compareSectTitle[i].addEventListener("click", function () {
      this.classList.toggle("active");

      let panel = compareSectContent[i];

      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}
