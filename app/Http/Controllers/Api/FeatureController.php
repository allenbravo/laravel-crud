<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\FeatureService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FeatureController extends Controller
{
    public function __construct(private FeatureService $featureService) {}

    public function index()
    {
        $features = $this->featureService->getAll();
        $features->transform(function ($feature) {
            if ($feature->image) {
                $feature->image_url = asset('storage/' . $feature->image);
            } else {
                $feature->image_url = null;
            }
            return $feature;
        });
        return response()->json($features);
    }

    public function show(int $id)
    {
        $feature = $this->featureService->findById($id);
        if ($feature->image) {
            $feature->image_url = asset('storage/' . $feature->image);
        }
        return response()->json($feature);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'feature_category_id' => 'required|exists:feature_categories,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('features', 'public');
        } else {
            $validated['image'] = null;
        }

        $feature = $this->featureService->create($validated);
        return response()->json($feature, 201);
    }

    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'feature_category_id' => 'required|exists:feature_categories,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $feature = $this->featureService->findById($id);
            if ($feature->image) {
                Storage::disk('public')->delete($feature->image);
            }
            $validated['image'] = $request->file('image')->store('features', 'public');
        } else {
            unset($validated['image']);
        }

        $feature = $this->featureService->update($id, $validated);
        return response()->json($feature);
    }

    public function destroy(int $id)
    {
        $this->featureService->delete($id);
        return response()->json(['message' => 'Feature deleted successfully']);
    }
}