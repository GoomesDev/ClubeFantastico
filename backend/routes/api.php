<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Users
Route::get('/allusers', 'App\Http\Controllers\UserController@allUsers');
Route::post('/user/register', 'App\Http\Controllers\UserController@register');
Route::post('/user/login', 'App\Http\Controllers\UserController@login');
Route::get('/user/total-pages/{id}', 'App\Http\Controllers\UserController@totalPages');

// Books
Route::get('/books', 'App\Http\Controllers\BooksController@listAll');
Route::get('/books/{id}', 'App\Http\Controllers\BooksController@listByUser');
Route::delete('/delete/{id}/{user_id}', 'App\Http\Controllers\BooksController@delete');
Route::post('/create-book', 'App\Http\Controllers\BooksController@registerBook');
Route::put('/edit-book/{id}', 'App\Http\Controllers\BooksController@editBook');
