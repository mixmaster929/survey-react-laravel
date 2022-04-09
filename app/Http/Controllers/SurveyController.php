<?php

namespace App\Http\Controllers;

use App\Http\Requests\SurveyRequest;
use App\Http\Resources\SurveyResource;
use App\Models\Survey;
use App\Models\Locations;
use App\Models\Categories;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class SurveyController extends Controller
{
    public function index()
    {
        $survey = SurveyResource::collection(Survey::latest()->paginate(10));
        $categories = Categories::with('products')->orderBy('id')->get();
        $locations = Locations::orderBy('id')->get();
        $products = Product::orderBy('id')->get();
        
        return inertia('Survey/Index', [
            'survey' => $survey,
            'categories' => $categories,
            'locations' => $locations,
            'products' => $products,
        ]);
    }

    public function store(SurveyRequest $request)
    {
        $attr = $request->toArray();
        
        Survey::create($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Survey has been created',
        ]);
    }

    public function update(SurveyRequest $request, Survey $survey)
    {
        $attr = $request->toArray();

        $survey->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'survey has been updated',
        ]);
    }

    public function destroy(Survey $survey)
    {
        $survey->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'survey has been deleted',
        ]);
    }
}
