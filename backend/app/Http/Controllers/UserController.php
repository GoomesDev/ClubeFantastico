<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    // Show all the users on database
    public function allUsers()
    {
        $users = User::all();

        return response()->json($users);
    }

    // Create a new account with username & password
    public function register(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');

        $existingUser = User::where('username', $username)->first();
        
        if ($existingUser) {
            return response()->json(['message' => 'Usuário já existente'], 401);
        }

        $user = User::create([
            'username' => $username,
            'password' => bcrypt($password),
        ]);

        if ($user) {
            return response()->json(['message' => 'Cadastro concluído']);
        } 

        return response()->json(['message' => 'Erro interno do servidor'], 500);
    }

    // Login in a exist account
    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');

        if(Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Login bem-sucedido!',
                'user_id' => auth()->user()->id,
            ], 200);
        }
        return response()->json(['message' => 'Usuário ou senha incorretos'], 401);
    }

    // Total pages read per user
    public function totalPages(Request $request, $id)
    {
        $user = User::find($id);

        if(!$user) {
            return response()->json(['message' => 'Usuário não encontrado!'], 404);
        }

        $totalPages = $user->books()->sum('pages');
        $totalBooks = $user->books()->count();

        return response()->json([
            'totalPages' => $totalPages,
            'totalBooks' => $totalBooks
        ]);
    }
}
