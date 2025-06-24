import { comment } from "../ajax/aComment.js"
import conexion from "./exports/conexion.js"
import barraNavegacion from "./exports/scroll-index.js"
import validacionComentarios from "./exports/validacionComentario.js"

const d = document
const $formulario = d.querySelector(".formulario")
const $toastContenedor = d.querySelector(".toast__contenedor")


d.addEventListener("DOMContentLoaded", (e)=>{
    barraNavegacion(".header")
    conexion()

    // Validacion de formulario para comentarios
    let validacion = validacionComentarios($formulario)
    $formulario.addEventListener("submit", async (e)=>{
      e.preventDefault()
      if(validacion()){
        await comment($formulario, $toastContenedor)
      }else{
        return
      }
    })
    
})

// Carrusel
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slidesContainer = document.querySelector('.slides');

function mostrarSlide(n) {
  currentSlide = (n + slides.length) % slides.length;
  slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  actualizarDots();
}
// Autoavance cada 4 segsundo
function cambiarSlide(n) {
  mostrarSlide(currentSlide + n);
}
setInterval(() => {
  cambiarSlide(1);
}, 4000);

//Botones para mover slides
document.querySelector('.btn-prev').addEventListener('click', () => {
    mostrarSlide(currentSlide - 1);
  });
document.querySelector('.btn-next').addEventListener('click', () => {
mostrarSlide(currentSlide + 1);
});

//Dots de navegación
const dotsContainer = document.querySelector('.navegacion-dots');

slides.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  dot.addEventListener('click', () => mostrarSlide(index));
  dotsContainer.appendChild(dot);
});

function actualizarDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => dot.classList.remove('activo'));
  dots[currentSlide].classList.add('activo');
}

// Mostrar el primer slide
mostrarSlide(0);