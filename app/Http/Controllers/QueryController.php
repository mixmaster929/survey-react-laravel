<?php

namespace App\Http\Controllers;

use App\Http\Requests\QueryRequest;
use App\Http\Resources\QueryResource;
use App\Models\Query;
use App\Models\Locations;
use App\Models\Categories;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
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

    public function result(Request $request)
    {
        Log::info("data=>".$request);
        $location_id = $request->location_id;
        $category_id = $request->category_id;
        $survey_id = $request->survey_id;
        $product_id = $request->product_id;
        $survey = Query::where(['location_id' => $location_id, 'category_id' => $category_id, 'survey_id' => $survey_id, 'product_id' => $product_id])->first();
        return response()->json($survey);
    }

    public function store(QueryRequest $request)
    {
        $location_id = $request->location_id;
        $category_id = $request->category_id;
        $survey_id = $request->survey_id;
        $product_id = $request->product_id;
        $survey = Query::where(['location_id' => $location_id, 'category_id' => $category_id, 'survey_id' => $survey_id, 'product_id' => $product_id])->first();

        $attr = $request->toArray();
        if($survey){
            $survey->update($attr);
            return back()->with([
                'type' => 'success',
                'message' => 'Survey has been updated',
            ]);
        }
        else{
            Query::create($attr);
            return back()->with([
                'type' => 'success',
                'message' => 'Survey has been created',
            ]);
        }
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
