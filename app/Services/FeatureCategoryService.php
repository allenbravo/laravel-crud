<?php

namespace App\Services;

use App\Models\FeatureCategory;
use Illuminate\Support\Str;

class FeatureCategoryService
{
    public function getAll()
    {
        return FeatureCategory::withCount('features')->get();
    }

    public function findById(int $id)
    {
        return FeatureCategory::withCount('features')->findOrFail($id);
    }

    public function create(array $data)
    {
        $data['slug'] = Str::slug($data['name']);
        return FeatureCategory::create($data);
    }

    public function update(int $id, array $data)
    {
        $category = FeatureCategory::findOrFail($id);
        $data['slug'] = Str::slug($data['name']);
        $category->update($data);
        return $category;
    }

    public function delete(int $id)
    {
        $category = FeatureCategory::findOrFail($id);
        $category->delete();
    }
}