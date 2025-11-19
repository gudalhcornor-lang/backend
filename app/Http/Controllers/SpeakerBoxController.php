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
        // hanya admin boleh menambah (cek role)
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

        if ($request->hasFile('gambar')) {
            $path = $request->file('gambar')->store('speakers', 'public');
            $data['gambar'] = $path;
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

        if ($request->hasFile('gambar')) {
            if ($speaker->gambar) {
                Storage::disk('public')->delete($speaker->gambar);
            }
            $path = $request->file('gambar')->store('speakers', 'public');
            $data['gambar'] = $path;
        }

        $speaker->update($data);
        return response()->json($speaker);
    }

    public function destroy(Request $request, SpeakerBox $speaker)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($speaker->gambar) {
            Storage::disk('public')->delete($speaker->gambar);
        }
        $speaker->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
