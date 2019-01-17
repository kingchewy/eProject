<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Http\Controllers;
use App\Appliance;
use Illuminate\Http\Request;
/**
 * Description of ApplianceController
 *
 * @author Martin
 */
class ApplianceController extends Controller {
    
    public function getAppliancesByRoom($rooms_id) {
        
        $Appliances = Appliance::where('rooms_id', $rooms_id)->get();
        return response()->json($Appliances);
    }
    
    public function getAppliancesByCircuitBreaker($circuitbreaker_id) {
        
        $Appliances = Appliance::where('circuitbreaker_id', $circuitbreaker_id)->get();
        return response()->json($Appliances);
    }

    public function getAppliance($id) {
        $appliance = Appliance::find($id);
        return response()->json($appliance);
    }
    

    public function createByRoom(Request $request, $rooms_id) {
        $appliance = new Appliance;
        $appliance->rooms_id = $rooms_id;
        if($request->has('circuitbreaker_id')){
            $appliance->circuitbreaker_id = $request->circuitbreaker_id;
        }
        $appliance->appliancetype_id = $request->appliancetype_id;
        $appliance->name = $request->name;
        $appliance->position = $request->position;

        $appliance->save();
        return response()->json($appliance, 201);
    }
    
        public function createByCircuitBreaker(Request $request, $circuitbreaker_id) {
        $appliance = new Appliance;
        $appliance->circuitbreaker_id = $circuitbreaker_id;
        if($request->has("rooms_id")){
            $appliance->rooms_id = $request->rooms_id;
        }
        $appliance->appliancetype_id = $request->appliancetype_id;
        $appliance->name = $request->name;
        $appliance->position = $request->position;

        $appliance->save();
        return response()->json($appliance, 201);
    }

    public function update(Request $request, $id) {
        $appliance = Appliance::find($id);

        $possibleInput = ["circuitbreaker_id", "rooms_id", "appliancetype_id", "name", "position"];
        
        foreach ($possibleInput as $value) {
            if($request->has($value)){
                $appliance->$value = $request->$value;
            }
        }
        
//        $appliance->circuitbreaker_id = $request->circuitbreaker_id;
//        $appliance->rooms_id = $request->rooms_id;
//        $appliance->name = $request->name;
//        $appliance->position = $request->position;

        $appliance->save();
        return response()->json($appliance, 200);
    }

    public function delete($id) {
        $appliance = Appliance::find($id);
        $appliance->delete();
        return response()->json('appliance deleted successfully', 200);
    }
}
