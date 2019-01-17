<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Http\Controllers;
use App\SensorType;
use Illuminate\Http\Request;

/**
 * Description of SensorTypeController
 *
 * @author Martin
 */
class SensorTypeController {
    public function getAllSensorTypes() {
        $sensorTypes = SensorType::all();
            
        return response()->json($sensorTypes);
    }
    
    public function getSensorType($id) {
        
        $sensorTypes = SensorType::find($id);
        return response()->json($sensorTypes);
    }
    
    public function create(Request $request) {
        $sensorTypes = new SensorType;
        $sensorTypes->name = $request->name;

        $sensorTypes->save();
        return response()->json($sensorTypes, 201);
    }
    
    public function update(Request $request, $id) {
        $sensorTypes = SensorType::find($id);
        
        $possibleInput = ['name'];
        
        foreach ($possibleInput as $value) {
            if($request->has($value)){
                $sensorTypes->$value = $request->$value;
            }
        }
        $sensorTypes->save();
        return response()->json($sensorTypes, 200);
    }
    
    public function delete($id) {
        $sensorTypes = SensorType::find($id);
        $sensorTypes->delete();
        return response()->json('SensorType deleted successfully', 200);
    }
}
