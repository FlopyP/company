/**
 * Estructura de datos para los servicios
 * @property {string} titulo - Título del servicio.
 * @property {string} texto - Contenido detallado del servicio.
 * @property {number} numSlides - Cantidad de imágenes para el carrusel de este servicio.
 * @property {string} imgBasePath - Ruta base de las imágenes (ej: '/images/comunicacion/').
 */
const serviciosData = {
    marketing: {
        titulo: "Comunicación Integral: Marketing",
        texto: `
            <p>Asesoramiento integral en el desarrollo de la Imagen de una empresa. Interactuando con los clientes y reconociendo sus necesidades para así desarrollar una estrategia de comunicación acorde a los objetivos de cada uno.</p>
            <p>Esto incluye el análisis, desarrollo de la estrategia y plan de trabajo para la implementación de las acciones a seguir: creación o restyling del logo, equipamiento de oficina (arquigrafía), papelería comercial, folletería, carpetas institucionales, herramientas de ventas, estrategía de ventas, registro de marca y/o patente (gestión), etc.</p>
            <p>Comunicación Digital, rediseño y adaptación del sitio Web a los distintos dispositivos móviles de acuerdo a las nuevas normativas de Google, imagen digital. Desarrollo de Back Office. Gestión de compra de dominio y registro del mismo.</p>
        `,
        numSlides: 3,
        // **IMPORTANTE**: Ajusta estas rutas a dónde tienes tus imágenes.
        imgBasePath: '/images/marketing' 
    },
    audiovisual: {
        titulo: "Producción Audiovisual",
        texto: `
            <p>Asesoramiento en la producción audiovisual. Contamos con un equipo multidisciplinario, pudiendo desarrollar todo tipo de ideas como también proyectos ya existentes. Nos encargamos de llevar a cabo la producción, coordinación y realización desde el inicio al fin.</p>
        `,
        numSlides: 3,
        imgBasePath: '/images/audiovisual'
    },
    logistica: {
        titulo: "Asesoría en logística y transporte internacional",
        texto: `
            <p>Con el compromiso y la calificación de nuestro personal, ofrecemos asesoramiento especializado en diversas materias de logística y transporte internacional tal como:</p>
            <ul>
                <li>Financiación en la adquisición de vehículos y demás material destinado al transporte.</li>
                <li>Régimen de concesiones de transporte de mercancías.</li>
                <li>Asistencia jurídica en materia de accidentes durante el transporte aéreo, marítimo o terrestre y demás procedimientos derivados.</li>
                <li>Seguros de transporte.</li>
                <li>Aspectos y problemas contractuales en materia de transporte, interpretación y ejecución de INCOTERMS.</li>
                <li>Contratos de transporte multimodal internacional.</li>
            </ul>
        `,
        numSlides: 3,
        imgBasePath: '/images/logistica'
    },
    software: {
        titulo: "Asesoría en desarrollos de Software",
        texto: `
            <p>Asesoramiento en desarrollo de soluciones informáticas de pequeña mediana y gran escala en la plataforma que se requiera. Brindamos soluciones IT, desarrolladas especialmente a MEDIDA para cada empresa.</p>
            <ul>
                <li>Asesoramiento en DESARROLLO DE SOFTWARE Y SISTEMAS</li>
                <li>Asesoramiento en DESARROLLO DE SISTEMAS DE GESTIÓN</li>
                <li>Asesoramiento en DESARROLLO DE SISTEMAS DE FACTURACIÓN ELECTRÓNICA</li>
                <li>Asesoramiento en DESARROLLO DE APLICACIONES PARA ENTORNOS DE REDES Y ESCRITORIO</li>
                <li>Asesoramiento en INTEGRACIÓN E IMPLANTACIÓN DE SISTEMAS</li>
                <li>Asesoramiento en INTERCOMPATIBILIDAD Y FLEXIBILIDAD ENTRE DIVERSAS TECNOLOGÍAS</li>
            </ul>
        `,
        numSlides: 3,
        imgBasePath: '/images/software'
    }
};


// (Coloca el objeto serviciosData definido en el punto 1 aquí)

/**
 * Función auxiliar para generar el HTML del carrusel.
 * @param {number} numSlides - Número total de slides.
 * @param {string} imgPathBase - Ruta base de las imágenes (ej: '/images/marketing/').
 * @returns {string} El HTML completo del carrusel.
 */
const generarCarruselHTML = (numSlides, imgPathBase) => {
    let slidesHTML = '';
    let dotsHTML = '';
    const totalSlides = numSlides > 0 ? numSlides : 1;
    
    for (let i = 1; i <= totalSlides; i++) {
        // Asume que las imágenes se llaman img1.jpg, img2.jpg, etc.
        // Si usas otro formato (ej: carrusel1.jpg), ajusta aquí.
        slidesHTML += `
            <div class="carousel-slide">
                <img src="${imgPathBase}${i}.jpg" alt="Imagen de servicio ${i}">
            </div>
        `;
        dotsHTML += `<span class="dot ${i === 1 ? 'active' : ''}"></span>`;
    }

    return `
        <div class="carousel-container">
            <div class="carousel-track">
                ${slidesHTML}
            </div>
            <div class="carousel-dots">
                ${dotsHTML}
            </div>
        </div>
    `;
};


// ====================================================================
// Lógica del Carrusel (Ajustada para funcionar con contenido inyectado)
// ====================================================================

/**
 * Inicializa la funcionalidad de un carrusel específico.
 * Se llama cada vez que se carga un nuevo servicio.
 * @param {HTMLElement} carouselContainer - El div contenedor del carrusel.
 */
function initCarousel(carouselContainer) {
    if (!carouselContainer) return; 

    const carouselTrack = carouselContainer.querySelector('.carousel-track');
    const slides = Array.from(carouselTrack.children);
    const dotsContainer = carouselContainer.querySelector('.carousel-dots');
    const dots = Array.from(dotsContainer.children);

    if (slides.length <= 1) return; // No inicializar si hay 0 o 1 slide
    
    let currentIndex = 0;
    const slideInterval = 3500; // 3.5 segundos por slide
    let autoSlideTimer;

    const getSlideWidth = () => slides[0].getBoundingClientRect().width;

    function moveToSlide(targetIndex) {
        if (slides.length === 0) return;
        
        if (targetIndex < 0) {
            targetIndex = slides.length - 1;
        } else if (targetIndex >= slides.length) {
            targetIndex = 0;
        }
        
        carouselTrack.style.transform = 'translateX(-' + targetIndex * getSlideWidth() + 'px)';
        currentIndex = targetIndex;
        updateDots();
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideTimer = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, slideInterval);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideTimer);
    }

    // Eventos para los puntos de navegación
    if (dotsContainer) {
        dotsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('dot')) {
                const targetDotIndex = dots.indexOf(e.target);
                stopAutoSlide();
                moveToSlide(targetDotIndex);
                startAutoSlide(); // Reinicia el auto-slide
            }
        });
    }

    // Evento de resize para mantener la posición correcta
    window.addEventListener('resize', () => {
        stopAutoSlide();
        moveToSlide(currentIndex);
        startAutoSlide();
    });

    // Inicializa este carrusel
    moveToSlide(currentIndex);
    startAutoSlide();
}


// ====================================================================
// Lógica de Pestañas y Contenido
// ====================================================================

/**
 * Función principal para actualizar el carrusel y el texto.
 * @param {string} servicioKey - La clave del servicio a mostrar (ej: 'marketing').
 */
function actualizarContenido(servicioKey) {
    const data = serviciosData[servicioKey];
    if (!data) return;

    const carruselDisplay = document.getElementById('carrusel-display-columna');
    const textoDisplay = document.getElementById('servicio-texto-display');
    
    // 1. Ocultar con Fade Out (opcional, pero mejora la UX)
    carruselDisplay.style.opacity = 0;
    textoDisplay.style.opacity = 0; 
    
    setTimeout(() => {
        // 2. Inyectar contenido
        // Carrusel
        carruselDisplay.innerHTML = generarCarruselHTML(data.numSlides, data.imgBasePath);
        
        // Texto
        textoDisplay.innerHTML = `
            <h3 class="servicio-titulo-display">${data.titulo}</h3>
            ${data.texto}
        `;

        // 3. Inicializar el Carrusel y mostrar con Fade In
        const carouselContainer = carruselDisplay.querySelector('.carousel-container');
        if (carouselContainer) {
            initCarousel(carouselContainer);
        }
        
        carruselDisplay.style.opacity = 1;
        textoDisplay.style.opacity = 1;
    }, 200); // 200ms coincide con el tiempo de transición CSS
}

/**
 * Establece el estado activo en la pestaña y dispara la actualización de contenido.
 * @param {string} servicioKey - La clave del servicio a activar.
 */
function setActiveState(servicioKey) {
    // 1. Remover 'active' de todos los tabs
    document.querySelectorAll('.servicio-tab').forEach(t => t.classList.remove('active'));

    // 2. Añadir 'active' al tab correspondiente
    const tabToActivate = document.querySelector(`.servicio-tab[data-tab="${servicioKey}"]`);
    if (tabToActivate) tabToActivate.classList.add('active');

    // 3. Actualizar el contenido (carrusel y texto)
    actualizarContenido(servicioKey);
}

// 4. Configuración de Event Listeners e Inicialización
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.servicio-tab');
    
    // Eventos para las pestañas
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            setActiveState(e.target.getAttribute('data-tab'));
        });
    });

    // 5. Inicializar con el primer servicio activo (marketing)
    setActiveState('marketing'); 
});

