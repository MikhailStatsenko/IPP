function showDeleteConfirmation(noteId) {
  const modal = document.getElementById("confirmationModal");
  modal.style.display = "block";

  const confirmDeleteButton = document.getElementById("confirmDeleteButton");
  const cancelDeleteButton = document.getElementById("cancelDeleteButton");

  confirmDeleteButton.addEventListener("click", function () {
    fetch(`/delete-note?id=${noteId}`, {
      method: "DELETE",
    })
      .then(function (response) {
        if (response.ok) {
          console.log("Заметка успешно удалена.");
          modal.style.display = "none";
          getAllNotes();
        } else {
          console.error("Ошибка при удалении заметки.");
        }
      })
      .catch(function (error) {
        console.error("Произошла ошибка: " + error);
      });
  });

  cancelDeleteButton.addEventListener("click", function () {
    modal.style.display = "none";
  });
}

window.addEventListener("click", function (event) {
  const modal = document.getElementById("confirmationModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

