// contacts page

const contactsSectTitle = document.querySelectorAll(".contacts-req__heading"),
  contactsSectContent = document.querySelectorAll(".contacts-req__inner");

if (contactsSectTitle.length > 0) {
  for (let i = 0; i < contactsSectTitle.length; i++) {
    contactsSectTitle[i].addEventListener("click", function () {
      this.classList.toggle("active");

      let panel = contactsSectContent[i];

      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}
