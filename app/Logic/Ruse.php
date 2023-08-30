<?php

namespace App\Logic;

class Ruse extends Membership
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

        if ($input > 0.95 && $input < 1) {
            $low = $this->alphaPredicateDown(0.95, 1, $input);
        }

        if ($input >= 1) {
            $low = 0;
        }

        $calculations['LOW'] = $low;

        // NOMINAL
        $nominal = 0;

        if ($input > 0.95 && $input < 1) {
            $nominal = $this->alphaPredicateUp(0.95, 1, $input);
        }

        if ($input == 1) {
            $nominal = 1;
        }

        if ($input > 1 && $input < 1.07) {
            $nominal = $this->alphaPredicateDown(1, 1.07, $input);
        }

        if ($input >= 1.07) {
            $nominal = 0;
        }

        $calculations['NOMINAL'] = $nominal;

        // HIGH
        $high = 0;

        if ($input > 1 && $input < 1.07) {
            $high = $this->alphaPredicateUp(1, 1.07, $input);
        }

        if ($input == 1.07) {
            $high = 1;
        }

        if ($input > 1.07 && $input < 1.15) {
            $high = $this->alphaPredicateDown(1.07, 1.15, $input);
        }

        if ($input >= 1.15) {
            $high = 0;
        }

        $calculations['HIGH'] = $high;

        // VERY HIGH
        $veryHigh = 0;

        if ($input > 1.07 && $input < 1.15) {
            $veryHigh = $this->alphaPredicateUp(1.07, 1.15, $input);
        }

        if ($input == 1.15) {
            $veryHigh = 1;
        }

        if ($input > 1.15 && $input < 1.25) {
            $veryHigh = $this->alphaPredicateDown(1.15, 1.25, $input);
        }

        if ($input >= 1.25) {
            $veryHigh = 0;
        }

        $calculations['VERY_HIGH'] = $veryHigh;

        // EXTRA HIGH
        $extraHigh = 0;

        if ($input > 1.15 && $input < 1.25) {
            $extraHigh = $this->alphaPredicateUp(1.15, 1.25, $input);
        }

        if ($input >= 1.25) {
            $extraHigh = 1;
        }

        $calculations['EXTRA_HIGH'] = $extraHigh;

        return $calculations;
    }
}
