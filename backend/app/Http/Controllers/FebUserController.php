<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Http\Controllers;

use App\FebUser;
use Illuminate\Http\Request;
/**
 * Description of UserController
 *
 * @author Martin
 */
class FebUserController extends Controller{

    public function showAllUsers() {
        $users = FebUser::all();
        return response()->json($users, 200);
    }

    public function create(Request $request) {
        //$this->validateCreateRequest($request);
        
        
        $user = new FebUser;
        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->email = $request->email;
        $user->ssn = $request->ssn;
        $user->zip = $request->zip;
        
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
        $user = FebUser::find($id);
        if (!$user) {
            return response()->json(['message' => "The user with {$id} doesn't exist"], 404);
        }
        return response()->json($user, 200);
    }

    public function update(Request $request, $id) {
        $user = FebUser::find($id);
        if (!$user) {
            return response()->json(['message' => "The user with {$id} doesn't exist"], 404);
        }
        //$this->validateUpdateRequest($request, $id);
        //$this->validateRequest($request);
        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->email = $request->email;
        $user->ssn = $request->ssn;
        $user->zip = $request->zip;
        
        $user->save();
        return response()->json("The user with with id {$user->id} has been updated", 200);
    }

    public function delete($id) {
        $user = FebUser::find($id);
        if (!$user) {
            return response()->json(['message' => "The user with {$id} doesn't exist"], 404);
        }
        $user->delete();
        return response()->json("The user with with id {$id} has been deleted", 200);
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
