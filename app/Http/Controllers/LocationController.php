<?php

namespace App\Http\Controllers;

use App\Http\Requests\LocationRequest;
use App\Http\Resources\LocationResource;
use App\Models\Locations;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function index()
    {
        $locations = LocationResource::collection(Locations::latest()->paginate(10));

        return inertia('Locations/Index', [
            'locations' => $locations,
        ]);
    }
    public function store(LocationRequest $request)
    {
        $attr = $request->toArray();

        Locations::create($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Location has been created',
        ]);
    }

    public function update(LocationRequest $request, Locations $location)
    {
        $attr = $request->toArray();

        $location->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Location has been updated',
        ]);
    }

    public function destroy(Locations $Location)
    {
        $Location->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'Location has been deleted',
        ]);
    }
}
