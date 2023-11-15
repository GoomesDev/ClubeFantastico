<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Users
Route::get('/allusers', 'App\Http\Controllers\UserController@allUsers');
Route::post('/user/register', 'App\Http\Controllers\UserController@register');
Route::post('/user/login', 'App\Http\Controllers\UserController@login');

// Books
Route::get('/books', 'App\Http\Controllers\BooksController@listAll');
Route::delete('/delete/{$id}', 'App\Http\Controllers\BooksController@delete');
