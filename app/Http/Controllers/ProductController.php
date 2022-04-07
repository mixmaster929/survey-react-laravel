<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\Categories;
use App\Models\Units;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    public function index()
    {
        $products = ProductResource::collection(Product::latest()->paginate(10));
        // $_products = Product::with('categories')->orderBy('id');
        // $results = ProductResource::collection($_products->paginate(10));
        $categories = Categories::orderBy('id')->get();
        $units = Units::orderBy('id')->get();
        // Log::info("product=>".$_products);
        // Log::info("categories=>".$categories);
        // Log::info("results=>".json_encode($results));
        return inertia('Products/Index', [
            'products' => $products,
            'units' => $units,
            'categories' => $categories,
        ]);
    }

    public function store(ProductRequest $request)
    {
        $attr = $request->toArray();
        
        Product::create($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Product has been created',
        ]);
    }

    public function update(ProductRequest $request, Product $product)
    {
        Log::info("product=>".$product);
        Log::info("request=>".$request);

        $attr = $request->toArray();

        $product->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Product has been updated',
        ]);
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'Product has been deleted',
        ]);
    }
}
