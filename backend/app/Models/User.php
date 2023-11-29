<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model implements Authenticatable
{
    use HasFactory;

    protected $table = 'users';
    protected $fillable = ['username', 'password'];

    public function books()
    {
        return $this->hasMany(books::class);
    }

    public function getAuthIdentifierName()
    {
        return 'username';
    }

    public function getAuthIdentifier()
    {
        return $this->attributes['username'];
    }

    public function getAuthPassword()
    {
        return $this->attributes['password'];
    }

    public function getRememberToken()
    {
        return null;
    }

    public function setRememberToken($value)
    {

    }

    public function getRememberTokenName()
    {

    }
}
