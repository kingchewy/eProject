<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App;

use Illuminate\Database\Eloquent\Model;
/**
 * Description of SurgeProtector
 *
 * @author Martin
 */
class SurgeProtector extends Model {
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'project_id', 'name', 'number_of_poles', 'amperage', 'release_current'];
    
    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at'
    ];
    
    /**
     * Define a one-to-many relationship with App\Floor
     */
    public function project(){
        return $this->belongsTo('App\Project');
    }
    
    public function circuitBreakers(){
        return $this->hasMany('App\CircuitBreaker');
    }
}
