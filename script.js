/**
 * BitForge - Aplicación de descargas
 * Versión optimizada y corregida
 */

// Configuración
const CONFIG = {
    DEFAULT_LANGUAGE: 'es',
    THEME_KEY: 'bitforge-theme',
    LANGUAGE_KEY: 'bitforge-language',
    SCROLL_OFFSET: 80
};

// Estado de la aplicación
const state = {
    language: CONFIG.DEFAULT_LANGUAGE,
    darkMode: false,
    activeTag: null,
    searchQuery: '',
    isMenuOpen: false
};

// Elementos del DOM
const DOM = {
    themeToggle: document.getElementById('theme-toggle'),
    themeIcon: document.querySelector('#theme-toggle i'),
    languageSelector: document.getElementById('language-selector'),
    projectsContainer: document.getElementById('projects-container'),
    headerTitle: document.querySelector('.header-text h1'),
    headerSubtitle: document.querySelector('.header-text .subtitle'),
    projectsTitle: document.querySelector('#projects .section-header h2'),
    socialTitle: document.querySelector('#social .section-header h2'),
    searchInput: document.getElementById('search-input'),
    tagContainer: document.getElementById('tag-container'),
    downloadModal: document.getElementById('download-modal'),
    modalTitle: document.getElementById('modal-title'),
    downloadOptions: document.getElementById('download-options'),
    loadingScreen: document.getElementById('loading-screen'),
    menuToggle: document.querySelector('.menu-toggle'),
    mobileNav: document.querySelector('nav ul'),
    closeModal: document.querySelector('.close-modal')
};

// Datos de proyectos
const projects = [
    {
        id: 1,
        title: {
            en: "Minecraft Java Edition 1.12.2",
            es: "Minecraft Java Edition 1.12.2"
        },
        description: {
            en: "Optimized version with better performance and FPS",
            es: "Versión optimizada con mejor rendimiento y FPS"
        },
        image: "https://raw.githubusercontent.com/BitForge2/BitForge2.github.io/main/imagen/minecraft_zerolag.avif",
        downloadLink: "https://github.com/Edward-e2o5h/ZeroLag-MC",
        tags: ["minecraft", "pc"],
        badge: "PC"
    },
    {
        id: 2,
        title: {
            en: "Minecraft Bedrock 1.21.72",
            es: "Minecraft Bedrock 1.21.72"
        },
        description: {
            en: "Latest stable version for mobile devices",
            es: "Última versión estable para dispositivos móviles"
        },
        image: "https://raw.githubusercontent.com/BitForge2/BitForge2.github.io/refs/heads/main/imagen/minecraft_bedrock.avif",
        downloadLink: "https://www.mediafire.com/file/xwny13gm0ic7ygw/Minecraft_1.21.72.apk/file",
        tags: ["minecraft", "mobile"],
        badge: "Mobile"
    },
	{
        id: 3,
		title: {
            en: "OptiSupermium 132",
            es: "OptiSupermium 132"
        },
        description: {
            en: "Supermium is a Chromium-based browser, lightweight and fast, ideal for older computers. It works on Windows 7, XP, and newer versions. It offers great compatibility, optimization, and is fully portable.",
            es: "Supermium es un navegador basado en Chromium, ligero y rápido, ideal para computadoras antiguas. Funciona en Windows 7, XP y versiones más nuevas. Ofrece buena compatibilidad, optimización y es totalmente portable."
		},
        image: "https://github.com/BitForge2/BitForge2.github.io/raw/refs/heads/main/imagen/optisupermium.avif",
        downloadLink: "https://www.mediafire.com/file/twxzfjriqgcqx40/OptiSupermium.rar/file",
		tags: ["pc"],
        badge: "PC"
    },
	{
		id: 4,
        title: {
			en: "Minecraft Beta 1.21.80.25 (Old)",
            es: "Minecraft Beta 1.21.80.25 (Antigua)"
        },
        description: {
            en: "Minecraft Beta/Preview 1.21.80.25 brings new improvements for the upcoming 1.21 update. Bugs have been fixed, performance enhanced, and new features are being fine-tuned. Perfect for players who want to test new content ahead of time.",
			es: "Minecraft Beta/Preview 1.21.80.25 trae nuevas mejoras para la actualización 1.21. Se han corregido errores, mejorado el rendimiento y se siguen afinando detalles de las pruebas del nuevo contenido. Ideal para jugadores que quieren probar lo nuevo antes de tiempo."   
		},
        image: "https://github.com/BitForge2/BitForge2.github.io/raw/refs/heads/main/imagen/MinecraftBeta.avif",
		downloadLink: "https://www.mediafire.com/file/nj6keqgdfdxj6uw/MCPreview.apk/file",
		tags: ["minecraft", "mobile"],
        badge: "Mobile"
    },
	{
        id: 5,
        title: {
            en: "WorldBox Premium",
			es: "WorldBox Premium"
		},
        description: {
			en: "Create worlds, build civilizations, or destroy everything with meteors, zombies, and nukes. You rule. You decide. Be a god on your phone!",
            es: "Crea mundos, construye civilizaciones o destrúyelo todo con meteoritos, zombis y bombas nucleares. Tú mandas. Tú decides. ¡Juega a ser Dios desde tu móvil!"
        },
        image: "https://github.com/BitForge2/BitForge2.github.io/raw/refs/heads/main/imagen/worldbox.avif",
        downloadLink: "https://www.mediafire.com/file/m1qz3zzdsdpyt4i/WorldBox.apk/file",
		tags: ["mobile"],
        badge: "Mobile"
    },
	{
        id: 6,
        title: {
            en: "SpaceFlight Simulator",
            es: "SpaceFlight Simulator"
        },
        description: {
            en: "Build your own rockets, launch into space, and explore the solar system with real physics! Design. Launch. Discover. The universe is in your pocket!",
            es: "Construye tus propios cohetes, lánzalos al espacio y explora el sistema solar con física realista. Diseña. Lanza. Descubre. ¡El universo está en tu bolsillo!"
        },
        image: "https://github.com/BitForge2/BitForge2.github.io/raw/refs/heads/main/imagen/spaceflight.avif",
        downloadLink: "https://www.mediafire.com/file/gg4nxfbxpp24y56/Spaceflight_Simulator.apk/file",
		tags: ["mobile"],
        badge: "Mobile"
    },
	{
        id: 7,
		title: {
            en: "Stellarium Plus",
            es: "Stellarium Plus"
        },
        description: {
            en: "Stellarium Plus is a premium mobile planetarium app that lets you explore stars, planets, and constellations in real time with amazing detail and accuracy.",
            es: "Stellarium Plus es una app planetario premium para móviles que te permite explorar estrellas, planetas y constelaciones en tiempo real con gran detalle y precisión."
        },
        image: "https://stellarium.org/img/slideshow/slide-3.jpg",
        downloadLink: "https://www.mediafire.com/file/iw2wi7l5wm06ioa/Stellarium_%252B.apk/file",
		tags: ["mobile"],
        badge: "Mobile"
    },
	{
        id: 8,
		title: {
            en: "Unturned 3.9.9.5",
            es: "Unturned 3.9.9.5"
        },
        description: {
            en: "Unturned is a survival game in a post-apocalyptic world where you face zombies, manage resources, and build shelters. In version 3.9.9.5, it offers a sandbox experience where you can explore, gather, and improve your survival skills. Despite its simple graphics, the game has deep, strategic gameplay. It includes improvements in optimization and balance for a better experience.",
            es: "Unturned es un juego de supervivencia en un mundo post-apocalíptico en el que debes enfrentar zombis, gestionar recursos y construir refugios. En la versión 3.9.9.5, ofrece una experiencia sandbox donde puedes explorar, recolectar y mejorar tus habilidades para sobrevivir. A pesar de sus gráficos simples, el juego tiene una jugabilidad profunda y estratégica. Incluye mejoras en optimización y balance para ofrecer una mejor experiencia."
        },
        image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/304930/capsule_616x353.jpg?t=1734630748",
        downloadLink: "https://www.mediafire.com/file/tzzooncdh82djgw/Unturned_3.9.9.5.7z/file",
		tags: ["pc"],
        badge: "PC"
    },
	{
        id: 9,
		title: {
            en: "Papers Please 1.1.65",
            es: "Papers Please 1.1.65"
        },
        description: {
            en: "Papers, Please is a simulation game where you work as an immigration officer in the fictional country of Arstotzka. Your job is to inspect documents, catch inconsistencies, and decide who can enter and who must be turned away. Every choice affects your pay, your family… and the fate of many lives.",
            es: "Papers, Please es un juego de simulación en el que trabajas como inspector de inmigración en un país ficticio llamado Arstotzka. Tu tarea es revisar documentos, detectar inconsistencias y decidir quién puede entrar y quién debe ser rechazado. Cada decisión impacta tu salario, tu familia... y el destino de muchas vidas."
        },
        image: "https://games-b26f.kxcdn.com/wp-content/uploads/2018/02/PapersPlease.jpg",
        downloadLink: "https://www.mediafire.com/file/jyymgpoic1dfebt/PapersPlease.rar/file",
		tags: ["pc"],
        badge: "PC"
    },
	{
        id: 10,
		title: {
            en: "Universe Sandbox",
            es: "Universe Sandbox"
        },
        description: {
            en: "Universe Sandbox 2 is a space and gravity simulator that lets you create and destroy anything in the universe. Experiment with physics, collisions, and climate in an intuitive and powerful way. It's great for learning about space or just having fun with cosmic destruction.",
            es: "Universe Sandbox 2 es un simulador de espacio y gravedad que te permite crear y destruir cualquier cosa en el universo. Experimenta con la física, las colisiones y el clima de forma intuitiva y potente. Es ideal para aprender sobre el espacio o simplemente divertirte con la destrucción cósmica."
        },
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/230290/capsule_616x353.jpg?t=1742238758",
        downloadLink: "https://www.mediafire.com/file/1azps9jvyaxo56u/Universe.Sandbox.2.rar/file",
		tags: ["pc"],
        badge: "PC"
    }
];

// Servidores de descarga
const downloadServers = {
    "WorldBox Premium": [
        {
            name: "GoFile",
            url: "https://gofile.io/d/Ult1Et",
            icon: "fab fa-gofile",
            description: "Descarga Alternativa"
        },
        {
            name: "MediaFire",
            url: "https://www.mediafire.com/file/m1qz3zzdsdpyt4i/WorldBox.apk/file",
            icon: "fas fa-cloud-download-alt",
            description: "Descarga directa"
        }
    ],
    "Minecraft Bedrock 1.21.72": [
        {
            name: "MediaFire",
            url: "https://www.mediafire.com/file/xwny13gm0ic7ygw/Minecraft_1.21.72.apk/file",
            icon: "fas fa-cloud-download-alt",
            description: "Direct download"
        }
    ]
};

// Traducciones
const translations = {
    en: {
        "title": "BitForge",
        "subtitle": "Download the projects or games",
        "projects": "My Projects",
        "social": "Social Media",
        "download": "Download",
        "search_placeholder": "Search projects...",
        "select_server": "Select download server",
        "direct_download": "Direct Download",
        "popular": "Popular",
        "new": "New",
		"pc": "PC",
		"mobile": "Mobile",
        "menu": "Menu",
        "close_menu": "Close menu",
        "no_results": "No projects found"
    },
    es: {
        "title": "BitForge",
        "subtitle": "Descarga los proyectos o juegos",
        "projects": "Juegos y Programas",
        "social": "Redes Sociales",
        "download": "Descargar",
        "search_placeholder": "Buscar proyectos...",
        "select_server": "Selecciona servidor de descarga",
        "direct_download": "Descarga directa",
        "popular": "Popular",
        "new": "Nuevo",
		"pc": "PC",
		"mobile": "Movil",
        "menu": "Menú",
        "close_menu": "Cerrar menú",
        "no_results": "No se encontraron proyectos"
    }
};

// Inicialización
document.addEventListener('DOMContentLoaded', init);

async function init() {
    try {
        showLoading();
        loadSettings();
        setupEventListeners();
        await preloadImages();
        render();
        setTimeout(hideLoading, 500);
    } catch (error) {
        console.error("Initialization error:", error);
        hideLoading();
    }
}

// Cargar configuración
function loadSettings() {
    const savedTheme = localStorage.getItem(CONFIG.THEME_KEY);
    state.darkMode = savedTheme === 'dark';
    document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
    updateThemeIcon();
    
    const savedLanguage = localStorage.getItem(CONFIG.LANGUAGE_KEY);
    const browserLanguage = navigator.language.substring(0, 2);
    
    if (savedLanguage && translations[savedLanguage]) {
        state.language = savedLanguage;
    } else if (translations[browserLanguage]) {
        state.language = browserLanguage;
    }
    
    DOM.languageSelector.value = state.language;
}

// Configurar eventos
function setupEventListeners() {
    // Tema
    DOM.themeToggle.addEventListener('click', toggleTheme);
    
    // Idioma
    DOM.languageSelector.addEventListener('change', (e) => {
        state.language = e.target.value;
        localStorage.setItem(CONFIG.LANGUAGE_KEY, state.language);
        render();
    });
    
    // Búsqueda
    DOM.searchInput.addEventListener('input', debounce(() => {
        state.searchQuery = DOM.searchInput.value.toLowerCase();
        renderProjects();
    }, 300));
    
    // Menú móvil
    DOM.menuToggle.addEventListener('click', toggleMobileMenu);
    
    // Cerrar modal
    DOM.closeModal.addEventListener('click', () => {
        DOM.downloadModal.style.display = 'none';
    });
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === DOM.downloadModal) {
            DOM.downloadModal.style.display = 'none';
        }
    });
    
    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            DOM.downloadModal.style.display = 'none';
        }
    });
    
    // Navegación suave
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (state.isMenuOpen) {
                toggleMobileMenu();
            }
            
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - CONFIG.SCROLL_OFFSET,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Actualizar navegación al hacer scroll
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
}

// Alternar menú móvil
function toggleMobileMenu() {
    state.isMenuOpen = !state.isMenuOpen;
    DOM.mobileNav.classList.toggle('active');
    DOM.menuToggle.classList.toggle('active');
    DOM.menuToggle.setAttribute('aria-label', 
        state.isMenuOpen ? translations[state.language].close_menu : 
                          translations[state.language].menu);
    
    document.body.style.overflow = state.isMenuOpen ? 'hidden' : '';
}

// Alternar tema
function toggleTheme() {
    state.darkMode = !state.darkMode;
    localStorage.setItem(CONFIG.THEME_KEY, state.darkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
    updateThemeIcon();
}

// Actualizar icono del tema
function updateThemeIcon() {
    DOM.themeIcon.className = state.darkMode ? 'fas fa-sun' : 'fas fa-moon';
}

// Precargar imágenes
function preloadImages() {
    return Promise.all(projects.map(project => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = project.image;
            img.onload = resolve;
            img.onerror = resolve;
        });
    }));
}

// Renderizar toda la aplicación
function render() {
    updateTexts();
    renderProjects();
    renderTags();
    updateActiveNavLink();
}

// Actualizar textos
function updateTexts() {
    const t = translations[state.language];
    
    DOM.headerTitle.textContent = t.title;
    DOM.headerSubtitle.textContent = t.subtitle;
    DOM.projectsTitle.textContent = t.projects;
    DOM.socialTitle.textContent = t.social;
    DOM.searchInput.placeholder = t.search_placeholder;
}

// Renderizar proyectos
function renderProjects() {
    const filteredProjects = filterProjects();
    
    if (filteredProjects.length === 0) {
        showNoResults();
        return;
    }
    
    const fragment = document.createDocumentFragment();
    
    filteredProjects.forEach(project => {
        const card = createProjectCard(project);
        fragment.appendChild(card);
    });
    
    DOM.projectsContainer.innerHTML = '';
    DOM.projectsContainer.appendChild(fragment);
    
    // Configurar eventos de los botones de descarga
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const projectTitle = this.getAttribute('data-project');
            showDownloadModal(projectTitle);
        });
    });
}

// Filtrar proyectos
function filterProjects() {
    return projects.filter(project => {
        const title = project.title[state.language].toLowerCase();
        const description = project.description[state.language].toLowerCase();
        const tags = project.tags?.join(' ') || '';
        
        const matchesQuery = !state.searchQuery || 
                          title.includes(state.searchQuery) || 
                          description.includes(state.searchQuery) ||
                          tags.includes(state.searchQuery);
        
        const matchesTag = !state.activeTag || 
                         (project.tags && project.tags.includes(state.activeTag.toLowerCase()));
        
        return matchesQuery && matchesTag;
    });
}

// Mostrar mensaje cuando no hay resultados
function showNoResults() {
    DOM.projectsContainer.innerHTML = `
        <div class="no-results">
            <i class="fas fa-search"></i>
            <h3>${translations[state.language].no_results}</h3>
        </div>
    `;
}

// Crear tarjeta de proyecto
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const badgeHTML = project.badge ? 
        `<span class="project-badge">${translations[state.language][project.badge.toLowerCase()]}</span>` : 
        '';
    
    card.innerHTML = `
        <div class="project-image">
            ${badgeHTML}
            <img src="${project.image}" alt="${project.title[state.language]}" loading="lazy">
        </div>
        <div class="project-info">
            <h3>${project.title[state.language]}</h3>
            <p>${project.description[state.language]}</p>
            <button class="download-btn" data-project="${project.title.en}">
                <i class="fas fa-download"></i>
                ${translations[state.language].download}
            </button>
        </div>
    `;
    
    return card;
}

// Mostrar modal de descarga
function showDownloadModal(projectTitle) {
    const project = projects.find(p => p.title.en === projectTitle);
    if (!project) return;
    
    DOM.modalTitle.textContent = `
        ${translations[state.language].select_server}: ${project.title[state.language]}
    `;
    
    DOM.downloadOptions.innerHTML = '';
    
    const servers = downloadServers[projectTitle] || [];
    
    if (servers.length === 0) {
        addDownloadOption({
            name: translations[state.language].direct_download,
            url: project.downloadLink,
            icon: "fas fa-download",
            description: project.title[state.language]
        });
    } else {
        servers.forEach(server => {
            addDownloadOption(server);
        });
    }
    
    DOM.downloadModal.style.display = 'block';
}

// Añadir opción de descarga
function addDownloadOption(option) {
    const optionElement = document.createElement('a');
    optionElement.href = option.url;
    optionElement.target = '_blank';
    optionElement.rel = 'noopener noreferrer';
    optionElement.className = 'download-option';
    
    optionElement.innerHTML = `
        <i class="${option.icon}"></i>
        <div class="option-info">
            <h4>${option.name}</h4>
            <p>${option.description}</p>
        </div>
        <i class="fas fa-external-link-alt"></i>
    `;
    
    DOM.downloadOptions.appendChild(optionElement);
}

// Renderizar etiquetas
function renderTags() {
    const tags = getAllTags();
    const t = translations[state.language];
    
    DOM.tagContainer.innerHTML = '';
    
    // Añadir opción "Todos"
    const allTag = document.createElement('span');
    allTag.className = `tag ${!state.activeTag ? 'active' : ''}`;
    allTag.textContent = t.all_tags || 'All';
    allTag.addEventListener('click', () => {
        state.activeTag = null;
        renderProjects();
        updateActiveTags();
    });
    DOM.tagContainer.appendChild(allTag);
    
    // Añadir tags específicos
    tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = `tag ${state.activeTag === tag ? 'active' : ''}`;
        tagElement.textContent = tag;
        tagElement.addEventListener('click', () => {
            state.activeTag = state.activeTag === tag ? null : tag;
            renderProjects();
            updateActiveTags();
        });
        DOM.tagContainer.appendChild(tagElement);
    });
}

// Actualizar tags activos
function updateActiveTags() {
    document.querySelectorAll('.tag').forEach(tag => {
        const tagText = tag.textContent.toLowerCase();
        tag.classList.toggle('active', 
            (state.activeTag === null && tagText === (translations[state.language].all_tags || 'all').toLowerCase()) ||
            (tagText === state.activeTag?.toLowerCase())
        );
    });
}

// Obtener todos los tags únicos
function getAllTags() {
    const tags = new Set();
    
    projects.forEach(project => {
        project.tags?.forEach(tag => {
            tags.add(tag);
        });
    });
    
    return Array.from(tags).sort();
}

// Actualizar navegación activa
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + CONFIG.SCROLL_OFFSET;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Mostrar pantalla de carga
function showLoading() {
    DOM.loadingScreen.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Ocultar pantalla de carga
function hideLoading() {
    DOM.loadingScreen.style.display = 'none';
    document.body.style.overflow = '';
}

// Debounce para optimización
function debounce(func, delay) {
    let timeoutId;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(context, args), delay);
    };
}

// Throttle para optimización
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}