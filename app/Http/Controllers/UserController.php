<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // ⭐ Ambil semua user
    public function index()
    {
        return User::all();
    }

    // ⭐ Hapus user
    public function destroy($id)
    {
        User::findOrFail($id)->delete();
        return response()->json(['message' => 'User dihapus']);
    }

    // ⭐ Update role (user ↔ admin)
    public function updateRole(Request $request, $id)
    {
        $request->validate([
            'role' => 'required|in:user,admin'
        ]);

        $user = User::findOrFail($id);
        $user->role = $request->role;
        $user->save();

        return response()->json(['message' => 'Role berhasil diupdate']);
    }
}
