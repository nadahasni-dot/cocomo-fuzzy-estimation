<?php

namespace App\Logic;

class FuzzyLogic extends Membership
{
    private $input;
    private $membership;
    private $calculations;

    private $rules = [
        [
            'rely' => 'VERY_LOW',
            'data' => 'LOW',
            'cplx' => 'VERY_LOW',
            'docu' => 'VERY_LOW',
            'acap' => 'VERY_HIGH',
            'pcap' => 'VERY_HIGH',
            'pcon' => 'VERY_HIGH',
            'ruse' => 'LOW',
            'time' => 'NOMINAL',
            'stor' => 'NOMINAL',
            'pvol' => 'LOW',
            'aplex' => 'VERY_HIGH',
            'plex' => 'VERY_HIGH',
            'ltex' => 'VERY_HIGH',
            'tool' => 'VERY_HIGH',
            'site' => 'VERY_HIGH',
            'sced' => 'VERY_LOW',
            'effort_multiplier' => 'VERY_LOW',
        ],
        [
            'rely' => 'LOW',
            'data' => 'NOMINAL',
            'cplx' => 'LOW',
            'docu' => 'LOW',
            'acap' => 'HIGH',
            'pcap' => 'HIGH',
            'pcon' => 'HIGH',
            'ruse' => 'NOMINAL',
            'time' => 'HIGH',
            'stor' => 'HIGH',
            'pvol' => 'NOMINAL',
            'aplex' => 'HIGH',
            'plex' => 'HIGH',
            'ltex' => 'HIGH',
            'tool' => 'HIGH',
            'site' => 'HIGH',
            'sced' => 'LOW',
            'effort_multiplier' => 'LOW',
        ],
        [
            'rely' => 'NOMINAL',
            'data' => 'NOMINAL',
            'cplx' => 'NOMINAL',
            'docu' => 'NOMINAL',
            'acap' => 'NOMINAL',
            'pcap' => 'NOMINAL',
            'pcon' => 'HIGH',
            'ruse' => 'NOMINAL',
            'time' => 'HIGH',
            'stor' => 'HIGH',
            'pvol' => 'NOMINAL',
            'aplex' => 'NOMINAL',
            'plex' => 'NOMINAL',
            'ltex' => 'NOMINAL',
            'tool' => 'NOMINAL',
            'site' => 'NOMINAL',
            'sced' => 'NOMINAL',
            'effort_multiplier' => 'NOMINAL',
        ],
        [
            'rely' => 'HIGH',
            'data' => 'HIGH',
            'cplx' => 'HIGH',
            'docu' => 'HIGH',
            'acap' => 'LOW',
            'pcap' => 'LOW',
            'pcon' => 'NOMINAL',
            'ruse' => 'HIGH',
            'time' => 'HIGH',
            'stor' => 'HIGH',
            'pvol' => 'HIGH',
            'aplex' => 'LOW',
            'plex' => 'LOW',
            'ltex' => 'LOW',
            'tool' => 'LOW',
            'site' => 'LOW',
            'sced' => 'HIGH',
            'effort_multiplier' => 'HIGH',
        ],
        [
            'rely' => 'VERY_HIGH',
            'data' => 'VERY_HIGH',
            'cplx' => 'VERY_HIGH',
            'docu' => 'VERY_HIGH',
            'acap' => 'VERY_LOW',
            'pcap' => 'VERY_LOW',
            'pcon' => 'VERY_LOW',
            'ruse' => 'VERY_HIGH',
            'time' => 'VERY_HIGH',
            'stor' => 'VERY_HIGH',
            'pvol' => 'VERY_HIGH',
            'aplex' => 'VERY_LOW',
            'plex' => 'VERY_LOW',
            'ltex' => 'VERY_LOW',
            'tool' => 'VERY_LOW',
            'site' => 'VERY_LOW',
            'sced' => 'VERY_HIGH',
            'effort_multiplier' => 'VERY_HIGH',
        ],
        [
            'rely' => 'VERY_HIGH',
            'data' => 'VERY_HIGH',
            'cplx' => 'EXTRA_HIGH',
            'docu' => 'VERY_HIGH',
            'acap' => 'VERY_LOW',
            'pcap' => 'VERY_LOW',
            'pcon' => 'VERY_LOW',
            'ruse' => 'EXTRA_HIGH',
            'time' => 'EXTRA_HIGH',
            'stor' => 'EXTRA_HIGH',
            'pvol' => 'VERY_HIGH',
            'aplex' => 'VERY_LOW',
            'plex' => 'VERY_LOW',
            'ltex' => 'VERY_LOW',
            'tool' => 'VERY_LOW',
            'site' => 'VERY_LOW',
            'sced' => 'VERY_HIGH',
            'effort_multiplier' => 'EXTRA_HIGH',
        ],
    ];

    /**
     * Create FuzzyLogic instance
     *
     * @param array 17 effort multiplier input
     */
    public function __construct(array $input)
    {
        $this->input = $input;
    }

    /**
     * calculate all the alpha predicate for each rules
     *     
     * @return float
     */
    private function calculateAlphaPredicate()
    {
        $alpha = [];

        foreach ($this->rules as $rule) {
            $memberships = [];

            // push each membership on each rule
            foreach ($rule as $key => $value) {
                if ($key == 'effort_multiplier') continue;

                array_push($memberships, $this->membership[$key][$value]);
            }

            // get minimum membership
            $minimum = min($memberships);

            array_push($alpha, $minimum);
        }

        // save alpha predicate calculations
        $this->calculations['alpha'] = $alpha;
    }

    /**
     * calculate all the z value for each rules
     *     
     * @return float
     */
    private function calculateZ()
    {
        $z = [];

        for ($i = 0; $i < count($this->rules); $i++) {
            $rule = $this->rules[$i];
            $alpha = $this->calculations['alpha'][$i];

            $result = 0;
            switch ($rule['effort_multiplier']) {
                case 'VERY_LOW':
                    if ($alpha == 1) {
                        $result = 0.71;
                    }

                    if ($alpha == 0) {
                        $result = 0.92;
                    }

                    if ($alpha > 0 && $alpha < 1) {
                        $result = $this->zDown(0.71, 0.92, $alpha);
                    }
                    break;
                case 'LOW':
                    if ($alpha == 1) {
                        $result = 0.92;
                    }

                    if ($alpha == 0) {
                        $result = min([0.71, 1.12]);
                    }

                    if ($alpha > 0 && $alpha < 1) {
                        $result = min([$this->zUp(0.71, 0.92, $alpha), $this->zDown(0.92, 1.12, $alpha)]);
                    }
                    break;
                case 'NOMINAL':
                    if ($alpha == 1) {
                        $result = 1.12;
                    }

                    if ($alpha == 0) {
                        $result = min([0.92, 1.33]);
                    }

                    if ($alpha > 0 && $alpha < 1) {
                        $result = min([$this->zUp(0.92, 0.12, $alpha), $this->zDown(1.12, 1.33, $alpha)]);
                    }
                    break;
                case 'HIGH':
                    if ($alpha == 1) {
                        $result = 1.33;
                    }

                    if ($alpha == 0) {
                        $result = min([1.12, 1.53]);
                    }

                    if ($alpha > 0 && $alpha < 1) {
                        $result = min([$this->zUp(1.12, 1.33, $alpha), $this->zDown(1.33, 1.53, $alpha)]);
                    }
                    break;
                case 'VERY_HIGH':
                    if ($alpha == 1) {
                        $result = 1.53;
                    }

                    if ($alpha == 0) {
                        $result = min([1.33, 1.74]);
                    }

                    if ($alpha > 0 && $alpha < 1) {
                        $result = min($this->zUp(1.33, 1.53, $alpha), $this->zDown(1.53, 1.74, $alpha));
                    }
                    break;
                case 'EXTRA_HIGH':
                    if ($alpha == 1) {
                        $result = 1.74;
                    }

                    if ($alpha == 0) {
                        $result = 1.53;
                    }

                    if ($alpha > 0 && $alpha < 1) {
                        $result = $this->zUp(1.53, 1.74, $alpha);
                    }
                    break;
                default:
                    $result = 0;
                    break;
            }

            array_push($z, $result);
        }

        // save z calculations
        $this->calculations['z'] = $z;
    }

    /**
     * Get fuzzy calculation.
     *
     * @return float
     */
    public function calculateFuzzy()
    {
        // * Membership Calculations
        $rely = new Rely($this->input['rely']);
        $this->membership['rely'] = $rely->calculateMembership();

        $data = new Data($this->input['data']);
        $this->membership['data'] = $data->calculateMembership();

        $cplx = new Cplx($this->input['cplx']);
        $this->membership['cplx'] = $cplx->calculateMembership();

        $docu = new Docu($this->input['docu']);
        $this->membership['docu'] = $docu->calculateMembership();

        $acap = new Acap($this->input['acap']);
        $this->membership['acap'] = $acap->calculateMembership();

        $pcap = new Pcap($this->input['pcap']);
        $this->membership['pcap'] = $pcap->calculateMembership();

        $pcon = new Pcon($this->input['pcon']);
        $this->membership['pcon'] = $pcon->calculateMembership();

        $ruse = new Ruse($this->input['ruse']);
        $this->membership['ruse'] = $ruse->calculateMembership();

        $time = new Time($this->input['time']);
        $this->membership['time'] = $time->calculateMembership();

        $stor = new Stor($this->input['stor']);
        $this->membership['stor'] = $stor->calculateMembership();

        $pvol = new Pvol($this->input['pvol']);
        $this->membership['pvol'] = $pvol->calculateMembership();

        $aplex = new Aplex($this->input['aplex']);
        $this->membership['aplex'] = $aplex->calculateMembership();

        $plex = new Plex($this->input['plex']);
        $this->membership['plex'] = $plex->calculateMembership();

        $ltex = new Ltex($this->input['ltex']);
        $this->membership['ltex'] = $ltex->calculateMembership();

        $tool = new Tool($this->input['tool']);
        $this->membership['tool'] = $tool->calculateMembership();

        $site = new Site($this->input['site']);
        $this->membership['site'] = $site->calculateMembership();

        $sced = new Sced($this->input['sced']);
        $this->membership['sced'] = $sced->calculateMembership();

        // * Membership Calculation

        $this->calculateAlphaPredicate();
        $this->calculateZ();

        // * AVERAGE
        $sumAlpha = 0;
        foreach ($this->calculations['alpha'] as $alpha) {
            $sumAlpha += $alpha;
        }

        $sumAlphaMultiplyZ = 0;
        for ($i = 0; $i < count($this->calculations['alpha']); $i++) {
            $alpha = $this->calculations['alpha'][$i];
            $z = $this->calculations['z'][$i];

            $sumAlphaMultiplyZ += ($alpha * $z);
        }

        if ($sumAlphaMultiplyZ <= 0) return 0.71;
        if ($sumAlpha <= 0) return 0.71;

        $output = $sumAlphaMultiplyZ / $sumAlpha;

        return $output;
    }
}
