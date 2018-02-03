<?php

require(dirname( __FILE__ ) . '\libs\PHP-OAuth2-master\src\OAuth2\Client.php');
require(dirname( __FILE__ ) . '\libs\PHP-OAuth2-master\src\OAuth2\GrantType\IGrantType.php');
require(dirname( __FILE__ ) . '\libs\PHP-OAuth2-master\src\OAuth2\GrantType\AuthorizationCode.php');

$client = new OAuth2\Client(CLIENT_ID, CLIENT_SECRET);
if (!isset($_GET['code']))
{
    $auth_url = $client->getAuthenticationUrl(AUTHORIZATION_ENDPOINT, REDIRECT_URI);
    header('Location: ' . $auth_url);
    die('Redirect');
}
else
{
    $params = array('code' => $_GET['code'], 'redirect_uri' => REDIRECT_URI);
    $response = $client->getAccessToken(TOKEN_ENDPOINT, 'authorization_code', $params);
    $client->setAccessToken($response['result']['access_token']);
    print_r(json_encode($response));
    setcookie('ghs_token', 'shit', 3600);
}