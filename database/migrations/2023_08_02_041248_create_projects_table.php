<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->tinyInteger('status')->default(0)->comment('0 = Draft || 1 = Calculated');
            $table->integer('avg_staff_cost')->nullable();
            $table->double('est_effort')->nullable();
            $table->double('est_time')->nullable();
            $table->double('est_staff')->nullable();
            $table->double('est_cost')->nullable();
            $table->double('est_effort_fuzzy')->nullable();
            $table->double('est_time_fuzzy')->nullable();
            $table->double('est_staff_fuzzy')->nullable();
            $table->double('est_cost_fuzzy')->nullable();
            $table->timestamps();
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
