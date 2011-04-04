        $(document).ready(function(){
				function addNewTodo(){
					$("#todolist").append('<li contentEditable="true" class="todo">type here...</li>');
				};
				$('#addtodo').click(addNewTodo);
							
				var list=[];
				var actual;
				var startTime=0;
				var timer;
				function startTicking(){
					$(".todo").each(function(i,item){
						var o={
							text:$(item).text(),
							elapsedTime:0,
							done:false
						};
						list.push(o);
					});
					actual=0;
					startTime=new Date().getTime();
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
					var actualTime=new Date().getTime();
					list[actual].elapsedTime=actualTime-startTime;
					startTime=actualTime;
					actual+=1;
				}
				
				function toTime(ms){
					var text="";
					var sec=Math.floor(ms/1000);				
					if(sec<60){
						text=sec+" s";
					}else{
						var minute=Math.floor(sec/60);
						if(minute<60){
							text=minute+" min";
						}else{
							var hour=Math.floor(sec/60);
							var minute=minute-hour*60;
							text=hour+" h "+minute+" min";
						}
					}
					return text;
				}
				function refreshTime(){
					if( actual<list.length){
						var actualTime=new Date().getTime();
						var elapsedTime=actualTime-startTime;
				
						$("#todocounter").text(toTime(elapsedTime));
					}
				}
				
				function renderDone(){
					$("#tickmode").hide();
					$("#listmode").show();
					var html='';
					jQuery.each(list,function(i,o){
						html+='<li contentEditable="true" class="todo">'+o.text+' under '+toTime(o.elapsedTime)+'</li>';
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
