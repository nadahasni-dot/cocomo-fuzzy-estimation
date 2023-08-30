<?php

namespace App\Logic;

class Stor extends Membership
{
    private $input;

    /**
     * Create RELY input membership instance
     *
     * @param float $input
     */
    public function __construct(float $input)
    {
        $this->input = $input;
    }

    /**
     * Calculate membership
     *
     * @return array
     */
    public function calculateMembership()
    {
        $input = $this->input;
        $calculations = [];

        // VERY LOW        
        $calculations['VERY_LOW'] = 0;

        // LOW
        $calculations['LOW'] = 0;

        // NOMINAL
        $nominal = 1;

        if ($input > 1 && $input < 1.05) {
            $nominal = $this->alphaPredicateDown(1, 1.05, $input);
        }

        if ($input >= 1.05) {
            $nominal = 0;
        }

        $calculations['NOMINAL'] = $nominal;

        // HIGH
        $high = 0;

        if ($input > 1 && $input < 1.05) {
            $high = $this->alphaPredicateUp(1, 1.05, $input);
        }

        if ($input == 1.05) {
            $high = 1;
        }

        if ($input > 1.05 && $input < 1.17) {
            $high = $this->alphaPredicateDown(1.05, 1.17, $input);
        }

        if ($input >= 1.17) {
            $high = 0;
        }

        $calculations['HIGH'] = $high;

        // VERY HIGH
        $veryHigh = 0;

        if ($input > 1.05 && $input < 1.17) {
            $veryHigh = $this->alphaPredicateUp(1.05, 1.17, $input);
        }

        if ($input == 1.17) {
            $veryHigh = 1;
        }

        if ($input > 1.17 && $input < 1.46) {
            $veryHigh = $this->alphaPredicateDown(1.17, 1.46, $input);
        }

        if ($input >= 1.46) {
            $veryHigh = 0;
        }

        $calculations['VERY_HIGH'] = $veryHigh;

        // EXTRA HIGH
        $extraHigh = 0;

        if ($input > 1.17 && $input < 1.46) {
            $extraHigh = $this->alphaPredicateUp(1.17, 1.46, $input);
        }

        if ($input >= 1.46) {
            $extraHigh = 1;
        }

        $calculations['EXTRA_HIGH'] = $extraHigh;

        return $calculations;
    }
}
