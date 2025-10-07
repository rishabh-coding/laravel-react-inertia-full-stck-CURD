<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'price' => 'required|numeric|min:0',
            'featured_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'name.reuired' => 'Please enter the product name',
            'name.string' => 'The product name must be string',
            'name.max' => 'The product name may not grater than 255 characters',
            'description.reuired' => 'Please enter the product description',
            'description.string' => 'The product description must be string',
            'description.max' => 'The product description may not grater than 1000 characters',
            'price.reuired' => 'Please enter the product price',
            'price.numeric' => 'The product price must be number',
            'price.min' => 'The product price should not be 0',
            'featured_image.image' => 'The featured image must be a image file',
            'featured_image.mimes' => 'The featured image must be a file of type: jpg,jpeg,png,webp',
            'featured_image.max' => 'The featured image may not be grater than 2048 KB',
        ];
    }
}
