(() => {
  const menuButton = document.getElementById('menuToggle');
  const menu = document.getElementById('mainNav');
  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Открыть меню');
    }));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { menu.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }
    });
  }

  const gallery = document.getElementById('galleryTrack');
  if (gallery) {
    const scrollByCard = direction => {
      const item = gallery.querySelector('.gallery-item');
      if (!item) return;
      const gap = parseFloat(window.getComputedStyle(gallery).columnGap) || 14;
      gallery.scrollBy({ left: direction * (item.getBoundingClientRect().width + gap), behavior: 'smooth' });
    };
    document.getElementById('galleryPrev')?.addEventListener('click', () => scrollByCard(-1));
    document.getElementById('galleryNext')?.addEventListener('click', () => scrollByCard(1));
  }

  const modal = document.getElementById('demoModal');
  const close = () => modal?.close();
  document.querySelectorAll('.js-booking').forEach(link => link.addEventListener('click', event => {
    if ((link.getAttribute('href') || '').trim() === '#') {
      event.preventDefault();
      modal?.showModal();
    }
  }));
  document.getElementById('closeModal')?.addEventListener('click', close);
  document.getElementById('confirmModal')?.addEventListener('click', close);
  modal?.addEventListener('click', event => { if (event.target === modal) close(); });
})();

if ('IntersectionObserver' in window && matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  const headings = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        headings.unobserve(entry.target);
      }
    }
  }, { threshold: 0.25 });
  document.querySelectorAll('.section h2').forEach(heading => headings.observe(heading));
}
