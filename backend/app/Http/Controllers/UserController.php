<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
/**
 * Description of UserController
 *
 * @author Martin
 */
class UserController extends Controller{

    public function showAllUsers() {
        $users = User::all();
        return response()->json(['data' => $users], 200);
    }

    public function create(Request $request) {
        $this->validateCreateRequest($request);
        
        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = password_hash($request->password , PASSWORD_BCRYPT);
        
        $user->save();
        return response()->json($user, 201);
//        $user = User::create([
//                    'name' => $request->get ('name'),
//                    'email' => $request->get('email'),
//                    'password' => Hash::make($request->get('password'))
//        ]);
//        return response()->json(['data' => "The user with with id {$user->id} has been created"], 201);
    }

    public function showOneUser($id) {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => "The user with {$id} doesn't exist"], 404);
        }
        return response()->json(['data' => $user], 200);
    }

    public function update(Request $request, $id) {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => "The user with {$id} doesn't exist"], 404);
        }
        $this->validateUpdateRequest($request, $id);
        //$this->validateRequest($request);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = password_hash($request->password , PASSWORD_BCRYPT);
        
        $user->save();
        return response()->json(['data' => "The user with with id {$user->id} has been updated"], 200);
    }

    public function delete($id) {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => "The user with {$id} doesn't exist"], 404);
        }
        $user->delete();
        return response()->json(['data' => "The user with with id {$id} has been deleted"], 200);
    }

    public function validateCreateRequest(Request $request) {
        $rules = [
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6'
        ];
        $this->validate($request, $rules);
    }

    private function validateUpdateRequest($request, $id){
        $rules = [
            'email' => 'unique:users,email,'.$id,
            'password' => 'required|min:6'
        ];
        $this->validate($request, $rules);
    }
}
