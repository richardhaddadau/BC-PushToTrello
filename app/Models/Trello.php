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

    public function isTokenValid($trelloToken): int
    {
        if (env('APP_ENV') === 'local') {
            $useToken = env('TRELLO_LOCAL_TOKEN');
        } else {
            $useToken = $trelloToken;
        }

        // Make a call to trello: 200 means token is valid, anything else means invalid
        // https://api.trello.com/1/members/me/boards?key={api-key}&token={token}
        $response = Http::get('https://api.trello.com/1/members/me/boards', [
            'key' => env('TRELLO_KEY'),
            'token' => $useToken,
        ]);

        return $response->status();
    }

    public function callTrello($get, $token): string
    {
        return 'Got: ' . $get . ', Token: ' . $token;

        if (env('APP_ENV') === 'local') {
            $useToken = env('TRELLO_LOCAL_TOKEN');
        } else {
            $useToken = $trelloToken;
        }

        $response = Http::get('https://api.trello.com/1/' + $endpoint, [
            'key' => env('TRELLO_KEY'),
            'token' => $useToken,
        ]);

        return $response->body();
    }
}

//const getBoards = (token) => {
//    fetch("https://api.trello.com/1/members/me/boards?key=366d3a7f27ff81fde9157811979f86e7&token=" + token)
//    .then((response) => response.json())
//        .then((actualData) => {
//        setBoardsList(actualData.filter(entity => {
//            return !entity.closed;
//        }).map(item => {
//            return {value: item['shortLink'], content: item['name']};
//            }));
//
//            setBoardsList(boardsObj);
//        });
//}
