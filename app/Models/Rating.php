<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'speaker_id',
        'rating',
        'review'
    ];

    
    public function speaker()
    {
        return $this->belongsTo(SpeakerBox::class, 'speaker_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getNamaProdukAttribute()
    {
        return $this->speaker ? $this->speaker->nama : null;
    }
}
