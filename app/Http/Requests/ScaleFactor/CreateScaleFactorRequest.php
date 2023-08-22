<?php

namespace App\Http\Requests\ScaleFactor;

use Illuminate\Foundation\Http\FormRequest;

class CreateScaleFactorRequest extends FormRequest
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
            'prec' => 'required',
            'flex' => 'required',
            'resl' => 'required',
            'team' => 'required',
            'pmat' => 'required',
        ];
    }
}
