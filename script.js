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
                en: "Optimize Minecraft by improving performance, reducing lag, and increasing FPS with lightweight configurations and technical tweaks — all without losing the original feel of the game.",
                es: "Optimiza Minecraft mejorando el rendimiento, reduciendo el lag y aumentando los FPS con configuraciones ligeras y ajustes técnicos, sin perder la esencia del juego original.",
                ru: "Оптимизируй классический Minecraft, улучшая производительность, снижая лаги и повышая FPS с помощью лёгких настроек и технических правок, сохраняя оригинальную атмосферу игры.",
                pt: "Otimize o Minecraft melhorando o desempenho, reduzindo o lag e aumentando os FPS com configurações leves e ajustes técnicos — sem perder a essência original do jogo."
            },
            image: "https://raw.githubusercontent.com/BitForge2/BitForge2.github.io/refs/heads/main/imagen/minecraft_zerolag.avif",
            downloadLink: "https://github.com/Edward-e2o5h/ZeroLag-MC"
        },
		{
            id: 2,
            title: {
                en: "Minecraft Bedrock 1.21.72",
                es: "Minecraft Bedrock 1.21.72",
                ru: "Minecraft Bedrock 1.21.72",
                pt: "Minecraft Bedrock 1.21.72"
            },
            description: {
                en: "The smoothest and most cross-platform version of Minecraft. Runs like butter on console, mobile, PC and more. Build, survive, and explore on public servers or with friends, no matter the device.",
                es: "La versión más fluida y multiplataforma de Minecraft. Corre como mantequilla en consola, móvil, PC y más. Construye, sobrevive y explora en servidores públicos o con amigos sin importar el dispositivo.",
                ru: "Самая плавная и кроссплатформенная версия Minecraft. Работает как по маслу на консолях, мобильных устройствах, ПК и не только. Строй, выживай и исследуй на публичных серверах или с друзьями, независимо от устройства.",
                pt: "A versão mais fluida e multiplataforma do Minecraft. Roda como manteiga no console, celular, PC e muito mais. Construa, sobreviva e explore em servidores públicos ou com amigos, independentemente do dispositivo."
            },
            image: "https://raw.githubusercontent.com/BitForge2/BitForge2.github.io/refs/heads/main/imagen/minecraft_bedrock.avif",
            downloadLink: "https://www.mediafire.com/file/xwny13gm0ic7ygw/Minecraft_1.21.72.apk/file"
        },
		{
            id: 3,
            title: {
                en: "OptiSupermium 132",
                es: "OptiSupermium 132",
                ru: "OptiSupermium 132",
                pt: "OptiSupermium 132"
            },
            description: {
                en: "Supermium is a Chromium-based browser, lightweight and fast, ideal for older computers. It works on Windows 7, XP, and newer versions. It offers great compatibility, optimization, and is fully portable.",
                es: "Supermium es un navegador basado en Chromium, ligero y rápido, ideal para computadoras antiguas. Funciona en Windows 7, XP y versiones más nuevas. Ofrece buena compatibilidad, optimización y es totalmente portable.",
                ru: "Supermium — это быстрый и лёгкий браузер на базе Chromium, идеально подходящий для старых компьютеров. Работает на Windows 7, XP и новых версиях. Обеспечивает хорошую совместимость, оптимизацию и полностью портативен.",
                pt: "Supermium é um navegador leve e rápido baseado no Chromium, ideal para computadores antigos. Funciona no Windows 7, XP e versões mais recentes. Oferece boa compatibilidade, otimização e é totalmente portátil."
            },
            image: "https://github.com/BitForge2/BitForge2.github.io/raw/refs/heads/main/imagen/optisupermium.avif",
            downloadLink: "https://www.mediafire.com/file/twxzfjriqgcqx40/OptiSupermium.rar/file"
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