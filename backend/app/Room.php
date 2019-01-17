<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App;

use Illuminate\Database\Eloquent\Model;
/**
 * Description of Room
 *
 * @author Martin
 */
class Room extends Model{
/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'id', 'floor_id', 'name', 'square_meter', 'count_windows', 'count_doors', 'created_at'];

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
    public function floor(){
        return $this->belongsTo('App\Floor');
    }
    
    public function appliances(){
        return $this->hasMany('App\Appliance');
    }
    
    public function sensors(){
        return $this->hasMany('App\Sensor');
    }
}