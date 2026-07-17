const KAKAO_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.48 3 2 6.58 2 11c0 2.86 1.87 5.37 4.68 6.79-.15.55-.96 3.37-.99 3.6 0 0-.02.16.08.22.1.06.22.02.22.02.29-.04 3.36-2.2 3.87-2.56.68.1 1.39.15 2.14.15 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/></svg>';

const ICONS = {
  check: '<path d="M20 6L9 17l-5-5"/>',
  shield: '<path d="M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
  chart: '<path d="M3 12l2-7h14l2 7"/><path d="M5 12v7h14v-7"/>'
};

function esc(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : String(str);
  return div.innerHTML;
}

function kakaoButton(className, label) {
  return `<a href="${esc(content.site.kakaoLink)}" target="_blank" rel="noopener" class="${className}">${KAKAO_ICON}${esc(label)}</a>`;
}

let content;

function render() {
  document.querySelectorAll('[data-logo]').forEach(el => {
    el.innerHTML = `${esc(content.site.companyNamePrefix)}<span>${esc(content.site.companyNameGold)}</span>`;
  });

  document.getElementById('nav-menu').innerHTML = content.header.menu
    .map(item => `<li><a href="${esc(item.href)}">${esc(item.label)}</a></li>`).join('');

  document.getElementById('hero-bg').style.backgroundImage =
    `linear-gradient(180deg, rgba(10,30,20,0.45), rgba(10,25,18,0.78)), url('${content.hero.backgroundImage}')`;
  document.getElementById('hero-eyebrow').textContent = content.hero.eyebrow;
  document.getElementById('hero-title').innerHTML = `${esc(content.hero.titleLine1)}<br>${esc(content.hero.titleLine2)}`;
  document.getElementById('hero-desc').textContent = content.hero.description;
  document.getElementById('hero-buttons').innerHTML = `
    <a href="#contact" class="btn btn-gold">무료 견적 문의</a>
    ${kakaoButton('btn btn-kakao', '카톡으로 문의하기')}
    <a href="#gallery" class="btn btn-outline">시공사례 보기</a>
  `;

  document.getElementById('stats-strip').innerHTML = content.stats
    .map(s => `<div class="stat-item"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join('');

  document.getElementById('about-img').src = content.about.image;
  document.getElementById('about-paragraphs').innerHTML = content.about.paragraphs
    .map(p => `<p>${esc(p)}</p>`).join('');
  document.getElementById('about-stats').innerHTML = content.about.stats
    .map(s => `<div><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join('');

  document.getElementById('features-title').textContent = content.features.title;
  document.getElementById('features-desc').textContent = content.features.description;
  document.getElementById('feature-grid').innerHTML = content.features.items.map(f => `
    <div class="feature-card">
      <div class="feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[f.icon] || ICONS.check}</svg></div>
      <h3>${esc(f.title)}</h3>
      <p>${esc(f.desc)}</p>
    </div>`).join('');

  document.getElementById('products-title').textContent = content.products.title;
  document.getElementById('products-desc').textContent = content.products.description;
  document.getElementById('product-grid').innerHTML = content.products.items.map(p => `
    <div class="product-card">
      <div class="product-thumb">
        <span class="product-tag">${esc(p.tag)}</span>
        <img src="${p.image}" alt="${esc(p.title)}">
      </div>
      <div class="info">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.desc)}</p>
      </div>
    </div>`).join('');

  document.getElementById('gallery-title').textContent = content.gallery.title;
  document.getElementById('gallery-desc').textContent = content.gallery.description;
  document.getElementById('gallery-grid').innerHTML = content.gallery.items.map(g => `
    <div class="gallery-item">
      <img src="${g.image}" alt="${esc(g.caption)}">
      <div class="gallery-overlay"><span>${esc(g.caption)}</span></div>
    </div>`).join('');

  document.getElementById('testi-title').textContent = content.testimonials.title;
  document.getElementById('testi-desc').textContent = content.testimonials.description;
  document.getElementById('testi-grid').innerHTML = content.testimonials.items.map(t => `
    <div class="testi-card">
      <div class="testi-stars">${'★'.repeat(t.stars)}${'☆'.repeat(5 - t.stars)}</div>
      <p>"${esc(t.quote)}"</p>
      <div class="testi-name">${esc(t.name)}</div>
      <div class="testi-role">${esc(t.role)}</div>
    </div>`).join('');

  document.getElementById('contact').style.backgroundImage =
    `linear-gradient(180deg, rgba(10,20,15,0.88), rgba(10,20,15,0.92)), url('${content.contact.backgroundImage}')`;
  document.getElementById('contact-title').textContent = content.contact.title;
  document.getElementById('contact-desc').textContent = content.contact.description;
  document.getElementById('contact-kakao').innerHTML = kakaoButton('btn btn-kakao', '카톡으로 빠르게 문의하기');
  document.getElementById('contact-info').innerHTML = `
    <li><strong>전화 문의</strong>${esc(content.site.phone)}</li>
    <li><strong>이메일</strong>${esc(content.site.email)}</li>
    <li><strong>주소</strong>${esc(content.site.address)}</li>
    <li><strong>운영시간</strong>${esc(content.site.hours)}</li>
  `;

  document.getElementById('footer-info').textContent =
    `사업자등록번호 ${content.site.businessNumber} · 대표 ${content.site.ceo} · 주소 ${content.site.address}`;
}

fetch('content.json')
  .then(res => res.json())
  .then(data => {
    content = data;
    render();
  })
  .catch(err => console.error('콘텐츠를 불러오지 못했습니다.', err));
