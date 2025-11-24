<?php

namespace App\Http\Controllers;

use App\Models\SpeakerBox;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SpeakerBoxController extends Controller
{
    public function index()
    {
        return SpeakerBox::latest()->get();
    }

    public function store(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $data = $request->validate([
            'nama' => 'required|string|max:255',
            'ukuran' => 'required|string|max:100',
            'bahan' => 'required|string|max:100',
            'harga' => 'required|numeric',
            'deskripsi' => 'nullable|string',
            'gambar' => 'nullable|image|max:2048'
        ]);

        // === FIX UPLOAD GAMBAR ===
        if ($request->hasFile('gambar')) {
            $filename = time() . '.' . $request->file('gambar')->extension();
            $request->file('gambar')->move(public_path('img'), $filename);

            // hanya simpan nama file
            $data['gambar'] = $filename;
        }

        $speaker = SpeakerBox::create($data);
        return response()->json($speaker, 201);
    }

    public function show(SpeakerBox $speaker)
    {
        return $speaker;
    }

    public function update(Request $request, SpeakerBox $speaker)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $data = $request->validate([
            'nama' => 'required|string|max:255',
            'ukuran' => 'required|string|max:100',
            'bahan' => 'required|string|max:100',
            'harga' => 'required|numeric',
            'deskripsi' => 'nullable|string',
            'gambar' => 'nullable|image|max:2048'
        ]);

        // === FIX UPDATE GAMBAR ===
        if ($request->hasFile('gambar')) {

            // hapus file lama jika ada
            if ($speaker->gambar && file_exists(public_path('img/' . $speaker->gambar))) {
                unlink(public_path('img/' . $speaker->gambar));
            }

            $filename = time() . '.' . $request->file('gambar')->extension();
            $request->file('gambar')->move(public_path('img'), $filename);

            $data['gambar'] = $filename;
        }

        $speaker->update($data);
        return response()->json($speaker);
    }

    public function destroy(Request $request, SpeakerBox $speaker)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // panggil file lama dan hapus
        if ($speaker->gambar && file_exists(public_path('img/' . $speaker->gambar))) {
            unlink(public_path('img/' . $speaker->gambar));
        }

        $speaker->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
