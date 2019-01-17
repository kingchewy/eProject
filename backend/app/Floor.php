<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App;

use Illuminate\Database\Eloquent\Model;
/**
 * Description of Floor
 *
 * @author Martin
 */
class Floor extends Model{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'project_id', 'name', 'count_from_basement'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at'
    ];
    
        /**
     * Define an inverse one-to-many relationship with App\Project.
     */
    public function project(){
        return $this->belongsTo('App\Project');
    }
    
    public function rooms(){
        return $this->hasMany('App\Room');
    }
    
}