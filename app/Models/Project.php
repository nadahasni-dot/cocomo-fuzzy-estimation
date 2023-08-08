<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Project extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'image',
        'status',
        'est_ksloc',
        'est_time',
        'est_staff',
        'est_cost',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'est_ksloc' => 'double',
        'est_time' => 'double',
        'est_staff' => 'double',
        'est_cost' => 'double',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scaleFactor(): HasOne
    {
        return $this->hasOne(ScaleFactor::class);
    }

    public function effortMultiplier(): HasOne
    {
        return $this->hasOne(EffortMultiplier::class);
    }
}
