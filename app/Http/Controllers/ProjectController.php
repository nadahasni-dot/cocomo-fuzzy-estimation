<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\CreateProjectRequest;
use App\Http\Requests\Project\EditProjectRequest;
use App\Http\Resources\FunctionalityCollection;
use App\Models\EffortMultiplier;
use App\Models\Functionality;
use App\Models\Project;
use App\Models\ScaleFactor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public $defaultLoad = 5;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $draftProjects = Project::where('status', 0)
            ->where('user_id', $request->user()->id)
            ->get();
        $projects = Project::where('status', 1)
            ->where('user_id', $request->user()->id)
            ->get();

        return Inertia::render('Projects', [
            'projects' => $projects,
            'draftProjects' => $draftProjects,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Projects/Form');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateProjectRequest $request)
    {
        $data = $request->validated();

        $project = Project::create([
            'user_id' => $request->user()->id,
            'name' => $data['name'],
            'description' => $data['description'],
            'avg_staff_cost' => $data['avgStaffCost'],
            'status' => 0,
            'image' => isset($data['image']) ? $data['image']->store('projects') : null,
        ]);

        if ($project) {
            return redirect()->route('projects.show', [$project]);
        }

        return redirect()->back()->with('message', 'Gagal membuat proyek');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Project $project)
    {
        $ksloc = $project->ksloc();

        $query = Functionality::query();
        $query->where('project_id', $project->id);
        $query->orderBy('id', 'desc');

        if ($request->q) {
            $query->where('name', 'like', '%' . $request->q . '%')
                ->orWhere('description', 'like', '%' . $request->q . '%');
        }

        $functionalities = new FunctionalityCollection($query->paginate($request->load ?? $this->defaultLoad));
        $countFunctionality = Functionality::where('project_id', $project->id)->count();
        $scaleFactor = ScaleFactor::where('project_id', $project->id)->first();
        $effortMultiplier = EffortMultiplier::where('project_id', $project->id)->first();

        return Inertia::render('Projects/Detail', [
            'project' => $project,
            'ksloc' => $ksloc,
            'functionalities' => $functionalities,
            'countFunctionality' => $countFunctionality,
            'scaleFactor' => $scaleFactor,
            'effortMultiplier' => $effortMultiplier,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Project $project)
    {
        return Inertia::render('Projects/Form/Edit', [
            'project' => $project,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(EditProjectRequest $request, Project $project)
    {
        $data = $request->validated();

        $project->name = $data['name'];
        $project->description = $data['description'];
        $project->avg_staff_cost = $data['avgStaffCost'];

        if (isset($data['image'])) {
            $project->image = $data['image']->store('projects');
        }

        if ($project->save()) {
            return redirect()->route('projects.show', [$project]);
        }

        return redirect()->back()->with('message', 'Gagal menyimpan proyek');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project)
    {
        if ($project->delete()) {
            return redirect()->route('projects');
        }

        return redirect()->back()->with('message', 'Gagal menghapus proyek');
    }
}
