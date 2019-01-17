<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Http\Controllers;
use App\CircuitBreaker;
use Illuminate\Http\Request;
/**
 * Description of CircuitBreakerController
 *
 * @author Martin
 */
class CircuitBreakerController extends Controller{
    
    public function showAllCircuitBreakers($surgeprotector_id) {
        
        $circuitBreakers = CircuitBreaker::where('surgeprotector_id', $surgeprotector_id)->get();
        return response()->json($circuitBreakers);
    }

    public function showOneCircuitBreaker($id) {
        $circuitBreaker = CircuitBreaker::find($id);
        return response()->json($circuitBreaker);
    }
    
//'project_id', 'name', 'number_of_poles', 'amperage', 'release_current'];
    public function create(Request $request, $surgeprotector_id) {
        $circuitBreaker = new CircuitBreaker;
        $circuitBreaker->surgeprotector_id = $surgeprotector_id;
        $circuitBreaker->name = $request->name;
        $circuitBreaker->number_of_poles = $request->number_of_poles;
        $circuitBreaker->amperage = $request->amperage;
        $circuitBreaker->tripping_characteristic = $request->tripping_characteristic;

        $circuitBreaker->save();
        return response()->json($circuitBreaker, 201);
    }

    public function update(Request $request, $id) {
        $circuitBreaker = CircuitBreaker::find($id);

        $possibleInput = ['surgeprotector_id', 'name', 'number_of_poles', 'amperage', 'tripping_characteristic'];
        
        foreach ($possibleInput as $value) {
            if($request->has($value)){
                $circuitBreaker->$value = $request->$value;
            }
        }
//        
//        $circuitBreaker->name = $request->name;        
//        $circuitBreaker->number_of_poles = $request->number_of_poles;
//        $circuitBreaker->amperage = $request->amperage;
//        $circuitBreaker->tripping_characteristic = $request->tripping_characteristic;

        $circuitBreaker->save();
        return response()->json($circuitBreaker, 200);
    }

    public function delete($id) {
        $circuitBreaker = CircuitBreaker::find($id);
        $circuitBreaker->delete();
        return response()->json('circuitbreaker deleted successfully', 200);
    }
}
