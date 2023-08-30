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
        $effortMultiplierFuzzy = $project->effortMultiplier->effort_multiplier_fuzzy;

        // CALCULATE EXPONENTIAL FACTOR
        define('B_CONSTANT', 0.91);
        $exponentFactor = B_CONSTANT + (0.01 * $scaleFactor);

        // EFFORT ESTIMATION
        define('A_CONSTANT', 2.94);
        $effortEstimation = A_CONSTANT * pow($ksloc, $exponentFactor) * $effortMultiplier;
        $effortEstimationFuzzy = A_CONSTANT * pow($ksloc, $exponentFactor) * $effortMultiplierFuzzy;

        // TIME ESTIMATION
        define('C_CONSTANT', 3.67);
        define('D_CONSTANT', 0.28);
        $power = D_CONSTANT + (0.2 * ($exponentFactor - B_CONSTANT));
        $timeEstimation = C_CONSTANT * pow($effortEstimation, $power);
        $timeEstimationFuzzy = C_CONSTANT * pow($effortEstimationFuzzy, $power);

        // STAFF ESTIMATION
        $staffEstimation = $effortEstimation / $timeEstimation;
        $staffEstimationFuzzy = $effortEstimation / $timeEstimationFuzzy;

        // COST ESTIMATION
        $staffCostEstimation = $staffEstimation * $project->avg_staff_cost;
        $staffCostEstimationFuzzy = $staffEstimationFuzzy * $project->avg_staff_cost;
        $totalCostEstimation = $staffCostEstimation * $timeEstimation;
        $totalCostEstimationFuzzy = $staffCostEstimationFuzzy * $timeEstimation;

        $project->est_effort = $effortEstimation;
        $project->est_time = $timeEstimation;
        $project->est_staff = $staffEstimation;
        $project->est_cost = $totalCostEstimation;

        $project->est_effort_fuzzy = $effortEstimationFuzzy;
        $project->est_time_fuzzy = $timeEstimationFuzzy;
        $project->est_staff_fuzzy = $staffEstimationFuzzy;
        $project->est_cost_fuzzy = $totalCostEstimationFuzzy;

        $project->status = 1;

        if ($project->save()) {
            return redirect()->route('projects.show', [$project]);
        }

        return redirect()->back()->with('message', 'Gagal menyimpan kalkulasi');
    }
}
