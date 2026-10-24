(function () {
    'use strict';

    if (window.videomedia_lampa_ready || !window.Lampa || !window.jQuery) return;
    window.videomedia_lampa_ready = true;

    var $ = window.jQuery;
    var L = window.Lampa;
    var SCREENS = { home: 'Главная', catalog: 'Каталог', planned: 'Запланировано', watch: 'Просмотр' };
    var CATEGORIES = [
        { id: 'all', name: 'Всё', path: 'trending/all/week' },
        { id: 'movie', name: 'Фильмы', path: 'discover/movie?sort_by=popularity.desc' },
        { id: 'tv', name: 'Сериалы', path: 'discover/tv?sort_by=popularity.desc' },
        { id: 'cartoon', name: 'Мультфильмы', path: 'discover/movie?with_genres=16&sort_by=popularity.desc' },
        { id: 'anime', name: 'Аниме', path: 'discover/tv?with_genres=16&with_original_language=ja&sort_by=popularity.desc' }
    ];
    var PROVIDERS = [
        { id: 'card', name: 'Все источники Lampa', component: null },
        { id: 'online', name: 'Онлайн Lampa', component: 'online' },
        { id: 'online_mod', name: 'Online Mod', component: 'online_mod' },
        { id: 'online_prestige', name: 'Online Prestige', component: 'online_prestige' },
        { id: 'lampac_online', name: 'Lampac', component: 'lampac_online' },
        { id: 'rezka_online', name: 'HDRezka', component: 'rezka_online' }
    ];
    var CSS = `
    .vm-app{--vm-bg:#10151a;--vm-side:#141a20;--vm-surface:#1b2229;--vm-raised:#242d35;--vm-border:#343f49;--vm-text:#eff1ec;--vm-muted:#a2adb2;--vm-subtle:#7e909a;--vm-accent:#bdbcf5;--vm-accent-text:#25283b;--vm-green:#b6d9c4;--vm-cream:#eae1c7;display:grid;grid-template-columns:12.8em minmax(0,1fr);min-height:81vh;border:1px solid var(--vm-border);border-radius:1.3em;overflow:hidden;background:var(--vm-bg);color:var(--vm-text);font-family:Manrope,Arial,sans-serif;font-size:1.12em;line-height:1.45}
    .vm-app.vm-light{--vm-bg:#f5f4f1;--vm-side:#eeede9;--vm-surface:#fff;--vm-raised:#e9e9ed;--vm-border:#dddfe1;--vm-text:#273138;--vm-muted:#64737b;--vm-subtle:#829097;--vm-accent:#8e87c9;--vm-accent-text:#fff;--vm-green:#78a78c;--vm-cream:#9b834c}
    .vm-app *{box-sizing:border-box}.vm-app h1,.vm-app h2,.vm-app h3,.vm-app p{margin-top:0}.vm-app .vm-side{background:var(--vm-side);border-right:1px solid var(--vm-border);padding:1.45em .8em;display:flex;flex-direction:column;gap:.35em}.vm-app .vm-brand{font-weight:850;font-size:1.25em;letter-spacing:-.06em;display:flex;align-items:center;gap:.45em;padding:.2em .4em 1.65em}.vm-app .vm-brand-glyph{display:inline-grid;place-items:center;background:var(--vm-raised);border:1px solid var(--vm-border);border-radius:.7em;width:2.1em;height:2.1em;color:var(--vm-accent);font-size:.8em}.vm-app .vm-brand em{font-style:normal;color:var(--vm-accent)}.vm-app .vm-nav-label{font-size:.57em;letter-spacing:.2em;text-transform:uppercase;font-weight:800;color:var(--vm-subtle);padding:0 1.2em 1em}.vm-app .vm-nav{display:flex;align-items:center;gap:.7em;padding:.78em .85em;border-radius:.8em;color:var(--vm-muted);font-size:.75em;font-weight:700;min-height:3.1em;cursor:pointer}.vm-app .vm-nav.active{background:color-mix(in srgb,var(--vm-accent) 16%,var(--vm-surface));color:var(--vm-accent)}.vm-app .vm-nav-icon{font-size:1.15em;min-width:1.25em;text-align:center}.vm-app .vm-nav-foot{margin-top:auto}.vm-app .vm-main{padding:1.75em clamp(1em,3.2vw,3.2em);min-width:0}.vm-app .vm-head{display:flex;align-items:center;justify-content:space-between;gap:1em;padding-bottom:1.6em;border-bottom:1px solid var(--vm-border);margin-bottom:1.6em}.vm-app .vm-eyebrow{display:block;color:var(--vm-subtle);font-weight:800;letter-spacing:.2em;text-transform:uppercase;font-size:.54em;margin-bottom:.5em}.vm-app .vm-page-title{font-size:1.38em;letter-spacing:-.045em;font-weight:850}.vm-app .vm-head-right{display:flex;gap:.65em;align-items:center}.vm-app .vm-pill{border:1px solid var(--vm-border);background:var(--vm-surface);padding:.7em 1em;border-radius:.8em;color:var(--vm-muted);font-weight:800;font-size:.68em;cursor:pointer}.vm-app .vm-pill.vm-fill{color:var(--vm-accent-text);background:var(--vm-accent);border-color:var(--vm-accent)}.vm-app .vm-box{border:1px solid var(--vm-border);background:var(--vm-surface);border-radius:1em;padding:1.4em}.vm-app .vm-hero{min-height:17em;display:flex;align-items:center;position:relative;overflow:hidden;padding:2.25em;border:1px solid var(--vm-border);border-radius:1.25em;background:radial-gradient(circle at 80% 50%,#59607960,transparent 34%),linear-gradient(115deg,var(--vm-raised),var(--vm-surface))}.vm-app .vm-hero-copy{position:relative;z-index:1;width:64%}.vm-app .vm-hero h1{font-size:clamp(1.65em,3vw,2.65em);line-height:1.17;letter-spacing:-.055em;margin:.45em 0}.vm-app .vm-hero h1 span{color:var(--vm-accent)}.vm-app .vm-hero p,.vm-app .vm-desc{font-size:.78em;line-height:1.7;color:var(--vm-muted)}.vm-app .vm-art{position:absolute;right:5%;top:4%;width:31%;height:95%;pointer-events:none;transform:rotate(-10deg)}.vm-app .vm-art-a,.vm-app .vm-art-b{position:absolute;border:4px solid #d4d5d5;border-radius:1.2em;box-shadow:0 1em 2em #0003}.vm-app .vm-art-a{inset:13% 38% 2% -4%;background:radial-gradient(circle at 45% 28%,#e4e6c8 0 14%,transparent 15%),linear-gradient(150deg,#778e94 36%,#2a4b60 72%)}.vm-app .vm-art-b{inset:1% 2% 19% 45%;transform:rotate(19deg);background:radial-gradient(circle at 65% 28%,#efe2b8 0 17%,transparent 18%),linear-gradient(150deg,#ceadac,#557982)}.vm-app .vm-row{display:flex;justify-content:space-between;align-items:center;gap:.6em;flex-wrap:wrap;margin:1.7em 0 .95em}.vm-app .vm-row h2{font-size:1.3em;margin:0;letter-spacing:-.03em}.vm-app .vm-actions{display:flex;gap:.55em;flex-wrap:wrap}.vm-app .vm-button{display:inline-flex;align-items:center;justify-content:center;gap:.4em;min-height:2.65em;border-radius:.7em;border:1px solid var(--vm-border);padding:.45em .95em;background:var(--vm-raised);color:var(--vm-text);font-size:.74em;font-weight:800;cursor:pointer}.vm-app .vm-button.vm-primary{background:var(--vm-accent);border-color:var(--vm-accent);color:var(--vm-accent-text)}.vm-app .vm-button.vm-mint{background:var(--vm-green);color:#28392f;border-color:transparent}.vm-app .vm-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:1em}.vm-app .vm-cover{aspect-ratio:3/4;border-radius:.85em;border:1px solid var(--vm-border);background:linear-gradient(145deg,#485766,#242c39);overflow:hidden;position:relative;cursor:pointer}.vm-app .vm-cover img{display:block;width:100%;height:100%;object-fit:cover}.vm-app .vm-cover-fallback{position:absolute;inset:0;display:grid;place-items:center;color:#dcd8f7;font-size:2em}.vm-app .vm-movie-title{font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:.55em 0 .1em;font-size:.77em}.vm-app .vm-movie-sub{color:var(--vm-subtle);font-size:.64em}.vm-app .vm-movie-actions{display:flex;gap:.35em;margin-top:.55em}.vm-app .vm-movie-actions .vm-button{flex:1;min-width:0;padding:.3em}.vm-app .vm-cats{display:flex;flex-wrap:wrap;gap:.55em;margin-bottom:1.4em}.vm-app .vm-cat{padding:.65em 1.05em;background:var(--vm-surface);border:1px solid var(--vm-border);border-radius:.75em;color:var(--vm-muted);font-size:.69em;font-weight:800;cursor:pointer}.vm-app .vm-cat.active{background:var(--vm-accent);color:var(--vm-accent-text)}.vm-app .vm-list{display:grid;gap:.7em}.vm-app .vm-item{border:1px solid var(--vm-border);background:var(--vm-surface);border-radius:.95em;padding:.7em;display:flex;gap:1em;align-items:center;min-width:0}.vm-app .vm-item img,.vm-app .vm-item-placeholder{width:3.45em;height:4.6em;object-fit:cover;border-radius:.6em;background:var(--vm-raised);flex:none}.vm-app .vm-item-placeholder{display:grid;place-items:center}.vm-app .vm-item-info{flex:1;min-width:0}.vm-app .vm-item-info h3{font-size:.91em;margin:0 0 .28em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.vm-app .vm-item-info p{font-size:.65em;color:var(--vm-muted);margin:0}.vm-app .vm-item-actions{display:flex;gap:.5em;flex-wrap:wrap}.vm-app .vm-empty{padding:3em 2em;display:grid;gap:1em;place-items:center;text-align:center;border:1px dashed var(--vm-border);border-radius:1em;color:var(--vm-muted)}.vm-app .vm-empty strong{color:var(--vm-text);font-size:1.1em}.vm-app .vm-watchbar{display:flex;gap:.6em;flex-wrap:wrap;margin-bottom:1em}.vm-app .vm-watch-grid{display:grid;grid-template-columns:minmax(0,1fr) 13.2em;gap:1em;align-items:start}.vm-app .vm-video{aspect-ratio:16/9;background:linear-gradient(130deg,#141c26,#0d1117);border-radius:1em;border:1px solid var(--vm-border);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:1em;padding:1.5em;color:#f3f4f6}.vm-app .vm-playicon{height:3.3em;width:3.3em;display:grid;place-items:center;border-radius:50%;background:#d1cffa;color:#2c2f45;font-size:1.4em}.vm-app .vm-video p{color:#acb6c1;font-size:.7em;max-width:29em}.vm-app .vm-panel{border:1px solid var(--vm-border);background:var(--vm-surface);border-radius:1em;padding:1.1em}.vm-app .vm-panel h3{font-size:.95em;margin:0 0 .75em}.vm-app .vm-panel p{font-size:.7em;color:var(--vm-muted);line-height:1.6}.vm-app .vm-episode{padding:.58em .7em;border-radius:.6em;background:var(--vm-raised);margin:.35em 0;display:flex;justify-content:space-between;color:var(--vm-muted);font-size:.7em;cursor:pointer}.vm-app .vm-episode.active{background:color-mix(in srgb,var(--vm-accent) 25%,var(--vm-raised));color:var(--vm-text)}.vm-app .selector{outline:none;transition:transform .16s,border-color .16s,background .16s}.vm-app .selector.focus,.vm-app .selector:focus,.vm-app .selector:hover{border-color:var(--vm-accent)!important;box-shadow:0 0 0 2px var(--vm-accent);transform:translateY(-1px)}.vm-app .vm-muted{color:var(--vm-muted)}.vm-app .vm-status{font-size:.7em;color:var(--vm-muted);margin:.8em 0}.vm-app .vm-shortcut{padding:1.15em;border-radius:1em;background:var(--vm-surface);border:1px solid var(--vm-border);flex:1;min-width:11em}.vm-app .vm-shortcut strong{display:block;margin-bottom:.45em}.vm-app .vm-shortcut span{font-size:.73em;color:var(--vm-muted)}
    @media(max-width:1050px){.vm-app{grid-template-columns:4.4em minmax(0,1fr)}.vm-app .vm-brand>span:last-child,.vm-app .vm-nav-label,.vm-app .vm-nav>span:last-child{display:none}.vm-app .vm-side{padding:1em .45em}.vm-app .vm-nav{justify-content:center}.vm-app .vm-brand{padding:.35em 0 1.2em;justify-content:center}.vm-app .vm-grid{grid-template-columns:repeat(4,minmax(0,1fr))}.vm-app .vm-watch-grid{grid-template-columns:1fr}.vm-app .vm-art{opacity:.5}}
    @media(max-width:650px){.vm-app{grid-template-columns:3.5em minmax(0,1fr);font-size:1em}.vm-app .vm-main{padding:1em}.vm-app .vm-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.vm-app .vm-head{align-items:flex-start;flex-direction:column}.vm-app .vm-hero{padding:1.25em;min-height:15em}.vm-app .vm-hero-copy{width:100%}.vm-app .vm-hero h1{font-size:1.8em}.vm-app .vm-art{opacity:.18}.vm-app .vm-item{align-items:flex-start}.vm-app .vm-item-actions{flex-direction:column}.vm-app .vm-watch-grid{grid-template-columns:1fr}}
    `;

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (s) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s];
        });
    }

    function read(key, fallback) {
        try { return L.Storage.get('videomedia_' + key, fallback); } catch (e) { return fallback; }
    }

    function write(key, value) {
        try { L.Storage.set('videomedia_' + key, value); } catch (e) { notify('Не удалось сохранить настройки'); }
    }

    function notify(message) {
        if (L.Noty && L.Noty.show) L.Noty.show(message);
    }

    function planned() {
        var list = read('planned', []);
        return Array.isArray(list) ? list : [];
    }

    function movieKey(movie) {
        return String(movie.source || 'tmdb') + ':' + String(movie.media_type || (movie.first_air_date || movie.name ? 'tv' : 'movie')) + ':' + String(movie.id);
    }

    function title(movie) {
        return movie.title || movie.name || movie.original_title || movie.original_name || 'Без названия';
    }

    function year(movie) {
        return String(movie.release_date || movie.first_air_date || '').slice(0, 4) || '—';
    }

    function isSeries(movie) {
        return movie.media_type === 'tv' || !!movie.first_air_date || (!!movie.name && !movie.title);
    }

    function imageUrl(movie) {
        var path = movie.poster_path || '';
        if (!path || !/^\/[a-zA-Z0-9/_-]+\.(jpg|jpeg|png|webp)$/i.test(path)) return '';
        return 'https://image.tmdb.org/t/p/w342' + path;
    }

    function safeMovie(movie) {
        if (!movie || !movie.id || !title(movie)) return null;
        var keys = ['id', 'title', 'name', 'original_title', 'original_name', 'source', 'media_type', 'release_date', 'first_air_date', 'poster_path', 'backdrop_path', 'vote_average', 'overview', 'number_of_seasons', 'imdb_id'];
        var output = {};
        keys.forEach(function (key) { if (movie[key] != null) output[key] = movie[key]; });
        output.source = output.source || 'tmdb';
        output.media_type = output.media_type || (isSeries(movie) ? 'tv' : 'movie');
        return output;
    }

    function hasPlanned(movie) {
        var key = movieKey(movie);
        return planned().some(function (item) { return movieKey(item) === key; });
    }

    function togglePlanned(movie) {
        var item = safeMovie(movie);
        if (!item) return notify('Этот материал пока нельзя сохранить');
        var list = planned();
        var index = list.findIndex(function (current) { return movieKey(current) === movieKey(item); });
        if (index === -1) { list.unshift(item); notify('Добавлено в запланированное'); }
        else { list.splice(index, 1); notify('Убрано из запланированного'); }
        write('planned', list);
    }

    function availableProviders() {
        return PROVIDERS.filter(function (entry) {
            return !entry.component || (L.Component && L.Component.get && !!L.Component.get(entry.component));
        });
    }

    function selectedProvider() {
        var id = read('balancer', 'card');
        return availableProviders().find(function (item) { return item.id === id; }) || PROVIDERS[0];
    }

    function openScreen(screen, movie, query) {
        L.Activity.push({ url: '', title: 'VideoMedia · ' + (SCREENS[screen] || 'Главная'), component: 'videomedia_screen', screen: screen, movie: movie || null, query: query || '', page: 1 });
    }

    function activate($element, callback) {
        $element.addClass('selector');
        $element.on('hover:enter click', function (event) { if (event.type === 'click') event.preventDefault(); callback(); });
        return $element;
    }

    function pushProvider(movie, provider, selectedEpisode) {
        if (!movie) return;
        var data = safeMovie(movie);
        if (!data) return;
        if (!provider.component || !(L.Component && L.Component.get && L.Component.get(provider.component))) {
            if (L.Router && L.Router.call) return L.Router.call('full', data);
            return L.Activity.push({ url: '', component: 'full', title: title(data), movie: data, source: data.source, page: 1 });
        }
        var args = { url: '', component: provider.component, title: title(data), movie: data, search: title(data), search_two: data.original_title || data.original_name || title(data), source: data.source, page: 1 };
        if (selectedEpisode) {
            args.season = selectedEpisode.season;
            args.episode = selectedEpisode.episode;
        }
        L.Activity.push(args);
    }

    function Screen(object) {
        var self = this;
        var page = object.screen || 'home';
        var movie = object.movie || null;
        var query = object.query || '';
        var category = 'all';
        var mediaPage = 1;
        var results = [];
        var loading = false;
        var ended = false;
        var requestSerial = 0;
        var alive = true;
        var currentEpisode = null;
        var currentSeason = 1;
        var episodes = [];
        var seasons = 1;
        var last = false;
        var scroll = new L.Scroll({ mask: true, over: true });
        var root = $('<div class="vm-app"></div>');
        var content = $('<div class="vm-main"></div>');

        function btn(text, callback, type) {
            var element = $('<div class="vm-button"></div>').text(text);
            if (type) element.addClass(type);
            return activate(element, callback);
        }

        function restoreFocus() {
            if (L.Controller && L.Controller.collectionSet) {
                L.Controller.collectionSet(scroll.render());
                L.Controller.collectionFocus(last && $.contains(root[0], last[0]) ? last : false, scroll.render());
            }
        }

        function header(name, subtitle) {
            var bar = $('<div class="vm-head"></div>');
            var label = $('<div></div>');
            label.append($('<span class="vm-eyebrow"></span>').text(subtitle || 'ВАША КОЛЛЕКЦИЯ · VIDEOMEDIA'));
            label.append($('<div class="vm-page-title"></div>').text(name));
            bar.append(label);
            var actions = $('<div class="vm-head-right"></div>');
            actions.append(btn(read('theme', 'dark') === 'dark' ? '☀ Светлая тема' : '☾ Тёмная тема', function () {
                var next = read('theme', 'dark') === 'dark' ? 'light' : 'dark';
                write('theme', next);
                root.toggleClass('vm-light', next === 'light');
                refresh();
            }));
            bar.append(actions);
            return bar;
        }

        function sectionEmpty(titleText, detail) {
            var empty = $('<div class="vm-empty"></div>');
            empty.append($('<strong></strong>').text(titleText));
            empty.append($('<div class="vm-desc"></div>').text(detail));
            empty.append(btn('Открыть каталог →', function () { openScreen('catalog'); }, 'vm-primary'));
            return empty;
        }

        function poster(movie) {
            var cover = $('<div class="vm-cover"></div>');
            var url = imageUrl(movie);
            if (url) cover.append($('<img loading="lazy" alt="">').attr('src', url));
            else cover.append('<div class="vm-cover-fallback">✦</div>');
            return activate(cover, function () { openScreen('watch', movie); });
        }

        function tile(movie) {
            var card = $('<div class="vm-movie"></div>');
            card.append(poster(movie));
            card.append($('<div class="vm-movie-title"></div>').text(title(movie)));
            card.append($('<div class="vm-movie-sub"></div>').text(year(movie) + ' · ' + (isSeries(movie) ? 'Сериал' : 'Фильм')));
            var actions = $('<div class="vm-movie-actions"></div>');
            actions.append(btn('Смотреть ▶', function () { openScreen('watch', movie); }, 'vm-primary'));
            actions.append(btn(hasPlanned(movie) ? '✓' : '＋', function () { togglePlanned(movie); refresh(); }));
            card.append(actions);
            return card;
        }

        function plannedRow(movie) {
            var item = $('<div class="vm-item"></div>');
            var url = imageUrl(movie);
            if (url) item.append($('<img alt="">').attr('src', url));
            else item.append('<div class="vm-item-placeholder">✦</div>');
            var info = $('<div class="vm-item-info"></div>');
            info.append($('<h3></h3>').text(title(movie)));
            info.append($('<p></p>').text((isSeries(movie) ? 'Сериал' : 'Фильм') + ' · ' + year(movie)));
            item.append(info);
            var actions = $('<div class="vm-item-actions"></div>');
            actions.append(btn('▶ Смотреть', function () { openScreen('watch', movie); }, 'vm-primary'));
            actions.append(btn('✕', function () { togglePlanned(movie); refresh(); }));
            item.append(actions);
            return item;
        }

        function home() {
            content.append(header('Главная'));
            var hero = $('<section class="vm-hero"></section>');
            var copy = $('<div class="vm-hero-copy"></div>');
            copy.append('<span class="vm-eyebrow" style="color:var(--vm-green)">✦ УЮТНОЕ МЕСТО ДЛЯ КИНО</span>');
            copy.append('<h1>Хорошие истории <span>всегда под рукой.</span></h1>');
            copy.append('<p>Хотите посмотреть фильм или мультфильм? Откройте каталог, найдите историю и сохраните её на потом.</p>');
            var actions = $('<div class="vm-actions"></div>');
            actions.append(btn('Смотреть каталог →', function () { openScreen('catalog'); }, 'vm-primary'));
            actions.append(btn('Мои планы', function () { openScreen('planned'); }));
            copy.append(actions);
            hero.append(copy).append('<div class="vm-art"><div class="vm-art-a"></div><div class="vm-art-b"></div></div>');
            content.append(hero);
            var head = $('<div class="vm-row"><h2>Ваш список на вечер</h2></div>');
            head.append(btn('Всё запланированное →', function () { openScreen('planned'); }));
            content.append(head);
            var list = planned().slice(0, 3);
            if (list.length) {
                var rows = $('<div class="vm-list"></div>');
                list.forEach(function (item) { rows.append(plannedRow(item)); });
                content.append(rows);
            } else content.append(sectionEmpty('Пока ничего не запланировано', 'Добавьте любое название из каталога.'));
        }

        function showCatalog() {
            content.empty().append(header('Каталог', 'ФИЛЬМЫ · СЕРИАЛЫ · МУЛЬТФИЛЬМЫ · АНИМЕ'));
            var tools = $('<div class="vm-actions" style="margin-bottom:1em"></div>');
            tools.append(btn('⌕ ' + (query ? 'Поиск: ' + query : 'Найти фильм или сериал'), function () {
                if (L.Input && L.Input.edit) {
                    L.Input.edit({ title: 'Поиск в VideoMedia', value: query, free: true, nosave: true }, function (input) {
                        if (typeof input === 'string') { query = input.trim(); category = 'all'; resetCatalog(); }
                        L.Controller.toggle('content');
                    });
                } else notify('Поиск недоступен в этой версии Lampa');
            }, 'vm-primary'));
            if (query) tools.append(btn('Сбросить поиск', function () { query = ''; resetCatalog(); }));
            content.append(tools);
            var chips = $('<div class="vm-cats"></div>');
            CATEGORIES.forEach(function (cat) {
                var chip = $('<div class="vm-cat"></div>').text(cat.name).toggleClass('active', category === cat.id);
                activate(chip, function () { category = cat.id; query = ''; resetCatalog(); });
                chips.append(chip);
            });
            content.append(chips);
            content.append($('<p class="vm-status" id="vm-status"></p>').text(loading ? 'Загружаем каталог…' : 'Выберите историю. ＋ — добавить в запланированное.'));
            var grid = $('<div class="vm-grid"></div>');
            results.forEach(function (item) { grid.append(tile(item)); });
            content.append(grid);
            if (results.length && !ended) content.append($('<div class="vm-row"></div>').append(btn(loading ? 'Загрузка…' : 'Показать ещё', function () { if (!loading) fetchCatalog(); })));
            if (!loading && !results.length) content.append(sectionEmpty('Ничего не найдено', 'Попробуйте другой запрос или категорию.'));
        }

        function resetCatalog() {
            requestSerial++;
            mediaPage = 1;
            results = [];
            loading = false;
            ended = false;
            fetchCatalog();
        }

        function fetchCatalog() {
            if (loading || ended || !alive) return;
            var api = L.Api && L.Api.sources && L.Api.sources.tmdb;
            if (!api || typeof api.get !== 'function') {
                showCatalog();
                notify('Каталог TMDB не подключён к Lampa');
                return;
            }
            loading = true;
            showCatalog();
            var currentPage = mediaPage;
            var currentQuery = query;
            var currentCategory = category;
            var serial = ++requestSerial;
            var path = currentQuery ? 'search/multi?query=' + encodeURIComponent(currentQuery) : CATEGORIES.find(function (item) { return item.id === currentCategory; }).path;
            function failed() {
                if (!alive || serial !== requestSerial || currentPage !== mediaPage) return;
                loading = false;
                ended = true;
                showCatalog();
                notify('Не удалось загрузить каталог. Проверьте источник данных Lampa.');
            }
            try {
                api.get(path, { page: currentPage }, function (data) {
                    if (!alive || page !== 'catalog' || serial !== requestSerial || currentPage !== mediaPage || currentQuery !== query || currentCategory !== category) return;
                    loading = false;
                    var list = Array.isArray(data && data.results) ? data.results : [];
                    list.forEach(function (item) {
                        var saved = safeMovie(item);
                        if (saved && !results.some(function (x) { return movieKey(x) === movieKey(saved); })) results.push(saved);
                    });
                    ended = !list.length || (data.total_pages && currentPage >= data.total_pages);
                    mediaPage++;
                    showCatalog();
                    restoreFocus();
                }, failed);
            } catch (e) { failed(); }
        }

        function plannedPage() {
            content.append(header('Запланировано', 'МЕДИА, К КОТОРЫМ ВЫ ХОТИТЕ ВЕРНУТЬСЯ'));
            var list = planned();
            content.append($('<div class="vm-row"><h2></h2></div>').find('h2').text('В планах · ' + list.length).end().append(btn('＋ Добавить', function () { openScreen('catalog'); }, 'vm-primary')));
            if (!list.length) return content.append(sectionEmpty('Ваш список пока пуст', 'В каталоге нажмите ＋ возле понравившегося фильма.'));
            var rows = $('<div class="vm-list"></div>');
            list.forEach(function (item) { rows.append(plannedRow(item)); });
            content.append(rows);
        }

        function providerSelect() {
            var options = availableProviders();
            L.Select.show({
                title: 'Балансер / источник',
                items: options.map(function (entry) { return { title: entry.name, id: entry.id, subtitle: entry.id === 'card' ? 'Открыть карточку Lampa со всеми установленными плагинами' : '' }; }),
                onSelect: function (choice) { write('balancer', choice.id); refresh(); L.Controller.toggle('content'); },
                onBack: function () { L.Controller.toggle('content'); }
            });
        }

        function voiceSelect() {
            L.Select.show({
                title: 'Озвучка и субтитры',
                items: [
                    { title: 'Выбрать озвучку у источника', subtitle: 'Список переводов доступен после открытия выбранного балансера', action: 'source' },
                    { title: 'Аудиодорожки плеера Lampa', subtitle: 'После начала воспроизведения откройте настройки дорожек плеера', action: 'player' }
                ],
                onSelect: function (item) { if (item.action === 'source') pushProvider(movie, selectedProvider(), currentEpisode); else notify('Запустите видео и откройте настройки аудио в плеере Lampa'); },
                onBack: function () { L.Controller.toggle('content'); }
            });
        }

        function showEpisodePanel(panel) {
            panel.empty().append('<h3>Сезоны и серии</h3>');
            if (!episodes.length) {
                panel.append('<p>Серии появятся здесь, если их список доступен в каталоге. В самом источнике можно выбрать сезон и озвучку.</p>');
                panel.append(btn('Открыть серии в Lampa', function () { pushProvider(movie, selectedProvider(), currentEpisode); }, 'vm-primary'));
                return;
            }
            panel.append(btn('Сезон ' + currentSeason + ' ▾', function () {
                var items = [];
                for (var i = 1; i <= Math.min(seasons, 30); i++) items.push({ title: 'Сезон ' + i, number: i });
                L.Select.show({ title: 'Выберите сезон', items: items, onSelect: function (item) { currentSeason = item.number; currentEpisode = null; fetchEpisodes(); }, onBack: function () { L.Controller.toggle('content'); } });
            }));
            episodes.forEach(function (episode) {
                var number = episode.episode_number;
                var active = currentEpisode && currentEpisode.season === currentSeason && currentEpisode.episode === number;
                var el = $('<div class="vm-episode"></div>').toggleClass('active', !!active);
                el.append($('<span></span>').text(number + '. ' + (episode.name || 'Серия ' + number)));
                el.append('<span>▶</span>');
                activate(el, function () { currentEpisode = { season: currentSeason, episode: number }; refresh(); pushProvider(movie, selectedProvider(), currentEpisode); });
                panel.append(el);
            });
        }

        function fetchEpisodes() {
            if (!movie || !movie.id || !isSeries(movie)) return;
            var api = L.Api && L.Api.sources && L.Api.sources.tmdb;
            if (!api || typeof api.get !== 'function') return;
            episodes = [];
            var requested = currentSeason;
            api.get('tv/' + encodeURIComponent(String(movie.id)) + '/season/' + currentSeason, {}, function (data) {
                if (!alive || requested !== currentSeason) return;
                episodes = Array.isArray(data && data.episodes) ? data.episodes : [];
                refresh();
            }, function () { if (alive) { episodes = []; refresh(); } });
        }

        function fetchSeasonCount() {
            if (!movie || !movie.id || !isSeries(movie)) return;
            var api = L.Api && L.Api.sources && L.Api.sources.tmdb;
            if (!api || typeof api.get !== 'function') return;
            api.get('tv/' + encodeURIComponent(String(movie.id)), {}, function (data) {
                if (!alive) return;
                seasons = Math.max(1, Number(data && data.number_of_seasons) || 1);
                fetchEpisodes();
            }, function () { fetchEpisodes(); });
        }

        function watch() {
            if (!movie) return content.append(sectionEmpty('Фильм не выбран', 'Перейдите в каталог.'));
            content.append(header('Просмотр', 'ОТДЕЛЬНЫЙ ЭКРАН · ВАШ ПЛЕЕР'));
            var row = $('<div class="vm-row"></div>');
            var name = $('<div></div>');
            name.append($('<span class="vm-eyebrow"></span>').text((isSeries(movie) ? 'СЕРИАЛ' : 'ФИЛЬМ') + ' · ' + year(movie)));
            name.append($('<h2></h2>').text(title(movie)));
            row.append(name).append(btn(hasPlanned(movie) ? '✓ В запланированном' : '＋ Запланировать', function () { togglePlanned(movie); refresh(); }));
            content.append(row);
            var controls = $('<div class="vm-watchbar"></div>');
            controls.append(btn('▤ Балансер: ' + selectedProvider().name + ' ▾', providerSelect, 'vm-primary'));
            controls.append(btn('♫ Озвучка ▾', voiceSelect));
            controls.append(btn('← Каталог', function () { openScreen('catalog'); }));
            content.append(controls);
            var grid = $('<div class="vm-watch-grid"></div>');
            var column = $('<div></div>');
            var frame = $('<div class="vm-video"></div>');
            frame.append('<div class="vm-playicon">▶</div>');
            frame.append($('<strong></strong>').text('Плеер VideoMedia'));
            frame.append('<p>Нажмите «Воспроизвести», чтобы открыть выбранный источник в Lampa. Управление перемоткой, громкостью, качеством, аудио и субтитрами — в его плеере.</p>');
            frame.append(btn('▶ Воспроизвести', function () { pushProvider(movie, selectedProvider(), currentEpisode); }, 'vm-primary'));
            column.append(frame);
            var info = $('<div class="vm-box" style="margin-top:1em"></div>');
            info.append($('<p class="vm-desc" style="margin:0"></p>').text(movie.overview || 'Откройте установленный онлайн-плагин Lampa, чтобы выбрать доступный источник просмотра.'));
            column.append(info);
            grid.append(column);
            var panel = $('<aside class="vm-panel"></aside>');
            if (isSeries(movie)) showEpisodePanel(panel);
            else {
                panel.append('<h3>Дальше по плану</h3>');
                var queue = planned().filter(function (item) { return movieKey(item) !== movieKey(movie); }).slice(0, 6);
                if (!queue.length) panel.append('<p>Пока ничего не запланировано. Добавьте фильмы из каталога.</p>');
                queue.forEach(function (item) { panel.append(activate($('<div class="vm-episode"></div>').text('▶ ' + title(item)), function () { openScreen('watch', item); })); });
            }
            grid.append(panel);
            content.append(grid);
        }

        function refresh() {
            content.empty();
            if (page === 'home') home();
            else if (page === 'catalog') showCatalog();
            else if (page === 'planned') plannedPage();
            else watch();
            var active = L.Controller && L.Controller.enabled ? L.Controller.enabled() : null;
            if (active && active.name === 'content') restoreFocus();
        }

        this.create = function () {
            root.toggleClass('vm-light', read('theme', 'dark') === 'light');
            var nav = $('<aside class="vm-side"></aside>');
            nav.append('<div class="vm-brand"><span class="vm-brand-glyph">✦</span><span>Video<em>Media</em></span></div>');
            nav.append('<div class="vm-nav-label">МОЯ МЕДИАТЕКА</div>');
            [
                { screen: 'home', symbol: '⌂', text: 'Главная' },
                { screen: 'catalog', symbol: '▦', text: 'Каталог' },
                { screen: 'planned', symbol: '♡', text: 'Запланировано' }
            ].forEach(function (item) {
                var element = $('<div class="vm-nav"></div>').toggleClass('active', page === item.screen);
                element.append($('<span class="vm-nav-icon"></span>').text(item.symbol));
                element.append($('<span></span>').text(item.text));
                nav.append(activate(element, function () { if (page !== item.screen) openScreen(item.screen); }));
            });
            nav.append('<div class="vm-nav-foot"><div class="vm-nav-label">МЯГКИЙ ИНТЕРФЕЙС</div></div>');
            root.append(nav).append(content);
            scroll.append(root);
            refresh();
            if (page === 'catalog') fetchCatalog();
            if (page === 'watch' && isSeries(movie)) fetchSeasonCount();
            return this.render();
        };

        this.start = function () {
            L.Controller.add('content', {
                toggle: function () { restoreFocus(); },
                left: function () { if (window.Navigator && Navigator.canmove('left')) Navigator.move('left'); else L.Controller.toggle('menu'); },
                right: function () { if (window.Navigator && Navigator.canmove('right')) Navigator.move('right'); },
                up: function () { if (window.Navigator && Navigator.canmove('up')) Navigator.move('up'); },
                down: function () { if (window.Navigator && Navigator.canmove('down')) Navigator.move('down'); },
                back: function () { L.Activity.backward(); }
            });
            L.Controller.toggle('content');
        };

        this.stop = function () {};
        this.render = function () { return scroll.render(); };
        this.destroy = function () { alive = false; scroll.destroy(); root.remove(); };
    }

    function init() {
        if (window.videomedia_lampa_initialized) return;
        window.videomedia_lampa_initialized = true;
        if (!document.getElementById('videomedia-lampa-style')) {
            var style = document.createElement('style');
            style.id = 'videomedia-lampa-style';
            style.textContent = CSS;
            document.head.appendChild(style);
        }
        L.Component.add('videomedia_screen', Screen);
        var icon = '<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="34" height="34" rx="11" fill="#bdbcf5" opacity=".18"/><path d="M22 9L27.2 17 35 22 27.2 27 22 35 16.8 27 9 22 16.8 17Z" fill="#bdbcf5"/></svg>';
        var menu = $('<li class="menu__item selector"><div class="menu__ico">' + icon + '</div><div class="menu__text">VideoMedia</div></li>');
        menu.on('hover:enter click', function () { openScreen('home'); });
        var list = $('.menu .menu__list').eq(0);
        if (list.length) list.append(menu);
        else if (L.Menu && typeof L.Menu.addButton === 'function') L.Menu.addButton(icon, 'VideoMedia', function () { openScreen('home'); });
        L.Manifest.plugins = {
            type: 'video', version: '1.0.0', name: 'VideoMedia', description: 'Каталог и личный список просмотра', component: 'videomedia_screen',
            onContextMenu: function (movie) { return { name: hasPlanned(movie) ? 'Убрать из запланированного' : 'В запланированное', description: 'VideoMedia' }; },
            onContextLauch: function (movie) { togglePlanned(movie); }
        };
    }

    if (window.appready) init();
    else L.Listener.follow('app', function (event) { if (event.type === 'ready') init(); });
})();
