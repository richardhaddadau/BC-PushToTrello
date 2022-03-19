<?php

namespace App\Models;

use GuzzleHttp\Exception\RequestException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;

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

    public function isTokenValid($trelloToken) {
        $client = new Client();

//        $result = $client->request('get', 'https://jsonplaceholder.typicode.com/todos/1');
//        return $result->getStatusCode();

        $testURL ='https://api.trello.com/1/members/me/boards?key=' . env('TRELLO_KEY') . '&token=' . $trelloToken;

        try {
            $response = Http::get('https://api.trello.com/1/members/me/boards', [
                'key' => env('TRELLO_KEY'),
                'token' => $trelloToken,
            ]);
            return $response->status();
        } catch (RequestException $error) {
            return 'Oops';
            return $response->status();
        }
//        $result = $client->request('get', );
        return $result->getStatusCode();
    }
}
