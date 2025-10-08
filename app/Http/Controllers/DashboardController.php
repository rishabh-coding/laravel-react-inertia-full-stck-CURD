<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats=[
            'totalProducts' =>Product::count(),
            'totalCategories' =>Category::count(),
        ];

        $latestProducts= Product::latest()->take(5)->get(['id','name']);
        $latestCategories=Category::latest()->take(5)->get(['id','name','image']);

        return Inertia::render('dashboard',[
            'stats'=>$stats,
            'latestproducts'=>$latestProducts,
            'latestcategories'=>$latestCategories,
        ]);
    }
}
