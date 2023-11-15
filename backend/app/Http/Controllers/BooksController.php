<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\books;

class BooksController extends Controller
{
    public function listAll()
    {
        $books = books::all();

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

        $existingBook = books::where('book', $book)->first();
        if($existingBook) {
            $rereading = true;
        }

        $newBook = books::create([
            'book' => $book,
            'author' => $author,
            'genre' => $genre,
            'rating' => $rating,
            'rereading' => $rereading,
            'pages' => $pages
        ]);

        if($newBook) {
            return response()->json(['message', 'Livro cadastrado com sucesso!']);
        }
        return response()->json(['message', 'Erro interno do servidor.', 500]);
    }

    // Delete book
    public function delete($id)
    {
        try {
            $book = books::findOrFail($id);
            $book->delete();

            return response()->json(['message', 'Livro deletado com sucesso!']);
        } catch (\Exception $e) {
            return response()->json(['message', 'Erro interno no servidor.'], 500);
        }
    }
}
