<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EffortMultiplierController;
use App\Http\Controllers\FunctionalityController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ScaleFactorController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('/projects', ProjectController::class, [
        'names' => [
            'index' => 'projects',
        ]
    ])->except(['update']);
    Route::post('/projects/{project}/update', [ProjectController::class, 'update'])->name('projects.update');

    Route::resource('/projects/{project}/functionalities', FunctionalityController::class);
    Route::resource('/projects/{project}/scalefactor', ScaleFactorController::class)->except(['index, destroy, show']);
    Route::resource('/projects/{project}/effortmultiplier', EffortMultiplierController::class)->except(['index, destroy, show']);
});



require __DIR__ . '/auth.php';
