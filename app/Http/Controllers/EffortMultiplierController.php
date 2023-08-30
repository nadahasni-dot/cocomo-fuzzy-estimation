<?php

namespace App\Http\Controllers;

use App\Http\Requests\EffortMultiplier\CreateEffortMultiplierRequest;
use App\Logic\FuzzyLogic;
use App\Models\EffortMultiplier;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EffortMultiplierController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Project $project)
    {
        return Inertia::render('EffortMultiplier/Form', ['project' => $project]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateEffortMultiplierRequest $request, Project $project)
    {
        $data = $request->validated();
        $effortMultiplier = EffortMultiplier::where('project_id', $project->id)->first();

        if ($effortMultiplier == null) { // CREATE NEW IF NOT EXIST
            $new = EffortMultiplier::create([
                'project_id' => $project->id,
                'rely' => abs($data['rely']),
                'data' => abs($data['data']),
                'cplx' => abs($data['cplx']),
                'docu' => abs($data['docu']),
                'acap' => abs($data['acap']),
                'pcap' => abs($data['pcap']),
                'pcon' => abs($data['pcon']),
                'ruse' => abs($data['ruse']),
                'time' => abs($data['time']),
                'stor' => abs($data['stor']),
                'pvol' => abs($data['pvol']),
                'aplex' => abs($data['aplex']),
                'plex' => abs($data['plex']),
                'ltex' => abs($data['ltex']),
                'tool' => abs($data['tool']),
                'site' => abs($data['site']),
                'sced' => abs($data['sced']),
                'effort_multiplier' => $this->calculateEffortMultiplier(
                    abs($data['rely']),
                    abs($data['data']),
                    abs($data['cplx']),
                    abs($data['docu']),
                    abs($data['acap']),
                    abs($data['pcap']),
                    abs($data['pcon']),
                    abs($data['ruse']),
                    abs($data['time']),
                    abs($data['stor']),
                    abs($data['pvol']),
                    abs($data['aplex']),
                    abs($data['plex']),
                    abs($data['ltex']),
                    abs($data['tool']),
                    abs($data['site']),
                    abs($data['sced']),
                ),
            ]);

            if ($new) {
                return redirect()->route('projects.show', [$project]);
            }

            return redirect()->back()->with('message', 'Gagal membuat pengganda usaha');
        }

        // UPDATE IF ALREADY EXIST
        $effortMultiplier->rely = abs($data['rely']);
        $effortMultiplier->data = abs($data['data']);
        $effortMultiplier->cplx = abs($data['cplx']);
        $effortMultiplier->docu = abs($data['docu']);
        $effortMultiplier->acap = abs($data['acap']);
        $effortMultiplier->pcap = abs($data['pcap']);
        $effortMultiplier->pcon = abs($data['pcon']);
        $effortMultiplier->ruse = abs($data['ruse']);
        $effortMultiplier->time = abs($data['time']);
        $effortMultiplier->stor = abs($data['stor']);
        $effortMultiplier->pvol = abs($data['pvol']);
        $effortMultiplier->aplex = abs($data['aplex']);
        $effortMultiplier->plex = abs($data['plex']);
        $effortMultiplier->ltex = abs($data['ltex']);
        $effortMultiplier->tool = abs($data['tool']);
        $effortMultiplier->site = abs($data['site']);
        $effortMultiplier->sced = abs($data['sced']);
        $effortMultiplier->effort_multiplier = $this->calculateEffortMultiplier(
            abs($data['rely']),
            abs($data['data']),
            abs($data['cplx']),
            abs($data['docu']),
            abs($data['acap']),
            abs($data['pcap']),
            abs($data['pcon']),
            abs($data['ruse']),
            abs($data['time']),
            abs($data['stor']),
            abs($data['pvol']),
            abs($data['aplex']),
            abs($data['plex']),
            abs($data['ltex']),
            abs($data['tool']),
            abs($data['site']),
            abs($data['sced']),
        );

        if ($effortMultiplier->save()) {
            return redirect()->route('projects.show', [$project]);
        }

        return redirect()->back()->with('message', 'Gagal menyimpan pengganda usaha');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Project $project, EffortMultiplier $effortmultiplier)
    {
        return Inertia::render('EffortMultiplier/Form/Edit', ['project' => $project, 'effortMultiplier' => $effortmultiplier]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CreateEffortMultiplierRequest $request, Project $project, EffortMultiplier $effortmultiplier)
    {
        $data = $request->validated();

        // UPDATE IF ALREADY EXIST
        $effortmultiplier->rely = abs($data['rely']);
        $effortmultiplier->data = abs($data['data']);
        $effortmultiplier->cplx = abs($data['cplx']);
        $effortmultiplier->docu = abs($data['docu']);
        $effortmultiplier->acap = abs($data['acap']);
        $effortmultiplier->pcap = abs($data['pcap']);
        $effortmultiplier->pcon = abs($data['pcon']);
        $effortmultiplier->ruse = abs($data['ruse']);
        $effortmultiplier->time = abs($data['time']);
        $effortmultiplier->stor = abs($data['stor']);
        $effortmultiplier->pvol = abs($data['pvol']);
        $effortmultiplier->aplex = abs($data['aplex']);
        $effortmultiplier->plex = abs($data['plex']);
        $effortmultiplier->ltex = abs($data['ltex']);
        $effortmultiplier->tool = abs($data['tool']);
        $effortmultiplier->site = abs($data['site']);
        $effortmultiplier->sced = abs($data['sced']);
        $effortmultiplier->effort_multiplier = $this->calculateEffortMultiplier(
            abs($data['rely']),
            abs($data['data']),
            abs($data['cplx']),
            abs($data['docu']),
            abs($data['acap']),
            abs($data['pcap']),
            abs($data['pcon']),
            abs($data['ruse']),
            abs($data['time']),
            abs($data['stor']),
            abs($data['pvol']),
            abs($data['aplex']),
            abs($data['plex']),
            abs($data['ltex']),
            abs($data['tool']),
            abs($data['site']),
            abs($data['sced']),
        );

        // EFFORT MULTIPLIER FUZZY
        $fuzzyLogic = new FuzzyLogic([
            'rely' => abs($data['rely']),
            'data' => abs($data['data']),
            'cplx' => abs($data['cplx']),
            'docu' => abs($data['docu']),
            'acap' => abs($data['acap']),
            'pcap' => abs($data['pcap']),
            'pcon' => abs($data['pcon']),
            'ruse' => abs($data['ruse']),
            'time' => abs($data['time']),
            'stor' => abs($data['stor']),
            'pvol' => abs($data['pvol']),
            'aplex' => abs($data['aplex']),
            'plex' => abs($data['plex']),
            'ltex' => abs($data['ltex']),
            'tool' => abs($data['tool']),
            'site' => abs($data['site']),
            'sced' => abs($data['sced']),
        ]);
        $effortmultiplier->effort_multiplier_fuzzy = $fuzzyLogic->calculateFuzzy();

        if ($effortmultiplier->save()) {
            return redirect()->route('projects.show', [$project]);
        }

        return redirect()->back()->with('message', 'Gagal menyimpan pengganda usaha');
    }

    /**
     * Update the specified resource in storage.
     *      
     * @param float rely
     * @param float data
     * @param float cplx
     * @param float docu
     * @param float acap
     * @param float pcap
     * @param float pcon
     * @param float ruse
     * @param float time
     * @param float stor
     * @param float pvol
     * @param float aplex
     * @param float plex
     * @param float ltex
     * @param float tool
     * @param float site
     * @param float sced
     * @return \Illuminate\Http\Response
     */
    public function calculateEffortMultiplier(
        $rely,
        $data,
        $cplx,
        $docu,
        $acap,
        $pcap,
        $pcon,
        $ruse,
        $time,
        $stor,
        $pvol,
        $aplex,
        $plex,
        $ltex,
        $tool,
        $site,
        $sced,
    ) {
        return ($rely + $data + $cplx + $docu + $acap + $pcap + $pcon + $ruse + $time + $stor + $pvol + $aplex + $plex + $ltex + $tool + $site + $sced) / 17;
    }
}
