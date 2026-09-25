'use strict';

const whatsappNumber = '522321191660';
const whatsappBase = `https://wa.me/${whatsappNumber}`;
const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Blvd.%20Alfinio%20Flores%20esq.%20Guillermo%20Prieto%2C%20Col.%20Melchor%20Ocampo%2C%20Mart%C3%ADnez%20de%20la%20Torre%2C%20Veracruz%2C%2093603';

// Menú adaptable
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(willOpen));
    navigation.classList.toggle('is-open', willOpen);
    document.body.classList.toggle('menu-open', willOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1020) closeMenu();
  });
}

// Sección activa del menú
const navLinks = [...document.querySelectorAll('.nav-link')];
const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`);
    });
  }, { rootMargin: '-22% 0px -62% 0px', threshold: [0, .12, .35] });

  observedSections.forEach((section) => sectionObserver.observe(section));
}

// Pestañas de misión, visión y valores
const aboutTabs = [...document.querySelectorAll('[data-about-tab]')];
const aboutPanels = [...document.querySelectorAll('[data-about-panel]')];

function selectAboutTab(selectedTab) {
  const key = selectedTab.dataset.aboutTab;

  aboutTabs.forEach((tab) => {
    const active = tab === selectedTab;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });

  aboutPanels.forEach((panel) => {
    const active = panel.dataset.aboutPanel === key;
    panel.hidden = !active;
    panel.classList.toggle('is-active', active);
  });
}

aboutTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectAboutTab(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % aboutTabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + aboutTabs.length) % aboutTabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = aboutTabs.length - 1;
    selectAboutTab(aboutTabs[nextIndex]);
    aboutTabs[nextIndex].focus();
  });
});

// Carrusel continuo de servicios
const serviceTrack = document.querySelector('#services-track');
const serviceSlides = [...document.querySelectorAll('.service-slide')];
const servicePrev = document.querySelector('#services-prev');
const serviceNext = document.querySelector('#services-next');
const serviceCurrent = document.querySelector('#service-current');
const serviceProgress = document.querySelector('#service-progress');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let activeService = 0;
let carouselTimer;
let carouselScrollFrame;

function updateCarouselStatus(index) {
  activeService = Math.max(0, Math.min(index, serviceSlides.length - 1));
  if (serviceCurrent) serviceCurrent.textContent = String(activeService + 1).padStart(2, '0');
  if (serviceProgress) serviceProgress.style.width = `${((activeService + 1) / serviceSlides.length) * 100}%`;
}

function goToService(index) {
  if (!serviceTrack || !serviceSlides.length) return;
  const normalized = (index + serviceSlides.length) % serviceSlides.length;
  const horizontalPadding = Number.parseFloat(getComputedStyle(serviceTrack).paddingLeft) || 0;
  serviceTrack.scrollTo({
    left: serviceSlides[normalized].offsetLeft - horizontalPadding,
    behavior: reduceMotion ? 'auto' : 'smooth'
  });
  updateCarouselStatus(normalized);
}

function restartCarousel() {
  window.clearInterval(carouselTimer);
  if (reduceMotion || !serviceTrack) return;
  carouselTimer = window.setInterval(() => {
    if (!document.hidden) goToService(activeService + 1);
  }, 5200);
}

if (serviceTrack && serviceSlides.length) {
  servicePrev?.addEventListener('click', () => {
    goToService(activeService - 1);
    restartCarousel();
  });
  serviceNext?.addEventListener('click', () => {
    goToService(activeService + 1);
    restartCarousel();
  });

  serviceTrack.addEventListener('scroll', () => {
    window.cancelAnimationFrame(carouselScrollFrame);
    carouselScrollFrame = window.requestAnimationFrame(() => {
      const horizontalPadding = Number.parseFloat(getComputedStyle(serviceTrack).paddingLeft) || 0;
      const position = serviceTrack.scrollLeft + horizontalPadding;
      const closest = serviceSlides.reduce((bestIndex, slide, index) => {
        const currentDistance = Math.abs(slide.offsetLeft - position);
        const bestDistance = Math.abs(serviceSlides[bestIndex].offsetLeft - position);
        return currentDistance < bestDistance ? index : bestIndex;
      }, 0);
      updateCarouselStatus(closest);
    });
  }, { passive: true });

  serviceTrack.addEventListener('pointerenter', () => window.clearInterval(carouselTimer));
  serviceTrack.addEventListener('pointerleave', restartCarousel);
  serviceTrack.addEventListener('focusin', () => window.clearInterval(carouselTimer));
  serviceTrack.addEventListener('focusout', restartCarousel);
  serviceTrack.addEventListener('touchstart', () => window.clearInterval(carouselTimer), { passive: true });
  serviceTrack.addEventListener('touchend', restartCarousel, { passive: true });
  updateCarouselStatus(0);
  restartCarousel();
}

// Asistente y cotizador
const assistantDialog = document.querySelector('#assistant-dialog');
const assistantBody = document.querySelector('#assistant-body');
const assistantClose = document.querySelector('#assistant-close');
const assistantLauncher = document.querySelector('#assistant-launcher');
const quoteForm = document.querySelector('#chat-quote-form');
const quoteSummary = document.querySelector('#quote-summary');
const summaryTable = document.querySelector('#summary-table');
const assistantWhatsappLink = document.querySelector('#assistant-whatsapp-link');
const editQuote = document.querySelector('#edit-quote');

function scrollAssistantToBottom() {
  window.requestAnimationFrame(() => {
    if (assistantBody) assistantBody.scrollTo({ top: assistantBody.scrollHeight, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
}

function showQuoteForm() {
  if (!quoteForm || !quoteSummary) return;
  quoteSummary.hidden = true;
  quoteForm.hidden = false;
  scrollAssistantToBottom();
  window.setTimeout(() => quoteForm.querySelector('input')?.focus(), 180);
}

function openAssistant(view = 'home') {
  if (!assistantDialog) return;
  closeMenu();
  if (!assistantDialog.open) {
    if (typeof assistantDialog.showModal === 'function') assistantDialog.showModal();
    else assistantDialog.setAttribute('open', '');
  }
  if (view === 'quote') showQuoteForm();
  else scrollAssistantToBottom();
}

function closeAssistant() {
  if (!assistantDialog) return;
  if (typeof assistantDialog.close === 'function') assistantDialog.close();
  else assistantDialog.removeAttribute('open');
}

assistantLauncher?.addEventListener('click', () => openAssistant('home'));
document.querySelectorAll('[data-open-assistant]').forEach((button) => {
  button.addEventListener('click', () => openAssistant(button.dataset.chatView || 'home'));
});
assistantClose?.addEventListener('click', closeAssistant);
assistantDialog?.addEventListener('click', (event) => {
  if (event.target === assistantDialog) closeAssistant();
});

function appendBotMessage(content) {
  if (!assistantBody) return;
  const message = document.createElement('div');
  message.className = 'chat-message bot-message';
  message.innerHTML = content;
  const actions = assistantBody.querySelector('.quick-actions');
  assistantBody.insertBefore(message, actions || quoteForm);
  scrollAssistantToBottom();
}

const chatAnswers = {
  location: `<p><strong>Estamos en Martínez de la Torre.</strong></p><p>Blvd. Alfinio Flores esq. Guillermo Prieto, Col. Melchor Ocampo, Veracruz. C. P. 93603.</p><p><a href="${mapsUrl}" target="_blank" rel="noopener noreferrer">Abrir ubicación en Google Maps ↗</a></p>`,
  hours: '<p><strong>Horario de atención:</strong></p><p>Lunes a viernes, de 9:00 a. m. a 8:00 p. m. Para el horario de cierre del sábado, confírmalo por WhatsApp y te atendemos con gusto.</p>',
  delivery: '<p><strong>El tiempo de entrega depende del proyecto.</strong></p><p>Se calcula según el servicio, medidas, material, cantidad, diseño e instalación. Envíanos tu solicitud y te confirmaremos un plazo realista junto con la cotización.</p>',
  services: '<p><strong>Servicios disponibles:</strong></p><p>Diseño gráfico, anuncios luminosos, letras 3D, letreros LED y acrílicos, señalética, lonas y toldos, logotipos, publicidad para redes sociales y papelería.</p>',
  whatsapp: `<p>WhatsApp es nuestro medio principal. <a href="${whatsappBase}" target="_blank" rel="noopener noreferrer">Escribir al 232 119 1660 ↗</a></p>`
};

document.querySelectorAll('[data-chat-action]').forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.chatAction;
    if (action === 'quote') {
      showQuoteForm();
      return;
    }
    appendBotMessage(chatAnswers[action]);
  });
});

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[character]);
}

function formatDate(date) {
  if (!date) return 'Por definir';
  return new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
    .format(new Date(`${date}T12:00:00`));
}

quoteForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!quoteForm.reportValidity()) return;

  const formData = new FormData(quoteForm);
  const values = {
    nombre: formData.get('nombre'),
    telefono: formData.get('telefono'),
    correo: formData.get('correo'),
    servicio: formData.get('servicio'),
    descripcion: formData.get('descripcion'),
    medidas: formData.get('medidas') || 'Por definir',
    fecha: formatDate(formData.get('fecha')),
    archivo: formData.get('archivo')
  };

  const rows = [
    ['Nombre / Empresa', values.nombre],
    ['Teléfono / WhatsApp', values.telefono],
    ['Correo electrónico', values.correo],
    ['Servicio solicitado', values.servicio],
    ['Descripción', values.descripcion],
    ['Medidas / Cantidad', values.medidas],
    ['Fecha requerida', values.fecha],
    ['Diseño / Logotipo', values.archivo]
  ];

  summaryTable.innerHTML = `<table><tbody>${rows.map(([label, value]) => `<tr><th scope="row">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`).join('')}</tbody></table>`;

  const whatsappMessage = [
    '*SOLICITUD DE COTIZACIÓN · URBAY PUBLICIDAD*',
    '',
    `*Nombre / Empresa:* ${values.nombre}`,
    `*Teléfono / WhatsApp:* ${values.telefono}`,
    `*Correo electrónico:* ${values.correo}`,
    `*Servicio solicitado:* ${values.servicio}`,
    `*Descripción del trabajo:* ${values.descripcion}`,
    `*Medidas o cantidad:* ${values.medidas}`,
    `*Fecha requerida:* ${values.fecha}`,
    `*Diseño o logotipo:* ${values.archivo}`,
    '',
    'Solicito información sobre precio, materiales y tiempo de entrega.'
  ].join('\n');

  assistantWhatsappLink.href = `${whatsappBase}?text=${encodeURIComponent(whatsappMessage)}`;
  quoteForm.hidden = true;
  quoteSummary.hidden = false;
  scrollAssistantToBottom();
});

editQuote?.addEventListener('click', showQuoteForm);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
