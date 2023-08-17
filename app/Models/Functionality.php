<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Functionality extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'project_id',
        'language_function_point_id',
        'name',
        'description',
        'exi',
        'exo',
        'exiq',
        'ilof',
        'elof',
        'ksloc',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function languageFunctionPoint(): HasOne
    {
        return $this->hasOne(LanguageFunctionPoint::class, 'id', 'language_function_point_id');
    }
}
