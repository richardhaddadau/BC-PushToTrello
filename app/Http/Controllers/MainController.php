<?php

namespace App\Http\Controllers;

use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MainController extends Controller
{
    protected $baseURL;

    public function __construct() {
        $this->baseURL = env('APP_URL');
    }

    public function getAppClientId() {
        if (env('APP_ENV') === 'local') {
            return env('BC_LOCAL_CLIENT_ID');
        } else {
            return env('BC_APP_CLIENT');
        }
    }

    public function getAppSecret(Request $request) {
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

    // Verify Signed Request
    private function verifySignedRequest($signedRequest, $appRequest) {
        list($encodedData, $encodedSignature) = explode('.', $signedRequest, 2);

        // Decode Data
        $signature = base64_decode($encodedSignature);
        $jsonStr = base64_decode($encodedData);
        $data = json_decode($jsonStr, true);

        // Confirm the Signature
        $expectedSignature = hash_hmac('sha256', $jsonStr, $this->getAppSecret($appRequest), $raw = false);
        if (!hash_equals($expectedSignature, $signature)) {
            error_log('Bad signed request from BigCommerce!');
            return null;
        }

        // Otherwise, return data
        return $data;
    }

    // Load Callback
    public function load(Request $request) {
        $signedPayload = $request->input('signed_payload');

        if (!empty($signedPayload)) {
            $verifiedData = $this->verifySignedRequest($signedPayload, $request);

            if ($verifiedData !== null) {
                $request->session()->put('user_id', $verifiedData['user']['id']);
                $request->session()->put('user_email', $verifiedData['user']['email']);
                $request->session()->put('owner_id', $verifiedData['owner']['id']);
                $request->session()->put('owner_email', $verifiedData['owner']['email']);
                $request->session()->put('store_hash', $verifiedData['context']);
            } else {
                // Request could not be verified
                return redirect()->action('MainController@error')->with('error_message', 'The signed request from BigCommerce could not be validated.');
            }
        } else {
            // Request is empty
            return redirect()->action('MainController@error')->with('error_message', 'The signed request from BigCommerce was empty.');
        }

        // Otherwise, redirect to home
        return redirect('/');
    }

    // Install Callback
    public function install(Request $request) {
        if ( (!$request->has('code')) || (!$request->has('scope')) || (!$request->has('context')) ) {
            return redirect()->action('MainController@error')->with('error_message', 'Not enough information was provided to install this app.');
        }

        // Try POST request
        try {

            $response = Http::post('https://login.bigcommerce.com/oauth2/token', [
                'client_id' => $this->getAppClientId(),
                'client_secret' => $this->getAppSecret($request),
                'code' => $request->input('code'),
                'scope' => $request->input('scope'),
                'grant_type' => 'authorization_code',
                'redirect_uri' => $this->baseURL . '/auth/install',
                'context' => $request->input('context'),
            ]);

            $statusCode = $response->getStatusCode();
            $data = json_decode($response->getBody(), true);

            if ($statusCode === 200) {
                $request->session()->put('store_hash', $data['context']);
                $request->session()->put('access_token', $data['access_token']);
                $request->session()->put('user_id', $data['user']['id']);
                $request->session()->put('user_email', $data['user']['email']);
            }

            // If the app was installed from an external link,
            // redirect them to BigCommerce installation success page
            if ($request->has('external_install')) {
                return redirect('https://login.bigcommerce.com/app/' . $this->getAppClientId() . '/install/succeeded');
            }

            // Otherwise, redirect to home
            return redirect('/');

        // Catch Error
        } catch (RequestException $error) {

            $statusCode = $error->getResponse()->getStatusCode();
            $errorMessage = 'An error occured.';

            if ($error->hasResponse()) {
                if ($statusCode != 500) {
                    $errorMessage = Psr7\str($error->getResponse());
                }
            }

            // If the app was installed from an external link,
            // redirect them to BigCommerce installation success page
            if ($request->has('external_install')) {
                return redirect('https://login.bigcommerce.com/app/' . $this->getAppClientId() . '/install/succeeded');
            }

            // Otherwise, redirect with an error message
            return redirect()->action('MainController@error')->with('error_message', $errorMessage);

        }

    }

    public function uninstall() {}

    public function removeUser() {}

    // Handle Errors
    public function error(Request $request) {
        $errorMessage = 'Internal Apllication Error';

        // If the request has an error message, include it in log
        if ($request->session()->has('error_message')) {
            $errorMessage = $request->session()->get('error_message');
        }

        echo '<h4>An issue has occured:</h4> <p>' . $errorMessage . ' </p> <a href="' . $this->baseURL . '">Go back to home</a>';
    }

    // Handle BigCommerce API Request
    public function bigCommerceAPIRequest(Request $request, $endpoint) {
        $requestOptions = [
            'headers' => [
                'X-Auth-Client' => $this->getAppClientId(),
                'X-Auth-Token' => $this->getAccessToken($request),
                'Content-Type' => 'application/json'
            ]
        ];

        if ($request->method() === 'PUT' || $request->method() === 'POST') {
            $requestOptions['body'] = $request->getContent();
        }

        $client = new Client();

        // Using API v2 Environment: https://api.bigcommerce.com/stores/{{store_hash}}/v2/
        // Source: https://developer.bigcommerce.com/docs/ZG9jOjIyMDYwNQ-about-our-ap-is
        $result = $client->request($request->method(), 'https://api.bigcommerce.com/stores/' . $this->getStoreHash($request) . '/' . $endpoint, $requestOptions);
        return $result;
    }

    // Proxy API Request
    public function proxyBigCommerceAPIRequest(Request $request, $endpoint) {
        if (strrpos($endpoint, 'v2') !== false) {
            $endpoint .= '.json';
        }

        $result = $this->bigCommerceAPIRequest($request, $endpoint);

        return response($result->getBody(), $result->getStatusCode())->header('Content', 'application/json');
    }
}
