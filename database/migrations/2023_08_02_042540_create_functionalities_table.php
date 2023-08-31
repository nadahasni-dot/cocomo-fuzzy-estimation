<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFunctionalitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('functionalities', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('project_id')->unsigned();
            $table->bigInteger('language_function_point_id')->unsigned();
            $table->string('name');
            $table->text('description')->nullable();
            $table->json('exi')->nullable();
            $table->json('exo')->nullable();
            $table->json('exiq')->nullable();
            $table->json('ilof')->nullable();
            $table->json('elof')->nullable();
            $table->double('ksloc')->nullable();
            $table->timestamps();
        });

        Schema::table('functionalities', function (Blueprint $table) {
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');;
            $table->foreign('language_function_point_id')->references('id')->on('language_function_points')->onDelete('cascade');;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('functionalities');
    }
}
