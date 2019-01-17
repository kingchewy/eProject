<?php

/*
  |--------------------------------------------------------------------------
  | Application Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register all of the routes for an application.
  | It is a breeze. Simply tell Lumen the URIs it should respond to
  | and give it the Closure to call when that URI is requested.
  |
 */

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->post('auth/login', ['uses' => 'AuthController@authenticate']);

//$router->group(['middleware' => 'jwt.auth'], function() use ($router) {

    
    // USERS
    $router->get('users', 'UserController@showAllUsers');
    $router->post('users', 'UserController@create');
    $router->get('/users/{user_id}', 'UserController@showOneUser');
    $router->put('/users/{user_id}', 'UserController@update');
    $router->delete('/users/{user_id}', 'UserController@delete');
    
    // FEB_USERS(TEMP for FEBEXAM)
    $router->get('testusers', 'FebUserController@showAllUsers');
    $router->post('testusers', 'FebUserController@create');
    $router->get('/testusers/{user_id}', 'FebUserController@showOneUser');
    $router->put('/testusers/{user_id}', 'FebUserController@update');
    $router->delete('/testusers/{user_id}', 'FebUserController@delete');
    
    //PROJECTS
    $router->get('projects', ['uses' => 'ProjectController@showAllProjects']);
    $router->get('projects/{id}', ['uses' => 'ProjectController@showOneProject']);
    $router->post('projects', ['uses' => 'ProjectController@create']);
    $router->delete('projects/{id}', ['uses' => 'ProjectController@delete']);
    $router->put('projects/{id}', ['uses' => 'ProjectController@update']);
    
    //FLOORS
    $router->get('projects/{project_id}/floors', ['uses' => 'FloorController@showAllFloors']);
    $router->post('projects/{project_id}/floors', ['uses' => 'FloorController@create']);
    $router->get('floors/{id}', ['uses' => 'FloorController@showOneFloor']);
    $router->delete('floors/{id}', ['uses' => 'FloorController@delete']);
    $router->put('floors/{id}', ['uses' => 'FloorController@update']);
    
    //ROOMS
    $router->get('floors/{floor_id}/rooms', ['uses' => 'RoomController@showAllRooms']);
    $router->post('floors/{floor_id}/rooms', ['uses' => 'RoomController@create']);
    $router->get('rooms/{id}', ['uses' => 'RoomController@showOneRoom']);
    $router->delete('rooms/{id}', ['uses' => 'RoomController@delete']);
    $router->put('rooms/{id}', ['uses' => 'RoomController@update']);
    
    //SURGEPROTECTORS
    $router->post('projects/{project_id}/surgeprotectors', ['uses' => 'SurgeProtectorController@create']);
    $router->get('projects/{project_id}/surgeprotectors', ['uses' => 'SurgeProtectorController@showAllSurgeProtectors']);
    $router->get('surgeprotectors/{id}', ['uses' => 'SurgeProtectorController@showOneSurgeProtector']);
    $router->delete('surgeprotectors/{id}', ['uses' => 'SurgeProtectorController@delete']);
    $router->put('surgeprotectors/{id}', ['uses' => 'SurgeProtectorController@update']);
    
    //CIRCUITBREAKERS
    $router->post('surgeprotectors/{surgeprotector_id}/circuitbreakers', ['uses' => 'CircuitBreakerController@create']);
    $router->get('surgeprotectors/{surgeprotector_id}/circuitbreakers', ['uses' => 'CircuitBreakerController@showAllCircuitBreakers']);
    $router->get('circuitbreakers/{id}', ['uses' => 'CircuitBreakerController@showOneCircuitBreaker']);
    $router->delete('circuitbreakers/{id}', ['uses' => 'CircuitBreakerController@delete']);
    $router->put('circuitbreakers/{id}', ['uses' => 'CircuitBreakerController@update']);
    
    
    //APPLIANCES
    $router->post('rooms/{rooms_id}/appliances', ['uses' => 'ApplianceController@createByRoom']);
    $router->get('rooms/{rooms_id}/appliances', ['uses' => 'ApplianceController@getAppliancesByRoom']);
    $router->post('circuitbreakers/{circuitbreaker_id}/appliances', ['uses' => 'ApplianceController@createByCircuitBreaker']);
    $router->get('circuitbreakers/{circuitbreaker_id}/appliances', ['uses' => 'ApplianceController@getAppliancesByCircuitBreaker']);
    $router->get('appliances/{id}', ['uses' => 'ApplianceController@getAppliance']);
    $router->put('appliances/{id}', ['uses' => 'ApplianceController@update']);
    $router->delete('appliances/{id}', ['uses' => 'ApplianceController@delete']);
    
    
    //SENSORS
    $router->post('rooms/{rooms_id}/sensors', ['uses' => 'SensorController@createByRoom']);
    $router->get('rooms/{rooms_id}/sensors', ['uses' => 'SensorController@getSensorsByRoom']);
    $router->post('appliances/{appliance_id}/sensors', ['uses' => 'SensorController@createByAppliance']);
    $router->get('appliances/{appliance_id}/sensors', ['uses' => 'SensorController@getSensorsByAppliance']);
    $router->get('sensors/{id}', ['uses' => 'SensorController@getSensor']);
    $router->put('sensors/{id}', ['uses' => 'SensorController@update']);
    $router->delete('sensors/{id}', ['uses' => 'SensorController@delete']);
    
    //APPLIANCE TYPE
    $router->get('appliancetypes', ['uses' => 'ApplianceTypeController@getAllApplianceTypes']);
    $router->get('appliancetypes/{id}', ['uses' => 'ApplianceTypeController@getApplianceType']);
    $router->post('appliancetypes', ['uses' =>'ApplianceTypeController@create']);
    $router->put('appliancetypes/{id}', ['uses' =>'ApplianceTypeController@update']);
    $router->delete('appliancetypes/{id}', ['uses' =>'ApplianceTypeController@delete']);
    
    //SENSOR TYPE
    $router->get('sensortypes', ['uses' => 'SensorTypeController@getAllSensorTypes']);
    $router->get('sensortypes/{id}', ['uses' => 'SensorTypeController@getSensorType']);
    $router->post('sensortypes', ['uses' =>'SensorTypeController@create']);
    $router->put('sensortypes/{id}', ['uses' =>'SensorTypeController@update']);
    $router->delete('sensortypes/{id}', ['uses' =>'SensorTypeController@delete']);
    
    //TEST
    $router->post('projects/{project_id}/super', ['uses' => 'SuperController@create']);
//}
//);

//$router->get('users', function () {
//    $users = \App\User::all();
//    return response()->json($users);
//});