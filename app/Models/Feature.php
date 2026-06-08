<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Feature extends Model
{
    protected $fillable = ['feature_category_id', 'title', 'slug', 'description', 'image'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(FeatureCategory::class);
    }
}