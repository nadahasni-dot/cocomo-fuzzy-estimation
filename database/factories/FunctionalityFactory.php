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
            'exi' => json_encode(['easy' => 1, 'moderate' => 1, 'hard' => 1]),
            'exo' => json_encode(['easy' => 1, 'moderate' => 1, 'hard' => 1]),
            'exiq' => json_encode(['easy' => 1, 'moderate' => 1, 'hard' => 1]),
            'ilof' => json_encode(['easy' => 1, 'moderate' => 1, 'hard' => 1]),
            'elof' => json_encode(['easy' => 1, 'moderate' => 1, 'hard' => 1]),
            'ksloc' => null,
        ];
    }
}
