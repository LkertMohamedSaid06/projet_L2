document.addEventListener('DOMContentLoaded', function () {
    const svg = document.querySelector('svg'); // La carte SVG
    const pays = document.querySelectorAll('path'); // Tous les pays (<path>)
    const zoomInBtn = document.querySelector('.zoom-in');
    const zoomOutBtn = document.querySelector('.zoom-out');
    const homeBtn = document.querySelector('.home');
    const zoomValue = document.querySelector('.zoom-value');
    const mapContainer = document.querySelector(".map-container");
    const windowDiv = document.getElementById("window");
    const windowText = document.getElementById("windowText");
    const paths = document.querySelectorAll("path[name]");
    const windowImage = document.getElementById("windowImage");

    let currentZoom = 1;
    const minZoom = 0.9;
    const maxZoom = 3;
    const zoomStep = 0.3;
    const defaultZoom = 1;
    let translateX = 0, translateY = 0; // Décalage initial
    let isResetting = false; // Empêche les actions pendant le reset
    let selectedCountry = null; // Pays actuellement sélectionné


    // information du pays 
    
    function openWindow(content, imgSrc) {
        closeWindow();
        setTimeout(() => {
            windowDiv.style.visibility = "visible";
            windowDiv.classList.add("active");
            windowDiv.classList.remove("exit");
            windowText.textContent = content;
            windowImage.src = imgSrc;
            windowImage.alt = content;
        }, 500);
    }
    
    function closeWindow() {
        windowDiv.classList.add("exit");
        setTimeout(() => {
            windowDiv.classList.remove("active");
            windowDiv.style.visibility = "hidden";
        }, 500);
    }
    
    paths.forEach(path => {
        path.addEventListener("click", () => openWindow(path.getAttribute("name"), path.getAttribute("data-img")));
    });
    
    homeBtn.addEventListener("click", closeWindow);


    function selectCountry(country) {
        if (selectedCountry) {
            selectedCountry.classList.remove('selected'); // Retire la couleur de l'ancien pays
        }
        selectedCountry = country;
        selectedCountry.classList.add('selected'); // Applique la couleur au nouveau pays
    }
    
    pays.forEach(p => {
        p.addEventListener('click', function () {
            if (selectedCountry === p) return; 

            selectCountry(p);
            if (currentZoom !== defaultZoom) {
                resetMap(() => {
                    currentZoom = 2;
                    centerCountry(p);
                });
            } else {
                currentZoom = 2;
                centerCountry(p);
            }
        });
    });


    // Centrer un pays au milieu de l'écran
    function centerCountry(country) {
        if (isResetting) return;

        const bbox = country.getBBox();
        const containerBox = mapContainer.getBoundingClientRect();
        const svgBox = svg.getBoundingClientRect();

        // Calculer le centre du pays
        const centerX = bbox.x + bbox.width / 4;
        const centerY = bbox.y + bbox.height / 4;

        // Calculer la translation pour centrer le pays
        translateX = (containerBox.width / 2 - centerX * currentZoom);
        translateY = (containerBox.height / 2 - centerY * currentZoom);

        // Calculer les limites de translation
        const maxTranslateX = (svgBox.width * currentZoom - containerBox.width) / 2;
        const maxTranslateY = (svgBox.height * currentZoom - containerBox.height) / 2;
        const minTranslateX = -maxTranslateX;
        const minTranslateY = -maxTranslateY;

        // Limiter la translation
        translateX = Math.min(Math.max(translateX, minTranslateX), maxTranslateX);
        translateY = Math.min(Math.max(translateY, minTranslateY), maxTranslateY);

        applyTransform();
    }

    // Appliquer la transformation avec animation fluide
    function applyTransform() {
        svg.style.transition = 'transform 0.5s ease-out';
        svg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
        zoomValue.textContent = `${Math.round(currentZoom * 100)}%`;
    }

    // Réinitialiser la carte en douceur
    function resetMap(callback) {
        isResetting = true;
        currentZoom = defaultZoom;
        translateX = 0;
        translateY = 0;
        svg.style.transition = 'transform 0.5s ease-in-out';
        applyTransform();

        setTimeout(() => {
            isResetting = false;
            if (callback) callback();
        }, 500);
    }

    // Zoom avant
    zoomInBtn.addEventListener('click', function () {
        if (currentZoom < maxZoom) {
            currentZoom += zoomStep;
            applyTransform();
        }
    });

    // Zoom arrière
    zoomOutBtn.addEventListener('click', function () {
        if (currentZoom > minZoom) {
            currentZoom -= zoomStep;
            applyTransform();
        }
    });

    // Retour à la position initiale
    homeBtn.addEventListener('click', function () {
        resetMap(() => {
            // Retirer la classe du pays sélectionné après le reset
            if (selectedCountry) {
                selectedCountry.classList.remove('selected');
                selectedCountry = null;
            }
        });
    });

    // Clic sur un pays : Reset + Zoom smooth
    pays.forEach(p => {
        p.addEventListener('click', function () {
            if (selectedCountry === p) return; // Évite de zoomer encore si on reclique sur le même

            if (selectedCountry) {
                selectedCountry.classList.remove('active'); // Retire l'effet du précédent
            }
            selectedCountry = p; // Met à jour le pays sélectionné
            selectedCountry.classList.add('active');

            if (currentZoom !== defaultZoom) {
                resetMap(() => {
                    currentZoom = 2;
                    centerCountry(p);
                });
            } else {
                currentZoom = 2;
                centerCountry(p);
            }
        });
    });
});