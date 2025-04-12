document.addEventListener('DOMContentLoaded', function() {
    // Datos de proyectos con soporte multiidioma
    const projects = [
        {
            id: 1,
            title: {
                en: "ZeroLag MC",
                es: "ZeroLag MC",
                ru: "ZeroLag MC",
                pt: "ZeroLag MC"
            },
            description: {
                en: "Optimize classic Minecraft by improving performance, reducing lag, and increasing FPS with lightweight configurations and technical tweaks — all without losing the original feel of the game.",
                es: "Optimiza Minecraft clásico mejorando el rendimiento, reduciendo el lag y aumentando los FPS con configuraciones ligeras y ajustes técnicos, sin perder la esencia del juego original.",
                ru: "Оптимизируй классический Minecraft, улучшая производительность, снижая лаги и повышая FPS с помощью лёгких настроек и технических правок, сохраняя оригинальную атмосферу игры.",
                pt: "Otimize o Minecraft clássico melhorando o desempenho, reduzindo o lag e aumentando os FPS com configurações leves e ajustes técnicos — sem perder a essência original do jogo."
            },
            image: "https://raw.githubusercontent.com/BitForge2/BitForge2.github.io/refs/heads/main/imagen/minecraft_zerolag.avif",
            downloadLink: "https://github.com/Edward-e2o5h/ZeroLag-MC"
        }
	]

    // Textos traducibles
    const translations = {
        en: {
            "title": "BitForge",
            "subtitle": "Access my projects and the latest releases",
            "projects": "My Projects",
            "social": "Social Media",
            "download": "Download",
            "view_projects": "View Projects"
        },
        es: {
            "title": "BitForge",
            "subtitle": "Accede a mis proyectos y los lanzamientos más recientes",
            "projects": "Mis Proyectos",
            "social": "Redes Sociales",
            "download": "Descargar",
            "view_projects": "Ver Proyectos"
        },
        ru: {
            "title": "BitForge",
            "subtitle": "Получите доступ к моим проектам и последним релизам",
            "projects": "Мои Проекты",
            "social": "Социальные сети",
            "download": "Скачать",
            "view_projects": "Просмотр Проектов"
        },
        pt: {
            "title": "BitForge",
            "subtitle": "Acesse meus projetos e os lançamentos mais recentes",
            "projects": "Meus Projetos",
            "social": "Redes Sociais",
            "download": "Baixar",
            "view_projects": "Ver Projetos"
        }
    };

    // Elementos del DOM
    const elements = {
        themeToggle: document.getElementById('theme-toggle'),
        themeIcon: document.querySelector('#theme-toggle i'),
        languageSelector: document.getElementById('language-selector'),
        projectsContainer: document.getElementById('projects-container'),
        headerTitle: document.querySelector('header h1'),
        headerSubtitle: document.querySelector('header p'),
        projectsTitle: document.querySelector('#projects h2'),
        socialTitle: document.querySelector('#social h2'),
        navLinks: document.querySelectorAll('nav a')
    };

    // Estado de la aplicación
    const state = {
        language: 'es',
        darkMode: false
    };

    // Inicializar la aplicación
    function init() {
        loadSettings();
        setupEventListeners();
        render();
    }

    // Cargar configuración desde localStorage
    function loadSettings() {
        // Idioma
        const savedLanguage = localStorage.getItem('language');
        const browserLanguage = navigator.language.substring(0, 2);
        
        if (savedLanguage && translations[savedLanguage]) {
            state.language = savedLanguage;
        } else if (translations[browserLanguage]) {
            state.language = browserLanguage;
        }
        
        elements.languageSelector.value = state.language;

        // Tema oscuro
        const savedTheme = localStorage.getItem('theme');
        state.darkMode = savedTheme === 'dark';
        document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
    }

    // Configurar event listeners
    function setupEventListeners() {
        // Selector de idioma
        elements.languageSelector.addEventListener('change', (e) => {
            state.language = e.target.value;
            localStorage.setItem('language', state.language);
            render();
        });

        // Botón de tema oscuro
        elements.themeToggle.addEventListener('click', () => {
            state.darkMode = !state.darkMode;
            localStorage.setItem('theme', state.darkMode ? 'dark' : 'light');
            document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
            updateThemeIcon();
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', smoothScroll);
        });
    }

    // Actualizar icono del tema
    function updateThemeIcon() {
        elements.themeIcon.className = state.darkMode ? 'fas fa-sun' : 'fas fa-moon';
        elements.themeToggle.setAttribute('title', state.darkMode ? 'Modo claro' : 'Modo oscuro');
    }

    // Smooth scroll
    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }

    // Renderizar toda la aplicación
    function render() {
        updateTexts();
        renderProjects();
        updateThemeIcon();
    }

    // Actualizar textos traducidos
    function updateTexts() {
        elements.headerTitle.textContent = translations[state.language].title;
        elements.headerSubtitle.textContent = translations[state.language].subtitle;
        elements.projectsTitle.textContent = translations[state.language].projects;
        elements.socialTitle.textContent = translations[state.language].social;
        
        // Actualizar enlaces de navegación
        elements.navLinks[0].textContent = translations[state.language].projects;
        elements.navLinks[1].textContent = translations[state.language].social;
    }

    // Renderizar proyectos
    function renderProjects() {
        elements.projectsContainer.innerHTML = '';
        
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title[state.language]}" loading="lazy">
                </div>
                <div class="project-info">
                    <h3>${project.title[state.language]}</h3>
                    <p>${project.description[state.language]}</p>
                    <a href="${project.downloadLink}" class="download-btn" download>
                        ${translations[state.language].download}
                    </a>
                </div>
            `;
            
            elements.projectsContainer.appendChild(projectCard);
        });
    }

    // Iniciar
    init();
});