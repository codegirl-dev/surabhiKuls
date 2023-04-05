<?php

	// remove for production

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$url='http://api.geonames.org/postalCodeLookupJSON?' . 'country='  . $_REQUEST['country'] .'&postalcode='. $_REQUEST['postcode'] . '&username=testgeo12';

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
	$output['status']['description'] = "success";
	$output['data'] = $decode['postalcodes'];
	
	header('Content-Type: application/json; charset=UTF-8');

	//echo json_encode($url); 
	echo json_encode($output); 

?>
