<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App;
use Illuminate\Database\Eloquent\Model;
/**
 * Description of Sensor
 *
 * @author Martin
 */
class Sensor extends Model{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'appliance_id', 'rooms_id', 'sensortype_id', 'type', 'name', 'position', 'created_at'];
    
    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
         'updated_at'
    ];
    
    /**
     * Define a one-to-many relationship with App\Floor
     */
    public function appliance(){
        return $this->belongsTo('App\Appliance');
    }
    
    public function room(){
        return $this->belongsTo('App\Room');
    }
    
    public function sensorType(){
        return $this->belongsTo('App\SensorType');
    }
}
