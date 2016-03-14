<?php

error_reporting(E_ALL);

$login = isset($_GET['login']) ? $_GET['login'] : '';

// echo $login;

session_start();
require "../twitteroauth/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;
define('CONSUMER_KEY', "");
define('CONSUMER_SECRET', "");
define('OAUTH_CALLBACK', "http://ezchx.com/pinhead/login.php");


if ($login) {
  $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);
  $request_token = $connection->oauth('oauth/request_token', array('oauth_callback' => OAUTH_CALLBACK));
  $_SESSION['oauth_token'] = $request_token['oauth_token'];
  $_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];
  $url = $connection->url('oauth/authorize', array('oauth_token' => $request_token['oauth_token']));
  header('Location: ' . $url);
}


if(!$login && isset($_SESSION['oauth_token'])) {
  $request_token = [];
  $request_token['oauth_token'] = $_SESSION['oauth_token'];
  $request_token['oauth_token_secret'] = $_SESSION['oauth_token_secret'];
  if (isset($_REQUEST['oauth_token']) && $request_token['oauth_token'] !== $_REQUEST['oauth_token']) {
    // Abort! Something is wrong.
  }
  $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $request_token['oauth_token'], $request_token['oauth_token_secret']);
  $access_token = $connection->oauth("oauth/access_token", ["oauth_verifier" => $_REQUEST['oauth_verifier']]);
  $_SESSION = Array();
  $string = implode(';', $access_token);
  $user_id = $access_token["screen_name"];
  setcookie("ezchxPinHead", $user_id);

  header('Location: http://ezchx.com/pinhead/index.html');
}


if(!$login && !isset($_SESSION['oauth_token'])) {
  header('Location: http://ezchx.com/pinhead/index.html');
}


?>