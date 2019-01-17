<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Http\Controllers;
use App\SurgeProtector;
use Illuminate\Http\Request;
/**
 * Description of SurgeProtectorController
 *
 * @author Martin
 */
class SurgeProtectorController extends Controller{
    public function showAllSurgeProtectors($project_id) {
        
        $surgeProtectors = SurgeProtector::where('project_id', $project_id)->get();
        return response()->json($surgeProtectors);
    }

    public function showOneSurgeProtector($id) {
        $surgeProtector = SurgeProtector::find($id);
        return response()->json($surgeProtector);
    }
    
//'project_id', 'name', 'number_of_poles', 'amperage', 'release_current'];
    public function create(Request $request, $project_id) {
        $surgeProtector = new SurgeProtector;
        $surgeProtector->project_id = $project_id;
        $surgeProtector->name = $request->name;
        $surgeProtector->number_of_poles = $request->number_of_poles;
        $surgeProtector->amperage = $request->amperage;
        $surgeProtector->release_current = $request->release_current;

        $surgeProtector->save();
        return response()->json($surgeProtector, 201);
    }

    public function update(Request $request, $id) {
        $surgeProtector = SurgeProtector::find($id);

        $possibleInput = ['project_id', 'name', 'number_of_poles', 'amperage', 'release_current'];
        
        foreach ($possibleInput as $value) {
            if($request->has($value)){
                $surgeProtector->$value = $request->$value;
            }
        }
        
//        $surgeProtector->name = $request->name;        
//        $surgeProtector->number_of_poles = $request->number_of_poles;
//        $surgeProtector->amperage = $request->amperage;
//        $surgeProtector->release_current = $request->release_current;

        $surgeProtector->save();
        return response()->json($surgeProtector, 200);
    }

    public function delete($id) {
        $surgeProtector = SurgeProtector::find($id);
        $surgeProtector->delete();
        return response()->json('surgeprotector deleted successfully', 200);
    }
}
