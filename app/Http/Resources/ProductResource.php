<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\UnitResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'main_name' => $this->main_name,
            'alter_name' => $this->alter_name,
            'category_id' => $this->category_id,
            'unit_id' => $this->unit_id,
            'amount' => $this->amount,
            // 'relationships' => [
            //     'name' => new CategoryResource($this->name),
            // ],
            // 'name' => (new CategoryResource($this->name)),
            // 'name' => CategoryResource::collection($this->name),
            // 'unit_id' => UnitResource::collection($this->name),
        ];
    }
}
