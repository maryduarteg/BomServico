// API Base URL
const API_URL = 'http://localhost:8080/public/anuncio';
const IMAGE_API_URL = 'http://localhost:8080/apis/image';

// Variável para controlar modo de edição
let modoEdicao = false;
let anuncioEditando = null;

// Verificar autenticação e nível de acesso ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    verificarAutenticacao();
    configurarEventos();
    carregarAnuncios();
});

function verificarAutenticacao() {
    const login = localStorage.getItem('login');
    const nivel = localStorage.getItem('nivel');
    const token = localStorage.getItem('token');

    if (!login || !token) {
        window.location.href = 'login.html';
        return;
    }

    if (nivel !== '1') {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('user-info').textContent = `Bem-vindo, ${login}!`;
    document.getElementById('usu_login').value = login;
}

// Configurar eventos
function configurarEventos() {
    // Logout
    const linkLogout = document.getElementById('link-logout');
    if (linkLogout) {
        linkLogout.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }

    const linkLogoutMobile = document.getElementById('link-logout-mobile');
    if (linkLogoutMobile) {
        linkLogoutMobile.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }

    // Submit do formulário
    const anuncioForm = document.getElementById('anuncio-form');
    if (anuncioForm) {
        anuncioForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (modoEdicao) {
                alterarAnuncio();
            } else {
                cadastrarAnuncio();
            }
        });
    }

    // Botão cancelar
    const btnCancelar = document.getElementById('btn-cancelar');
    if (btnCancelar) {
        btnCancelar.addEventListener('click', function() {
            cancelarEdicao();
        });
    }
}

// Logout
function logout() {
    localStorage.removeItem('login');
    localStorage.removeItem('nivel');
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

// Cadastrar novo anúncio
async function cadastrarAnuncio() {
    const form = document.getElementById('anuncio-form');
    const btnSalvar = document.getElementById('btn-salvar');

    const loginUsuario = localStorage.getItem('login');

    if (!loginUsuario) {
        window.location.href = 'login.html';
        return;
    }

    btnSalvar.disabled = true;
    btnSalvar.textContent = 'Cadastrando...';

    try {
        const anuncioData = {
            usuario: { login: loginUsuario },

            titulo: document.getElementById('anu_titulo').value,
            descr: document.getElementById('anu_descricao').value,
            diasTrab: document.getElementById('anu_diastrabalho').value,
            horarioInicioDia: document.getElementById('anu_horarioinicio').value,
            horarioFimDia: document.getElementById('anu_horariofim').value
        };

        console.log("Enviando JSON:", JSON.stringify(anuncioData));

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(anuncioData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Erro ao cadastrar anúncio');
        }

        const anuncioCriado = await response.json();

        if (anuncioCriado && anuncioCriado.id) {
            await uploadFotos(anuncioCriado.id);
        }

        form.reset();

        document.getElementById('usu_login').value = localStorage.getItem('login');
        carregarAnuncios();

    } catch (error) {
        console.error('Erro:', error);
    } finally {
        btnSalvar.disabled = false;
        btnSalvar.textContent = 'Cadastrar Anúncio';
    }
}

// Alterar anúncio existente
async function alterarAnuncio() {
    const btnSalvar = document.getElementById('btn-salvar');
    const loginUsuario = localStorage.getItem('login');

    btnSalvar.disabled = true;
    btnSalvar.textContent = 'Salvando...';

    try {
        const anuncioData = {
            id: parseInt(document.getElementById('anu_id').value),
            usuario: { login: loginUsuario },
            titulo: document.getElementById('anu_titulo').value,
            descr: document.getElementById('anu_descricao').value,
            diasTrab: document.getElementById('anu_diastrabalho').value,
            horarioInicioDia: document.getElementById('anu_horarioinicio').value,
            horarioFimDia: document.getElementById('anu_horariofim').value
        };

        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(anuncioData)
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(errText || 'Erro ao alterar anúncio');
        }

        await uploadFotos(anuncioData.id);

        cancelarEdicao();
        carregarAnuncios();

    } catch (error) {
        console.error('Erro:', error);
    } finally {
        btnSalvar.disabled = false;
    }
}

// Upload de fotos
async function uploadFotos(anuncioId) {
    const inputsArquivos = [
        document.getElementById('arqimg1'),
        document.getElementById('arqimg2'),
        document.getElementById('arqimg3')
    ];

    const arquivosParaEnviar = inputsArquivos
        .filter(input => input && input.files.length > 0)
        .map(input => input.files[0]);

    console.log(`Iniciando upload de ${arquivosParaEnviar.length} fotos para o ID: ${anuncioId}`);

    for (let i = 0; i < arquivosParaEnviar.length; i++) {
        const arquivo = arquivosParaEnviar[i];
        const formData = new FormData();

        formData.append('foto', arquivo);
        formData.append('anuncioId', anuncioId);

        try {
            const response = await fetch('http://localhost:8080/apis/image/add-anuncio-foto', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const erroTexto = await response.text();
                console.error(`Erro no upload da foto ${i + 1}:`, erroTexto);
            } else {
                console.log(`Foto ${i + 1} enviada com sucesso.`);
            }

        } catch (error) {
            console.error(`Erro de rede na foto ${i + 1}:`, error);
        }
    }
}

// Carregar anúncios do prestador
// Carregar anúncios do prestador
async function carregarAnuncios() {
    const login = localStorage.getItem('login');
    const listaDiv = document.getElementById('lista-anuncios');

    const BASE_URL = "http://localhost:8080/";

    try {
        const response = await fetch(API_URL + '/get-filter');

        if (!response.ok) {
            throw new Error('Erro ao carregar anúncios');
        }

        const anuncios = await response.json();

        const meusAnuncios = anuncios.filter(a => a.usuario && a.usuario.login === login);

        if (meusAnuncios.length === 0) {
            listaDiv.innerHTML = '<p style="color: #fff; opacity: 0.7; text-align: center;">Você ainda não tem anúncios cadastrados.</p>';
            return;
        }

        let html = '<div style="display: grid; gap: 20px;">';

        meusAnuncios.forEach(anuncio => {

            let htmlFotos = '';
            if (anuncio.fotoList && anuncio.fotoList.length > 0) {
                htmlFotos += '<div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 15px; margin-top: 20px; padding-bottom: 10px;">';

                anuncio.fotoList.forEach(foto => {
                    const imgUrl = BASE_URL + foto.nomeArq;

                    htmlFotos += `
                        <img src="${imgUrl}" 
                             alt="Foto do anúncio" 
                             style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px; border: 2px solid rgba(255,255,255,0.3); box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    `;
                });

                htmlFotos += '</div>';
            }

            html += `
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.2);">
                    <h3 style="color: #fff; margin-bottom: 10px;">${anuncio.titulo}</h3>
                    <p style="color: #ccc; margin-bottom: 10px;">${anuncio.descr}</p>
                    
                    <div style="color: #aaa; font-size: 14px; margin-bottom: 15px;">
                        <p><strong>Dias:</strong> ${anuncio.diasTrab}</p>
                        <p><strong>Horário:</strong> ${anuncio.horarioInicioDia} - ${anuncio.horarioFimDia}</p>
                    </div>

                    ${htmlFotos}

                    <div style="display: flex; gap: 15px; margin-top: 20px; justify-content: center;">
                        <button onclick="editarAnuncio(${anuncio.id})" class="submit-btn" style="padding: 10px 25px; font-size: 0.9rem; margin-top:0;">
                            Editar
                        </button>
                        <button onclick="confirmarExclusao(${anuncio.id})" class="submit-btn" style="background: linear-gradient(135deg, #ef4444, #b91c1c); padding: 10px 25px; font-size: 0.9rem; margin-top:0;">
                            Excluir
                        </button>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        listaDiv.innerHTML = html;

    } catch (error) {
        console.error('Erro:', error);
        listaDiv.innerHTML = '<p style="color: #ef4444;">Erro ao carregar anúncios.</p>';
    }
}

// Editar anúncio
async function editarAnuncio(id) {
    try {
        const response = await fetch(`${API_URL}/get-one/${id}`);

        if (!response.ok) {
            throw new Error('Erro ao buscar anúncio');
        }

        const anuncio = await response.json();

        document.getElementById('anu_id').value = anuncio.id;
        document.getElementById('anu_titulo').value = anuncio.titulo;
        document.getElementById('anu_descricao').value = anuncio.descr;
        document.getElementById('anu_diastrabalho').value = anuncio.diasTrab;
        document.getElementById('anu_horarioinicio').value = anuncio.horarioInicioDia;
        document.getElementById('anu_horariofim').value = anuncio.horarioFimDia;

        document.getElementById('usu_login').value = localStorage.getItem('login');

        modoEdicao = true;
        anuncioEditando = anuncio;

        document.getElementById('form-title').textContent = 'Editar Anúncio';
        document.getElementById('btn-salvar').textContent = 'Salvar Alterações';

        const btnCancelar = document.getElementById('btn-cancelar');
        if(btnCancelar) btnCancelar.style.display = 'inline-block';

        document.getElementById('anuncio-form').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Cancelar edição
function cancelarEdicao() {
    const form = document.getElementById('anuncio-form');
    form.reset();

    modoEdicao = false;
    anuncioEditando = null;

    document.getElementById('form-title').textContent = 'Monte seu anúncio';
    document.getElementById('btn-salvar').textContent = 'Cadastrar Anúncio';

    const btnCancelar = document.getElementById('btn-cancelar');
    if(btnCancelar) btnCancelar.style.display = 'none';

    document.getElementById('anu_id').value = '';
    document.getElementById('usu_login').value = localStorage.getItem('login');
}

// Confirmar exclusão
function confirmarExclusao(id) {
    if (confirm('Tem certeza que deseja excluir este anúncio? Esta ação não pode ser desfeita.')) {
        excluirAnuncio(id);
    }
}

// Excluir anúncio
async function excluirAnuncio(id) {
    const btnExcluir = document.activeElement;
    if(btnExcluir && btnExcluir.tagName === 'BUTTON') {
        btnExcluir.textContent = 'Excluindo...';
        btnExcluir.disabled = true;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(errText || 'Erro ao excluir anúncio');
        }


        const idEditando = document.getElementById('anu_id').value;
        if (idEditando == id) {
            cancelarEdicao();
        }

        carregarAnuncios();

    } catch (error) {
        console.error('Erro:', error);

        carregarAnuncios();
    }
}

// Tornar funções globais para serem chamadas pelos botões HTML
window.editarAnuncio = editarAnuncio;
window.confirmarExclusao = confirmarExclusao;

// ITENS DO TEMPLATE:

// Mobile menu functionality
var servicos;
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

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced form submission with better UX
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    // Add loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.background = 'linear-gradient(135deg, #94a3b8, #64748b)';

    // Simulate form submission with better feedback
    setTimeout(() => {
        submitBtn.textContent = 'Prestador cadastrado';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

        // Show success animation
        submitBtn.style.transform = 'scale(1.05)';
        setTimeout(() => {
            submitBtn.style.transform = 'scale(1)';
        }, 200);

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            document.querySelector('.contact-form').reset();
        }, 3000);
    }, 2000);
});

// Enhanced parallax effect for hero background
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
