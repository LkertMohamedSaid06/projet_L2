function switchTab(tabName) {
      document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

      document.getElementById(tabName + 'Tab').classList.add('active');
      document.getElementById(tabName + 'Content').classList.add('active');
    }

    // JS POUR SELECTIONNER UNE CLASSE DE VOL
    function selectClass(classId) {
      document.querySelectorAll('.class-option').forEach(option => option.classList.remove('selected'));
      document.getElementById(classId).classList.add('selected');
      updatePrice();
    }

    // JS POUR GERER LES OFFRES
    const selectedOffers = {};

    function toggleOffer(el, offerKey, price) {
      if (selectedOffers[offerKey]) {
        delete selectedOffers[offerKey];
        el.classList.remove('active');
      } else {
        selectedOffers[offerKey] = price;
        el.classList.add('active');
      }
      updatePrice();
    }
document.querySelectorAll('.card > *').forEach((el, i) => {
  el.classList.add('fade-in-up');
  el.style.animationDelay = `${i * 0.1}s`;
});

    // CALCUL DU PRIX
    function updatePrice() {
      let basePrice = 25000;
      const selectedClass = document.querySelector('.class-option.selected');
      if (selectedClass) {
        const priceText = selectedClass.querySelector('.class-price').innerText;
        basePrice = parseInt(priceText.replace(/[^\d]/g, ''));
      }

      const passengerCount = parseInt(document.getElementById('passengerCount')?.value || '1');
      let specialOffersTotal = 0;

      for (const key in selectedOffers) {
        const price = selectedOffers[key];
        if (key === 'carRental') {
          specialOffersTotal += price;
        } else {
          specialOffersTotal += price * passengerCount;
        }
      }

      const taxes = 3500;
      const perPassenger = basePrice + taxes;
      const total = perPassenger * passengerCount + specialOffersTotal;

      document.getElementById('baseFare').innerText = basePrice + ' DA';
      document.getElementById('taxes').innerText = taxes + ' DA';
      document.getElementById('specialOffers').innerText = specialOffersTotal + ' DA';
      document.getElementById('specialOffersRow').style.display = specialOffersTotal ? 'flex' : 'none';
      document.getElementById('passengerLabel').innerText = `Passenger(s) (x${passengerCount})`;
      document.getElementById('perPassengerTotal').innerText = (basePrice + taxes) + ' DA';
      document.getElementById('totalPrice').innerText = total + ' DA';
    }

    // INIT AU CHARGEMENT
    window.onload = () => {
      updatePrice();
    };