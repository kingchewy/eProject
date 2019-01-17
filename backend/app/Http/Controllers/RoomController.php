<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Http\Controllers;
use App\Room;
use Illuminate\Http\Request;
/**
 * Description of RoomController
 *
 * @author Martin
 */
class RoomController extends Controller {
    public function showAllRooms($floor_id) {
        $rooms = Room::where('floor_id', $floor_id)->get();
            
        return response()->json($rooms);
    }

    public function showOneRoom($id) {
        $room = Room::find($id);
        return response()->json($room);
    }
    
// 'floor_id', 'name', 'square_meter', 'count_windows', 'count_doors';
    public function create(Request $request, $floor_id) {
        $room = new Room;
        $room->floor_id = $floor_id;
        $room->name = $request->name;
        $room->square_meter = $request->square_meter;
        $room->count_windows = $request->count_windows;
        $room->count_doors = $request->count_doors;

        $room->save();
        return response()->json($room, 201);
    }

    public function update(Request $request, $id) {
        $room = Room::find($id);
        
        $possibleInput = ['floor_id', 'name', 'square_meter', 'count_windows', 'count_doors'];
        
        foreach ($possibleInput as $value) {
            if($request->has($value)){
                $room->$value = $request->$value;
            }
        }
        
        
//        $room->name = $request->name;
//        $room->square_meter = $request->square_meter;
//        $room->count_windows = $request->count_windows;
//        $room->count_doors = $request->count_doors;
        
        $room->save();
        return response()->json($room, 200);
    }

    public function delete($id) {
        $room = Room::find($id);
        $room->delete();
        return response()->json('room deleted successfully', 200);
    }
}
