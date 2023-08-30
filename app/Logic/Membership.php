<?php

namespace App\Logic;

class Membership
{
    /**
     * Calculate alpha predicate on up
     *
     * @param float $below
     * @param float $top
     * @param float $x input
     * @return float
     */
    public function alphaPredicateUp($below, $top, $x)
    {
        return ($x - $below) / ($top - $below);
    }

    /**
     * Calculate alpha predicate on down
     *
     * @param float $below
     * @param float $top
     * @param float $x input
     * @return float
     */
    public function alphaPredicateDown($below, $top, $x)
    {
        return ($top - $x) / ($top - $below);
    }

    /**
     * Calculate z on up
     *
     * @param float $below
     * @param float $top
     * @param float $alpha predicate
     * @return float
     */
    public function zUp($below, $top, $alphaPredicate)
    {
        return $below + ($alphaPredicate * ($top - $below));
    }

    /**
     * Calculate z on down
     *
     * @param float $below
     * @param float $top
     * @param float $alpha predicate
     * @return float
     */
    public function zDown($below, $top, $alphaPredicate)
    {
        return $top - ($alphaPredicate * ($top - $below));
    }
}
