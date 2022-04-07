<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Categories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = CategoryResource::collection(Categories::latest()->paginate(10));

        return inertia('Category/Index', [
            'categories' => $categories,
        ]);
    }
    public function store(CategoryRequest $request)
    {
        $attr = $request->toArray();

        Categories::create($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Category has been created',
        ]);
    }

    public function update(CategoryRequest $request, Categories $category)
    {
        Log::info("category=>".$category);
        Log::info("request=>".$request);
        $attr = $request->toArray();

        $category->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Category has been updated',
        ]);
    }

    public function destroy(Categories $category)
    {
        $category->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'Category has been deleted',
        ]);
    }
}
