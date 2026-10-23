const iconPaths = {
  house:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  bookmark:'<path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-4-6 4z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',
  arrow:'<path d="M5 12h14m-7-7 7 7-7 7"/>',
  play:'<path d="m8 5 11 7-11 7z"/>',
  pause:'<path d="M8 5v14M16 5v14"/>',
  close:'<path d="M5 5l14 14M19 5 5 19"/>',
  check:'<path d="m4 12 5 5L20 6"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  minus:'<path d="M5 12h14"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
  sparkles:'<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/>',
  'play-circle':'<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z"/>',
  volume:'<path d="M11 5 6 9H3v6h3l5 4zM15 9a4 4 0 0 1 0 6m3-9a8 8 0 0 1 0 12"/>',
  muted:'<path d="M11 5 6 9H3v6h3l5 4zM16 9l5 6m0-6-5 6"/>',
  rewind:'<path d="M12 6 4 12l8 6zM20 6l-8 6 8 6z"/>',
  forward:'<path d="m4 6 8 6-8 6zM12 6l8 6-8 6z"/>',
  headphones:'<path d="M3 14v-2a9 9 0 0 1 18 0v2M3 14h4v7H5a2 2 0 0 1-2-2zM21 14h-4v7h2a2 2 0 0 0 2-2z"/>',
  pip:'<rect x="3" y="4" width="18" height="16" rx="2"/><rect x="12" y="12" width="7" height="6" rx="1"/>',
  maximize:'<path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5"/>',
  trash:'<path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6"/>'
};

function icon(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.info}</svg>`;
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}

function safeImage(url) {
  try {
    const value = new URL(url);
    return value.protocol === 'https:' && ['storage.googleapis.com','img.youtube.com','is1-ssl.mzstatic.com','is2-ssl.mzstatic.com','is3-ssl.mzstatic.com','is4-ssl.mzstatic.com','is5-ssl.mzstatic.com','static.tvmaze.com'].includes(value.hostname) ? value.href : '';
  } catch { return ''; }
}

function safeVideo(url) {
  try {
    const value = new URL(url);
    return value.protocol === 'https:' && ['storage.googleapis.com','vpro.openbeelden.nl','audio-ssl.itunes.apple.com','video-ssl.itunes.apple.com','video.itunes.apple.com'].includes(value.hostname) ? value.href : '';
  } catch { return ''; }
}

const mediaCatalog = [
  {id:'sintel',title:'Синтель',original:'Sintel',type:'film',year:2010,duration:'15 мин',genre:'Фэнтези · Приключения',description:'Молодая девушка отправляется на поиски дракона, который однажды стал её другом. Короткая, но эмоциональная история от Blender Foundation.',poster:'https://img.youtube.com/vi/eRsGyueVLvQ/hqdefault.jpg',video:{kind:'youtube',id:'eRsGyueVLvQ'},credit:'Официальный фильм Blender Foundation'},
  {id:'bunny',title:'Большой кролик Бак',original:'Big Buck Bunny',type:'cartoon',year:2008,duration:'10 мин',genre:'Анимация · Комедия',description:'Добрый гигантский кролик наслаждается лесной жизнью, пока встреча с озорными соседями не меняет его день.',poster:'https://img.youtube.com/vi/aqz-KE-bpKQ/hqdefault.jpg',video:{kind:'youtube',id:'aqz-KE-bpKQ'},credit:'Официальный фильм Blender Foundation'},
  {id:'tears',title:'Слёзы стали',original:'Tears of Steel',type:'film',year:2012,duration:'12 мин',genre:'Фантастика · Экшен',description:'Научно-фантастический короткометражный фильм с живыми актёрами и компьютерными эффектами. Создан Blender Foundation.',poster:'https://img.youtube.com/vi/R6MlUcmOul8/hqdefault.jpg',video:{kind:'youtube',id:'R6MlUcmOul8'},credit:'Официальный фильм Blender Foundation'},
  {id:'elephants',title:'Мечта слонов',original:'Elephants Dream',type:'film',year:2006,duration:'11 мин',genre:'Фантастика · Анимация',description:'Двое путешественников исследуют необычный механический мир. Первый открытый анимационный фильм проекта Blender.',poster:'https://img.youtube.com/vi/eFQxRd0isAQ/hqdefault.jpg',video:{kind:'mp4',src:'https://vpro.openbeelden.nl/files/92/104101.ed_hd.mp4'},credit:'Blender Foundation / Netherlands Media Art Institute · CC BY 3.0'},
  {id:'caminandes',title:'Каминандес',original:'Caminandes',type:'series',year:2013,duration:'3 серии',genre:'Мультсериал · Комедия',description:'Приключения упрямого ламы Коро в Патагонии. Три короткие серии открытой анимации Blender.',poster:'https://img.youtube.com/vi/SkVqJ1SGeL0/hqdefault.jpg',episodes:[{name:'Llama Drama',duration:'1:30',youtube:'JOhiWY7XmoY'},{name:'Gran Dillama',duration:'2:27',youtube:'Z4C82eyhwgU'},{name:'Llamigos',duration:'2:31',youtube:'SkVqJ1SGeL0'}],credit:'Официальные видео Blender'},
  {id:'spring',title:'Весна',original:'Spring',type:'cartoon',year:2019,duration:'8 мин',genre:'Анимация · Фэнтези',description:'Пастушка и её собака встречают древних духов природы и запускают смену времён года. Открытый фильм Blender Studio.',poster:'https://img.youtube.com/vi/WhWc3b3KhnY/hqdefault.jpg',video:{kind:'youtube',id:'WhWc3b3KhnY'},credit:'Официальный фильм Blender Studio · CC BY 4.0'}
];

const byId = new Map(mediaCatalog.map(item => [item.id,item]));
const typeLabels = {film:'Фильм',cartoon:'Мультфильм',anime:'Аниме',series:'Сериал'};
const STORAGE_PREFIX = 'videomedia_v1_';

function load(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_PREFIX + key));
    return value === null ? fallback : value;
  } catch { return fallback; }
}

function persist(key, value) {
  try { localStorage.setItem(STORAGE_PREFIX + key,JSON.stringify(value)); } catch { showToast('Не получилось сохранить в браузере'); }
}

const savedDiscoveries = load('discovered',{});
if(savedDiscoveries && typeof savedDiscoveries === 'object') {
  for(const [key,item] of Object.entries(savedDiscoveries)) {
    if(!item || !['film','cartoon','anime','series'].includes(item.type) || typeof item.title !== 'string') continue;
    byId.set(key,{id:key,title:item.title.slice(0,160),original:item.original || '',type:item.type,year:item.year || '',duration:item.duration || 'В каталоге',genre:item.genre || '',description:item.description || 'Название из внешнего каталога. Полная бесплатная версия не предоставлена.',poster:safeImage(item.poster),video:item.video?.kind === 'preview' && safeVideo(item.video.src) ? {kind:'preview',src:safeVideo(item.video.src)} : null,credit:'Информация из внешнего каталога'});
  }
}

const initialPlanned = ['sintel','caminandes','tears'];
const state = {
  planned:Array.isArray(load('planned',initialPlanned)) ? load('planned',initialPlanned).filter(id => byId.has(id)) : initialPlanned,
  completed:load('completed',{}),
  progress:load('progress',{}),
  selected:'sintel',
  episodeIndex:0,
  filter:'all',
  searchResults:[],
  searchAbort:null,
  searchRequest:0
};

const $ = id => document.getElementById(id);
let currentVideo = null;
let toastTimer;
let searchTimer;
let saveTime = 0;

function showToast(message) {
  const el = $('toast');
  el.textContent = message;
  el.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('visible'),2600);
}

function mediaById(id) { return byId.get(id); }
function posterImage(item,cls='') {
  const poster = safeImage(item.poster);
  return poster ? `<img class="${cls}" src="${escapeHtml(poster)}" alt="Обложка: ${escapeHtml(item.title)}" loading="lazy" onerror="this.style.display='none'">` : `<span class="poster-symbol">✦</span>`;
}

function queueIds() {
  return state.planned.filter(id => !state.completed[id] && byId.has(id));
}

function renderPlanned() {
  const items = $('planned-items');
  $('planned-count').textContent = state.planned.length;
  $('sidebar-planned-count').textContent = state.planned.length;
  const visible = state.planned.map(mediaById).filter(Boolean);
  if (!visible.length) {
    items.innerHTML = `<div class="empty-planned">${icon('bookmark')}<div><strong>Список пока пуст</strong>Найди что-нибудь интересное и нажми «+» на карточке.</div></div>`;
    return;
  }
  items.innerHTML = visible.map(item => {
    const done = !!state.completed[item.id];
    const progress = state.progress[item.id];
    const episodeLabel = progress?.episode != null && item.type === 'series' ? ` · серия ${progress.episode + 1}` : '';
    const rest = progress?.seconds > 0 ? ` · ${formatTime(progress.seconds)}` : '';
    return `<article class="planned-card ${done ? 'is-complete' : ''}"><button type="button" class="check-circle ${done ? 'complete' : ''}" data-action="complete" data-id="${escapeHtml(item.id)}" aria-label="${done ? 'Вернуть в планы' : 'Отметить просмотренным'}">${done ? icon('check') : ''}</button><div class="planned-cover">${posterImage(item,'planned-cover')}</div><div class="planned-body"><h3 class="planned-card-title" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</h3><div class="planned-sub">${escapeHtml(typeLabels[item.type] || 'Видео')}${episodeLabel}${rest}</div><div class="planned-bottom"><button class="mini-link" data-action="watch" data-id="${escapeHtml(item.id)}">${item.video || item.episodes ? 'Смотреть' : 'Подробнее'}</button><button class="mini-icon" data-action="remove" data-id="${escapeHtml(item.id)}" aria-label="Убрать из списка">${icon('close')}</button></div></div></article>`;
  }).join('');
}

function renderCatalog() {
  const entries = mediaCatalog.filter(item => state.filter === 'all' || item.type === state.filter);
  $('catalog-heading').textContent = state.filter === 'all' ? 'Открытая коллекция' : {'film':'Фильмы','cartoon':'Мультфильмы','anime':'Аниме','series':'Сериалы'}[state.filter];
  $('catalog-overline').textContent = state.filter === 'anime' ? 'ПОИСК ПО ВСЕМУ КАТАЛОГУ' : 'МОЖНО ПОСМОТРЕТЬ СЕЙЧАС';
  document.querySelectorAll('[data-filter]').forEach(element => element.classList.toggle('selected',element.dataset.filter === state.filter));
  $('catalog-grid').innerHTML = entries.length ? entries.map(item => {
    const saved = state.planned.includes(item.id);
    return `<article class="media-card" data-action="watch" data-id="${escapeHtml(item.id)}" tabindex="0" role="button" aria-label="Открыть ${escapeHtml(item.title)}"><div class="poster-wrap">${posterImage(item)}<span class="poster-badge">Бесплатно</span><button type="button" class="poster-plus ${saved ? 'is-saved' : ''}" data-action="toggle" data-id="${escapeHtml(item.id)}" aria-label="${saved ? 'Убрать из списка' : 'Добавить в список'}">${icon(saved ? 'check' : 'plus')}</button></div><div class="poster-tag">${escapeHtml(typeLabels[item.type])} · ${escapeHtml(item.year)}</div><h3 class="media-title">${escapeHtml(item.title)}</h3><div class="media-meta">${escapeHtml(item.duration)} · ${escapeHtml(item.genre.split(' · ')[0])}</div></article>`;
  }).join('') : `<div class="empty-planned"><span>Пока нет открытых видео этой категории. Нажми «Искать», чтобы добавить название в список.</span><button class="button outline small" data-action="search">Искать</button></div>`;
}

function renderQueue() {
  const ids = queueIds();
  $('queue-count').textContent = ids.length;
  $('queue-items').innerHTML = ids.length ? ids.map((id,i) => {
    const item = mediaById(id);
    return `<button type="button" class="queue-item ${state.selected === id ? 'active' : ''}" data-action="watch" data-id="${escapeHtml(id)}">${posterImage(item)}<span class="queue-info"><span class="queue-name">${escapeHtml(item.title)}</span><span class="queue-type">${escapeHtml(typeLabels[item.type])}</span></span><span class="queue-order">${String(i+1).padStart(2,'0')}</span></button>`;
  }).join('') : `<div class="queue-empty">Добавь фильмы в планы, и они появятся здесь.</div>`;
}

function renderEpisodes() {
  const item = mediaById(state.selected);
  const episodes = item?.episodes;
  $('episodes-title').textContent = episodes ? 'Выбрать серию' : 'Смотреть дальше';
  if (episodes) {
    $('episodes-items').innerHTML = episodes.map((episode,i) => `<button type="button" class="episode-item ${state.episodeIndex === i ? 'selected' : ''}" data-action="episode" data-index="${i}"><span class="episode-number">${i+1}</span><span class="episode-data"><span class="episode-name">${escapeHtml(episode.name)}</span><span class="episode-sub">${escapeHtml(episode.duration)}</span></span>${icon('play')}</button>`).join('');
    return;
  }
  const others = queueIds().filter(id => id !== state.selected).slice(0,7);
  $('episodes-items').innerHTML = others.length ? others.map((id,i) => {
    const next = mediaById(id);
    return `<button type="button" class="episode-item" data-action="watch" data-id="${escapeHtml(id)}"><span class="episode-number">${i+1}</span><span class="episode-data"><span class="episode-name">${escapeHtml(next.title)}</span><span class="episode-sub">${escapeHtml(typeLabels[next.type])}</span></span>${icon('play')}</button>`;
  }).join('') : `<p class="episodes-empty">Следующие фильмы из твоего списка появятся здесь.</p>`;
}

function renderWatchDetails() {
  const item = mediaById(state.selected);
  if (!item) return;
  $('watch-title').textContent = item.title;
  $('watch-type').textContent = `${typeLabels[item.type]} · ${item.year || 'Каталог'} · ${item.duration || ''}`;
  $('watch-description').textContent = item.description;
  $('watch-add').innerHTML = `${icon(state.planned.includes(item.id) ? 'check' : 'bookmark')}<span>${state.planned.includes(item.id) ? 'В списке' : 'В список'}</span>`;
  $('watch-footnote').innerHTML = `${icon('info')} ${item.episodes ? 'Серии воспроизводятся во встроенном официальном видеоплеере. Настройки звука доступны в нём.' : item.video?.kind === 'preview' ? 'Доступен только трейлер из каталога. Это не полный фильм.' : item.video?.kind === 'youtube' ? 'Это официальное встроенное видео. Озвучка и субтитры переключаются в настройках YouTube, если доступны.' : item.video ? 'Видеофайл открыт для просмотра. Других звуковых дорожек в этом источнике нет.' : 'Полный бесплатный просмотр не подтверждён. Можно сохранить название в список.'}`;
}

function formatTime(value) {
  if (!Number.isFinite(value)) return '00:00';
  const sec = Math.floor(Math.max(0,value));
  const mins = Math.floor(sec/60);
  return `${mins > 59 ? String(Math.floor(mins/60)).padStart(2,'0')+':' : ''}${String(mins%60).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`;
}

function syncControls() {
  if (!currentVideo) return;
  $('video-play').innerHTML = icon(currentVideo.paused ? 'play' : 'pause');
  $('video-play').setAttribute('aria-label',currentVideo.paused ? 'Воспроизвести' : 'Пауза');
  $('video-mute').innerHTML = icon(currentVideo.muted || !currentVideo.volume ? 'muted' : 'volume');
  $('video-volume').value = currentVideo.muted ? 0 : currentVideo.volume;
  $('video-time').textContent = `${formatTime(currentVideo.currentTime)} / ${formatTime(currentVideo.duration)}`;
  $('video-seek').value = Number.isFinite(currentVideo.duration) && currentVideo.duration > 0 ? Math.round(currentVideo.currentTime / currentVideo.duration * 1000) : 0;
  $('video-frame').classList.toggle('is-paused',currentVideo.paused);
}

function saveProgress() {
  if (!currentVideo || !Number.isFinite(currentVideo.currentTime) || currentVideo.currentTime < 1) return;
  state.progress[state.selected] = {seconds:Math.floor(currentVideo.currentTime),episode:state.episodeIndex,updated:Date.now()};
  persist('progress',state.progress);
}

function showUnavailable(item, error = false) {
  $('player-controls').hidden = true;
  $('video-placeholder').hidden = true;
  const dest = item.video?.src || item.video?.id || item.episodes?.[state.episodeIndex]?.youtube;
  const link = (item.episodes || item.video?.kind === 'youtube') && dest ? `https://www.youtube.com/watch?v=${encodeURIComponent(dest)}` : safeVideo(dest);
  $('video-host').innerHTML = `<div class="video-error"><span style="font-size:30px;color:#c7c3ef">✦</span><strong>${error ? 'Видео не удалось загрузить' : 'Полная версия пока недоступна'}</strong><p>${error ? 'Возможно, источник недоступен в этой сети. Попробуй открыть оригинал.' : 'Этот фильм можно сохранить в список. Мы не размещаем копии без разрешения правообладателя.'}</p>${link ? `<a href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">Открыть оригинальный источник ↗</a>` : ''}</div>`;
}

function attachVideo(item) {
  if (currentVideo) {
    currentVideo.pause();
    currentVideo = null;
  }
  $('audio-popover').hidden = true;
  $('video-host').replaceChildren();
  $('video-placeholder').hidden = true;
  $('player-controls').hidden = true;
  if (item.episodes || item.video?.kind === 'youtube') {
    const episode = item.episodes ? item.episodes[state.episodeIndex] : {youtube:item.video.id,name:item.title};
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${episode.youtube}?rel=0&playsinline=1`;
    frame.title = `${item.title}: ${episode.name}`;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.allowFullscreen = true;
    $('video-host').append(frame);
    return;
  }
  if (!item.video || !safeVideo(item.video.src)) {
    showUnavailable(item);
    return;
  }
  const video = document.createElement('video');
  video.src = safeVideo(item.video.src);
  video.preload = 'metadata';
  video.playsInline = true;
  video.poster = safeImage(item.poster);
  video.volume = .9;
  video.setAttribute('aria-label',`Видеоплеер: ${item.title}`);
  video.addEventListener('loadedmetadata',() => {
    if (state.progress[item.id]?.seconds && state.progress[item.id].seconds < video.duration - 10) video.currentTime = state.progress[item.id].seconds;
    syncControls();
  });
  video.addEventListener('timeupdate',() => {
    syncControls();
    if (Date.now() - saveTime > 1800) { saveTime = Date.now(); saveProgress(); }
  });
  video.addEventListener('pause',syncControls);
  video.addEventListener('play',syncControls);
  video.addEventListener('volumechange',syncControls);
  video.addEventListener('ended',() => { saveProgress(); showToast('Просмотр завершён!'); });
  video.addEventListener('error',() => { if (currentVideo === video) { currentVideo = null; showUnavailable(item,true); } });
  $('video-host').append(video);
  currentVideo = video;
  $('player-controls').hidden = false;
  syncControls();
}

function openMedia(id,scroll=true,episode=null) {
  const item = mediaById(id);
  if (!item) return;
  if (currentVideo) saveProgress();
  state.selected = id;
  if (episode !== null) state.episodeIndex = episode;
  else state.episodeIndex = item.episodes ? Math.min(item.episodes.length-1,Math.max(0,Number(state.progress[id]?.episode) || 0)) : 0;
  renderWatchDetails();
  renderEpisodes();
  renderQueue();
  attachVideo(item);
  if (scroll) $('player-section').scrollIntoView({behavior:'smooth',block:'start'});
}

function addPlanned(id) {
  if (!mediaById(id)) return;
  if (!state.planned.includes(id)) state.planned.unshift(id);
  delete state.completed[id];
  persist('planned',state.planned);
  persist('completed',state.completed);
  rerender();
  showToast('Добавлено в запланированное');
}

function removePlanned(id) {
  state.planned = state.planned.filter(value => value !== id);
  persist('planned',state.planned);
  rerender();
  showToast('Убрано из списка');
}

function togglePlanned(id) {
  state.planned.includes(id) ? removePlanned(id) : addPlanned(id);
}

function rerender() {
  renderPlanned();
  renderCatalog();
  renderQueue();
  renderEpisodes();
  renderWatchDetails();
  if (!$('search-modal').hidden) renderSearchResults();
}

function goTo(route) {
  document.querySelectorAll('[data-route]').forEach(element => element.classList.toggle('active',element.dataset.route === route));
  if (route === 'catalog') $('catalog-section').scrollIntoView({behavior:'smooth',block:'start'});
  else if (route === 'planned') $('planned-section').scrollIntoView({behavior:'smooth',block:'start'});
  else if (route === 'continue') {
    const latest = Object.entries(state.progress).filter(([id,value]) => byId.has(id) && value.seconds > 0).sort((a,b) => (b[1].updated || 0)-(a[1].updated || 0))[0];
    if (latest) openMedia(latest[0]);
    else $('player-section').scrollIntoView({behavior:'smooth',block:'start'});
  } else window.scrollTo({top:0,behavior:'smooth'});
}

function openSearch() {
  $('search-modal').hidden = false;
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => $('search-input').focus());
  if (!$('search-input').value.trim()) state.searchResults = [];
  renderSearchResults();
}

function closeSearch() {
  $('search-modal').hidden = true;
  document.body.style.overflow = '';
  state.searchAbort?.abort();
}

function openAbout() { $('about-modal').hidden = false;document.body.style.overflow='hidden'; }
function closeAbout() { $('about-modal').hidden = true;document.body.style.overflow=''; }

function getDiscovery(raw) {
  const id = String(raw.id);
  const existing = byId.get(id);
  if (existing) return existing;
  byId.set(id,raw);
  savedDiscoveries[id] = {title:raw.title,original:raw.original,type:raw.type,year:raw.year,duration:raw.duration,genre:raw.genre,description:raw.description,poster:raw.poster,video:raw.video};
  persist('discovered',savedDiscoveries);
  return raw;
}

function normalizeApple(item) {
  if (!item.trackId || !item.trackName) return null;
  const text = [item.primaryGenreName,item.trackName,item.longDescription].filter(Boolean).join(' ').toLowerCase();
  const type = /anime|аниме/.test(text) ? 'anime' : /animation|анимац|мульт/.test(text) ? 'cartoon' : 'film';
  const poster = item.artworkUrl100?.replace(/100x100bb/g,'600x600bb').replace(/100x100/g,'600x600') || '';
  return {id:`apple_${item.trackId}`,title:item.trackName,original:item.trackName,type,year:item.releaseDate ? new Date(item.releaseDate).getFullYear() : '',duration:item.trackTimeMillis ? `${Math.round(item.trackTimeMillis/60000)} мин` : 'Фильм',genre:item.primaryGenreName || 'Кино',description:item.longDescription || item.shortDescription || 'Найдено в каталоге Apple. Доступность полного просмотра определяется отдельно.',poster:safeImage(poster),video:item.previewUrl && safeVideo(item.previewUrl) ? {kind:'preview',src:item.previewUrl} : null,credit:'Apple iTunes Search'};
}

function normalizeMaze(item) {
  if (!item?.show?.id || !item.show.name) return null;
  const show = item.show;
  const description = (show.summary || '').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
  return {id:`maze_${show.id}`,title:show.name,original:show.name,type:/anime/i.test(show.genres?.join(' ') || '') ? 'anime' : 'series',year:show.premiered ? new Date(show.premiered).getFullYear() : '',duration:show.runtime ? `${show.runtime} мин/серия` : 'Сериал',genre:show.genres?.join(' · ') || 'Сериал',description:description || 'Найдено в каталоге TVMaze. Бесплатный источник полного видео не указан.',poster:safeImage(show.image?.medium || show.image?.original || ''),video:null,credit:'TVMaze'};
}

async function runSearch(query) {
  const cleaned = query.trim();
  if (!cleaned) { state.searchResults=[];$('search-meta').textContent='Введи название — найдём фильм, мультфильм или сериал';renderSearchResults();return; }
  const request = ++state.searchRequest;
  state.searchAbort?.abort();
  state.searchAbort = new AbortController();
  $('search-meta').textContent = 'Ищем названия...';
  $('search-results').innerHTML = '<div class="search-loading">Подбираем результаты ✦</div>';
  const local = [...byId.values()].filter(item => [item.title,item.original,item.genre].join(' ').toLowerCase().includes(cleaned.toLowerCase())).slice(0,12);
  let networkFailed = false;
  const results = await Promise.allSettled([
    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(cleaned)}&entity=movie&limit=20&country=us`,{signal:state.searchAbort.signal}).then(response => { if (!response.ok) throw new Error('Apple'); return response.json(); }).then(json => (json.results || []).map(normalizeApple).filter(Boolean)),
    fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(cleaned)}`,{signal:state.searchAbort.signal}).then(response => { if (!response.ok) throw new Error('TVMaze'); return response.json(); }).then(json => json.slice(0,15).map(normalizeMaze).filter(Boolean))
  ]);
  if (request !== state.searchRequest || $('search-modal').hidden) return;
  networkFailed = results.every(result => result.status === 'rejected');
  const seen = new Set();
  state.searchResults = [...local,...results.flatMap(result => result.status === 'fulfilled' ? result.value : [])].filter(item => {
    if (!item || seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  }).slice(0,28);
  $('search-meta').textContent = networkFailed ? 'Поиск по сети не ответил. Показываем локальные совпадения.' : `Найдено ${state.searchResults.length} названий · можно добавить в список`;
  renderSearchResults();
}

function renderSearchResults() {
  const holder = $('search-results');
  if (!state.searchResults.length) {
    holder.innerHTML = `<div class="search-empty">${$('search-input').value.trim() ? 'Ничего не найдено. Попробуй другое название или язык.' : 'Начни вводить название ✦<br>Например, «Sintel», «Naruto» или «Caminandes».'}</div>`;
    return;
  }
  holder.innerHTML = state.searchResults.map(item => {
    const saved = state.planned.includes(item.id);
    const available = !!item.video || !!item.episodes;
    return `<article class="result-item">${posterImage(item,'result-img')}<div class="result-info"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(typeLabels[item.type])} · ${escapeHtml(item.year || 'Год неизвестен')} · ${escapeHtml(item.genre || '')}</p><div class="result-label">${available ? item.video?.kind === 'preview' ? 'Доступен трейлер' : 'Можно смотреть бесплатно' : 'Пока только для списка'}</div></div><div class="result-actions"><button type="button" class="button outline small" data-action="search-toggle" data-id="${escapeHtml(item.id)}">${saved ? '✓ В списке' : '+ В список'}</button>${available ? `<button type="button" class="button primary small" data-action="search-watch" data-id="${escapeHtml(item.id)}">${item.video?.kind === 'preview' ? 'Трейлер' : 'Смотреть'}</button>` : ''}</div></article>`;
  }).join('');
}

document.querySelectorAll('[data-icon]').forEach(element => {element.innerHTML = icon(element.dataset.icon);});

document.addEventListener('click',event => {
  const routeButton = event.target.closest('[data-route]');
  if (routeButton) { goTo(routeButton.dataset.route); return; }
  const filterButton = event.target.closest('[data-filter]');
  if (filterButton) { state.filter=filterButton.dataset.filter;renderCatalog();$('catalog-section').scrollIntoView({behavior:'smooth',block:'start'});return; }
  const action = event.target.closest('[data-action]');
  if (!action) return;
  const id = action.dataset.id;
  switch(action.dataset.action) {
    case 'toggle':event.stopPropagation();togglePlanned(id);break;
    case 'remove':removePlanned(id);break;
    case 'complete':state.completed[id]=!state.completed[id];persist('completed',state.completed);rerender();showToast(state.completed[id] ? 'Отмечено просмотренным' : 'Возвращено в планы');break;
    case 'watch':openMedia(id);break;
    case 'episode':openMedia(state.selected,false,Number(action.dataset.index));break;
    case 'search':openSearch();break;
    case 'search-toggle':getDiscovery(state.searchResults.find(item => item.id === id));togglePlanned(id);break;
    case 'search-watch':getDiscovery(state.searchResults.find(item => item.id === id));closeSearch();openMedia(id);break;
  }
});

document.addEventListener('keydown',event => {
  if (event.target.closest('input,textarea')) {
    if (event.key === 'Escape') { closeSearch();event.target.blur(); }
    return;
  }
  if (event.key === 'Escape') { closeSearch();closeAbout();return; }
  if (event.key === '/') { event.preventDefault();openSearch();return; }
  if (!$('search-modal').hidden || !$('about-modal').hidden) return;
  if (event.code === 'Space' && currentVideo) { event.preventDefault();currentVideo.paused ? currentVideo.play().catch(()=>{}) : currentVideo.pause(); }
  if (event.key === 'ArrowLeft' && currentVideo) { event.preventDefault();currentVideo.currentTime=Math.max(0,currentVideo.currentTime-10); }
  if (event.key === 'ArrowRight' && currentVideo) { event.preventDefault();currentVideo.currentTime=Math.min(currentVideo.duration || 0,currentVideo.currentTime+10); }
  if (event.key.toLowerCase() === 'f' && currentVideo) $('video-fullscreen').click();
  if (event.key === 'Enter' && event.target.classList.contains('media-card')) openMedia(event.target.dataset.id);
});

$('search-trigger').addEventListener('click',openSearch);
$('mobile-search').addEventListener('click',openSearch);
$('close-search').addEventListener('click',closeSearch);
$('search-modal').addEventListener('click',event => { if (event.target === $('search-modal')) closeSearch(); });
$('search-input').addEventListener('input',event => { clearTimeout(searchTimer);searchTimer=setTimeout(()=>runSearch(event.target.value),420); });
$('about-button').addEventListener('click',openAbout);
$('footer-about').addEventListener('click',openAbout);
$('close-about').addEventListener('click',closeAbout);
$('about-done').addEventListener('click',closeAbout);
$('about-modal').addEventListener('click',event => { if (event.target === $('about-modal')) closeAbout(); });
$('hero-start').addEventListener('click',() => openMedia(state.selected));
$('hero-catalog').addEventListener('click',() => goTo('catalog'));
$('open-catalog').addEventListener('click',openSearch);
$('catalog-search').addEventListener('click',openSearch);
$('watch-add').addEventListener('click',() => togglePlanned(state.selected));
$('video-play').addEventListener('click',() => { if (currentVideo) currentVideo.paused ? currentVideo.play().catch(()=>showToast('Не удалось запустить видео')) : currentVideo.pause(); });
$('video-back').addEventListener('click',() => { if (currentVideo) currentVideo.currentTime=Math.max(0,currentVideo.currentTime-10); });
$('video-forward').addEventListener('click',() => { if (currentVideo) currentVideo.currentTime=Math.min(currentVideo.duration || 0,currentVideo.currentTime+10); });
$('video-seek').addEventListener('input',event => { if (currentVideo?.duration) currentVideo.currentTime=currentVideo.duration*Number(event.target.value)/1000; });
$('video-volume').addEventListener('input',event => { if (currentVideo) {currentVideo.muted=false;currentVideo.volume=Number(event.target.value);} });
$('video-mute').addEventListener('click',() => { if (currentVideo) currentVideo.muted=!currentVideo.muted; });
$('video-speed').addEventListener('click',() => { if (!currentVideo) return;const speeds=[1,1.25,1.5,1.75,2,.75];const next=speeds[(speeds.indexOf(currentVideo.playbackRate)+1)%speeds.length];currentVideo.playbackRate=next;$('video-speed').textContent=`${next}×`; });
$('video-audio').addEventListener('click',() => { $('audio-popover').hidden=!$('audio-popover').hidden; });
$('video-pip').addEventListener('click',async () => {if (!currentVideo) return;try {if (document.pictureInPictureElement) await document.exitPictureInPicture();else if (document.pictureInPictureEnabled) await currentVideo.requestPictureInPicture();else showToast('PiP не поддерживается');}catch{showToast('Не удалось включить PiP');}});
$('video-fullscreen').addEventListener('click',async () => {try {if (document.fullscreenElement) await document.exitFullscreen();else await $('video-frame').requestFullscreen();}catch{showToast('Полный экран недоступен');}});
window.addEventListener('pagehide',saveProgress);

rerender();
openMedia(state.selected,false);
