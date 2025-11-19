document.addEventListener("DOMContentLoaded", () => {
    // Recupera dados do localStorage
    const login = localStorage.getItem("login");
    const nivel = localStorage.getItem("nivel");
    const token = localStorage.getItem("token");

    // if (!login || !nivel || !token) {
    //     alert("Você precisa fazer login primeiro.");
    //     window.location.href = "login.html";
    //     return;
    // }

    if (nivel !== "1" && nivel !== 1) {
        alert("Apenas prestadores podem acessar esta página.");
        window.location.href = "index.html";
        return;
    }

    const usuario = { login, nivel };
    const API = "http://localhost:8080/apis/prestador/";

    // Função genérica de fetch com token
    async function fetchAPI(url, options = {}) {
        options.headers = {
            ...(options.headers || {}),
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        };
        const resp = await fetch(url, options);
        if (!resp.ok) throw new Error(`Erro na requisição: ${resp.status}`);
        return await resp.json();
    }

    // Carrega perfil do prestador
    async function carregarPerfil() {
        try {

            console.log("Usuario:", usuario);
            console.log("Login que estou enviando para API:", usuario?.login);

            const dados = await fetchAPI(API + "perfil/" + usuario.login);

            console.log("Dados recebidos da API:", dados);
            console.log("Dados recebidos da API (detalhado):", JSON.stringify(dados, null, 2));

            document.getElementById("login").value = dados.login || "";
            document.getElementById("nome").value = dados.nome || "";
            document.getElementById("cpf").value = dados.cpf || "";

            let dt = "";
            if (dados.dtNasc) {
                dt = dados.dtNasc.trim().substring(0, 10);
            }
            document.getElementById("dtNasc").value = dt;

            document.getElementById("email").value = dados.email || "";
            document.getElementById("telefone").value = dados.telefone || "";
            document.getElementById("endereco").value = dados.endereco || "";

        } catch (err) {
            alert("Não foi possível carregar o perfil. Veja o console.");
            console.error(err);
        }
    }


    // Atualiza perfil
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
            const result = await fetchAPI(API, {
                method: "PUT",
                body: JSON.stringify(atualizado)
            });
            alert("Perfil atualizado com sucesso!");
            console.log(result);
        } catch (err) {
            alert("Erro ao atualizar perfil. Veja o console.");
            console.error(err);
        }
    });

    // Carrega mensagens
    async function carregarMensagens() {
        try {
            const mensagens = await fetchAPI(API + "mensagens/" + usuario.login);
            const lista = document.getElementById("listaMensagens");
            lista.innerHTML = "";
            if (!mensagens || mensagens.length === 0) {
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
                if (m.lida) li.style.background = "#e6ffe6";
                li.innerHTML = `
                    <strong>${m.nomeInteressado}</strong><br>
                    <strong>Contato:</strong> ${m.telefone}<br><br>
                    ${m.mensagem}<br><br>
                    <button class="submit-btn" onclick="marcarLida(${m.id})">Marcar como lida</button>
                    <button class="submit-btn" onclick="apagarMensagem(${m.id}, ${m.lida})">Apagar</button>
                `;
                lista.appendChild(li);
            });
        } catch (err) {
            alert("Não foi possível carregar mensagens. Veja o console.");
            console.error(err);
        }
    }

    // Marcar mensagem como lida
    window.marcarLida = async function(id) {
        try {
            await fetchAPI(API + "mensagem/marcar-lida/" + id, { method: "PUT" });
            carregarMensagens();
        } catch (err) {
            alert("Erro ao marcar mensagem como lida.");
            console.error(err);
        }
    };

    // Apagar mensagem já lida
    window.apagarMensagem = async function(id, lida) {
        if (!lida) {
            alert("Somente mensagens já lidas podem ser apagadas.");
            return;
        }
        if (!confirm("Deseja realmente apagar esta mensagem?")) return;
        try {
            await fetchAPI(API + "mensagem/" + id, { method: "DELETE" });
            carregarMensagens();
        } catch (err) {
            alert("Erro ao apagar mensagem.");
            console.error(err);
        }
    };

    // Botão meus anúncios
    document.getElementById("btnMeusAnuncios").addEventListener("click", () => {
        window.location.href = "meusAnuncios.html";
    });

    // Logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("login");
        localStorage.removeItem("nivel");
        window.location.href = "../pages/index.html";
    });

    // Carrega dados
    carregarPerfil();
    carregarMensagens();
});
