<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\books;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class BooksController extends Controller
{
    public function listAll()
    {
        $books = books::all();

        return response()->json($books);
    }

    // List by user_id
    public function listByUser(Request $request, $user_id)
    {
        $user = User::find($user_id);

        if(!$user){
            return response()->json(['message' => 'Usuário não encontrado!'], 404);
        }

        $orderBy = $request->get('orderBy', 'created_at');
        $orderDirection = $request->get('orderDirection', 'desc');

        $books = $user->books()->orderBy($orderBy, $orderDirection)->paginate(5);

        return response()->json($books);
    }

    // Create book
    public function registerBook(Request $request)
    {
        $book = $request->input('book');
        $author = $request->input('author');
        $genre = $request->input('genre');
        $rating = $request->input('rating');
        $rereading = $request->input('rereading');
        $pages = $request->input('pages');
        $user_id = $request->input('user_id');

        $existingBook = books::where('user_id', $user_id)
        ->where('book', $book)
        ->first();

        if($existingBook) {
            $rereading = true;
        }

        $newBook = books::create([
            'book' => $book,
            'author' => $author,
            'genre' => $genre,
            'rating' => $rating,
            'rereading' => $rereading,
            'pages' => $pages,
            'user_id' => $user_id,
        ]);

        if($newBook) {
            return response()->json(['message', 'Livro cadastrado com sucesso!']);
        }
        return response()->json(['message', 'Erro interno do servidor.', 500]);
    }

    // Delete book
    public function delete($id, $user_id)
    {
        try {
            $book = books::where('user_id', $user_id)->findOrFail($id);
            $book->delete();

            return response()->json(['message', 'Livro deletado com sucesso!']);
        } catch (\Exception $e) {
            return response()->json(['message', 'Erro interno no servidor.'], 500);
        }
    }

    // Edit book
    public function editBook(Request $request, $id)
    {
        $book = books::findOrFail($id);

        $book->book = $request->input('book');
        $book->author = $request->input('author');
        $book->genre = $request->input('genre');
        $book->rating = $request->input('rating');
        $book->rereading = $request->input('rereading');
        $book->pages = $request->input('pages');
        $book->user_id = $request->input('user_id');

        $book->save();

        return response()->json(['message', 'Livro editado com sucesso!']);
    }
}
