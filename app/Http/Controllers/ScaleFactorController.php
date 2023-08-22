<?php

namespace App\Http\Controllers;

use App\Http\Requests\ScaleFactor\CreateScaleFactorRequest;
use App\Models\Project;
use App\Models\ScaleFactor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScaleFactorController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Project $project)
    {
        return Inertia::render('ScaleFactor/Form', ['project' => $project]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateScaleFactorRequest $request, Project $project)
    {
        $data = $request->validated();
        $scaleFactor = ScaleFactor::where('project_id', $project->id)->first();

        if ($scaleFactor == null) { // CREATE NEW IF NOT EXIST
            $new = ScaleFactor::create([
                'project_id'  => $project->id,
                'prec' => $data['prec'],
                'flex' => $data['flex'],
                'resl' => $data['resl'],
                'team' => $data['team'],
                'pmat' => $data['pmat'],
                'scale_factor' => $this->calculateScaleFactor($data['prec'], $data['flex'], $data['resl'], $data['team'], $data['pmat']),
            ]);

            if ($new) {
                return redirect()->route('projects.show', [$project]);
            }

            return redirect()->back()->with('message', 'Gagal membuat faktor skala');
        }

        // UPDATE IF ALREADY EXIST
        $scaleFactor->prec = $data['prec'];
        $scaleFactor->flex = $data['flex'];
        $scaleFactor->resl = $data['resl'];
        $scaleFactor->team = $data['team'];
        $scaleFactor->pmat = $data['pmat'];
        $scaleFactor->scale_factor = $this->calculateScaleFactor($data['prec'], $data['flex'], $data['resl'], $data['team'], $data['pmat']);
        $scaleFactor->save();

        if ($scaleFactor->save()) {
            return redirect()->route('projects.show', [$project]);
        }

        return redirect()->back()->with('message', 'Gagal menyimpan faktor skala');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Project $project, ScaleFactor $scalefactor)
    {
        return Inertia::render('ScaleFactor/Form/Edit', ['project' => $project, 'scaleFactor' => $scalefactor]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CreateScaleFactorRequest $request, Project $project, ScaleFactor $scalefactor)
    {
        $data = $request->validated();

        $scalefactor->prec = $data['prec'];
        $scalefactor->flex = $data['flex'];
        $scalefactor->resl = $data['resl'];
        $scalefactor->team = $data['team'];
        $scalefactor->pmat = $data['pmat'];
        $scalefactor->scale_factor = $this->calculateScaleFactor($data['prec'], $data['flex'], $data['resl'], $data['team'], $data['pmat']);
        $scalefactor->save();

        if ($scalefactor->save()) {
            return redirect()->route('projects.show', [$project]);
        }

        return redirect()->back()->with('message', 'Gagal menyimpan faktor skala');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $prec
     * @param  string  $flex
     * @param  string  $resl
     * @param  string  $team
     * @param  string  $pmat
     * @return double
     */
    public function calculateScaleFactor($prec, $flex, $resl, $team, $pmat)
    {
        $precVal = 0;
        $flexVal = 0;
        $reslVal = 0;
        $teamVal = 0;
        $pmatVal = 0;

        // PREC
        switch ($prec) {
            case "SR":
                $precVal = 6.20;
                break;
            case "R":
                $precVal = 4.96;
                break;
            case "N":
                $precVal = 3.72;
                break;
            case "T":
                $precVal = 2.48;
                break;
            case "ST":
                $precVal = 1.24;
                break;
            default:
                $precVal = 0;
                break;
        }

        // FLEX
        switch ($flex) {
            case "SR":
                $flexVal = 5.07;
                break;
            case "R":
                $flexVal = 4.96;
                break;
            case "N":
                $flexVal = 3.04;
                break;
            case "T":
                $flexVal = 2.03;
                break;
            case "ST":
                $flexVal = 1.01;
                break;
            default:
                $flexVal = 0;
                break;
        }

        // RESL
        switch ($resl) {
            case "SR":
                $reslVal = 7.07;
                break;
            case "R":
                $reslVal = 5.65;
                break;
            case "N":
                $reslVal = 4.24;
                break;
            case "T":
                $reslVal = 2.83;
                break;
            case "ST":
                $reslVal = 1.41;
                break;
            default:
                $reslVal = 0;
                break;
        }

        // TEAM
        switch ($team) {
            case "SR":
                $teamVal = 5.48;
                break;
            case "R":
                $teamVal = 4.38;
                break;
            case "N":
                $teamVal = 3.29;
                break;
            case "T":
                $teamVal = 2.19;
                break;
            case "ST":
                $teamVal = 1.10;
                break;
            default:
                $teamVal = 0;
                break;
        }

        // PMAT
        switch ($pmat) {
            case "SR":
                $pmatVal = 7.80;
                break;
            case "R":
                $pmatVal = 6.24;
                break;
            case "N":
                $pmatVal = 4.68;
                break;
            case "T":
                $pmatVal = 3.12;
                break;
            case "ST":
                $pmatVal = 1.56;
                break;
            default:
                $pmatVal = 0;
                break;
        }

        return $pmatVal + $flexVal + $precVal + $reslVal + $teamVal;
    }
}
