<?php

namespace Database\Seeders;

use App\Models\Functionality;
use App\Models\LanguageFunctionPoint;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory(1)->create([
            'email' => 'nadasthing@gmail.com'
        ]);
        Project::factory()->create(['user_id' => 1]);

        LanguageFunctionPoint::factory(10)->create();

        Functionality::factory(50)->create([
            'project_id' => 1,
            'language_function_point_id' => 1,
        ]);
    }
}
