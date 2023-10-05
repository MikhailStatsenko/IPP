const openedNoteTitle = document.getElementById("addNoteTitle");
const openedNoteContent = document.getElementById("addNoteContent");

let currentNoteId = null;

function openNote(url) {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Ошибка при загрузке заметок.");
    })
    .then((data) => {
      hideHomeInterface();

      noteDetails.style.display = "block";
      openedNoteTitle.innerHTML = data.title;
      openedNoteContent.value = data.content;
      currentNoteId = new URL(url).searchParams.get("id");
    })
    .catch((error) => {
      console.error(error);
    });
}

function goBack() {
  noteDetails.style.display = "none";
  showHomeInterface();
}

function saveNote() {
  const updatedContent = openedNoteContent.value;

  const updatedNote = {
    id: currentNoteId,
    title: openedNoteContent.value,
    content: updatedContent,
  };

  fetch(`/update-note?id=${currentNoteId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedNote),
  })
    .then(function (response) {
      if (response.ok) {
        displayNotification("Сохранено");
        console.log("Заметка успешно обновлена.");
      } else {
        displayNotification("Ошибка при обновлении заметки", "error");
        console.error("Ошибка при обновлении заметки.");
      }
    })
    .catch(function (error) {
      console.error("Произошла ошибка: " + error);
    });
}

function displayNotification(message, type = "success") {
  const notificationContainer = document.getElementById(
    "notificationContainer"
  );

  const notification = document.createElement("div");
  notification.classList.add("notification", type);
  notification.textContent = message;

  notificationContainer.insertBefore(
    notification,
    notificationContainer.firstChild
  );

  setTimeout(() => {
    notification.remove();
  }, 1500);
}
