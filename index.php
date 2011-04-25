<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/jquery-ui.min.js"></script>
<script src="farbtastic.js"></script>
<script src="game.js"></script>

<link rel="stylesheet" type="text/css" href="styles.css" /> 
<link rel="stylesheet" type="text/css" href="farbtastic.css" /> 

<title>WebSockets Client</title>

</head>
<body>

	<div id="websocket">
		<p>Collaborativo-Real-Timo-Painting experience.</p>
		<p id="error"></p>
		
		<div id="weapons">
			<!-- TAILLE / COULEUR / ARRONDI OUI OU NON -->
			<div class="field">
				<input type="text" id="size" maxlength="3" size="3"/>px
			</div>
			<div class="field">
				<input type="text" id="color" name="color" maxlength="6" size="6" value="#123456"/>
				<div id="colorpicker"></div>
			</div>
			<div class="field">
				<input type="checkbox" id="circle"/> rounded to a circle ?
			</div>
		</div>
		
		<div id="thezone">

		</div>
		
		
		
	</div>
	
</body>
</html>