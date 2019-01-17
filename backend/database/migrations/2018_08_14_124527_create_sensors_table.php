<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSensorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sensors', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('appliance_id')->nullable()->unsigned();
            $table->integer('rooms_id')->nullable()->unsigned();
            $table->string('name');
            $table->string('position');
            $table->timestamps();
            
            $table->foreign('appliance_id')->references('id')->on('appliances')->onDelete('set null')->onUpdate('cascade');
            $table->foreign('rooms_id')->references('id')->on('rooms')->onDelete('set null')->onUpdate('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sensors');
    }
}
