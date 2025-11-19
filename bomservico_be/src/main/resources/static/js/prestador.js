// ==================== VERIFICAÇÃO DE ACESSO ====================
const nivel = JSON.parse(localStorage.getItem("nivel"));
const login = JSON.parse(localStorage.getItem("login"));
if (!login) {
    alert("Faça login novamente.");
    window.location.href = "login.html";
}
else if(nivel !== 1) { // Apenas prestadores (nível 1)
    alert("Apenas prestadores podem acessar esta página.");
    window.location.href = "index.html";
}


// ==================== CONFIGURAÇÃO DA API ====================
const API = "http://localhost:8080/apis/prestador/";

// ==================== CARREGAR PERFIL ====================
async function carregarPerfil() {
    try {
        const resp = await fetch(API + "perfil/" + usuario.login);
        if (!resp.ok) throw new Error("Erro ao buscar perfil");

        const dados = await resp.json();

        document.getElementById("login").value = dados.login;
        document.getElementById("nome").value = dados.nome;
        document.getElementById("cpf").value = dados.cpf;
        document.getElementById("dtNasc").value = dados.dtNasc;
        document.getElementById("email").value = dados.email;
        document.getElementById("telefone").value = dados.telefone;
        document.getElementById("endereco").value = dados.endereco;

    } catch (err) {
        console.error(err);
        alert("Não foi possível carregar o perfil.");
    }
}

carregarPerfil();

// ==================== SALVAR ALTERAÇÕES ====================
document.getElementById("formPerfil").addEventListener("submit", async (e) => {
    e.preventDefault();

    const atualizado = {
        login: usuario.login,
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        dtNasc: document.getElementById("dtNasc").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        endereco: document.getElementById("endereco").value,
        nivel: 1
    };

    try {
        const resp = await fetch(API, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(atualizado)
        });

        if (resp.ok) {
            alert("Perfil atualizado com sucesso!");
            localStorage.setItem("usuarioLogado", JSON.stringify(atualizado));
        } else {
            alert("Erro ao atualizar perfil.");
        }
    } catch (err) {
        console.error(err);
        alert("Erro de conexão ao atualizar perfil.");
    }
});

// ==================== CARREGAR MENSAGENS ====================
async function carregarMensagens() {
    try {
        const resp = await fetch(API + "mensagens/" + usuario.login);
        if (!resp.ok) throw new Error("Erro ao buscar mensagens");

        const mensagens = await resp.json();
        const lista = document.getElementById("listaMensagens");
        lista.innerHTML = "";

        if (mensagens.length === 0) {
            lista.innerHTML = "<li>Nenhuma mensagem recebida.</li>";
            return;
        }

        mensagens.forEach(m => {
            const li = document.createElement("li");

            li.style.listStyle = "none";
            li.style.border = "1px solid #ccc";
            li.style.margin = "10px 0";
            li.style.padding = "10px";
            li.style.borderRadius = "5px";

            li.innerHTML = `
                <strong>${m.int_nomeInteressado}</strong><br>
                <strong>Contato:</strong> ${m.int_telefone}<br><br>
                ${m.int_mensagem}<br><br>

                <button class="submit-btn" onclick="marcarLida(${m.int_id})">Marcar como lida</button>
                <button class="submit-btn" onclick="apagarMensagem(${m.int_id}, ${m.int_lida})">Apagar</button>
            `;

            if (m.int_lida) {
                li.style.background = "#e6ffe6"; // Mensagem lida em verde
            }

            lista.appendChild(li);
        });

    } catch (err) {
        console.error(err);
        alert("Não foi possível carregar as mensagens.");
    }
}

carregarMensagens();

// ==================== MARCAR MENSAGEM COMO LIDA ====================
async function marcarLida(id) {
    try {
        await fetch(API + "mensagem/marcar-lida/" + id, { method: "PUT" });
        carregarMensagens();
    } catch (err) {
        console.error(err);
        alert("Erro ao marcar mensagem como lida.");
    }
}

// ==================== APAGAR MENSAGEM (SOMENTE LIDA) ====================
async function apagarMensagem(id, lida) {
    if (!lida) {
        alert("Somente mensagens já lidas podem ser apagadas.");
        return;
    }

    if (!confirm("Deseja realmente apagar esta mensagem?")) return;

    try {
        await fetch(API + "mensagem/" + id, { method: "DELETE" });
        carregarMensagens();
    } catch (err) {
        console.error(err);
        alert("Erro ao apagar mensagem.");
    }
}

// ==================== MEUS ANÚNCIOS ====================
document.getElementById("btnMeusAnuncios").addEventListener("click", () => {
    window.location.href = "meusAnuncios.html";
});

// ==================== LOGOUT ====================
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("login");
    localStorage.removeItem("nivel");
    window.location.href = "../pages/index.html";
});
