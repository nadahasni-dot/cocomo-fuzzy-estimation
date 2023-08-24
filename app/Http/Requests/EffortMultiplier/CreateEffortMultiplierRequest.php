<?php

namespace App\Http\Requests\EffortMultiplier;

use Illuminate\Foundation\Http\FormRequest;

class CreateEffortMultiplierRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'rely' => 'numeric|required',
            'data' => 'numeric|required',
            'cplx' => 'numeric|required',
            'docu' => 'numeric|required',
            'acap' => 'numeric|required',
            'pcap' => 'numeric|required',
            'pcon' => 'numeric|required',
            'ruse' => 'numeric|required',
            'time' => 'numeric|required',
            'stor' => 'numeric|required',
            'pvol' => 'numeric|required',
            'aplex' => 'numeric|required',
            'plex' => 'numeric|required',
            'ltex' => 'numeric|required',
            'tool' => 'numeric|required',
            'site' => 'numeric|required',
            'sced' => 'numeric|required',
        ];
    }
}
