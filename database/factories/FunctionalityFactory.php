<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class FunctionalityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'project_id' => 1,
            'language_function_point_id' => 1,
            'name' => $this->faker->name(),
            'description' => $this->faker->paragraph(),
        ];
    }
}
