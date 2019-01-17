<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Http\Controllers;
use App\ApplianceType;
use Illuminate\Http\Request;

/**
 * Description of ApplianceTypeController
 *
 * @author Martin
 */
class ApplianceTypeController extends Controller {
    
    public function getAllApplianceTypes() {
        $applianceTypes = ApplianceType::all();
            
        return response()->json($applianceTypes);
    }
    
    public function getApplianceType($id) {
        
        $applianceType = ApplianceType::find($id);
        return response()->json($applianceType);
    }
    
    public function create(Request $request) {
        $applianceType = new ApplianceType;
        $applianceType->name = $request->name;

        $applianceType->save();
        return response()->json($applianceType, 201);
    }
    
    public function update(Request $request, $id) {
        $applianceType = ApplianceType::find($id);
        
        $possibleInput = ['name'];
        
        foreach ($possibleInput as $value) {
            if($request->has($value)){
                $applianceType->$value = $request->$value;
            }
        }
        $applianceType->save();
        return response()->json($applianceType, 200);
    }
    
    public function delete($id) {
        $applianceType = ApplianceType::find($id);
        $applianceType->delete();
        return response()->json('applianceType deleted successfully', 200);
    }
}
