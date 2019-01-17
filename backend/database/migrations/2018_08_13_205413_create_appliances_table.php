<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAppliancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('appliances', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('circuitbreaker_id')->nullable()->unsigned();
            $table->integer('rooms_id')->nullable()->unsigned();
            $table->string('name');
            $table->string('position');
            $table->timestamps();
            
            $table->foreign('circuitbreaker_id')->references('id')->on('circuit_breakers')->onDelete('set null')->onUpdate('cascade');
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
        Schema::dropIfExists('appliances');
    }
}
