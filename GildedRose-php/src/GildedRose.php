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

    public function updateQuality(): void
    {
        foreach ($this->items as $item) {
            if ($item->name != $this::AGEDBRIE and $item->name != $this::BACKSTAGE) {
                if ($item->quality > 0) {
                    if ($item->name != $this::SULFURAS) {
                        $item->quality = $item->quality - 1;
                    }
                }
            } else {
                $this->upgradeQuality($item);
                if ($item->quality < 50 && $item->name == $this::BACKSTAGE) {
                    if ($item->sell_in < 11) {
                        $this->upgradeQuality($item);
                    }
                }
            }

            if ($item->name != $this::SULFURAS) {
                $item->sell_in = $item->sell_in - 1;
            }

            if ($item->sell_in < 0) {
                if ($item->name != $this::AGEDBRIE) {
                    if ($item->name != $this::BACKSTAGE) {
                        if ($item->quality > 0) {
                            if ($item->name != $this::SULFURAS) {
                                $item->quality = $item->quality - 1;
                            }
                        }
                    } else {
                        $item->quality = $item->quality - $item->quality;
                    }
                } else {
                    $this->upgradeQuality($item);
                }
            }
        }
    }
}
