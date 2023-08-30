<?php

namespace App\Logic;

class Time extends Membership
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

        if ($input > 1 && $input < 1.11) {
            $nominal = $this->alphaPredicateDown(1, 1.11, $input);
        }

        if ($input >= 1.11) {
            $nominal = 0;
        }

        $calculations['NOMINAL'] = $nominal;

        // HIGH
        $high = 0;

        if ($input > 1 && $input < 1.11) {
            $high = $this->alphaPredicateUp(1, 1.11, $input);
        }

        if ($input == 1.11) {
            $high = 1;
        }

        if ($input > 1.11 && $input < 1.29) {
            $high = $this->alphaPredicateDown(1.11, 1.29, $input);
        }

        if ($input >= 1.29) {
            $high = 0;
        }

        $calculations['HIGH'] = $high;

        // VERY HIGH
        $veryHigh = 0;

        if ($input > 1.11 && $input < 1.29) {
            $veryHigh = $this->alphaPredicateUp(1.11, 1.29, $input);
        }

        if ($input == 1.29) {
            $veryHigh = 1;
        }

        if ($input > 1.29 && $input < 1.63) {
            $veryHigh = $this->alphaPredicateDown(1.29, 1.63, $input);
        }

        if ($input >= 1.63) {
            $veryHigh = 0;
        }

        $calculations['VERY_HIGH'] = $veryHigh;

        // EXTRA HIGH
        $extraHigh = 0;

        if ($input > 1.29 && $input < 1.63) {
            $extraHigh = $this->alphaPredicateUp(1.29, 1.63, $input);
        }

        if ($input >= 1.63) {
            $extraHigh = 1;
        }

        $calculations['EXTRA_HIGH'] = $extraHigh;

        return $calculations;
    }
}
