
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionamos TODOS los contenedores de carrusel
    const allCarouselContainers = document.querySelectorAll('.carousel-container');

    // Iteramos sobre cada contenedor de carrusel para inicializarlo individualmente
    allCarouselContainers.forEach(carouselContainer => {
        const carouselTrack = carouselContainer.querySelector('.carousel-track');
        const slides = Array.from(carouselTrack.children);
        const dotsContainer = carouselContainer.querySelector('.carousel-dots');
        const dots = Array.from(dotsContainer.children);

        let currentIndex = 0;
        const slideInterval = 3000; // Tiempo en milisegundos (3 segundos)
        let autoSlideTimer;

        // Función para obtener el ancho actual de un slide dentro de ESTE carrusel
        const getSlideWidth = () => slides[0].getBoundingClientRect().width;

        // Mueve el carrusel a un slide específico
        function moveToSlide(targetIndex) {
            if (targetIndex < 0) {
                targetIndex = slides.length - 1;
            } else if (targetIndex >= slides.length) {
                targetIndex = 0;
            }
            carouselTrack.style.transform = 'translateX(-' + targetIndex * getSlideWidth() + 'px)';
            currentIndex = targetIndex;
            updateDots();
        }

        // Actualiza la clase 'active' en los puntos de navegación de ESTE carrusel
        function updateDots() {
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        // Inicia el carrusel automático
        function startAutoSlide() {
            stopAutoSlide(); // Asegura que no haya múltiples timers activos
            autoSlideTimer = setInterval(() => {
                moveToSlide(currentIndex + 1);
            }, slideInterval);
        }

        // Detiene el carrusel automático
        function stopAutoSlide() {
            clearInterval(autoSlideTimer);
        }

        // Eventos para los puntos de navegación de ESTE carrusel
        if (dotsContainer) { // Asegurarse de que el contenedor de puntos exista
            dotsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('dot')) {
                    const targetDotIndex = dots.indexOf(e.target);
                    stopAutoSlide();
                    moveToSlide(targetDotIndex);
                    startAutoSlide(); // Reinicia el auto-slide después de la interacción manual
                }
            });
        }

        // Ajusta la posición del carrusel si la ventana cambia de tamaño
        window.addEventListener('resize', () => {
            // Detiene y reinicia para asegurar que la posición es correcta después del resize
            stopAutoSlide(); 
            moveToSlide(currentIndex);
            startAutoSlide(); 
        });

        // Inicializa este carrusel
        updateDots();
        startAutoSlide(); 
    }); // Fin del forEach sobre cada carrusel
});