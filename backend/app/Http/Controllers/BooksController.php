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
}
