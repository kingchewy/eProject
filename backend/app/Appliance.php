<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App;
use Illuminate\Database\Eloquent\Model;
/**
 * Description of Appliance
 *
 * @author Martin
 */
class Appliance extends Model {
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'circuitbreaker_id', 'rooms_id', 'appliancetype_id', 'type', 'name', 'position', 'created_at'];
    
    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'updated_at'
    ];
    
    /**
     * Define a one-to-many relationship with App\Appliance
     */
    public function circuitBreaker(){
        return $this->belongsTo('App\CircuitBreaker');
    }
    
    public function room(){
        return $this->belongsTo('App\Room');
    }
    
    public function sensors(){
        return $this->hasMany('App\Sensor');
    }
    
    public function applianceType(){
        return $this->belongsTo('App\ApplianceType');
    }
}
