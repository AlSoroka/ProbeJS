function inputDate (tag_id){
	var date = new Date();
	var monthes = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
	var day = date.getDate();
    var month = monthes[date.getMonth()];
    var year = date.getFullYear();
	var dat_today='«' + day + '» ' + month + ' ' + year + ' г.';
	document.getElementById(tag_id).innerHTML = dat_today ;
}

//Вставка подсказки
function tip_note(tag_id, tip_text) {
 var obj = document.getElementById(tag_id); // берем интересующий элемент  
 var coords = obj.getBoundingClientRect(); // верхний отступ эл-та от родителя
 var note = document.createElement('div');
 note.innerHTML = tip_text;
 note.className = "note";
 note.id="tip_note";
 note.style.left = (coords.left+20) + "px";
 note.style.top = coords.bottom + "px";
 document.body.appendChild(note);
}	
 
function number_to_string(_number) {
        var _arr_numbers = new Array();
        _arr_numbers[1] = new Array('', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать');
        _arr_numbers[2] = new Array('', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто');
        _arr_numbers[3] = new Array('', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот');
        function number_parser(_num, _desc) {
                var _string = '';
                var _num_hundred = '';
                if (_num.length == 3) {
                        _num_hundred = _num.substr(0, 1);
                        _num = _num.substr(1, 3);
                        _string = _arr_numbers[3][_num_hundred] + ' ';
                }
                if (_num < 20) _string += _arr_numbers[1][parseFloat(_num)] + ' ';
                else {
                        var _first_num = _num.substr(0, 1);
                        var _second_num = _num.substr(1, 2);
                        _string += _arr_numbers[2][_first_num] + ' ' + _arr_numbers[1][_second_num] + ' ';
                }              
                switch (_desc){
                        case 0:
                                var _last_num = parseFloat(_num.substr(-1));
								var _two_last_num = parseFloat(_num.substr(-2));
								if (_last_num == 1) _string += 'рубль';
                                else if (_last_num > 1 && _last_num < 5) _string += 'рубля';
                                else _string += 'рублей';
                                break;
                        case 1:
                                var _last_num = parseFloat(_num.substr(-1));
                                if (_last_num == 1) _string += 'тысяча ';
                                else if (_last_num > 1 && _last_num < 5) _string += 'тысячи ';
                                else _string += 'тысяч ';
                                _string = _string.replace('один ', 'одна ');
                                _string = _string.replace('два ', 'две ');
                                break;
                        case 2:
                                var _last_num = parseFloat(_num.substr(-1));
                                if (_last_num == 1) _string += 'миллион ';
                                else if (_last_num > 1 && _last_num < 5) _string += 'миллиона ';
                                else _string += 'миллионов ';
                                break;
                        case 3:
                                var _last_num = parseFloat(_num.substr(-1));
                                if (_last_num == 1) _string += 'миллиард ';
                                else if (_last_num > 1 && _last_num < 5) _string += 'миллиарда ';
                                else _string += 'миллиардов ';
                                break;
                }
                _string = _string.replace('  ', ' ');
                return _string;
        }
        function decimals_parser(_num) {
                var _first_num = _num.substr(0, 1);
                var _second_num = parseFloat(_num.substr(1, 2));
                var _string = ' ' + _first_num + _second_num;
                if (_second_num == 1) _string += ' копейка';
                else if (_second_num > 1 && _second_num < 5) _string += ' копейки';
                else _string += ' копеек';
                return _string;
        }
        if (!_number || _number == 0) return false;
        if (typeof _number !== 'number') {
                _number = _number.replace(',', '.');
                _number = parseFloat(_number);
                if (isNaN(_number)) return false;
        }
        _number = _number.toFixed(2);
        if(_number.indexOf('.') != -1) {
                var _number_arr = _number.split('.');
                var _number = _number_arr[0];
                var _number_decimals = _number_arr[1];
        }
        var _number_length = _number.length;
        var _string = '';
        var _num_parser = '';
        var _count = 0;
        for (var _p = (_number_length - 1); _p >= 0; _p--) {
                var _num_digit = _number.substr(_p, 1);
                _num_parser = _num_digit +  _num_parser;
                if ((_num_parser.length == 3 || _p == 0) && !isNaN(parseFloat(_num_parser))) {
                        _string = number_parser(_num_parser, _count) + _string;
                        _num_parser = '';
                        _count++;
                }
        }
        if (_number_decimals) _string += decimals_parser(_number_decimals);
		//_string = _string.charAt(0).toUpperCase() + _string.substring(1);
        return _string;
}
function sum_calculate(count, base_price, Discount)
	{
	let sum_contract; // Сумма счета цифрами
	let disc=0; // Сумма скидки цифрами
	let discPercent=0; // Размер скидки цифрами
	let disc_str=''; // Сумма скидки словами
	let sum_str=''; // Сумма счета словами
	let base_sum; // Полная сумма без учета скидки (базовая цена*количество). Используется для расчета размера скидки. 
	
	//Получаем размер скидки
	for (let i in Discount)	{
		//Перебираем ключи объекта Discount, которые являются количеством единиц, необходимых для получения скидки
		//Discount - примерно такого вида: {"10": "15","50": "25","100": "35"}, где  
		// {"Количество 1" : "размер скидки 1", "Количество 2" : "размер скидки 2", "Количество 3" : "размер скидки 3"}	
		if (count>=i*1) {discPercent=Discount[i]*1}
		else {break}
	}

	base_sum=count*base_price;
	sum_contract=count*Math.round(base_price*(100-discPercent))/100;

	disc=base_sum-sum_contract; //Считаем сумму скидки
	//Формируем строки для вывода в файл
	disc_str="<br> <span id='disc' style='color:red;'> <b>Cкидка</b> ("+discPercent+"%): "+disc.toFixed(2)+" руб. </span>"; 
	sum_str="<b>Сумма к оплате</b>: "+ sum_contract.toFixed(2)+" руб. ("+number_to_string(sum_contract)+")."+disc_str;

	document.getElementById("input_count").backgroundColor ="#F7F7F7";
	if (disc>0) {
		document.getElementById("is_sum_disc").innerHTML = "Скидка, <br>руб.";
		document.getElementById("sum_disc").innerHTML = disc.toFixed(2);	
		document.getElementById("skidki").innerHTML = '';
		
		}
	else {	
		document.getElementById("is_sum_disc").innerHTML = "Сумма <br>НДС, руб.";
		document.getElementById("sum_disc").innerHTML = "&mdash;";	
		}
	document.getElementById("sum_k_opl").innerHTML = sum_contract.toFixed(2);
	document.getElementById("tip_note").style.visibility="hidden" ;
	if (discPercent>0) 
		{document.getElementById("skidki").style.visibility="hidden"} 
	else 
		{document.getElementById("skidki").style.visibility="visible"};
	document.getElementById("sum_contract").innerHTML = sum_str ;
}
