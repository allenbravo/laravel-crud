<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\FeatureCategoryService;
use Illuminate\Http\Request;

class FeatureCategoryController extends Controller
{
    public function __construct(private FeatureCategoryService $featureCategoryService) {}

    public function index()
    {
        return response()->json($this->featureCategoryService->getAll());
    }

    public function show(int $id)
    {
        return response()->json($this->featureCategoryService->findById($id));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $category = $this->featureCategoryService->create($validated);
        return response()->json($category, 201);
    }

    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $category = $this->featureCategoryService->update($id, $validated);
        return response()->json($category);
    }

    public function destroy(int $id)
    {
        $this->featureCategoryService->delete($id);
        return response()->json(['message' => 'Category deleted successfully']);
    }
}