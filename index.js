const toDoListContainer = document.querySelector(".to-do-list-container");
const toDoListUl = document.querySelector(".to-do-list");
const toDoListAdd = document.querySelector(".to-do-list-add");
const tarefa = document.querySelector("#tarefa");
const usuarioTarefa = document.querySelector("#usuario-tarefa");

const btnSairConta = document.querySelector("#sairConta");

const loginForm = document.querySelector("#login-form");
const usuarioLogin = document.querySelector("#usuario-login");

const saudacao = document.querySelector("#saudacao");

toDoListAdd.addEventListener("submit", async (e) => {
    e.preventDefault();

    const response = await fetch(
        `https://todolist-livid-rho.vercel.app/new?tarefa=${tarefa.value}&usuario=${usuarioTarefa.value}`
    );
    const data = await response.json();

    tarefa.value = "";

    getData();
});

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    localStorage.setItem("user", usuarioLogin.value);

    getData();
});

async function getData() {
    loginForm.classList.add("hidden");
    toDoListContainer.classList.remove("hidden");
    btnSairConta.classList.remove("hidden");
    usuarioTarefa.value = usuarioLogin.value;
    saudacao.textContent = `Olá, ${usuarioTarefa.value}!`;

    const response = await fetch(
        `https://todolist-livid-rho.vercel.app/login?usuario=${usuarioTarefa.value}`
    );
    const data = await response.json();

    toDoListUl.innerHTML = "";

    data.forEach((el) => {
        const html = `<li id-tarefa='${el.id}' class='tarefa'>${el.tarefa}</li>`;
        toDoListUl.insertAdjacentHTML("afterbegin", html);
    });

    document.querySelectorAll(".tarefa").forEach((el) => {
        el.addEventListener("click", () => {
            const idTarefa = el.getAttribute("id-tarefa");
            fetch(
                `https://todolist-livid-rho.vercel.app/delete?id=${idTarefa}`
            );
            el.remove();
        });
    });
}

function checarLocal() {
    if (localStorage.getItem("user")) {
        console.log(localStorage.getItem("user"));
        usuarioLogin.value = localStorage.getItem("user");
        console.log(usuarioLogin.value);
        getData();
    } else {
        loginForm.classList.remove("hidden");
        toDoListContainer.classList.add("hidden");
    }
}

btnSairConta.addEventListener("click", () => {
    localStorage.removeItem("user");
    checarLocal();
    btnSairConta.classList.add("hidden");
    usuarioLogin.value = "";
});

checarLocal();
