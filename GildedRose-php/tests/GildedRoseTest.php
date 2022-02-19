<?php

declare(strict_types=1);

namespace Tests;

use GildedRose\GildedRose;
use GildedRose\Item;
use PHPUnit\Framework\TestCase;

class GildedRoseTest extends TestCase
{
    /**
     * @return array<Item>
     */
    public function init(): array
    {
        $items = [
            new Item('+5 Dexterity Vest', 10, 20),
            new Item('Aged Brie', 2, 0),
            new Item('Elixir of the Mongoose', 5, 7),
            new Item('Sulfuras, Hand of Ragnaros', 0, 80),
            new Item('Sulfuras, Hand of Ragnaros', -1, 80),
            new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
            new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49),
            new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49),
            // this conjured item does not work properly yet
            new Item('Conjured Mana Cake', 3, 6),
        ];
        return $items;
    }

    public function testFoo(): void
    {
        $items = [new Item('foo', 0, 0)];
        $gildedRose = new GildedRose($items);
        $gildedRose->updateQuality();
        $this->assertSame('foo', $items[0]->name);
    }

    public function testDay1(): void
    {

        $items = $this->init();

        $gildedRose = new GildedRose($items);
        $gildedRose->updateQuality();

        // Item 0
        $this->assertSame(9, $items[0]->sell_in);
        $this->assertSame(19, $items[0]->quality);

        // Item 1
        $this->assertSame(1, $items[1]->sell_in);
        $this->assertSame(1, $items[1]->quality);

        // Item 2
        $this->assertSame(4, $items[2]->sell_in);
        $this->assertSame(6, $items[2]->quality);

        // Item 3
        $this->assertSame(0, $items[3]->sell_in);
        $this->assertSame(80, $items[3]->quality);

        // Item 4
        $this->assertSame(-1, $items[4]->sell_in);
        $this->assertSame(80, $items[4]->quality);

        // Item 5
        $this->assertSame(14, $items[5]->sell_in);
        $this->assertSame(21, $items[5]->quality);

        // Item 6
        $this->assertSame(9, $items[6]->sell_in);
        $this->assertSame(50, $items[6]->quality);

        // Item 7
        $this->assertSame(4, $items[7]->sell_in);
        $this->assertSame(50, $items[7]->quality);

        // Item 8
        $this->assertSame(2, $items[8]->sell_in);
        $this->assertSame(5, $items[8]->quality);
    }

    public function testDay2(): void
    {

        $items = $this->init();

        $gildedRose = new GildedRose($items);
        $gildedRose->updateQuality();
        $gildedRose->updateQuality();

        // Item 0
        $this->assertSame(8, $items[0]->sell_in);
        $this->assertSame(18, $items[0]->quality);

        // Item 1
        $this->assertSame(0, $items[1]->sell_in);
        $this->assertSame(2, $items[1]->quality);

        // Item 2
        $this->assertSame(3, $items[2]->sell_in);
        $this->assertSame(5, $items[2]->quality);

        // Item 3
        $this->assertSame(0, $items[3]->sell_in);
        $this->assertSame(80, $items[3]->quality);

        // Item 4
        $this->assertSame(-1, $items[4]->sell_in);
        $this->assertSame(80, $items[4]->quality);

        // Item 5
        $this->assertSame(13, $items[5]->sell_in);
        $this->assertSame(22, $items[5]->quality);

        // Item 6
        $this->assertSame(8, $items[6]->sell_in);
        $this->assertSame(50, $items[6]->quality);

        // Item 7
        $this->assertSame(3, $items[7]->sell_in);
        $this->assertSame(50, $items[7]->quality);

        // Item 8
        $this->assertSame(1, $items[8]->sell_in);
        $this->assertSame(4, $items[8]->quality);
    }

    public function testDay3(): void
    {

        $items = $this->init();

        $gildedRose = new GildedRose($items);
        $gildedRose->updateQuality();
        $gildedRose->updateQuality();
        $gildedRose->updateQuality();

        // Item 0
        $this->assertSame(7, $items[0]->sell_in);
        $this->assertSame(17, $items[0]->quality);

        // Item 1
        $this->assertSame(-1, $items[1]->sell_in);
        $this->assertSame(4, $items[1]->quality);

        // Item 2
        $this->assertSame(2, $items[2]->sell_in);
        $this->assertSame(4, $items[2]->quality);

        // Item 3
        $this->assertSame(0, $items[3]->sell_in);
        $this->assertSame(80, $items[3]->quality);

        // Item 4
        $this->assertSame(-1, $items[4]->sell_in);
        $this->assertSame(80, $items[4]->quality);

        // Item 5
        $this->assertSame(12, $items[5]->sell_in);
        $this->assertSame(23, $items[5]->quality);

        // Item 6
        $this->assertSame(7, $items[6]->sell_in);
        $this->assertSame(50, $items[6]->quality);

        // Item 7
        $this->assertSame(2, $items[7]->sell_in);
        $this->assertSame(50, $items[7]->quality);

        // Item 8
        $this->assertSame(0, $items[8]->sell_in);
        $this->assertSame(3, $items[8]->quality);
    }
}
