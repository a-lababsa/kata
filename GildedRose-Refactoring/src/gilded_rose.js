class Item {
  static BRIE = 'Aged Brie'
  static BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert'
  static SULFURAS = 'Sulfuras, Hand of Ragnaros'

  static MAX_QUALITY = 50
  static MIN_QUALITY = 0

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  upgradeQuality() {
    if (this.quality < Item.MAX_QUALITY) {
      this.quality++
    }
  }

  downgradeQuality() {
    if (this.quality > Item.MIN_QUALITY) {
      this.quality--
    }
  }

}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      switch (item.name) {
        case Item.BRIE:
          if (item.sellIn < 0) {
            item.upgradeQuality()
          }
          break
        case Item.BACKSTAGE:
          if (item.sellIn < 11) {
            item.upgradeQuality();
          }
          if (item.sellIn < 6) {
            item.upgradeQuality();
          }
          break
        default:
          break
      }
      if (![Item.BRIE, Item.BACKSTAGE, Item.SULFURAS].includes(item.name)) {
        item.downgradeQuality();
        if (item.sellIn < 0) {
          item.downgradeQuality()
        }
      } else {
        item.upgradeQuality();
      }

      if (item.name != Item.SULFURAS) {
        item.sellIn = item.sellIn - 1;
      }
    })

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}