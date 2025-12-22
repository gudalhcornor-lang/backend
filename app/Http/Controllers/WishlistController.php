<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        return Wishlist::with('speaker')
            ->where('user_id', $request->user()->id)
            ->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'speaker_id' => 'required|exists:speaker_boxes,id',
        ]);

        // Cegah duplikat
        $exists = Wishlist::where('user_id', $request->user()->id)
            ->where('speaker_id', $request->speaker_id)
            ->first();

        if ($exists) {
            return response()->json(['message' => 'Sudah ada di wishlist'], 409);
        }

        Wishlist::create([
            'user_id' => $request->user()->id,
            'speaker_id' => $request->speaker_id,
        ]);

        return response()->json(['message' => 'Berhasil ditambahkan']);
    }

    public function destroy(Request $request, $id)
    {
        Wishlist::where('user_id', $request->user()->id)
            ->where('speaker_id', $id)
            ->delete();

        return response()->json(['message' => 'Dihapus']);
    }
}
