document.addEventListener("DOMContentLoaded", function () {
    const contactsList = document.getElementById("contactsList");
    const addContactForm = document.getElementById("addContactForm");

    function displayContacts(contacts) {
        contactsList.innerHTML = "";
        contacts.forEach((contact) => {
            const contactDiv = document.createElement("div");
            contactDiv.classList.add("contact");
            contactDiv.innerHTML = `
                <h5>${contact.name}</h5>
                <p>${contact.phoneNumber}</p>
                <button class="edit-btn" data-id="${contact.id}">Редактировать</button>
                <button class="delete-btn" data-id="${contact.id}">Удалить</button>
            `;

            contactsList.appendChild(contactDiv);
        });
    }

    function loadContacts() {
        fetch("/api/contacts")
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.log(`Произошла ошибка ${response.status}.`);
                }
            })
            .then((data) => {
                if (data) {
                    displayContacts(data);
                }
            })
            .catch((error) => {
                console.error("Произошла ошибка при загрузке контактов:", error);
            });
    }

    loadContacts();

    addContactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const phoneNumber = document.getElementById("phoneNumber").value;

        fetch("/api/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, phoneNumber }),
        })
            .then((response) => response.json())
            .then((data) => {
                document.getElementById("name").value = "";
                document.getElementById("phoneNumber").value = "";
                loadContacts();
            });
    });

    contactsList.addEventListener("click", function (e) {
        if (e.target.classList.contains("edit-btn")) {
            const id = e.target.getAttribute("data-id");
            const contactDiv = e.target.parentElement;
            const name = contactDiv.querySelector("h5").textContent;
            const phoneNumber = contactDiv.querySelector("p").textContent;

            contactDiv.querySelector("h5").innerHTML = `<input type="text" value="${name}">`;
            contactDiv.querySelector("p").innerHTML = `<input type="text" value="${phoneNumber}">`;
            e.target.classList.remove("edit-btn");
            e.target.textContent = "Отправить";

            e.target.addEventListener("click", function () {
                const updatedName = contactDiv.querySelector("h5 input").value;
                const updatedPhoneNumber = contactDiv.querySelector("p input").value;

                fetch(`/api/contacts/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: updatedName, phoneNumber: updatedPhoneNumber }),
                })
                    .then(() => {
                        loadContacts(); // Обновление списка контактов
                    });
            });
        } else if (e.target.classList.contains("delete-btn")) {
            const id = e.target.getAttribute("data-id");

            fetch(`/api/contacts/${id}`, {
                method: "DELETE",
            })
                .then(() => {
                    loadContacts();
                });
        }
    });
});
