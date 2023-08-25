<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $projects = Project::where('status', 1)->get();
        $projectsCount = Project::count();
        $draftProjectsCount = Project::where('status', 0)->count();

        return Inertia::render('Dashboard', [
            'projects' => $projects,
            'projectsCount' => $projectsCount,
            'draftProjectsCount' => $draftProjectsCount,
        ]);
    }
}
