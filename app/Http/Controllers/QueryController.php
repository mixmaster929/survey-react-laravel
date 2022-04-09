<?php

namespace App\Http\Controllers;

use App\Http\Requests\QueryRequest;
use App\Http\Resources\QueryResource;
use App\Models\Query;
use App\Models\Locations;
use App\Models\Categories;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class QueryController extends Controller
{
    public function index()
    {
        $query = QueryResource::collection(Query::with('categories', 'locations', 'products')->latest()->paginate(10));
        
        return inertia('Query/Index', [
            'query' => $query,
        ]);
    }
    public function store(QueryRequest $request)
    {
        $attr = $request->toArray();
        
        Query::create($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Survey has been created',
        ]);
    }
    public function destroy(Query $query)
    {
        $query->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'Product has been deleted',
        ]);
    }
}
