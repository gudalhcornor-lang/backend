<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpeakerBox extends Model
{
    use HasFactory;
    protected $fillable = ['nama','ukuran','bahan','harga','gambar','deskripsi'];
}
