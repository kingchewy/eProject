<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCircuitBreakersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('circuit_breakers', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('surgeprotector_id')->unsigned();
            $table->string('name');
            $table->integer('number_of_poles');
            $table->string('amperage');
            $table->string('tripping_characteristic');
            $table->timestamps();
            
            $table->foreign('surgeprotector_id')->references('id')->on('surge_protectors')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('circuit_breakers');
    }
}
