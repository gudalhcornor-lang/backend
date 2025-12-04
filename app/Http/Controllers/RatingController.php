<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rating;

class RatingController extends Controller
{
    // ✔ Simpan atau update rating
    public function store(Request $req)
    {
        $req->validate([
            'speaker_id' => 'required|exists:speaker_boxes,id',
            'rating'     => 'required|integer|min:1|max:5'
        ]);

        $rating = Rating::updateOrCreate(
            [
                'user_id'    => $req->user()->id,
                'speaker_id' => $req->speaker_id
            ],
            ['rating' => $req->rating]
        );

        return response()->json([
            'message' => 'Rating saved',
            'rating'  => $rating
        ]);
    }

    // ✔ Rating user sendiri
    public function myRating($speaker_id)
    {
        $rating = Rating::where('user_id', auth()->id())
                        ->where('speaker_id', $speaker_id)
                        ->first();

        return response()->json([
            'rating' => $rating ? $rating->rating : 0
        ]);
    }

    // ✔ Semua rating produk + average + count
    public function productRatings($speaker_id)
    {
        $ratings = Rating::where('speaker_id', $speaker_id)
                         ->with('user:id,name')
                         ->get();

        $average = Rating::where('speaker_id', $speaker_id)->avg('rating');
        $count   = Rating::where('speaker_id', $speaker_id)->count();

        return response()->json([
            "average_rating" => round($average ?? 0, 1),
            "rating_count"   => $count,
            "ratings"        => $ratings
        ]);
    }
}
