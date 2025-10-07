<?php

namespace App\Http\Controllers;

use Exception;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\CategoryRequest;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::latest()->get()->map(fn($category) => [
            'id' => $category->id,
            'name' => $category->name,
            'description' => $category->description,
            'image' => $category->featured_image,
            'created_at' => $category->created_at->format('d M Y'),
        ])->all();

        return Inertia::render('categories/index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        try {
            $categoryImagePath = null;
            if ($request->hasFile('image')) {
                $categoryImagePath = $request->file('image')->store('categories', 'public');
            }
            $category = Category::create([
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'description' => $request->description,
                'image' => $categoryImagePath,
            ]);
            if ($category) {
                return redirect()->route('categories.index')->with('success', 'Category created successfully.');
            } else {
                return redirect()->back()->withErrors('error', 'Unable to create category. Please try again.');
            }
        } catch (Exception $e) {
            return redirect()->back()->withErrors('error', 'Failed to create category');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, Category $category)
    {
        try {
            $categoryImagePath = null;
            if ($request->hasFile('image')) {
                $categoryImagePath = $request->file('image')->store('categories', 'public');
            }

            $category->name = $request->name;
            $category->slug = Str::slug($request->name);
            $category->description = $request->description;
            if ($categoryImagePath) {

                $category->image = $categoryImagePath;
            }

            $category->save();


            if ($category) {
                return redirect()->route('categories.index')->with('success', 'Category updated successfully.');
            } else {
                return redirect()->back()->withErrors('error', 'Unable to update category. Please try again.');
            }
        } catch (Exception $e) {
            return redirect()->back()->withErrors('error', 'Failed to update category');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        try {
            if ($category) {
                $category->delete();
                return redirect()->route('categories.index')->with('success', 'Category deleted successfully.');
            }
            return redirect()->route('categories.index')->withErrors('error', 'Unable to deleted category. Please try again.');
        } catch (Exception $e) {
            Log::error("Category deletion failed", $e->getMessage());
        }
    }
}
