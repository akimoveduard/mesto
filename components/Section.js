export class Section {

  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  addItem(item, locate = 'preprend') {
    (locate == 'append') ? this._container.append(item) : this._container.prepend(item);
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

}
