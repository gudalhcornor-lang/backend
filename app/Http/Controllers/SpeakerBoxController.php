<?php

namespace App\Http\Controllers;

use App\Models\SpeakerBox;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
class SpeakerBoxController extends Controller
{
    public function search(Request $request)
{
    $keyword = trim($request->keyword);
    $keywordLower = strtolower($keyword);

    // Deteksi apakah keyword berupa ANGKA (untuk ukuran)
    $isNumber = is_numeric($keyword);

    // Jika bukan angka → minimal 3 karakter
    if (!$isNumber && strlen($keyword) < 3) {
        return response()->json(['data' => []]);
    }

    // Normalisasi keyword untuk ukuran (ambil angka saja)
    $numericKeyword = preg_replace('/[^0-9]/', '', $keywordLower);

    $data = SpeakerBox::select('*')
        ->selectRaw("
            -- Sistem scoring untuk ranking hasil paling relevan
            (CASE 
                WHEN LOWER(nama) = ? THEN 100
                WHEN LOWER(nama) LIKE ? THEN 80
                WHEN LOWER(bahan) LIKE ? THEN 60
                WHEN LOWER(ukuran) LIKE ? THEN 50
                WHEN REGEXP_REPLACE(ukuran, '[^0-9]', '') LIKE ? THEN 90
                ELSE 0
            END) AS score
        ", [
            $keywordLower,
            "%$keywordLower%",
            "%$keywordLower%",
            "%$keywordLower%",
            "%$numericKeyword%"
        ])
        ->where(function ($q) use ($keywordLower, $numericKeyword, $isNumber) {

            // Nama & bahan
            $q->whereRaw('LOWER(nama) LIKE ?', ["%$keywordLower%"])
              ->orWhereRaw('LOWER(bahan) LIKE ?', ["%$keywordLower%"]);

            // Ukuran berbasis angka
            if ($numericKeyword !== "") {
                $q->orWhereRaw(
                    'REGEXP_REPLACE(ukuran, "[^0-9]", "") LIKE ?', ["%$numericKeyword%"]
                );
            }

            // Ukuran teks biasa
            $q->orWhereRaw('LOWER(ukuran) LIKE ?', ["%$keywordLower%"]);
        })
        ->orderByDesc('score')
        ->get();

    return response()->json(['data' => $data]);
}

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

        // Upload gambar
        if ($request->hasFile('gambar')) {
            $filename = time() . '.' . $request->file('gambar')->extension();
            $request->file('gambar')->move(public_path('img'), $filename);
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

        // Upload gambar baru
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

        // hapus file lama
        if ($speaker->gambar && file_exists(public_path('img/' . $speaker->gambar))) {
            unlink(public_path('img/' . $speaker->gambar));
        }

        $speaker->delete();
        return response()->json(['message' => 'Deleted']);
    }

    // ============================
    // 🌟 FUNGSI REKOMENDASI PRODUK
    // ============================
    public function related($id)
    {
        // Ambil produk utama
        $speaker = SpeakerBox::findOrFail($id);

        // Cari produk lain yang mirip berdasarkan ukuran, bahan, harga
        $related = SpeakerBox::where('id', '!=', $id)
            ->where(function ($q) use ($speaker) {
                $q->where('ukuran', $speaker->ukuran)
                ->orWhere('nama', $speaker->nama)
                  ->orWhere('bahan', $speaker->bahan)
                  ->orWhereBetween('harga', [
                      $speaker->harga - 200000,
                      $speaker->harga + 200000
                  ]);
            })
            ->limit(5)
            ->get();

        return response()->json($related);
    }
}