<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Question extends Model
{
    use HasFactory, SoftDeletes;

    const IE = 1;
    const SN = 2;
    const TF = 3;
    const JP = 4;

    const OPERATOR_PLUS = 1;
    const OPERATOR_MINUS = 0;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'prespective',
        'operation',
    ];

}