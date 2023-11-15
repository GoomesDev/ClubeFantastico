<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/allusers', 'App\Http\Controllers\UserController@allUsers');
Route::post('/user/register', 'App\Http\Controllers\UserController@register');
Route::post('/user/login', 'App\Http\Controllers\UserController@login');

Route::get('/books', 'App\Http\Controllers\BooksController@listAll');
