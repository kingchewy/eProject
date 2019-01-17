<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Http\Controllers;
use App\Sensor;
use Illuminate\Http\Request;
/**
 * Description of SensorController
 *
 * @author Martin
 */
class SensorController extends Controller{
    
    
    public function getSensorsByRoom($rooms_id) {
        
        $Sensors = Sensor::where('rooms_id', $rooms_id)->get();
        return response()->json($Sensors);
    }
    
    public function getSensorsByAppliance($appliance_id) {
        
        $Sensors = Sensor::where('appliance_id', $appliance_id)->get();
        return response()->json($Sensors);
    }

    public function getSensor($id) {
        $sensor = Sensor::find($id);
        return response()->json($sensor);
    }
    

    public function createByRoom(Request $request, $rooms_id) {
        $sensor = new Sensor;
        $sensor->rooms_id = $rooms_id;
        if($request->has('appliance_id')){
            $sensor->appliance_id = $request->appliance_id;
        }
        $sensor->sensortype_id = $request->sensortype_id;
        $sensor->name = $request->name;
        $sensor->position = $request->position;

        $sensor->save();
        return response()->json($sensor, 201);
    }
    
        public function createByAppliance(Request $request, $appliance_id) {
        $sensor = new Sensor;
        $sensor->appliance_id = $appliance_id;
        if($request->has("rooms_id")){
            $sensor->rooms_id = $request->rooms_id;
        }
        $sensor->sensortype_id = $sensor->sensortype_id;
        $sensor->name = $request->name;
        $sensor->position = $request->position;

        $sensor->save();
        return response()->json($sensor, 201);
    }

    public function update(Request $request, $id) {
        $sensor = Sensor::find($id);

        $possibleInput = ['appliance_id', 'rooms_id', 'sensortype_id', 'name', 'position'];
        
        foreach ($possibleInput as $value) {
            if($request->has($value)){
                $sensor->$value = $request->$value;
            }
        }

        $sensor->save();
        return response()->json($sensor, 200);
    }

    public function delete($id) {
        $sensor = Sensor::find($id);
        $sensor->delete();
        return response()->json('sensor deleted successfully', 200);
    }
}
