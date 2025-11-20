<?php

namespace App\Services;

use App\Models\Tag;
use Illuminate\Support\Str;

class TagServices
{
    public function extractTags(string $text): array
    {
        preg_match_all('/#([\pL0-9_]+)/u', $text, $matches);
        return array_unique($matches[1]);
    }

    public function syncPostTags($post, string $text): void
    {
        $names = $this->extractTags($text);

        $tagIds = [];
        foreach ($names as $name) {
            $tag = Tag::query()->firstOrCreate(
                ['name' => $name],
                ['slug' => Str::slug($name)]
            );
            $tagIds[] = $tag->id;
        }

        $post->tag()->sync($tagIds);
    }
}
