const { Shop, Item } = require("../src/gilded_rose");
const fixturesItems = require('./texttest_fixture')

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it("Should Golden Master", () => {
    const gildedRose = new Shop(fixturesItems)
    const items = gildedRose.updateQuality();
    items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
    // items 0
    expect(items[0].name).toBe("+5 Dexterity Vest")
    expect(items[0].sellIn).toBe(9)
    expect(items[0].quality).toBe(19)

    // items 1
    expect(items[1].name).toBe("Aged Brie")
    expect(items[1].sellIn).toBe(1)
    expect(items[1].quality).toBe(1)

    // items 2
    expect(items[2].name).toBe("Elixir of the Mongoose")
    expect(items[2].sellIn).toBe(4)
    expect(items[2].quality).toBe(6)

    // items 3
    expect(items[3].name).toBe("Sulfuras, Hand of Ragnaros")
    expect(items[3].sellIn).toBe(0)
    expect(items[3].quality).toBe(80)
    // items 4
    expect(items[4].name).toBe("Sulfuras, Hand of Ragnaros")
    expect(items[4].sellIn).toBe(-1)
    expect(items[4].quality).toBe(80)

    // items 5
    expect(items[5].name).toBe("Backstage passes to a TAFKAL80ETC concert")
    expect(items[5].sellIn).toBe(14)
    expect(items[5].quality).toBe(21)

    // items 6
    expect(items[6].name).toBe("Backstage passes to a TAFKAL80ETC concert")
    expect(items[6].sellIn).toBe(9)
    expect(items[6].quality).toBe(50)

    // items 7
    expect(items[7].name).toBe("Backstage passes to a TAFKAL80ETC concert")
    expect(items[7].sellIn).toBe(4)
    expect(items[7].quality).toBe(50)

    // items 8
    expect(items[8].name).toBe("Conjured Mana Cake")
    expect(items[8].sellIn).toBe(2)
    expect(items[8].quality).toBe(5)
  })
});