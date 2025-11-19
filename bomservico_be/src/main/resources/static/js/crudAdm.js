let anunciosExcluidos = [];
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
        const btnApagar = document.getElementById("btn-apagar-anuncios");

        btnApagar.addEventListener("click",()=>{
            if(anunciosExcluidos.length !== 0)
                excluirAnuncios();
            else
                alert("Nenhum anúncio selecionado");
        });

        //lógica para excluir categorias

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