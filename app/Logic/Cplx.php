<?php

namespace App\Logic;

class Cplx extends Membership
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
        $veryLow = 1;

        if ($input > 0.73 && $input < 0.87) {
            $veryLow = $this->alphaPredicateDown(0.73, 0.87, $input);
        }

        if ($input >= 0.87) {
            $veryLow = 0;
        }

        $calculations['VERY_LOW'] = $veryLow;

        // LOW
        $low = 0;

        if ($input > 0.73 && $input < 0.87) {
            $low = $this->alphaPredicateUp(0.73, 0.87, $input);
        }

        if ($input == 0.87) {
            $low = 1;
        }

        if ($input > 0.87 && $input < 1) {
            $low = $this->alphaPredicateDown(0.87, 1, $input);
        }

        if ($input >= 1) {
            $low = 0;
        }

        $calculations['LOW'] = $low;

        // NOMINAL
        $nominal = 0;

        if ($input > 0.87 && $input < 1) {
            $nominal = $this->alphaPredicateUp(0.87, 1, $input);
        }

        if ($input == 1) {
            $nominal = 1;
        }

        if ($input > 1 && $input < 1.17) {
            $nominal = $this->alphaPredicateDown(1, 1.17, $input);
        }

        if ($input >= 1.17) {
            $nominal = 0;
        }

        $calculations['NOMINAL'] = $nominal;

        // HIGH
        $high = 0;

        if ($input > 1 && $input < 1.17) {
            $high = $this->alphaPredicateUp(1, 1.17, $input);
        }

        if ($input == 1.17) {
            $high = 1;
        }

        if ($input > 1.17 && $input < 1.34) {
            $high = $this->alphaPredicateDown(1.17, 1.34, $input);
        }

        if ($input >= 1.34) {
            $high = 0;
        }

        $calculations['HIGH'] = $high;

        // VERY HIGH
        $veryHigh = 0;

        if ($input > 1.17 && $input < 1.34) {
            $veryHigh = $this->alphaPredicateUp(1.17, 1.34, $input);
        }

        if ($input == 1.34) {
            $veryHigh = 1;
        }

        if ($input > 1.34 && $input < 1.74) {
            $veryHigh = $this->alphaPredicateDown(1.34, 1.74, $input);
        }

        if ($input >= 1.74) {
            $veryHigh = 0;
        }

        $calculations['VERY_HIGH'] = $veryHigh;

        // EXTRA HIGH
        $extraHigh = 0;

        if ($input > 1.34 && $input < 1.74) {
            $extraHigh = $this->alphaPredicateUp(1.34, 1.74, $input);
        }

        if ($input >= 1.74) {
            $extraHigh = 1;
        }

        $calculations['EXTRA_HIGH'] = $extraHigh;

        return $calculations;
    }
}
