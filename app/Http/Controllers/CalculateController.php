<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class CalculateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Project $project)
    {
        $ksloc = $project->ksloc();
        $scaleFactor = $project->scaleFactor->scale_factor;
        $effortMultiplier = $project->effortMultiplier->effort_multiplier;

        // CALCULATE EXPONENTIAL FACTOR
        define('B_CONSTANT', 0.91);
        $exponentFactor = B_CONSTANT + (0.01 * $scaleFactor);

        // EFFORT ESTIMATION
        define('A_CONSTANT', 2.94);
        $effortEstimation = A_CONSTANT * pow($ksloc, $exponentFactor) * $effortMultiplier;

        // TIME ESTIMATION
        define('C_CONSTANT', 3.67);
        define('D_CONSTANT', 0.28);
        $power = D_CONSTANT + (0.2 * ($exponentFactor - B_CONSTANT));
        $timeEstimation = C_CONSTANT * pow($effortEstimation, $power);

        // STAFF ESTIMATION
        $staffEstimation = $effortEstimation / $timeEstimation;

        // COST ESTIMATION
        $staffCostEstimation = $staffEstimation * $project->avg_staff_cost;
        $totalCostEstimation = $staffCostEstimation * $timeEstimation;

        $project->est_effort = $effortEstimation;
        $project->est_time = $timeEstimation;
        $project->est_staff = $staffEstimation;
        $project->est_cost = $totalCostEstimation;

        if ($project->save()) {
            return redirect()->route('projects.show', [$project]);
        }

        return redirect()->back()->with('message', 'Gagal menyimpan kalkulasi');
    }
}
