const noteTitle = document.getElementById("noteTitle");

noteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  var note = {
    title: noteTitle.value,
    content: "",
  };

  fetch("/add-note", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  })
    .then(function (response) {
      if (response.ok) {
        console.log("Заметка успешно отправлена.");
        noteTitle.value = "";
        getAllNotes();
      } else {
        console.error("Ошибка при отправке заметки на сервер.");
      }
    })
    .catch(function (error) {
      console.error("Произошла ошибка: " + error);
    });
});

