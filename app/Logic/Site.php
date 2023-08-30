<?php

namespace App\Logic;

class Site extends Membership
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

        if ($input > 0.78 && $input < 0.9) {
            $veryHigh = $this->alphaPredicateDown(0.78, 0.9, $input);
        }

        if ($input >= 0.9) {
            $veryHigh = 0;
        }

        $calculations['VERY_HIGH'] = $veryHigh;

        // HIGH
        $high = 0;

        if ($input > 0.78 && $input < 0.9) {
            $high = $this->alphaPredicateUp(0.78, 0.9, $input);
        }

        if ($input == 0.9) {
            $high = 1;
        }

        if ($input > 0.9 && $input < 1) {
            $high = $this->alphaPredicateDown(0.9, 1, $input);
        }

        if ($input >= 1) {
            $high = 0;
        }

        $calculations['HIGH'] = $high;

        // NOMINAL
        $nominal = 0;

        if ($input > 0.9 && $input < 1) {
            $nominal = $this->alphaPredicateUp(0.9, 1, $input);
        }

        if ($input == 1) {
            $nominal = 1;
        }

        if ($input > 1 && $input < 1.14) {
            $nominal = $this->alphaPredicateDown(1, 1.14, $input);
        }

        if ($input >= 1.14) {
            $nominal = 0;
        }

        $calculations['NOMINAL'] = $nominal;

        // LOW
        $low = 0;

        if ($input > 1 && $input < 1.14) {
            $low = $this->alphaPredicateUp(1, 1.14, $input);
        }

        if ($input == 1.14) {
            $low = 1;
        }

        if ($input > 1.14 && $input < 1.43) {
            $low = $this->alphaPredicateDown(1.14, 1.43, $input);
        }

        if ($input >= 1.43) {
            $low = 0;
        }

        $calculations['LOW'] = $low;

        // VERY LOW
        $veryLow = 0;

        if ($input > 1.14 && $input < 1.43) {
            $veryLow = $this->alphaPredicateUp(1.14, 1.43, $input);
        }

        if ($input >= 1.43) {
            $veryLow = 1;
        }

        $calculations['VERY_LOW'] = $veryLow;

        return array_reverse($calculations);
    }
}
