<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App;

use Illuminate\Database\Eloquent\Model;
/**
 * Description of Project
 *
 * @author Martin
 */
class Project extends Model{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'customer_name', 'customer_email', 'phone_number', 'address', 'created_at'];

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
    public function floors(){
        return $this->hasMany('App\Floor');
    }
    
    public function surgeProtectors(){
        return $this->hasMany('App\SurgeProtector');
    }
    
    
}