<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => 1,
            'name' => $this->faker->name(),
            'description' => $this->faker->paragraph(),
            'image' => null,            
            'est_time' => null,
            'est_staff' => null,
            'est_cost' => null,
        ];
    }
}
