const header = document.getElementById("header");
const noteList = document.getElementById("noteList");
const noteForm = document.getElementById("noteForm");
const mainHeader = document.getElementById("mainHeader");
const toggleFormButton = document.getElementById("toggleFormButton");

function hideHomeInterface() {
  header.style.display = "none";
  noteList.style.display = "none";
  noteForm.style.display = "none";
  mainHeader.style.display = "none";
}

function showHomeInterface() {
  header.style.display = "flex";
  noteList.style.display = "block";
  mainHeader.style.display = "block";
  noteForm.style.display = "block";
}

function getAllNotes() {
  fetch("/notes")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Ошибка при загрузке заметок.");
    })
    .then((data) => {
      console.log(data);
      noteList.innerHTML = "";

      data.forEach((note) => {
        addNoteToPage(note);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

function addNoteToPage(note) {
  const listItem = document.createElement("li");

  const link = document.createElement("a");
  link.href = `/note?id=${note.id}`;
  link.textContent = note.title;

  link.addEventListener("click", function (event) {
    event.preventDefault();
    openNote(link.href);
  });

  const deleteButton = document.createElement("img");
  deleteButton.className = "delete-button";
  deleteButton.src = "trash-bin.png";

  deleteButton.addEventListener("click", function (event) {
    event.stopPropagation();
    showDeleteConfirmation(note.id);
  });

  listItem.appendChild(link);
  listItem.appendChild(deleteButton);
  noteList.appendChild(listItem);
}

getAllNotes();

