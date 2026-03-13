<?php

namespace App\Http\Requests\Newsletter;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCampaignRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'newsletter_id' => 'required|exists:newsletters,id',
            'title' => 'nullable|string|max:255',
            'subject' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'scheduled_at' => 'nullable|date',
        ];
    }
}
