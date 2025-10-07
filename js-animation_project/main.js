import { gsap } from 'gsap';

gsap.set(".hero__title, .hero__btn", { opacity: 0, y: 200 });
gsap.set(".hero__descr", { opacity: 0, y: 200 });

setTimeout(() => {
  gsap.to(".hero__title, .hero__btn", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power1.in",
  });
}, 300);

setTimeout(() => {
  gsap.to(".hero__descr", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power1.in",
  });
}, 300 + 1000);


const animationImg = setTimeout(() => {
  gsap.to('.img-1', { opacity: 1, duration: 1, ease: "power1.in" });
}, 1900);

const animationImg2 = setTimeout(() => {
  gsap.to('.img-2', { opacity: 1, duration: 1, ease: "power1.in" });
}, 1900 + 1000);


const animationImg3 = setTimeout(() => {
  gsap.to('.img-3', { opacity: 1, duration: 1, ease: "power1.in" });
}, 1900 + 1000 + 1000);

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  const closeButton = document.querySelector('.close');


  const openMenu = () => {
      menu.style.display = 'block';
      setTimeout(() => {
          menu.classList.add('menu--open');
      }, 10);
      setTimeout(() => {
        gsap.to('.menu__top', {
          backgroundColor: '#111',
          duration: 1
        });
      }, 500)
      setTimeout(()=>{
        gsap.fromTo('.nav',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      )
      }, 900);
      setTimeout(()=>{
        gsap.fromTo('.social',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      )
      }, 900 + 500);
      setTimeout(()=>{
        gsap.fromTo('.menu__right',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      )
      }, 900 + 500 + 500);
    };

  const closeMenu = () => {
      menu.classList.remove('menu--open');
      setTimeout(() => {
          menu.style.display = 'none';
      }, 300);
  };

  burger.addEventListener('click', openMenu);
  closeButton.addEventListener('click', closeMenu);
});


