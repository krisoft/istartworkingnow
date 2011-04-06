        $(document).ready(function(){
        		function regInputFunc(){
        			$('.todo').keypress(function(e){
        				if(e.keyCode==13){
        					addNewTodo();
        					return false;
        				}
        			});        			
        			$(':input[title]').each(function() {
					  var $this = $(this);
					  if($this.val().trim() === '') {
						$this.val($this.attr('title'));
						$this.addClass("fictive");
					  }
					  $this.focus(function() {
						if($this.val().trim() === $this.attr('title')) {
						  $this.val('');
						  $this.removeClass("fictive");
						}
					  });
					  $this.blur(function() {
						if($this.val().trim() === '') {
						  $this.val($this.attr('title'));
						  $this.addClass("fictive");
						}
					  });
					});
        		}
        		regInputFunc();
				function addNewTodo(){
					$("#todolist").append('<li><input class="todo" type="text" value="" title="type here..."></li>');
					regInputFunc();
					$(".todo:last").focus();
				};
				$('#addtodo').click(addNewTodo);
							
				var list=[];
				var actual;
				var paused=false;
				var timer;
				function startTicking(){
					$(".todo").each(function(i,item){
						var o={
							text:$(item).val().trim(),
							elapsedTime:0,
							done:false
						};
						if((o.text!="type here...")&&(o.text!="")){
							list.push(o);
						}
					});
					actual=0;
					renderActual();
					refreshTime();
					timer=setInterval(refreshTime,1000);
				}
				$("#donelist").click(startTicking);
				
				function renderActual(){
					$("#editmode").hide();
					$("#tickmode").show();
					$("#todotext").text(list[actual].text);
				}
				function saveActual(){
					list[actual].done=true;
					actual+=1;
				}
				
				function toTime(sec){
					var text="";
					if(sec<60){
						text=sec+" s";
					}else{
						var minute=Math.floor(sec/60);
						if(minute<60){
							text=minute+" min";
						}else{
							var hour=Math.floor(minute/60);
							var minute=minute-hour*60;
							text=hour+" h "+minute+" min";
						}
					}
					return text;
				}
				function refreshTime(){
					if( actual<list.length){
						if(!paused){
							list[actual].elapsedTime+=1;
						}
						$("#todocounter").text(toTime(list[actual].elapsedTime));
					}
				}
				
				function pauseOrPlay(){
					paused=!paused;
					document.title=pause;
					if(paused){
						$("#pause").text("start it again");
					}else{
						$("#pause").text("pause");
					}
				}
				$("#pause").click(pauseOrPlay);
				
				function renderDone(){
					$("#tickmode").hide();
					$("#listmode").show();
					var html='';
					jQuery.each(list,function(i,o){
						html+='<li class="todo">'+o.text+' under '+toTime(o.elapsedTime)+'</li>';
					});
					$('#finallist').append(html);
				}
				
				function nextAndGo(){
					saveActual();
					if(actual>=list.length){
						renderDone();
					}else{
						renderActual();
					}
				}
				$("#nextgo").click(nextAndGo);
         });
