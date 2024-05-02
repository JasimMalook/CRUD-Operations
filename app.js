function handleSubmit(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  const userData = {
    username: username,
    email: email,
    phone: phone,
  };

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const submitButton = document.getElementById("submit");

  const isEditMode = submitButton.innerText === "Update";
  if (isEditMode) {
    const index = parseInt(submitButton.dataset.index);

    users[index] = userData;

    localStorage.setItem("users", JSON.stringify(users));

    updateTableRow(userData, index);

    document.getElementById("form").reset();
    submitButton.innerText = "Submit";
  } else {
    users.push(userData);

    localStorage.setItem("users", JSON.stringify(users));

    addRowToTable(userData);

    document.getElementById("form").reset();
  }
}

function addRowToTable(userData) {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
        <td>${userData.username}</td>
        <td>${userData.email}</td>
        <td>${userData.phone}</td>
        <td>
            <button class="delete-btn" onclick="deleteUser(this)">Delete</button>
            <button class="edit-btn" onclick="editUser(this)">Edit</button>
        </td>
    `;

  document.getElementById("tbody").appendChild(newRow);
}

function editUser(editButton) {
  const row = editButton.closest("tr");
  const cells = row.querySelectorAll("td");

  document.getElementById("username").value = cells[0].innerText;
  document.getElementById("email").value = cells[1].innerText;
  document.getElementById("phone").value = cells[2].innerText;

  const submitButton = document.getElementById("submit");
  submitButton.innerText = "Update";
  submitButton.dataset.index = row.rowIndex - 1;
}

function deleteUser(deleteButton) {
  const row = deleteButton.closest("tr");
  const username = row.children[0].innerText;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  users = users.filter((user) => user.username !== username);

  localStorage.setItem("users", JSON.stringify(users));

  row.remove();
}

function updateTableRow(userData, index) {
  const row = document.getElementById("tbody").rows[index];
  const cells = row.cells;

  cells[0].innerText = userData.username;
  cells[1].innerText = userData.email;
  cells[2].innerText = userData.phone;
}

window.addEventListener("load", function () {
  const userDataJSON = localStorage.getItem("users");

  if (userDataJSON) {
    const users = JSON.parse(userDataJSON);
    users.forEach((user) => {
      addRowToTable(user);
    });
  }
});

document.getElementById("form").addEventListener("submit", handleSubmit);
