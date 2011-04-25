$(document).ready(function() {

  if(!("WebSocket" in window)){
	$("#websocket").hide();
	$("#weapons").hide();
	$("body").append("<p>Your browser does not support HTML5</p>");
  }else{
		// default values for weapons
		$("#size").val("4");
		$('#colorpicker').farbtastic('#color');
		$("#circle").attr('checked', true);
  
		// socket, global variable if socket are enabled
		var socket;
		var host = "ws://localhost:12345/websocket/server.php";
		try{
			socket = new WebSocket(host);
			console.log('WebSocket - status '+socket.readyState);
			socket.onopen    = function(msg){ console.log("Welcome - status "+this.readyState); };
			socket.onclose   = function(msg){ console.log("Disconnected - status "+this.readyState); };
			
			// handling socket sent message to this client
			socket.onmessage = function(msg){ 
				var params = msg.data.split("|");
				params[0] = params[0].substring(params[0].indexOf("#")+1, params[0].length);
				
				// événements possibles {in, out, paint}
				if (params[1]=="in") {
					// création de la souris si elles n'existe pas deja
					var $user_pointer = $(".user-pointer[title="+params[0]+"]");
					if ($user_pointer.length==0) {
						$("#thezone").append("<div class='user-pointer' title='"+params[0]+"'></div>");
						var $user_pointer = $(".user-pointer[title="+params[0]+"]");
					}
					$user_pointer.attr("styles", $user_pointer.attr("style")+params[4]);
					$user_pointer.css("left", (params[2]-$user_pointer.width()/2) +"px").css("top", (params[3]-$user_pointer.height()/2)+"px");
					
				}
				if (params[1]=="out") {
					var $user_pointer = $(".user-pointer[title="+params[0]+"]");
					$user_pointer.fadeOut('slow', function() {
						$(this).remove();
					});
				}
				if(params[1]=="paint") {
					console.log("out!");
					var $painted = $("<div class='user-pointer'></div>");
					$("#thezone").append($painted);
					$painted.attr("style", $painted.attr("style")+params[4]);
					$painted.css("left", (params[2]-$painted.width()/2) +"px").css("top", (params[3]-$painted.height()/2)+"px");
					
					
				}
				console.log("Received: "+params); 
			};
		} catch (ex) {
			error("Event if websockets are enabled with your web browser, an error while handshaking was thrown.");
		}
		
		// when in and out of the zone : register event
		var is_mouse_down=false;
		$("#thezone").mouseover(function() {
			
			$("#thezone").bind("mousemove", function(event) {
				
				var x = event.pageX-$(this).offset().left;
				var y = event.pageY-$(this).offset().top;
				var prefix= (is_mouse_down)?"paint":"in";
				var style= ";background-color:"+$("#color").val()+";height:"+$("#size").val()+"px;width:"+$("#size").val()+"px;"+ (($("#circle").is(":checked"))?"-moz-border-radius: "+$("#size").val()+"px; -webkit-border-radius: "+$("#size").val()+"px; border-radius: "+$("#size").val()+"px;":"")   ;
				
				var msg=prefix+"|"+x+"|"+y +"|"+style;
				try{ 					
					socket.send(msg); 
					console.log('Sent: '+msg); 
				} catch (ex) {
					error("Socket may be really busy, because sending your position has not been posible."+ex);
				}
			});
			
			$("#thezone").bind("mouseup", function(event) { is_mouse_down=false; });
			
			$("#thezone").bind("mousedown", function(event) {
				is_mouse_down=true;
				var x = event.pageX-$(this).offset().left;
				var y = event.pageY-$(this).offset().top;
				var style= ";background-color:"+$("#color").val()+";height:"+$("#size").val()+"px;width:"+$("#size").val()+"px;"+ (($("#circle").is(":checked"))?"-moz-border-radius: "+$("#size").val()+"px; -webkit-border-radius: "+$("#size").val()+"px; border-radius: "+$("#size").val()+"px;":"")   ;
				
				var msg="paint|"+x+"|"+y +"|"+style;
				try{ 					
					socket.send(msg); 
					console.log('Sent: '+msg); 
				} catch (ex) {
					error("Socket may be really busy, because sending your position has not been posible."+ex);
				}
			});
			
			
				
		});
		
		$("#thezone").mouseout(function() {
				
				try{ 
					var msg="out";
					socket.send(msg); 
					console.log('Mouse out ???? Sent: '+msg); 
				} catch (ex) {
					error("Socket may be really busy, because sending your position has not been posible."+ex);
				}
			
				$("#thezone").unbind("mousemove");
				$("#thezone").unbind("click");
		});
		

		//socket.close();
		//socket=null;
			
  }

});

function error(msg) { $("#error").html(msg); }