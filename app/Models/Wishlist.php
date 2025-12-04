<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'speaker_id'];

    public function speaker()
    {
        return $this->belongsTo(SpeakerBox::class, 'speaker_id');
    }
}
