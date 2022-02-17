class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const AGED_BRIE = 'Aged Brie';

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.isDifferentTo(i, SULFURAS)) {
        this.removeOneSellIn(i)
      }
      if (this.isDifferentTo(i, AGED_BRIE) && this.isDifferentTo(i, BACKSTAGE) && this.isDifferentTo(i, SULFURAS)) {
        this.removeOneQuality(i);
        if (this.isSellInLowerZero(i)) {
          this.items[i].quality = this.items[i].quality - this.items[i].quality;
        }
      } else if (this.isQualityLowerFifty(i)) {
        this.addOneQuality(i);
      }
    }

    return this.items;
  }

  isSellInLowerZero(i) {
    return this.items[i].sellIn < 0;
  }

  isQualityLowerFifty(i) {
    return this.items[i].quality < 50;
  }

  addOneQuality(i) {
    this.items[i].quality = this.items[i].quality + 1;
  }

  removeOneQuality(i) {
    this.items[i].quality = this.items[i].quality - 1;
  }

  removeOneSellIn(i) {
    this.items[i].sellIn = this.items[i].sellIn - 1;
  }

  isDifferentTo(i, constant) {
    return this.items[i].name != constant;
  }
}

module.exports = {
  Item,
  Shop
}