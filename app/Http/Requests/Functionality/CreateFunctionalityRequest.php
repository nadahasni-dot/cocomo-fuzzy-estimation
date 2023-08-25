<?php

namespace App\Http\Requests\Functionality;

use Illuminate\Foundation\Http\FormRequest;

class CreateFunctionalityRequest extends FormRequest
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
            'name' => 'required',
            'description' => 'nullable',
            'languageFunctionPointId' => 'required',
            'exi' => 'required',
            'exiq' => 'required',
            'exo' => 'required',
            'ilof' => 'required',
            'elof' => 'required',
        ];
    }
}
