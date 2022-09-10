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
    this.quality++
  }

  downgradeQuality() {
    this.quality--
  }

}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      if (item.name != Item.BRIE && item.name != Item.BACKSTAGE) {
        if (item.quality > Item.MIN_QUALITY) {
          if (item.name != Item.SULFURAS) {
            item.downgradeQuality();
          }
        }
      } else {
        if (item.quality < Item.MAX_QUALITY) {
          item.upgradeQuality();
          if (item.name == Item.BACKSTAGE) {
            if (item.sellIn < 11) {
              if (item.quality < Item.MAX_QUALITY) {
                item.upgradeQuality();
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < Item.MAX_QUALITY) {
                item.upgradeQuality();
              }
            }
          }
        }
      }
      if (item.name != Item.SULFURAS) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (item.name != Item.BRIE) {
          if (item.name != Item.BACKSTAGE) {
            if (item.quality > Item.MIN_QUALITY) {
              if (item.name != Item.SULFURAS) {
                item.downgradeQuality();
              }
            }
          }
        } else {
          if (item.quality < Item.MAX_QUALITY) {
            item.upgradeQuality();
          }
        }
      }
    })

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}