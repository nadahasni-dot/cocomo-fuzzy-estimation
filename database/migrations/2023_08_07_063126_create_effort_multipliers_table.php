<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEffortMultipliersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('effort_multipliers', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('project_id')->unsigned();
            $table->double('rely')->nullable();
            $table->double('data')->nullable();
            $table->double('cplx')->nullable();
            $table->double('docu')->nullable();
            $table->double('acap')->nullable();
            $table->double('pcap')->nullable();
            $table->double('pcon')->nullable();
            $table->double('ruse')->nullable();
            $table->double('time')->nullable();
            $table->double('stor')->nullable();
            $table->double('pvol')->nullable();
            $table->double('aplex')->nullable();
            $table->double('plex')->nullable();
            $table->double('ltex')->nullable();
            $table->double('tool')->nullable();
            $table->double('site')->nullable();
            $table->double('sced')->nullable();
            $table->double('effort_multiplier')->nullable();
            $table->double('effort_multiplier_fuzzy')->nullable();
            $table->timestamps();
        });

        Schema::table('effort_multipliers', function (Blueprint $table) {
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
        Schema::dropIfExists('effort_multipliers');
    }
}
