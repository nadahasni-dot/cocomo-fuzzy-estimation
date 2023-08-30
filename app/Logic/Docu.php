<?php

namespace App\Logic;

class Docu extends Membership
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

        if ($input > 0.81 && $input < 0.91) {
            $veryLow = $this->alphaPredicateDown(0.81, 0.91, $input);
        }

        if ($input >= 0.91) {
            $veryLow = 0;
        }

        $calculations['VERY_LOW'] = $veryLow;

        // LOW
        $low = 0;

        if ($input > 0.81 && $input < 0.91) {
            $low = $this->alphaPredicateUp(0.81, 0.91, $input);
        }

        if ($input == 0.91) {
            $low = 1;
        }

        if ($input > 0.91 && $input < 1) {
            $low = $this->alphaPredicateDown(0.91, 1, $input);
        }

        if ($input >= 1) {
            $low = 0;
        }

        $calculations['LOW'] = $low;

        // NOMINAL
        $nominal = 0;

        if ($input > 0.91 && $input < 1) {
            $nominal = $this->alphaPredicateUp(0.91, 1, $input);
        }

        if ($input == 1) {
            $nominal = 1;
        }

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

        if ($input > 1.11 && $input < 1.23) {
            $high = $this->alphaPredicateDown(1.11, 1.23, $input);
        }

        if ($input >= 1.23) {
            $high = 0;
        }

        $calculations['HIGH'] = $high;

        // VERY HIGH
        $veryHigh = 0;

        if ($input > 1.11 && $input < 1.23) {
            $veryHigh = $this->alphaPredicateUp(1.11, 1.23, $input);
        }

        if ($input >= 1.23) {
            $veryHigh = 1;
        }

        $calculations['VERY_HIGH'] = $veryHigh;

        // EXTRA HIGH
        $calculations['EXTRA_HIGH'] = 0;

        return $calculations;
    }
}
