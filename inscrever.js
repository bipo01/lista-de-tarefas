const addUserForm = document.querySelector("#add-user-form");
const usuarioAddUser = document.querySelector("#usuario-add-user");

addUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const response = await fetch(
        `https://todolist-livid-rho.vercel.app/add-user?usuario=${usuarioAddUser.value}`
    );
    const data = await response.json();

    if (data === "Usuário já existe") {
        alert(data);
    } else if (data === "Usuário criado") {
        const html = ` <p>
            Ir para a lista de tarefas:
            <a href="./index.html">Lista de Tarefas</a>
        </p>`;
        document.body.insertAdjacentHTML("beforeend", html);
    }

    usuarioAddUser.value = "";
});
