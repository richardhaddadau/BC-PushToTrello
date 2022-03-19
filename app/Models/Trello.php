<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;

class Trello extends Model
{
    use HasFactory;

    const AUTH_URL = 'https://trello.com/1/authorize';
    const AUTH_SCOPE = 'read,write';
    const AUTH_EXPIRATION = '1hour';
    CONST AUTH_NAME = 'Push To Trello';
    CONST BASE_URL = 'https://bc-push-to-trello.test/?';

    public function getAuthenticated() {
        $urlParams = array(
            'return_url' => self::BASE_URL,
            'scope' => self::AUTH_SCOPE,
            'expiration' => self::AUTH_EXPIRATION,
            'name' => self::AUTH_NAME,
            'key' => env('TRELLO_KEY'),
            'callback_method' => 'fragment',
        );

        $trelloAuthUrl = self::AUTH_URL . '?' . http_build_query($urlParams);

        return redirect($trelloAuthUrl);
    }
}
