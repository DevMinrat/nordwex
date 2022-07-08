const dt = new DataTransfer(); // Permet de manipuler les fichiers de l'input file

$("#attachment-files").on("change", function (e) {
  for (var i = 0; i < this.files.length; i++) {
    let fileBloc = $("<li/>", { class: "attach__item" }),
      fileName = $("<span/>", {
        class: "attach__name",
        text: this.files.item(i).name,
      });
    let fileContent = $("<span/>", { class: "attach__item-content" });
    fileContent
      .append(
        '<span class="attach__folder"><svg><use href="#folder"></use></svg></span>'
      )
      .append(fileName)
      .append(
        '<span class="attach__delete"><svg><use href="#close-btn"></use></svg></span>'
      );
    fileBloc.append(fileContent);

    $("#filesList > #files-names").append(fileBloc);
  }
  for (let file of this.files) {
    dt.items.add(file);
  }
  this.files = dt.files;

  $("span.attach__delete").click(function () {
    let name = $(this).prev("span.attach__name").text();
    $(this).parent().parent().remove();
    for (let i = 0; i < dt.items.length; i++) {
      if (name === dt.items[i].getAsFile().name) {
        dt.items.remove(i);
        continue;
      }
    }
    document.getElementById("attachment-files").files = dt.files;
  });
});
