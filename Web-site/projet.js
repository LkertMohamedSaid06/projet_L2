let text = document.querySelector('text1');
let Bg = document.querySelector('bg');
let noBg = document.querySelector('noBg');

window.addEventListener('scroll', () => {
     let value = window.scrollY;

     text1.style.marginTop = value * 2.5 + 'px';
     bg.style.marginTop = value * -0.4 + 'px';
     noBg.style.marginTop = value * 0.4 + 'px';
});


//sldier 
let items = document.querySelectorAll('.slider .list .item'); // Sélectionne tous les éléments avec la classe 'item' dans le slider
let next = document.getElementById('next'); // Sélectionne le bouton 'next' par son ID
let prev = document.getElementById('prev'); // Sélectionne le bouton 'prev' par son ID
let thumbnails = document.querySelectorAll('.thumbnail .item'); // Sélectionne tous les éléments avec la classe 'item' dans les vignettes

// Paramètres de configuration
let countItem = items.length; // Nombre total d'éléments dans le slider
let itemActive = 0; // Index de l'élément actif

// Événement de clic sur le bouton 'next'
next.onclick = function() {
    itemActive = itemActive + 1; // Incrémente l'index de l'élément actif
    if (itemActive >= countItem) { // Si l'index dépasse le nombre total d'éléments
        itemActive = 0; // Réinitialise l'index à 0
    }
    showSlider(); // Appelle la fonction pour afficher le slider
}

// Événement de clic sur le bouton 'prev'
prev.onclick = function() {
    itemActive = itemActive - 1; // Décrémente l'index de l'élément actif
    if (itemActive < 0) { // Si l'index est inférieur à 0
        itemActive = countItem - 1; // Réinitialise l'index au dernier élément
    }
    showSlider(); // Appelle la fonction pour afficher le slider
}

// Exécution automatique du slider toutes les 5 secondes
let refreshInterval = setInterval(() => {
    next.click(); // Simule un clic sur le bouton 'next'
}, 5000);

function showSlider() {
    // Supprime la classe 'active' de l'ancien élément actif
    let itemActiveOld = document.querySelector('.slider .list .item.active'); // Sélectionne l'ancien élément actif
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active'); // Sélectionne l'ancienne vignette active
    itemActiveOld.classList.remove('active'); // Supprime la classe 'active' de l'ancien élément actif
    thumbnailActiveOld.classList.remove('active'); // Supprime la classe 'active' de l'ancienne vignette active

    // Ajoute la classe 'active' au nouvel élément actif
    items[itemActive].classList.add('active'); // Ajoute la classe 'active' au nouvel élément actif
    thumbnails[itemActive].classList.add('active'); // Ajoute la classe 'active' à la nouvelle vignette active
    setPositionThumbnail(); // Appelle la fonction pour ajuster la position des vignettes

    // Réinitialise l'intervalle de temps pour l'exécution automatique du slider
    clearInterval(refreshInterval); // Efface l'intervalle de temps précédent
    refreshInterval = setInterval(() => {
        next.click(); // Simule un clic sur le bouton 'next'
    }, 5000);
}

function setPositionThumbnail() {
    let thumbnailActive = document.querySelector('.thumbnail .item.active'); // Sélectionne la vignette active
    let rect = thumbnailActive.getBoundingClientRect(); // Obtient les coordonnées de la vignette active
    if (rect.left < 0 || rect.right > window.innerWidth) { // Si la vignette est en dehors de la vue
        thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'nearest' }); // Fait défiler la vignette dans la vue
    }
}

// Événement de clic sur les vignettes
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => { // Ajoute un écouteur d'événement de clic à chaque vignette
        itemActive = index; // Met à jour l'index de l'élément actif avec l'index de la vignette cliquée
        showSlider(); // Appelle la fonction pour afficher le slider
    });
});

let dots = document.querySelectorAll('.dots-vertical .dot'); // Sélection des dots

function updateDots(index) {
    document.querySelector('.dots-vertical .dot.active')?.classList.remove('active');
    dots[index]?.classList.add('active');
}

// Met à jour la fonction showSlider
function showSlider() {
    // ... EXISTANT ...
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
    updateDots(itemActive); // synchronise le dot

    setPositionThumbnail();

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000);
}

// Permet aussi de cliquer sur les dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    });
});

// video section 2 
    const videoWrapper = document.getElementById("videoWrapper");
    const video = document.getElementById("myVideo");
    const playBtn = document.getElementById("playBtn");
    const closeBtn = document.getElementById("closeBtn");
    const blurBg = document.getElementById("blurBg");

    // Position et taille initiales (en px) : coin bas droit, comme demandé
    const initialSize = { width: 600, height: 425 };

    const initialMargin = { bottom: 300 , right: 170 };

    // Fonction pour convertir bottom/right en top/left
    function setInitialPosition() {
      // window.innerHeight et innerWidth disponibles
      const top = window.innerHeight - initialSize.height - initialMargin.bottom;
      const left = window.innerWidth - initialSize.width - initialMargin.right;

      videoWrapper.style.position = "absolute";
      videoWrapper.style.top = top + "px";
      videoWrapper.style.left = left + "px";
      videoWrapper.style.width = initialSize.width + "px";
      videoWrapper.style.height = initialSize.height + "px";
      videoWrapper.style.bottom = "auto";
      videoWrapper.style.right = "auto";
      videoWrapper.style.zIndex = 10;
    }

    // Fonction zoom vers centre, avec taille agrandie
    function zoomToCenter() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // On veut une vidéo large max 80% de la largeur viewport
      const targetWidth = vw * 0.8;
      // Garder ratio 16:9
      const targetHeight = targetWidth * 9 / 16;

      // Positionner au centre avec top/left calculé
      const top = (vh - targetHeight) / 2;
      const left = (vw - targetWidth) / 2;

      videoWrapper.style.top = top + "px";
      videoWrapper.style.left = left + "px";
      videoWrapper.style.width = targetWidth + "px";
      videoWrapper.style.height = targetHeight + "px";
      videoWrapper.style.zIndex = 1001;
    }

    // Initial setup
    setInitialPosition();

    // Jouer et zoomer
    playBtn.addEventListener("click", () => {
      blurBg.classList.add("active");
      closeBtn.classList.add("show");
      zoomToCenter();
      video.muted = false;
      video.volume = 1.0;
      video.play();
    });

    // Revenir à la position initiale
    closeBtn.addEventListener("click", () => {
      blurBg.classList.remove("active");
      closeBtn.classList.remove("show");
      setInitialPosition();
      video.pause();
      video.currentTime = 0;
    });

    // Si redimensionnement fenêtre, repositionner la vidéo correctement selon état
    window.addEventListener("resize", () => {
      if (closeBtn.classList.contains("show")) {
        zoomToCenter();
      } else {
        setInitialPosition();
      }
    });


 const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // facultatif
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));



function setupSlider(containerId, trackId, speed, direction = 1) {
      const container = document.getElementById(containerId);
      const track = document.getElementById(trackId);

      // Dupliquer slides pour effet infini
      const slides = Array.from(track.children);
      slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        track.appendChild(clone);
      });

      const slideWidth = slides[0].offsetWidth + 20; // largeur slide + margin (10px * 2)
      const trackWidth = slideWidth * slides.length * 2;

      let position = 0;
      let isDragging = false;
      let dragStartX = 0;
      let dragDeltaX = 0;

      function animate() {
        if (!isDragging) {
          position -= speed * direction;
        } else {
          position += dragDeltaX;
          dragDeltaX = 0;
        }

        if (position <= -trackWidth / 2) {
          position += trackWidth / 2;
        }
        if (position > 0) {
          position -= trackWidth / 2;
        }

        track.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animate);
      }

      container.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragStartX = e.clientX;
        container.style.cursor = 'grabbing';
      });

      container.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        dragDeltaX = e.clientX - dragStartX;
        dragStartX = e.clientX;
      });

      container.addEventListener('mouseup', () => {
        isDragging = false;
        container.style.cursor = 'grab';
      });

      container.addEventListener('mouseleave', () => {
        if (isDragging) {
          isDragging = false;
          container.style.cursor = 'grab';
        }
      });

      container.addEventListener('touchstart', (e) => {
        isDragging = true;
        dragStartX = e.touches[0].clientX;
        container.style.cursor = 'grabbing';
      });

      container.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        dragDeltaX = e.touches[0].clientX - dragStartX;
        dragStartX = e.touches[0].clientX;
      });

      container.addEventListener('touchend', () => {
        isDragging = false;
        container.style.cursor = 'grab';
      });

      animate();
    }

    // Slider 1 : sens normal (gauche -> droite)
    setupSlider('sliderContainer1', 'sliderTrack1', 0.5, 1);

    // Slider 2 : sens inverse (droite -> gauche)
    setupSlider('sliderContainer2', 'sliderTrack2', 0.5, -1);

    // Slider 3 : sens normal (comme slider 1)
    setupSlider('sliderContainer3', 'sliderTrack3', 0.5, 1);



     const wrappers = document.querySelectorAll('.hover-wrapper');
    let activeIndex = 0; // Première active au départ

    function setActive(index) {
      wrappers.forEach((w, i) => {
        if (i === index) {
          w.classList.add('active');
        } else {
          w.classList.remove('active');
        }
      });
      activeIndex = index;
    }

    // Initialisation : première box active
    setActive(0);

    // Au hover, on change la box active
    wrappers.forEach((wrapper, index) => {
      wrapper.addEventListener('mouseenter', () => {
        setActive(index);
      });
    });


    //honey moon 
    const cards = Array.from(document.querySelectorAll('.card'));
  let current = 0;

  function mod(n, m) {
    return ((n % m) + m) % m;
  }

  function renderCards() {
    const total = cards.length;

    cards.forEach((card, i) => {
      const offset = mod(i - current, total);
      let pos = offset;

      if (offset > total / 2) {
        pos = offset - total;
      }

      // Config en fonction de la distance
      const absPos = Math.abs(pos);

      if (absPos > 2) {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.7) translateX(0)';
        card.style.filter = 'blur(8px)';
        card.style.zIndex = '0';
      } else {
        const scale = 1 - absPos * 0.15; // 1.0, 0.85, 0.7
        const translate = pos * 160;
        const rotateY = pos * -10;
        const blur = absPos * 2.5; // 0px, 2.5px, 5px

        card.style.opacity = '1';
        card.style.transform = `
          translateX(${translate}px)
          scale(${scale})
          rotateY(${rotateY}deg)
        `;
        card.style.filter = `blur(${blur}px)`;
        card.style.zIndex = 10 - absPos;
      }
    });
  }

  function move(dir) {
    current = mod(current + dir, cards.length);
    renderCards();
  }

  renderCards();

  function goToCountry(country) {
    window.location.href = `/pays/italie-rome.html?country=${country}`;
  }
  