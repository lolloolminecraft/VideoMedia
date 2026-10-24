const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

class Element {
    constructor(value) {
        this.value = value || '';
        this.children = [];
        this.handlers = {};
        this.classes = new Set();
        this.length = 1;
        this[0] = this;
    }
    addClass(name) { this.classes.add(name); return this; }
    toggleClass(name, yes) { if (yes) this.addClass(name); else this.classes.delete(name); return this; }
    append(value) { this.children.push(value); return this; }
    on(events, callback) { events.split(' ').forEach((name) => { this.handlers[name] = callback; }); return this; }
    text(value) { if (value === undefined) return this.value; this.value = value; return this; }
    html(value) { if (value === undefined) return this.value; this.value = value; return this; }
    attr() { return this; }
    empty() { this.children = []; return this; }
    remove() { return this; }
    find() { return new Element(''); }
    end() { return this; }
    eq() { return this; }
    trigger(name) { if (this.handlers[name]) this.handlers[name]({ type: name, preventDefault() {} }); }
}

const $ = (value) => new Element(value);
$.contains = () => true;
const stored = {};
const screens = {};
const activities = [];
const requests = [];
let current = 'content';
const lampa = {
    Component: { add(name, component) { screens[name] = component; }, get(name) { return screens[name]; } },
    Listener: { follow() {} },
    Storage: { get(key, fallback) { return Object.hasOwn(stored, key) ? stored[key] : fallback; }, set(key, value) { stored[key] = value; } },
    Scroll: class { constructor() { this.el = new Element('scroll'); } append(element) { this.el.append(element); } render() { return this.el; } destroy() {} },
    Activity: { push(payload) { activities.push(payload); }, backward() { activities.pop(); } },
    Router: { call(name, item) { activities.push({ component: name, movie: item }); } },
    Controller: { add() {}, toggle(name) { current = name; }, collectionSet() {}, collectionFocus() {}, enabled() { return { name: current }; } },
    Select: { show() {} },
    Noty: { show() {} },
    Menu: { addButton() {} },
    Api: { sources: { tmdb: { get(path, options, done) { requests.push(path); done({ results: [{ id: 12, title: 'Тест', media_type: 'movie' }] }); } } } },
    Manifest: {}
};
const document = { head: { appendChild() {} }, getElementById() { return null; }, createElement() { return {}; } };
const context = { window: { Lampa: lampa, jQuery: $, appready: true, Navigator: { canmove: () => false, move() {} } }, document, Navigator: { canmove: () => false, move() {} }, console };
vm.runInNewContext(fs.readFileSync(require.resolve('./videomedia.js'), 'utf8'), context);

assert.equal(typeof screens.videomedia_screen, 'function');
assert.equal(lampa.Manifest.plugins.name, 'VideoMedia');
const movie = { id: 91, title: 'Мой фильм', release_date: '2020-01-02' };
lampa.Manifest.plugins.onContextLauch(movie);
assert.equal(stored.videomedia_planned.length, 1);

for (const page of ['home', 'catalog', 'planned', 'watch']) {
    const component = new screens.videomedia_screen({ screen: page, movie });
    assert.ok(component.create());
    component.start();
    component.stop();
    component.destroy();
}

assert.ok(requests.includes('trending/all/week'));
lampa.Manifest.plugins.onContextLauch(movie);
assert.equal(stored.videomedia_planned.length, 0);
lampa.Router.call('full', movie);
assert.equal(activities.at(-1).component, 'full');
console.log('VideoMedia Lampa: bootstrap, 4 screens, catalog request, planned toggle, native Lampa route — OK');
