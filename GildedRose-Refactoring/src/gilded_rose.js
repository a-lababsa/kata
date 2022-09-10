class Item {
  #name
  #sellIn
  #quality

  static BRIE = 'Aged Brie'
  static BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert'
  static SULFURAS = 'Sulfuras, Hand of Ragnaros'

  static MAX_QUALITY = 50
  static MIN_QUALITY = 0

  constructor(name, sellIn, quality) {
    this.#name = name;
    this.#sellIn = sellIn;
    this.#quality = quality;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    this.#name = value
  }

  get sellIn() {
    return this.#sellIn;
  }

  set sellIn(value) {
    this.#sellIn = value
  }

  discreaseSellIn() {
    this.#sellIn--
  }

  get quality() {
    return this.#quality
  }

  set quality(value) {
    this.#quality = value
  }

  increaseQuality() {
    const result = this.#quality < Item.MAX_QUALITY
    if (result) {
      this.quality++;
    }
    return result
  }

  discreaseQuality() {
    const result = this.#quality > Item.MIN_QUALITY && this.#name != Item.SULFURAS
    if (result) {
      this.quality--;
    }
    return result
  }

  isDifferentsName(values) {
    return !values.includes(this.#name)
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      const differentsName = item.isDifferentsName([Item.BRIE, Item.BACKSTAGE])
      if (differentsName) {
        item.discreaseQuality()
      } else if (item.increaseQuality() && item.name == Item.BACKSTAGE && item.sellIn < 11) {
          item.increaseQuality()
      }
      if (item.name != Item.SULFURAS) {
        item.discreaseSellIn();
      }
    })
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}