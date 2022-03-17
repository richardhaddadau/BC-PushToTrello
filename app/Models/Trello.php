<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;

class Trello extends Model
{
    use HasFactory;

    const AUTH_URL = 'https://trello.com/1/OAuthAuthorizeToken';
    const AUTH_EXPIRATION = '1hour';
    const AUTH_SCOPE = 'read,write';
    CONST AUTH_NAME = 'Push To Trello';
    CONST BASE_URL = 'https://bc-push-to-trello.test/trello';

    public function getAuthenticated() {
        try {
            $response = Http::get(self::AUTH_URL . '?expiration=' . self::AUTH_EXPIRATION . '&scope=' .
                self::AUTH_SCOPE . '&name=' . self::AUTH_NAME . '&return_url=' . self::BASE_URL . '&key=' . env
                ('TRELLO_KEY'));

            return $response;

        } catch (\Throwable $exception) {
            dd($exception->getMessage());
        }

    }
}
