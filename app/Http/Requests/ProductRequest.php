<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
            'main_name' => ['required'],
            // 'alter_name' => ['required'],
            'category_id' => ['required'],
            'unit_id' => ['required'],
            'amount' => ['required', 'numeric'],
        ];
    }
}
