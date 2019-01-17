<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App;
use Illuminate\Database\Eloquent\Model;
/**
 * Description of CircuitBreaker
 *
 * @author Martin
 */
class CircuitBreaker extends Model {
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'surgeprotector_id', 'name', 'number_of_poles', 'amperage', 'tripping_characteristic', 'created_at'];
    
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
    public function surgeProtector(){
        return $this->belongsTo('App\SurgeProtector');
    }
    
    public function appliances(){
        return $this->hasMany('App\Appliance');
    }
}
