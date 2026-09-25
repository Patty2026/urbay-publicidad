const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const navLinks = [...document.querySelectorAll('.nav-link')];
const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`);
  });
}, { rootMargin: '-22% 0px -62% 0px', threshold: [0, .15, .4] });

observedSections.forEach((section) => sectionObserver.observe(section));

const filterButtons = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    projects.forEach((project) => {
      project.classList.toggle('is-hidden', selected !== 'todos' && project.dataset.category !== selected);
    });
  });
});

const quoteForm = document.querySelector('#quote-form');
const result = document.querySelector('#form-result');
const quoteMessage = document.querySelector('#quote-message');
const copyButton = document.querySelector('#copy-quote');
const copyStatus = document.querySelector('#copy-status');
const sendWhatsapp = document.querySelector('#send-whatsapp');
const whatsappNumber = '522321191660';

quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(quoteForm);
  quoteMessage.value = `Hola, soy ${data.get('nombre')}.

Quiero solicitar una cotización para: ${data.get('servicio')}.

Detalles del proyecto:
${data.get('detalles')}

Mi teléfono de contacto es: ${data.get('telefono')}.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(quoteMessage.value)}`;
  sendWhatsapp.href = whatsappUrl;
  result.hidden = false;
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(quoteMessage.value);
  } catch {
    quoteMessage.select();
    document.execCommand('copy');
  }
  copyStatus.textContent = 'Solicitud copiada';
  window.setTimeout(() => { copyStatus.textContent = ''; }, 2500);
});

document.querySelector('#year').textContent = new Date().getFullYear();
