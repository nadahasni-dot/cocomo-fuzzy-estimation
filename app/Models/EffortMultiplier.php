<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EffortMultiplier extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'project_id',
        'rely',
        'data',
        'cplx',
        'docu',
        'acap',
        'pcap',
        'pcon',
        'ruse',
        'time',
        'stor',
        'pvol',
        'aplex',
        'plex',
        'ltex',
        'tool',
        'site',
        'sced',
        'effort_multiplier',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'effort_multiplier' => 'double',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
