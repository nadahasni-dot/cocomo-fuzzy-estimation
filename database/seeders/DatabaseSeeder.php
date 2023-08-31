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
        Project::factory()->create(['user_id' => 1, 'name' => 'test proyek']);

        // QSLIM LANGUANGE FP TABLES CONVERSION RATE
        LanguageFunctionPoint::create(
            [
                'name' => 'ABAP (SAP)',
                'conversion_rate' => 28,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'ASP',
                'conversion_rate' => 51,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'Assembler',
                'conversion_rate' => 119,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'Brio',
                'conversion_rate' => 14,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'C',
                'conversion_rate' => 97,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'C++',
                'conversion_rate' => 50,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'C#',
                'conversion_rate' => 54,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'COBOL',
                'conversion_rate' => 54,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'Cognos Impromptu Scripts',
                'conversion_rate' => 47,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'Cross System Products (CSP)',
                'conversion_rate' => 20,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'Cool:Gen/IEF',
                'conversion_rate' => 32,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'Datastage',
                'conversion_rate' => 71,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'Excel',
                'conversion_rate' => 209,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'Focus',
                'conversion_rate' => 43,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'FoxPro',
                'conversion_rate' => 36,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'HTML',
                'conversion_rate' => 15,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'J2EE',
                'conversion_rate' => 46,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'Java',
                'conversion_rate' => 53,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'JavaScript',
                'conversion_rate' => 47,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'JCL',
                'conversion_rate' => 62,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'LINC II',
                'conversion_rate' => 29,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'Lotus Notes',
                'conversion_rate' => 23,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'Natural',
                'conversion_rate' => 40,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => '.NET',
                'conversion_rate' => 57,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'Oracle',
                'conversion_rate' => 37,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'PACBASE',
                'conversion_rate' => 35,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'Perl',
                'conversion_rate' => 24,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'PHP',
                'conversion_rate' => 53,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'PL/I',
                'conversion_rate' => 64,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'PL/SQL',
                'conversion_rate' => 37,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'Powerbuilder',
                'conversion_rate' => 26,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'REXX',
                'conversion_rate' => 77,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'Sabretalk',
                'conversion_rate' => 70,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'SAS',
                'conversion_rate' => 38,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'Siebel',
                'conversion_rate' => 59,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'SLOGAN',
                'conversion_rate' => 75,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'SQL',
                'conversion_rate' => 21,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'VB.NET',
                'conversion_rate' => 52,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'Visual Basic',
                'conversion_rate' => 42,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'other object-oriented languages',
                'conversion_rate' => 30,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'fourth generation languages (4GLs)',
                'conversion_rate' => 20,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'code generators',
                'conversion_rate' => 15,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'spreadsheets (excel programming)',
                'conversion_rate' => 6,
            ]
        );

        LanguageFunctionPoint::create(
            [
                'name' => 'graphical languages (icons) (draw-a-program languages)',
                'conversion_rate' => 4,
            ]
        );

        Functionality::factory(50)->create([
            'project_id' => 1,
            'language_function_point_id' => 1,
        ]);
    }
}
