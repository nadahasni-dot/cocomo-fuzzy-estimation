<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class FunctionalityCollection extends ResourceCollection
{
    public $defaultLoad = 5;
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'data' => $this->collection,
            'filtered' => [
                'page' => $request->page ?? 1,
                'load' => $request->load ?? $this->defaultLoad,
                'q' => $request->q ?? '',
            ]
        ];
    }
}
