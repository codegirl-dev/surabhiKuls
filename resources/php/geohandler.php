<?php

	// remove for production

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$url='http://api.geonames.org/neighboursJSON?' . 'country='  . $_REQUEST['country'] . '&username=testgeo12';

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	if ($result === false)
	{
		$output['status']['code'] = "ERROR";
	}
	else
	{
		$output['status']['code'] = "OK";
		$decode = json_decode($result,true);	

	}

	curl_close($ch);

$output['data'] = $decode['geonames'];
	
	header('Content-Type: application/json; charset=UTF-8');

	//echo json_encode($url); 
	echo json_encode($output); 

?>
