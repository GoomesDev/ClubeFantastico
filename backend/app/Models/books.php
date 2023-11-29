<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class books extends Model
{
    use HasFactory;

    protected $table = 'books';
    protected $fillable = [
        'book', 'author', 'genre', 'rating', 'rereading', 'pages', 'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
