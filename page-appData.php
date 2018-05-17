<?php

$client = new OAuth2\Client(CLIENT_ID, CLIENT_SECRET);
if (!isset($_GET['code']))
{
    $auth_url = $client->getAuthenticationUrl(AUTHORIZATION_ENDPOINT, REDIRECT_URI);
    header('Location: ' . $auth_url);
    die('Redirect');
}
else {
    $params = array('code' => $_GET['code'], 'redirect_uri' => REDIRECT_URI);
    $response = $client->getAccessToken(TOKEN_ENDPOINT, 'authorization_code', $params);
    echo "<pre>";
    print_r(json_encode($response));
}

$instaCode = $_GET['instaCode'];

if($instaCode) {

    wp_remote_post('http://localhost/wp-json/ghs_api/v1/socialStats', $args = [
        'instaCode' => 'instaCode'
    ]);
}