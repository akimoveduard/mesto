export class Section {

  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }

  addItem(item, locate = 'prepend') {
    (locate == 'append') ? this._container.append(item) : this._container.prepend(item);
  }

  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }

}

