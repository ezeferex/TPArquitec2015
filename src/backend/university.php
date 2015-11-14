<?php
try{
		$m= new MongoClient();
		$db=$m->selectDB("test");
		echo 'Pudo conectarse a la base de datos satisfactoriamente';
		
	}catch(MongoConnectionException $e)
	{
		echo'No se pudo conectar a la base de datos test';
	}
?>