<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnsToAppliancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('appliances', function (Blueprint $table) {
            $table->integer('appliancetype_id')->after('rooms_id')->nullable()->unsigned();
            
            $table->foreign('appliancetype_id')->references('id')->on('appliances_type')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('appliances', function (Blueprint $table) {
            //
        });
    }
}
