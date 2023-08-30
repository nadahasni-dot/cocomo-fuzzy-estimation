<?php

namespace App\Logic;

class Pvol extends Membership
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
        $low = 1;

        if ($input > 0.82 && $input < 1) {
            $low = $this->alphaPredicateDown(0.82, 1, $input);
        }

        if ($input >= 1) {
            $low = 0;
        }

        $calculations['LOW'] = $low;

        // NOMINAL
        $nominal = 0;

        if ($input > 0.82 && $input < 1) {
            $nominal = $this->alphaPredicateUp(0.82, 1, $input);
        }

        if ($input == 1) {
            $nominal = 1;
        }

        if ($input > 1 && $input < 1.15) {
            $nominal = $this->alphaPredicateDown(1, 1.15, $input);
        }

        if ($input >= 1.15) {
            $nominal = 0;
        }

        $calculations['NOMINAL'] = $nominal;

        // HIGH
        $high = 0;

        if ($input > 1 && $input < 1.15) {
            $high = $this->alphaPredicateUp(1, 1.15, $input);
        }

        if ($input == 1.15) {
            $high = 1;
        }

        if ($input > 1.15 && $input < 1.3) {
            $high = $this->alphaPredicateDown(1.15, 1.3, $input);
        }

        if ($input >= 1.3) {
            $high = 0;
        }

        $calculations['HIGH'] = $high;

        // VERY HIGH
        $veryHigh = 0;

        if ($input > 1.15 && $input < 1.3) {
            $veryHigh = $this->alphaPredicateUp(1.15, 1.3, $input);
        }

        if ($input >= 1.3) {
            $veryHigh = 1;
        }

        $calculations['VERY_HIGH'] = $veryHigh;

        // EXTRA HIGH
        $calculations['EXTRA_HIGH'] = 0;

        return $calculations;
    }
}
