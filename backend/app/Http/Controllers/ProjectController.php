<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;

/**
 * Description of ProjectsController
 *
 * @author Martin
 */
class ProjectController extends Controller {

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function showAllProjects() {

        $projects = Project::all();
        return response()->json($projects);
    }

    public function showOneProject($id) {
        $project = Project::find($id);
        return response()->json($project);
    }
    
//'name', 'customer_name', 'phone_number', 'address'];
    public function create(Request $request) {
        $project = new Project;
        $project->name = $request->name;
        $project->customer_name = $request->customer_name;
        $project->customer_email = $request->customer_email;
        $project->phone_number = $request->phone_number;
        $project->address = $request->address;

        $project->save();
        return response()->json($project, 201);
    }

    public function update(Request $request, $id) {
        $project = Project::find($id);
        
        $possibleInput = ['name', 'customer_name', 'customer_email', 'phone_number', 'address'];
        
        foreach ($possibleInput as $value) {
            if($request->has($value)){
                $project->$value = $request->$value;
            }
        }

//        $project->name = $request->input('name');
//        $project->customer_name = $request->input('customer_name');
//        $project->phone_number = $request->input('phone_number');
//        $project->address = $request->input('address');
        
        $project->save();
        return response()->json($project, 200);
    }

    public function delete($id) {
        $project = Project::find($id);
        $project->delete();
        return response()->json('project deleted successfully', 200);
    }

}
