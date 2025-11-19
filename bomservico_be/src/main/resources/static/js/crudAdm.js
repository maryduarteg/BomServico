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


let anunciosExcluidos = [];
let categoriasExcluidas = [];
// JavaScript Document

        // Mobile menu functionality
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close mobile menu when clicking on links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Enhanced Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Staggered animation for portfolio items
        const portfolioObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.portfolio-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.1 });

        // Observe all animation elements
        document.addEventListener('DOMContentLoaded', () => {
            const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
            animatedElements.forEach(el => observer.observe(el));

            const portfolioSection = document.querySelector('.portfolio-grid');
            if (portfolioSection) {
                portfolioObserver.observe(portfolioSection);
            }
        });



        // Add subtle hover effects to skill tags
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'translateY(-2px) scale(1.05)';
            });

            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Keyboard navigation for accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        const btnAnuncio = document.getElementById("btn-anuncios");
        const btnCategorias = document.getElementById("btn-categorias");
        const tabelaAnuncios = document.getElementById("tabela-anuncios");
        const tabelaCategorias = document.getElementById("tabela-categorias");
        const btnApagar = document.getElementById("btn-apagar-anuncios");
        const btnApagarCat = document.getElementById("btn-apagar-categorias");
        const btnCriarCat = document.getElementById("btn-criar-categorias");
        const btnCadastrar = document.getElementById("btn-cadastrar");


btnApagar.addEventListener("click",()=>{
            if(anunciosExcluidos.length !== 0)
                excluirAnuncios();
            else
                alert("Nenhum anúncio selecionado");
        });

        btnApagarCat.addEventListener("click",()=>{
            if(categoriasExcluidas.length !== 0)
                excluirCategorias();
            else
                alert("Nenhuma categoria selecionado");
        });

        //lógica para excluir anuncios

        btnAnuncio.addEventListener("click",()=>{
            tabelaAnuncios.classList.remove("d-none");
            let body = document.getElementById("anuncios-resultado");
            btnApagar.classList.remove("d-none");
            body.innerHTML = "";
            fetch("http://localhost:8080/public/anuncio/get-filter")
                .then(resp => {
                    if (!resp.ok) throw new Error("Erro HTTP: " + resp.status);
                    return resp.json();
                })
                .then(data => {
                    console.log(data);
                    Array.from(data).forEach(function(a)
                    {
                        let linha = document.createElement("tr");
                        let check = document.createElement("input");
                        check.type = "checkbox";
                        check.dataset.id = a.id;

                        // adiciona/remover ID da lista de exclusão
                        check.addEventListener("change", () => {
                            const idNum = parseInt(check.dataset.id);
                            if (check.checked) {
                                if (!anunciosExcluidos.includes(idNum))
                                    anunciosExcluidos.push(idNum);
                            } else {
                                anunciosExcluidos = anunciosExcluidos.filter(x => x !== idNum);
                            }
                            console.log("Anuncios selecionados pra excluir:", anunciosExcluidos);
                        });

                        linha.innerHTML = `
                        <td>${a.usuario.nome}</td>
                        <td>${a.titulo}</td>
                        <td>${a.descr}</td>
                        <td>${a.diasTrab}</td>
                        <td>${a.horarioInicioDia} às ${a.horarioFimDia}</td>
                        `;

                        // cria a célula do checkbox
                        let tdCheck = document.createElement("td");
                        tdCheck.appendChild(check);

                        // adiciona a célula na linha
                        linha.appendChild(tdCheck);

                        body.appendChild(linha);
                    });

                })
                .catch(err => console.error("Erro ao carregar anúncios:", err));
        });

        function excluirAnuncios()
        {
            anunciosExcluidos.forEach(i => {
                fetch(`http://localhost:8080/apis/adm/anuncio/${i}`, { method: "DELETE" })
                    .then(response => {
                        console.log("Status:", response.status);
                        if (!response.ok) throw new Error("Erro HTTP " + response.status);
                        return response.text(); // ou response.json() se o backend devolver JSON
                    })
                    .then(data => console.log("Resposta:", data))
                    .catch(err => console.error("Erro ao excluir:", err));

            });
            alert("Anúncios atualizadas!");
        }

        function excluirCategorias()
        {
            categoriasExcluidas.forEach(i => {
                fetch(`http://localhost:8080/apis/adm/cat/${i}`, { method: "DELETE" })
                    .then(response => {
                        console.log("Status:", response.status);
                        if (!response.ok) throw new Error("Erro HTTP " + response.status);
                        return response.text(); // ou response.json() se o backend devolver JSON
                    })
                    .then(data => console.log("Resposta:", data))
                    .catch(err => console.error("Erro ao excluir:", err));

            });
            alert("Categorias atualizadas!");
        }
document.getElementById("search-bar").addEventListener("keyup",()=>{
    let body = document.getElementById("categorias-resultado");
    body.innerHTML = "";
    fetch("http://localhost:8080/apis/get-all-cat")
        .then(resp => {
            if (!resp.ok) throw new Error("Erro HTTP: " + resp.status);
            return resp.json();
        })
        .then(data => {
            console.log(data);
            Array.from(data).forEach(function(cat)
            {
                if(cat.nome.toLowerCase().includes(document.getElementById("inputGroupFile04").value.toLowerCase()))
                {
                    let linha = document.createElement("tr");
                    let check = document.createElement("input");
                    check.type = "checkbox";
                    check.dataset.id = cat.id;

                    // adiciona/remover ID da lista de exclusão
                    check.addEventListener("change", () => {
                        const idNum = parseInt(check.dataset.id);
                        if (check.checked) {
                            if (!categoriasExcluidas.includes(idNum))
                                categoriasExcluidas.push(idNum);
                        } else {
                            categoriasExcluidas = categoriasExcluidas.filter(x => x !== idNum);
                        }
                        console.log("Anuncios selecionados pra excluir:", categoriasExcluidas);
                    });

                    linha.innerHTML = `
                            <td>${cat.id}</td>
                            <td>${cat.nome}</td>
                            `;

                    let tdEdit= document.createElement("td");
                    tdEdit.appendChild(createBotaoEditar(cat.id, cat.nome));
                    linha.appendChild(tdEdit);
                    // cria a célula do checkbox
                    let tdCheck = document.createElement("td");
                    tdCheck.appendChild(check);

                    // adiciona a célula na linha
                    linha.appendChild(tdCheck);

                    body.appendChild(linha);

                    let botoesEditar = document.getElementsByClassName("btn-editar");
                    Array.from(botoesEditar).forEach(e => {
                        e.addEventListener("click", function() {
                            carregarEdicao(e.dataset.id, e.dataset.nome);

                        });
                    });
                }
            });

        })
        .catch(err => console.error("Erro ao carregar categorias:", err));

});
btnCategorias.addEventListener("click",()=>{
    tabelaCategorias.classList.remove("d-none");
    btnApagarCat.classList.remove("d-none");
    btnCriarCat.classList.remove("d-none");
    document.getElementById("search-bar").classList.remove("d-none");
    let body = document.getElementById("categorias-resultado");
    body.innerHTML = "";
    fetch("http://localhost:8080/apis/get-all-cat")
        .then(resp => {
            if (!resp.ok) throw new Error("Erro HTTP: " + resp.status);
            return resp.json();
        })
        .then(data => {
            console.log(data);
            Array.from(data).forEach(function(cat)
            {
                let linha = document.createElement("tr");
                let check = document.createElement("input");
                check.type = "checkbox";
                check.dataset.id = cat.id;

                // adiciona/remover ID da lista de exclusão
                check.addEventListener("change", () => {
                    const idNum = parseInt(check.dataset.id);
                    if (check.checked) {
                        if (!categoriasExcluidas.includes(idNum))
                            categoriasExcluidas.push(idNum);
                    } else {
                        categoriasExcluidas = categoriasExcluidas.filter(x => x !== idNum);
                    }
                    console.log("Anuncios selecionados pra excluir:", categoriasExcluidas);
                });

                linha.innerHTML = `
                        <td>${cat.id}</td>
                        <td>${cat.nome}</td>
                        `;

                let tdEdit= document.createElement("td");
                tdEdit.appendChild(createBotaoEditar(cat.id, cat.nome));
                linha.appendChild(tdEdit);
                // cria a célula do checkbox
                let tdCheck = document.createElement("td");
                tdCheck.appendChild(check);

                // adiciona a célula na linha
                linha.appendChild(tdCheck);
                body.appendChild(linha);

                let botoesEditar = document.getElementsByClassName("btn-editar");
                Array.from(botoesEditar).forEach(e => {
                    e.addEventListener("click", function() {
                        carregarEdicao(e.dataset.id, e.dataset.nome);

                    });
                });

            });

        })
        .catch(err => console.error("Erro ao carregar categorias:", err));
});

function createBotaoEditar(id, nome) {
    let botao = document.createElement("button");
    let info = document.createElement("i");

    botao.dataset.id = id;
    botao.dataset.nome = nome;


    // classe do botão
    botao.classList.add("btn-editar");

    // ícone (Font Awesome)
    info.classList.add("fas", "fa-edit");

    botao.appendChild(info);
    return botao;
}
btnCriarCat.addEventListener("click",()=>
{
    let form = document.getElementById("criarCat");
    form.classList.remove("d-none");
});

btnCadastrar.addEventListener("click",()=>{
    let valor = document.getElementById("novonome").value;
    if(valor === "")
    {
        alert("Categoria vazia");
        return;
    }
    const categoria = {
        nome: document.getElementById("novonome").value
    };

    //console.log("JSON enviado:", aluno);

    fetch("http://localhost:8080/apis/adm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoria)
    })
        .then(resp => {
            console.log("Status:", resp.status);
            alert("Categoria cadastrada com sucesso");
            return resp.text();
        })
        .then(text => {console.log("Resposta:", text); })
        .catch(err => {console.error("Erro:", err); alert("Erro ao cadastrar aluno")});
    document.getElementById("novonome").value = "";
});

function carregarEdicao(id, nome)
{
    let form = document.getElementById("form-editar-categoria");
    form.classList.remove("d-none");
    document.getElementById("idcat").value = id;
    document.getElementById("nome").value =  nome;
}


const btnAtualizar = document.getElementById("btn-atualizar");
btnAtualizar.addEventListener("click",()=>{
    let id = document.getElementById("idcat").value;
    let nome = document.getElementById("nome").value;
    if(id === "" || nome === "")
    {
        console.log("Campos indefinidos");
        return;
    }

    const categoria = {
        id: id,
        nome: nome
    };

    fetch("http://localhost:8080/apis/adm", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoria)
    })
        .then(resp => {
            console.log("Status:", resp.status);
            alert("Categoria atualizada com sucesso");
            return resp.text();
        })
        .then(text => {console.log("Resposta:", text); })
        .catch(err => {console.error("Erro:", err); alert("Erro ao atualizar categoria")});
});

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("login");
    localStorage.removeItem("nivel");
    window.location.href = "../pages/index.html";
});

