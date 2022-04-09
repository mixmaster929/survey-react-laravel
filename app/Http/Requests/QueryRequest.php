<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class QueryRequest extends FormRequest
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
            'main_price' => ['required'],
            'alter_price' => ['required'],
            'category_id' => ['required'],
            'product_id' => ['required'],
            'location_id' => ['required'],
            'survey_id' => ['required'],
        ];
    }
}
