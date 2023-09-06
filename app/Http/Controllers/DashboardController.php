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
    public function index(Request $request)
    {
        $projects = Project::where('status', 1)
            ->where('user_id', $request->user()->id)
            ->get();
        $projectsCount = Project::where('user_id', $request->user()->id)->count();
        $draftProjectsCount = Project::where('status', 0)
            ->where('user_id', $request->user()->id)
            ->count();

        return Inertia::render('Dashboard', [
            'projects' => $projects,
            'projectsCount' => $projectsCount,
            'draftProjectsCount' => $draftProjectsCount,
        ]);
    }
}
