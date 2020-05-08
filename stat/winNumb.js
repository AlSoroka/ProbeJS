let div = document.createElement('div');
// if (localStorage.sessionState=='Finish') {alert ("Предыдущий сеанс закончился планово");};
var winNumber=localStorage.getItem('winNumber')*1; //Преобразуем в целый тип данных

if (!winNumber) {
	var winNumber=1;
	div.innerHTML = "Первое окно";
	}
else { 	winNumber+=1;
		div.innerHTML = "Было открыто "+(winNumber-1)+" Это окно - " + winNumber;
	}
localStorage.setItem('winNumber', winNumber);	
localStorage.setItem('sessionState', 'Work');

window.addEventListener("unload", function()
 {
	winNumber-=1;
	if (winNumber==0) 
		{
		 //localStorage.clear();
		 localStorage.sessionState="Finish"; //Рабочее (плановое) завершение сеанса 
		}
	else 
		{
		 localStorage.setItem('winNumber', winNumber);
		 }
 });
	
//window.addEventListener("unload", function() {localStorage.clear()});
window.onload = function() {document.body.append(div)};
