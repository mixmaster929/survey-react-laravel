<?php

namespace App\Http\Controllers;

use App\Http\Requests\UnitRequest;
use App\Http\Resources\UnitResource;
use App\Models\Units;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UnitController extends Controller
{
    public function index()
    {
        $units = UnitResource::collection(Units::latest()->paginate(10));

        return inertia('Units/Index', [
            'units' => $units,
        ]);
    }
    public function store(UnitRequest $request)
    {
        $attr = $request->toArray();

        Units::create($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Unit has been created',
        ]);
    }

    public function update(UnitRequest $request, Units $units)
    {
        Log::info("units=>".$units);
        Log::info("request=>".$request);
        $attr = $request->toArray();

        $units->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Unit has been updated',
        ]);
    }

    public function destroy(Units $units)
    {
        Log::info("units=>".$units);
        
        $units->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'Unit has been deleted',
        ]);
    }
}
