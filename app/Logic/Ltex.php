<?php

namespace App\Logic;

class Ltex extends Membership
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

        // EXTRA HIGH
        $calculations['EXTRA_HIGH'] = 0;

        // VERY HIGH
        $veryHigh = 1;

        if ($input > 0.84 && $input < 0.91) {
            $veryHigh = $this->alphaPredicateDown(0.84, 0.91, $input);
        }

        if ($input >= 0.91) {
            $veryHigh = 0;
        }

        $calculations['VERY_HIGH'] = $veryHigh;

        // HIGH
        $high = 0;

        if ($input > 0.84 && $input < 0.91) {
            $high = $this->alphaPredicateUp(0.84, 0.91, $input);
        }

        if ($input == 0.91) {
            $high = 1;
        }

        if ($input > 0.91 && $input < 1) {
            $high = $this->alphaPredicateDown(0.91, 1, $input);
        }

        if ($input >= 1) {
            $high = 0;
        }

        $calculations['HIGH'] = $high;

        // NOMINAL
        $nominal = 0;

        if ($input > 0.91 && $input < 1) {
            $nominal = $this->alphaPredicateUp(0.91, 1, $input);
        }

        if ($input == 1) {
            $nominal = 1;
        }

        if ($input > 1 && $input < 1.09) {
            $nominal = $this->alphaPredicateDown(1, 1.09, $input);
        }

        if ($input >= 1.09) {
            $nominal = 0;
        }

        $calculations['NOMINAL'] = $nominal;

        // LOW
        $low = 0;

        if ($input > 1 && $input < 1.09) {
            $low = $this->alphaPredicateUp(1, 1.09, $input);
        }

        if ($input == 1.09) {
            $low = 1;
        }

        if ($input > 1.09 && $input < 1.2) {
            $low = $this->alphaPredicateDown(1.09, 1.2, $input);
        }

        if ($input >= 1.2) {
            $low = 0;
        }

        $calculations['LOW'] = $low;

        // VERY LOW
        $veryLow = 0;

        if ($input > 1.09 && $input < 1.2) {
            $veryLow = $this->alphaPredicateUp(1.09, 1.2, $input);
        }

        if ($input >= 1.2) {
            $veryLow = 1;
        }

        $calculations['VERY_LOW'] = $veryLow;

        return array_reverse($calculations);
    }
}
