<?php

declare(strict_types=1);

namespace GildedRose;

final class GildedRose
{
    const SULFURAS = 'Sulfuras, Hand of Ragnaros';
    const BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert';
    const AGEDBRIE = 'Aged Brie';

    /**
     * @var Item[]
     */
    private $items;

    public function __construct(array $items)
    {
        $this->items = $items;
    }

    private function upgradeQuality(Item $item): void
    {
        if ($item->quality < 50) {
            $item->quality = $item->quality + 1;
        }
    }

    private function inGildedRose(string $name)
    {
        return in_array($name, [self::AGEDBRIE, self::BACKSTAGE, self::SULFURAS]);
    }

    public function updateQuality(): void
    {
        foreach ($this->items as $item) {
            if ($item->name != self::SULFURAS) {
                $item->sell_in = $item->sell_in - 1;
            }

            if (!$this->inGildedRose($item->name)) {
                if ($item->sell_in < 0) {
                    $this->upgradeQuality($item);
                    $item->quality = $item->quality - 1;
                }
                $item->quality = $item->quality - 1;
            } else {
                $this->upgradeQuality($item);
            }
            if ($item->name == self::BACKSTAGE && $item->sell_in < 11) {
                $this->upgradeQuality($item);
            }
            if ($item->sell_in < 0) {
                $this->upgradeQuality($item);
            }
        }
    }
}
