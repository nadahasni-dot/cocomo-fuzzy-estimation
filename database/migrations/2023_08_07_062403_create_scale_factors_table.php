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
            $table->string('prec', 3)->nullable();
            $table->string('flex', 3)->nullable();
            $table->string('resl', 3)->nullable();
            $table->string('team', 3)->nullable();
            $table->string('pmat', 3)->nullable();
            $table->double('scale_factor')->nullable();
            $table->timestamps();
        });

        Schema::table('scale_factors', function (Blueprint $table) {
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');;
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
