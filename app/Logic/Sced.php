<?php

namespace App\Logic;

class Sced extends Membership
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

        if ($input > 0.82 && $input < 0.92) {
            $veryLow = $this->alphaPredicateDown(0.82, 0.92, $input);
        }

        if ($input >= 0.92) {
            $veryLow = 0;
        }

        $calculations['VERY_LOW'] = $veryLow;

        // LOW
        $low = 0;

        if ($input > 0.82 && $input < 0.92) {
            $low = $this->alphaPredicateUp(0.82, 0.92, $input);
        }

        if ($input == 0.92) {
            $low = 1;
        }

        if ($input > 0.92 && $input < 1) {
            $low = $this->alphaPredicateDown(0.92, 1, $input);
        }

        if ($input >= 1) {
            $low = 0;
        }

        $calculations['LOW'] = $low;

        // NOMINAL
        $nominal = 0;

        if ($input > 0.92 && $input < 1) {
            $nominal = $this->alphaPredicateUp(0.92, 1, $input);
        }

        if ($input == 1) {
            $nominal = 1;
        }

        if ($input > 1 && $input < 1.1) {
            $nominal = $this->alphaPredicateDown(1, 1.1, $input);
        }

        if ($input >= 1.1) {
            $nominal = 0;
        }

        $calculations['NOMINAL'] = $nominal;

        // HIGH
        $high = 0;

        if ($input > 1 && $input < 1.1) {
            $high = $this->alphaPredicateUp(1, 1.1, $input);
        }

        if ($input == 1.1) {
            $high = 1;
        }

        if ($input > 1.1 && $input < 1.26) {
            $high = $this->alphaPredicateDown(1.1, 1.26, $input);
        }

        if ($input >= 1.26) {
            $high = 0;
        }

        $calculations['HIGH'] = $high;

        // VERY HIGH
        $veryHigh = 0;

        if ($input > 1.1 && $input < 1.26) {
            $veryHigh = $this->alphaPredicateUp(1.1, 1.26, $input);
        }

        if ($input >= 1.26) {
            $veryHigh = 1;
        }

        $calculations['VERY_HIGH'] = $veryHigh;

        // EXTRA HIGH
        $calculations['EXTRA_HIGH'] = 0;

        return $calculations;
    }
}
