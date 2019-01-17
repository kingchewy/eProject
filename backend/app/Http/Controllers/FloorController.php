<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Http\Controllers;

use App\Floor;
use Illuminate\Http\Request;


/**
 * Description of FloorController
 *
 * @author Martin
 */
class FloorController extends Controller{
        /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function showAllFloors($project_id) {

        $floors = Floor::where('project_id', $project_id)
               ->orderBy('count_from_basement', 'asc')
               ->get();
            
        return response()->json($floors);
    }

    public function showOneFloor($id) {
        $floors = Floor::find($id);
        return response()->json($floors);
    }
    
// 'name', 'count_from_basement';
    public function create(Request $request, $project_id) {
        $floor = new Floor;
        $floor->project_id = $project_id;
        $floor->name = $request->name;
        $floor->count_from_basement = $request->count_from_basement;

        $floor->save();
        return response()->json($floor, 201);
    }

    public function update(Request $request, $id) {
        $floor = Floor::find($id);

        $possibleInput = ['project_id', 'name', 'count_from_basement'];
        
        foreach ($possibleInput as $value) {
            if($request->has($value)){
                $floor->$value = $request->$value;
            }
        }
        
//        $floor->name = $request->name;
//        $floor->count_from_basement = $request->count_from_basement;
        
        $floor->save();
        return response()->json($floor, 200);
    }

    public function delete($id) {
        $floor = Floor::find($id);
        $floor->delete();
        return response()->json('floor deleted successfully', 200);
    }
}
