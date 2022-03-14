<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MainController extends Controller
{
    protected $baseURL;

    public function __construct() {
        $this->baseURL = env(APP_URL);
    }

    public function getAppClientId() {
        if (env('APP_ENV') === 'local') {
            return env('BC_LOCAL_CLIENT_ID');
        } else {
            return env('BC_APP_CLIENT');
        }
    }

    public function getAppSecret() {
        if (env('APP_ENV') === 'local') {
            return env('BC_LOCAL_SECRET');
        } else {
            return env('BC_APP_SECRET');
        }
    }

    public function getAccessToken(Request $request) {
        if (env('APP_ENV') === 'local') {
            return env('BC_LOCAL_ACCESS_TOKEN');
        } else {
            return $request->session()->get('access_token');
        }
    }

    public function getStoreHash(Request $request) {
        if (env('APP_ENV') === 'local') {
            return env('BC_LOCAL_STORE_HASH');
        } else {
            return $request->session()->get('store_hash');
        }
    }

    public function load() {}

    public function install() {}

    public function uninstall() {}

    public function removeUser() {}
}
