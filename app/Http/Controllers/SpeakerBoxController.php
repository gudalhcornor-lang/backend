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

        return SpeakerBox::create($data);
    }

    public function show(SpeakerBox $speakerBox)
    {
        return $speakerBox;
    }

    public function update(Request $request, SpeakerBox $speakerBox)
    {
        $data = $request->validate([
            'nama' => 'required|string|max:255',
            'ukuran' => 'required|string|max:100',
            'bahan' => 'required|string|max:100',
            'harga' => 'required|numeric',
            'deskripsi' => 'nullable|string',
            'gambar' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('gambar')) {
            if ($speakerBox->gambar) {
                Storage::disk('public')->delete($speakerBox->gambar);
            }
            $path = $request->file('gambar')->store('speakers', 'public');
            $data['gambar'] = $path;
        }

        $speakerBox->update($data);
        return $speakerBox;
    }

    public function destroy(SpeakerBox $speakerBox)
    {
        if ($speakerBox->gambar) {
            Storage::disk('public')->delete($speakerBox->gambar);
        }
        $speakerBox->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
