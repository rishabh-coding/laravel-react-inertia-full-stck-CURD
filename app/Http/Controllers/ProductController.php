<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductFormRequest;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // dump($request->all());
        $productsQuery = Product::query();

        // befor apply fillters
        $totalCount = $productsQuery->count();

        if ($request->filled('search')) {
            $search = $request->search;

            $productsQuery->where(
                fn($query) =>
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orwhere('price', 'like', "%{$search}%")
            );
        }
        // filltered count
        $fillteredCount = $productsQuery->count();

        $perPage = (int) ($request->perPage ?? 5);

        // Fetch All Records
        if ($perPage === -1) {
            $allProducts = $productsQuery->latest()->get()->map(fn($product) => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'featured_image' => $product->featured_image,
                'featured_image_original_image' => $product->featured_image_original_image,
                'created_at' => $product->created_at->format('d M Y'),
            ]);
            $products = [
                'data' => $allProducts,
                'total' => $fillteredCount,
                'per_page' => $perPage,
                'from' => 1,
                'to' => $fillteredCount,
                'links' => [],
            ];
        } else {

            $products = $productsQuery->latest()->paginate($perPage)->withQueryString();
            $products->getCollection()->transform(fn($product) => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'featured_image' => $product->featured_image,
                'featured_image_original_image' => $product->featured_image_original_image,
                'created_at' => $product->created_at->format('d M Y'),
            ]);
        }

        // dd($products);
        return Inertia::render('products/index', [
            'products' => $products,
            'fillters' => $request->only(['search', 'perPage']),
            'totalCount' => $totalCount,
            'fillteredCount' => $fillteredCount,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('products/product-form');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\RedirectResponse
     *

     * @var \App\Http\Requests\ProductFormRequest $request
     */
    public function store(ProductFormRequest  $request)
    {

        try {
            $product= $request->validated();
            $featuredImage = null;
            $featuredImageOriginalName = null;

            if ($request->file('featured_image')) {
                $featuredImage = $request->file('featured_image');
                $featuredImageOriginalName = $featuredImage->getClientOriginalName();
                $featuredImage = $featuredImage->store('products', 'public');
            }
            $product = Product::create([

                'name' => $request->name, //linting problem hai vs code ki can use $product['name];
                'description' => $request->description,
                'price' => $request->price,
                'featured_image' => $featuredImage,
                'featured_image_original_name' => $featuredImageOriginalName,
            ]);
            if ($product) {
                return redirect()->route('products.index')->with('success', 'Product created successfully.');
            } else {
                return redirect()->back()->with('error', 'Unable to create product. Please try again...');
            }
        } catch (Exception $e) {
            Log::error('Product creation failed: ' . $e->getmessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return Inertia::render('products/product-form', [
            'product' => $product,
            'isView' => true,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('products/product-form', [
            'product' => $product,
            'isEdit' => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductFormRequest $request, Product $product)
    {

        try {
            if ($product) {
                $product->name = $request->name;
                $product->description = $request->description;
                $product->price = $request->price;
                if ($request->file('featured_image')) {
                    $featuredImage = $request->file('featured_image');
                    $featuredImageOriginalName = $featuredImage->getClientOriginalName();
                    $featuredImage = $featuredImage->store('products', 'public');

                    $product->featured_image = $featuredImage;
                    $product->featured_image_original_name = $featuredImageOriginalName;
                }
                $product->save();

                return redirect()->route('products.index')->with('success', 'Product updated successfully. ');
            }

            return redirect()->back()->with('error', 'Unable to update product. Please try again.. ');
        } catch (Exception $e) {
            Log::error('Product updation failed: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
            if ($product) {

                $product->delete();

                return redirect()->route('products.index')->with('success', 'Product deleted successfully. ');
            }

            return redirect()->route('products.index')->with('error', 'Unable to delete produc. Please try again... ');
        } catch (Exception $e) {
            Log::error('Product deletion failed: ' . $e->getMessage());
        }
    }
}
