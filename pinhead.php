<?php

error_reporting(E_ALL);

$func = $_POST["func"];


if ($func == "addPin") {

  $user_id = $_COOKIE["ezchxPinHead"];
  $pin_title = $_POST["newPinTitle"];
  $pin_url = $_POST["newPinUrl"];

  mysql_connect("localhost",$username,$password);
  @mysql_select_db($database) or die( "Unable to select database");
    $query = "INSERT INTO pinhead VALUES (
      '',
      '$user_id',
      '$pin_title',
      '$pin_url')";
    mysql_query($query);
  mysql_close();
  echo json_encode($user_id);

}


if ($func == "getMyPins") {

  $user_id = $_COOKIE["ezchxPinHead"];
  
  mysql_connect("localhost",$username,$password);
  @mysql_select_db($database) or die( "Unable to select database");
  $query = "SELECT * FROM pinhead WHERE user_id = '$user_id'";
  $result = mysql_query($query);
  mysql_close();

  $pins = array();
  while(($row =  mysql_fetch_assoc($result))) {
    $pins[] = array(
    'pin_id' => $row['pin_id'],
    'pin_title' => $row['pin_title'],
    'pin_url' => $row['pin_url']);
  }
  echo json_encode($pins);

}


if ($func == "getAllPins") {

  mysql_connect("localhost",$username,$password);
  @mysql_select_db($database) or die( "Unable to select database");
  $query = "SELECT * FROM pinhead";
  $result = mysql_query($query);
  mysql_close();

  $pins = array();
  while(($row =  mysql_fetch_assoc($result))) {
    $pins[] = array(
    'pin_id' => $row['pin_id'],
    'user_id' => $row['user_id'],
    'pin_title' => $row['pin_title'],
    'pin_url' => $row['pin_url']);
  }
  echo json_encode($pins);

}


if ($func == "getUserPins") {

  $user_id = $_POST["user_id"];
  mysql_connect("localhost",$username,$password);
  @mysql_select_db($database) or die( "Unable to select database");
  $query = "SELECT * FROM pinhead WHERE user_id = '$user_id'";
  $result = mysql_query($query);
  mysql_close();

  $pins = array();
  while(($row =  mysql_fetch_assoc($result))) {
    $pins[] = array(
    'pin_id' => $row['pin_id'],
    'user_id' => $row['user_id'],
    'pin_title' => $row['pin_title'],
    'pin_url' => $row['pin_url']);
  }
  echo json_encode($pins);

}


if ($func == "deletePin") {

  $pin_id = $_POST["pin_id"];
  mysql_connect("localhost",$username,$password);
  @mysql_select_db($database) or die( "Unable to select database");
  $query = "DELETE FROM pinhead WHERE pin_id = '$pin_id'";
  mysql_query($query);
  mysql_close();
  echo json_encode($pin_id);

}


exit;


?>