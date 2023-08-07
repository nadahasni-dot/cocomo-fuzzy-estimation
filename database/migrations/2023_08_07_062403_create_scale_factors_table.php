<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScaleFactorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scale_factors', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('project_id')->unsigned();
            $table->string('prec')->nullable();
            $table->string('flex')->nullable();
            $table->string('resl')->nullable();
            $table->string('team')->nullable();
            $table->string('pmat')->nullable();
            $table->double('scale_factor')->nullable();
            $table->timestamps();
        });

        Schema::table('scale_factors', function (Blueprint $table) {
            $table->foreign('project_id')->references('id')->on('projects');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('scale_factors');
    }
}
