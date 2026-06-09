<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\FeatureService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FeatureController extends Controller
{
    public function __construct(private FeatureService $featureService) {}

    /**
     * Get all features with their image URLs
     */
    public function index()
    {
        $features = $this->featureService->getAll();

        // Add full image URL for each feature
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

    /**
     * Get a single feature by ID
     */
    public function show(int $id)
    {
        $feature = $this->featureService->findById($id);

        // Add full image URL
        if ($feature->image) {
            $feature->image_url = asset('storage/' . $feature->image);
        }

        return response()->json($feature);
    }

    /**
     * Create a new feature
     */
    public function store(Request $request)
    {
        // Validate incoming request data
        $validated = $request->validate([
            'feature_category_id' => 'required|exists:feature_categories,id',
            'title'               => 'required|string|max:255',
            'description'         => 'nullable|string',
            'image'               => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // If image is uploaded, store it in storage/public/features
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('features', 'public');
        } else {
            $validated['image'] = null;
        }

        $feature = $this->featureService->create($validated);
        return response()->json($feature, 201);
    }

    /**
     * Update an existing feature
     */
    public function update(Request $request, int $id)
    {
        // Validate incoming request data
        $validated = $request->validate([
            'feature_category_id' => 'required|exists:feature_categories,id',
            'title'               => 'required|string|max:255',
            'description'         => 'nullable|string',
            'image'               => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // If new image is uploaded, delete old image and store new one
        if ($request->hasFile('image')) {
            $feature = $this->featureService->findById($id);

            // Delete old image from storage if exists
            if ($feature->image) {
                Storage::disk('public')->delete($feature->image);
            }

            $validated['image'] = $request->file('image')->store('features', 'public');
        } else {
            // No new image uploaded, keep existing image
            unset($validated['image']);
        }

        $feature = $this->featureService->update($id, $validated);
        return response()->json($feature);
    }

    /**
     * Delete a feature
     */
    public function destroy(int $id)
    {
        // FeatureService will also delete the image file
        $this->featureService->delete($id);
        return response()->json(['message' => 'Feature deleted successfully']);
    }
}