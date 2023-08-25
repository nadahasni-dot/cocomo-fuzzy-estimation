<?php

namespace App\Http\Controllers;

use App\Http\Requests\Functionality\CreateFunctionalityRequest;
use App\Models\Functionality;
use App\Models\LanguageFunctionPoint;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FunctionalityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Project $project)
    {
        $languageFunctionPoints = LanguageFunctionPoint::all();

        return Inertia::render('Functionality/Form', [
            'languageFunctionPoints' => $languageFunctionPoints,
            'project' => $project,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateFunctionalityRequest $request, Project $project)
    {
        $data = $request->validated();
        $language = LanguageFunctionPoint::where('id', $data['languageFunctionPointId']['value'])->first();

        $functionality = Functionality::create([
            'project_id'  => $project->id,
            'name' => $data['name'],
            'description' => $data['description'],
            'language_function_point_id' => $data['languageFunctionPointId']['value'],
            'exi' => json_encode($data['exi']),
            'exo' => json_encode($data['exo']),
            'exiq' => json_encode($data['exiq']),
            'ilof' => json_encode($data['ilof']),
            'elof' => json_encode($data['elof']),
            'ksloc' => $this->calculateKSLOC($data['exi'], $data['exo'], $data['exiq'], $data['ilof'], $data['elof'], $language->conversion_rate),
        ]);

        if ($functionality) {
            return redirect()->route('projects.show', [$project]);
        }

        return redirect()->back()->with('message', 'Gagal membuat fungsionalitas');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Functionality $functionality)
    {
        return $functionality;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Project $project, Functionality $functionality)
    {
        $languageFunctionPoints = LanguageFunctionPoint::all();
        $functionality = $functionality
            ->where('id', $functionality->id)
            ->with(['languageFunctionPoint'])->first();

        return Inertia::render('Functionality/Form/Edit', [
            'languageFunctionPoints' => $languageFunctionPoints,
            'project' => $project,
            'functionality' => $functionality,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CreateFunctionalityRequest $request,  Project $project, Functionality $functionality)
    {
        $data = $request->validated();
        $language = LanguageFunctionPoint::where('id', $data['languageFunctionPointId']['value'])->first();

        $functionality->name = $data['name'];
        $functionality->description = $data['description'];
        $functionality->language_function_point_id = $data['languageFunctionPointId']['value'];
        $functionality->exi = json_encode($data['exi']);
        $functionality->exo = json_encode($data['exo']);
        $functionality->exiq = json_encode($data['exiq']);
        $functionality->ilof = json_encode($data['ilof']);
        $functionality->elof = json_encode($data['elof']);
        $functionality->ksloc = $this->calculateKSLOC($data['exi'], $data['exo'], $data['exiq'], $data['ilof'], $data['elof'], $language->conversion_rate);

        if ($functionality->save()) {
            return redirect()->route('projects.show', [$project]);
        }

        return redirect()->back()->with('message', 'Gagal menyimpan fungsionalitas');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project, Functionality $functionality)
    {
        if ($functionality->delete()) {
            return redirect()->route('projects.show', $project);
        }

        return redirect()->back()->with('message', 'Gagal menghapus proyek');
    }

    /**
     * Calculate KSLOC
     *
     * @param  array  exi
     * @param  array  exo
     * @param  array  exiq
     * @param  array  ilof
     * @param  array  elof
     * @param  double  conversionRate
     * @return double
     */
    public function calculateKSLOC($exi, $exo, $exiq, $ilof, $elof, $conversionRate)
    {
        define('EXI_EASY', 3);
        define('EXI_MODERATE', 4);
        define('EXI_HARD', 6);
        define('EXO_EASY', 4);
        define('EXO_MODERATE', 5);
        define('EXO_HARD', 7);
        define('EXIQ_EASY', 3);
        define('EXIQ_MODERATE', 4);
        define('EXIQ_HARD', 6);
        define('ILOF_EASY', 7);
        define('ILOF_MODERATE', 10);
        define('ILOF_HARD', 15);
        define('ELOF_EASY', 5);
        define('ELOF_MODERATE', 7);
        define('ELOF_HARD', 10);

        // EXI
        $exiEasy = EXI_EASY * $exi['easy'];
        $exiModerate = EXI_MODERATE * $exi['moderate'];
        $exiHard = EXI_HARD * $exi['hard'];
        $exiUfp = $exiEasy + $exiModerate + $exiHard;

        // EXO
        $exoEasy = EXO_EASY * $exo['easy'];
        $exoModerate = EXO_MODERATE * $exo['moderate'];
        $exoHard = EXO_HARD * $exo['hard'];
        $exoUfp = $exoEasy + $exoModerate + $exoHard;

        // EXIQ
        $exiqEasy = EXIQ_EASY * $exiq['easy'];
        $exiqModerate = EXIQ_MODERATE * $exiq['moderate'];
        $exiqHard = EXIQ_HARD * $exiq['hard'];
        $exiqUfp = $exiqEasy + $exiqModerate + $exiqHard;

        // ILOF
        $ilofEasy = ILOF_EASY * $ilof['easy'];
        $ilofModerate = ILOF_MODERATE * $ilof['moderate'];
        $ilofHard = ILOF_HARD * $ilof['hard'];
        $ilofUfp = $ilofEasy + $ilofModerate + $ilofHard;

        // ELOF
        $elofEasy = ELOF_EASY * $elof['easy'];
        $elofModerate = ELOF_MODERATE * $elof['moderate'];
        $elofHard = ELOF_HARD * $elof['hard'];
        $elofUfp = $elofEasy + $elofModerate + $elofHard;

        $totalUfp = $exiUfp + $exoUfp + $exiqUfp + $ilofUfp + $elofUfp;

        return $totalUfp * $conversionRate / 1000;
    }
}
