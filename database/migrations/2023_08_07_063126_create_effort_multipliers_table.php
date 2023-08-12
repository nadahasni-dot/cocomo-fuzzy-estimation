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
            $table->string('rely')->nullable();
            $table->string('data')->nullable();
            $table->string('cplx')->nullable();
            $table->string('docu')->nullable();
            $table->string('acap')->nullable();
            $table->string('pcap')->nullable();
            $table->string('pcon')->nullable();
            $table->string('ruse')->nullable();
            $table->string('time')->nullable();
            $table->string('stor')->nullable();
            $table->string('pvol')->nullable();
            $table->string('aplex')->nullable();
            $table->string('plex')->nullable();
            $table->string('ltex')->nullable();
            $table->string('tool')->nullable();
            $table->string('site')->nullable();
            $table->string('sced')->nullable();
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
