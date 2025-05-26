// italie-rome.js
import { destinationsData } from "./data.js";

const urlParams = new URLSearchParams(window.location.search);
const country = urlParams.get("country") || "italy"; // fallback par défaut

const data = destinationsData[country];

// HERO SECTION
document.querySelector(".bg-img img").src = data.hero.backgroundImage;
document.querySelector(".hero-background-text").textContent = data.hero.label;
document.querySelector(".hero-title").textContent = data.hero.title;
document.querySelector(".hero-text").textContent = data.hero.description;

// POPULAR DESTINATIONS
const popularList = document.querySelector(".popular-list");
popularList.innerHTML = "";
data.popularDestinations.forEach((dest) => {
  popularList.innerHTML += `
    <li>
      <div class="popular-card">
        <figure class="card-img">
          <img src="${dest.image}" alt="${dest.title}">
        </figure>
        <div class="card-content">
          <div class="card-rating">
            ${"<ion-icon name='star'></ion-icon>".repeat(5)}
          </div>
          <p class="card-subtitle"><a href="#">${dest.subtitle}</a></p>
          <h3 class="h3 card-title"><a href="#">${dest.title}</a></h3>
          <p class="card-text">${dest.description}</p>
        </div>
      </div>
    </li>
  `;
});

// PACKAGE SECTION
const packageList = document.querySelector(".package-list");
packageList.innerHTML = "";
data.packages.forEach((pack) => {
  packageList.innerHTML += `
    <li>
      <div class="package-card">
        <figure class="card-banner">
          <img src="${pack.image}" alt="${pack.title}">
        </figure>
        <div class="card-content">
          <h3 class="h3 card-title">${pack.title}</h3>
          <p class="card-text">${pack.description}</p>
          <ul class="card-meta-list">
            <li class="card-meta-item">
              <div class="meta-box">
                <ion-icon name="time"></ion-icon>
                <p class="text">7D/6N</p>
              </div>
            </li>
            <li class="card-meta-item">
              <div class="meta-box">
                <ion-icon name="people"></ion-icon>
                <p class="text">max : 10</p>
              </div>
            </li>
            <li class="card-meta-item">
              <div class="meta-box">
                <ion-icon name="location"></ion-icon>
                <p class="text">${country}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="card-price">
          <div class="wrapper">
            <p class="reviews">(${pack.reviews} reviews)</p>
            <div class="card-rating">
              ${"<ion-icon name='star'></ion-icon>".repeat(5)}
            </div>
          </div>
          <p class="price">$${pack.price}<span>/ per person</span></p>
          <a href="reservation.html"><button class="btn btn-secondary">Book Now</button></a>
        </div>
      </div>
    </li>
  `;
});

// GALLERY
const galleryList = document.querySelector(".gallery-list");
galleryList.innerHTML = "";
data.gallery.forEach((src, i) => {
  const gridArea = i === 2 ? "grid-area: 1 / 2 / 3 / 3;" : "";
  galleryList.innerHTML += `
    <li class="gallery-item" style="${gridArea}">
      <figure class="gallery-image">
        <img src="${src}" alt="Gallery image">
      </figure>
    </li>
  `;
});
