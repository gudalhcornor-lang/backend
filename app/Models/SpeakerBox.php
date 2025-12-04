<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SpeakerBox extends Model
{
    use HasFactory;

    protected $fillable = ['nama','ukuran','bahan','harga','gambar','deskripsi'];
    protected $appends = ['average_rating'];

    public function ratings()
    {
        return $this->hasMany(Rating::class, 'speaker_id');
    }

    public function getAverageRatingAttribute()
    {
        return round($this->ratings()->avg('rating') ?? 0, 1);
    }
}

