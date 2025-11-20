<?php

namespace App\Http\Resources\Api\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name_tag' =>  $this->name_tag,
            'avatar' = $this->avatar,
            'first_name' =>  $this->first_name,
            'middle_name' =>  $this->middle_name,
            'last_name' =>  $this->last_name,
            'description' =>  $this->description,
            'city' =>  $this->city,
            'year' =>  $this->year,
            'gender' =>  $this->gender,
            'link' =>  $this->link,
        ];
    }
}
