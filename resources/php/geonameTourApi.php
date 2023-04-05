<?php

	// remove for production

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$url='http://api.geonames.org/childrenJSON?' . 'geonameId=' . $_REQUEST['countryID'] . '&username=testgeo12' . '&hierarchy=tourism' . '&maxRows=10';

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

	$decode = json_decode($result,true);	
	$output['data'] = $decode['geonames'];
	
	header('Content-Type: application/json; charset=UTF-8');
	//echo json_encode($url); 
	
	echo json_encode($output); 

?>
