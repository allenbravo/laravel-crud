<?php

namespace App\Services;

use App\Models\Feature;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class FeatureService
{
    public function getAll()
    {
        return Feature::with('category')->get();
    }

    public function findById(int $id)
    {
        return Feature::with('category')->findOrFail($id);
    }

    public function create(array $data)
    {
        $data['slug'] = Str::slug($data['title']);
        return Feature::create($data);
    }

    public function update(int $id, array $data)
    {
        $feature = Feature::findOrFail($id);
        $data['slug'] = Str::slug($data['title']);
        $feature->update($data);
        return $feature->load('category');
    }

    public function delete(int $id)
    {
        $feature = Feature::findOrFail($id);
        if ($feature->image) {
            Storage::disk('public')->delete($feature->image);
        }
        $feature->delete();
    }
}