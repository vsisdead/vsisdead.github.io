﻿var dialogOn = false;
//подготовка среды
function prepare_environment() {
    //диалоговый модуль
    document.body.innerHTML += "<div id='dialog' class='dialog' style='margin-left:-25px;'>" +
		"<div class='label' onclick='toggleDialog()'>Нажми, чтобы спросить!</div>" +
		"<div class='header'>История:</div>" +
		"<div class='history' id='history'></div>" +
		"<div class='question'><input id='Qdialog' placeholder='Введите вопрос'><br>" +
			"<button id = 'mybtn' onclick='ask(\"Qdialog\")'>Спросить</button>"
    "</div>" +
"</div>";

  //крупный план изображений
	document.body.innerHTML+="<div id='imgalert'  style='display:none'>"+
		"<div class='bg' onclick='hide(\"imgalert\")'>&nbsp;</div>"+
		"<img id='img_in_alert' src='' />"+
	"</div>";
    //поле с распознаванием речи
    // Задаем API-ключ (подробнее см. Глобальные настройки API).
    window.ya.speechkit.settings.apikey = '5c6d6536-b453-4589-9bc7-f16c7a795106';

    // Добавление элемента управления "Поле для голосового ввода".
    var textline = new ya.speechkit.Textline('Qdialog', {
        onInputFinished: function (text) {
            // Финальный текст.
            ask('Qdialog');
        }
    });
}

//ДИАЛОГ
//показ-скрытие диалогового модуля
function toggleDialog() {
    //закрытие
    if (dialogOn) {
        $("#dialog").animate({ "margin-left": "-25px" }, 1000, function () { });
        dialogOn = false;
        timer = setInterval(alert_over_time, timeout);
    }
        //открытие
    else {
        $("#dialog").animate({ "margin-left": "-300px" }, 1000, function () { });
        dialogOn = true;
        clearInterval(timer);
    }
}

//база знаний
var knowledge = [
    ["луна",
	 "является",
	 "спутником Земли"],
        //0) температуропроводность
         ["теплопроводностью", "является",
        "способность материальных тел к переносу энергии (теплообмену) от более нагретых частей тела к менее нагретым частям тела"],
      //1) В чём заключается цель работы
    ["цель работы", "заключается", "в определении температуры и удельной теплоты плавления твердых веществ."],

	//2)связь с картинкой в ответе - как выглядит установка(фото)
    ["установка", "показана",
        "на рисунке: <br ><img src='img/back.jpg' height='200' width='250' /> "],

    //3)связь с анимацией в ответе - как выглядит схема установки
    ["схема установки", "показана",
        "на рисунке: <br><embed src='3dmodel.swf' /> "],
        //embed
    //4)связь с картинкой в ответе - как выглядит формула 7.1(Фурье)
    ["дифференциальная формула теплопроводности Фурье (формула 7.1)", "показана",
        "на рисунке: <br><img src='img/2.jpg' height='200' width='250' />"],


    //5)связь с картинкой в ответе - как выглядит формула 7.2
    ["плотность потока энергии","-это",
        "количество энергии, проходящей в единицу времени через единицу площади (вектор плотности ТП на рисунке) <br><img src='img/3.jpg' height='80' width='180' /> где q-вектор плотности теплового потока"],
        /////////////////
    //6)связь с картинкой в ответе - как выглядит формула 7.3
    ["минус в формуле плотности потока","показывает,", "что тепловой поток направлен противоположно вектору grad T (то есть в сторону скорейшего убывания температуры)."],

    //7)связь с картинкой в ответе - как выглядит рисунок 7.1
    ["характер изменения температуры тела (рисунок 7.1)", "показан",
        "на рисунке: <br><img src='img/3.jpg' height='80' width='180'/>"],

    //8)связь с картинкой в ответе - как выглядит формула 7.4
    ["анализ теплового баланса (формула 7.4)" ,"показана",
        "на рисунке: <br><img src='img/4.jpg' height='80' width='180' />"],

    //9)связь с картинкой в ответе - как выглядит формула 7.5
    ["первая теорема Кондратьева (формула 7.5)",
     "показана",
        "на рисунке: <br><img src='img/5.jpg'>"],

    //10)связь с картинкой в ответе - как выглядит формула 7.6
    ["вторая теорема Кондратьева (формула 7.6)",
     "показана",
        "на рисунке: <br><img src='img/6.jpg'>"],

    //11)Связь с электропроводностью
    ["связь с электропроводностью", 
     "устанавливается",
        "законом Видемана-Франца (на рисунке) <br><img src='img/2_3.jpg' height='80' width='180'/> где K - постоянная Больцмана,e-заряд электрона"],
///////////////////////////////////////////////////
    //12)связь с картинкой в ответе - как выглядит формула 7.7
    ["рассчет коэффициента формы для а-колориметра (формула 7.7) показана",
        "на рисунке: <br><img src='img/2_4.jpg'>"],

    //13)связь с картинкой в ответе - как выглядит формула 7.8
    ["оценка расхождения между опытным значением температуропроводности (а) и его справочной величиной (формула 7.8) показана",
        "на рисунке: <br><img src='img/2_5.jpg'>"],

    //14) Какие существуют теплофизические характеристики материалов
    ["теплофизические характеристики материалов делятся на: теплоёмкость",
        "(pc) теплопроводность (&lambda;) и температуропроводность."],


    //15) Что нужно  процесс нагрева
    ["для описания процесса нагрева (охлаждения) твердого тела, необходимо знать пространственно-временное",
				" распределение температуры в нем.Связь между изменением температуры во времени ∂t /∂&tau; и интенсивностью изменения градиента",
        " температуры t дает дифференциальное уравнение теплопроводности Фурье"],

    //16)Как выглядит Формула оператора Лапласа
    ["формула оператора Лапласа",
    "выглядит",
     "так: <br/> &nabla;<sup><small>2</small></sup>t = ∂<sup><small>2</small></sup>t/∂x<sup><small>2</small></sup> + ∂<sup><small>2</small></sup > t /∂y <sup><small>2</small></sup > + ∂<sup><small>2</small></sup>t/∂z<sup><small>2</small></sup> "],

    //16)В чем заключается физический смысл температуропроводности
    ["физический смысл температуропроводности",
     "заключается",
      "в этом: Теплопроводность &lambda;, характеризует способность вещества проводить тепло, а объемная теплоемкость pc - его аккумулировать. Таким образом, с одной стороны, чем больше &lambda;, тем интенсивней передача тепла, а с другой - чем меньше pc, тем меньше необходимо аккумулировать тепла для того, чтобы изменить температуру тела на 1 Кельвин"],

    //17)Как выглядит формула температуропроводности----------------------------------------------------------------------------------------------------------------
    ["формула температуропроводности",
     "выглядит",
     "так: <br/> а = &lambda;/(рс)"],

    //18) Каково достоинство экспериментальных методов
    ["достоинством экспериментальных методов",
     "является",
     "их простота, малая продолжительномть эксперимента и домтаточная для инженерных расчетов точность получаемых результатов"],

    //19) Какие периоды процесса нагрева существуют
    ["пероиды нагрева и охлаждения",
     "существуют",
    "два : период неупорядоченного режима и период регулярного режима"],

    //20) В чем суть неупорядоченного режима
    ["суть неупорядоченного режима", 
     "заключается",
      "в том, что на стадии неупорядоченного режима характер перестройки температурного поля в теле существенно зависит от начального распределения температуры и поэтому является случайным"],

    //21) В чем суть регулярного режима
    ["суть регулярного режима", 
     "заключается",
     "в том, что с течением времени влияние начальных условий на процесс нагрева уменьшается, и после достижения некоторого времени изменение температуры тела определяется только условиями теплообмена на его поверхности, формой, размерами и физическими свойствами тела"],

    //22) Как выглядит формула среднеобьемной избыточной температуры
    ["формула среднеобъемной избыточной температуры", 
     "выглядит", 
     "так: </br>&thetasym;<sub><small>V</small></sub> = t<sub><small>f</small></sub> - t<sub><small>V</small></sub> - среднеобъемная избыточная температура"],

     //23) Как выглядит среднеобьемная избыточная температура на поверхности тела
    ["формула среднеобьемной избыточной температуры на поверхности тела",
     "выглядит",
     "так:</br> &thetasym;<sub><small>F</small></sub> = t<sub><small>f</small></sub> - t<sub><small>V</small></sub> - среднеобьемная избыточная температура по поверхности тела F"],

    //24) Формулировка второй теоремы Кондратьева
    ["формулировка второй теоремы Кондратьева",
     "звучит",
     "так - при Bi стремящемся к бесконечности(Ві > 100) темп охлаждения стремится к конечному предделу, не зависящему от Ві и прямо пропорциональному температуропроводности тела"],

    //25) Для чего система автоматики
    [" Система автоматики осуществляет  подогрев воды до заданной температуры и дальнейшее поддержание ее постоянной. "],

    //26) Что такое а-калориметр
    ["а-калориметр ",
     "- это",
     "тонкостенный цилиндрический сосуд из бронзы диаметром 2R = 54 мм и длинной h = 74 мм, наполненный испытуемым материалом (например, песком)"],
   
    //27) Что делать после включения в сеть
    ["после включения в сеть", 
       "надо", 
        "нажать на тумблер левее"],

    //28) Какая температура у калориметра
    ["а-калориметр",
     "имеет", " перед опытом по всему объему температуру, равную температуре окружающей среды"],

    //29) Что любит автор сайта
    ["автор проекта",
     "любит",
     " спать, кушать и пить чай"],

    //30) что делать по окончании эксперимента
    ["после окончания эксперимента", 
     "надо", 
     "ознакомиться с полученными значениями на доске"],

    //31) Что такое pc
    ["pc",
    "- это",
    "-  объемная теплоемкость"],

    //32) Какое название у лабораторной работы
   ["лабораторная работа",
    "называется", 
    ": лабораторная работа по теме: определение температуры и удельной теплоты плавления твердых веществ"],

    //33) Кто такой Кондратьев
    [" Георгий Михайлович Кондратьев (1887—1958)",
     "-это",
   " советский учёный, специалист по тепловым измерениям."],

    //34) Кто является автором сайта
    ["автором проекта",
       "является", 
       "Самцов Вадим Владимирович - студент третьего курса факультета ИТ, БГТУ"],

    //35) Сколько должны длиться измерения
    ["измерения",
      "длятся",
      " 30 минут в реальных условиях в лаборатории"],

    //36) Как перевести в градусы Цельсия
    ["в градусы Цельсия",
     "перевести", 
     " можно с помощью градуировочного графика показания милливольтметра"],

    //37) Что такое K
    ["к",
     "- это", 
     " коэффициент пропорциональности, учитывающий форму и размеры тела"],

    //38) Для чего нужен милливольтметр
    ["милливольтметр",
     "нужен", 
     " для измерения термо-ЭДС"],

    //39) Какая необходимая температура воды
    ["необходимая температура воды",
     "равна",
     "60-ти градусам по Цельсию"],

    //40) Когда фиксировать показания милливольтметра
    ["показания милливольтметра",
     "фиксируют", 
     " в начальный момент времени (тот момент, когда помещают а-калориметр в термостат) и далее через каждую минуту"],

    //41) Чем заканчивается работа
    ["работа",
     "заканчивается",
     " выводом о достоверности полученных результатов"],

    //42)  Что такое ТЭН
    ["трубчатый электронагреватель (ТЭН)",
     "— это",
    "электронагревательный прибор в виде металлической трубки, заполненной теплопроводящим электрическим изолятором"],

    //43) Что такое диод
    ["диод",
     "- это", 
     " электронный элемент, обладающий различной проводимостью в зависимости от направления электрического тока"],

    //44) Откуда получена информация
    ["вся информация",
     "получена",
     " из методички - Термодинамика и теплоотдача. Володин, Дударев, Клепацкий."],

    //45) Что такое m
    ["величина m",
     "показывает",
     " темп нагрева или охлажления тела"],

    //46) Вывод уравнения Фурье
    ["вывод уравнения Фурье",
     "базируется",
     "на законе сохранения и превращения энергии и основном законе теплопроводности"],

    //47) Что такое температуропроводность
    ["температуропроводность (коэффициент температуропроводности)",
     "— это",
     "физическая величина, характеризующая скорость изменения (выравнивания) температуры вещества в неравновесных тепловых процессах.Численно равна отношению теплопроводности к объёмной теплоёмкости при постоянном давлении, в системе СИ измеряется в м²/с"],

    //48)Что такое закон сохранения  энергии
    ["закон сохранения энергии",
     "— это", 
     " фундаментальный закон природы, установленный эмпирически и заключающийся в том, что для изолированной физической системы может быть введена скалярная физическая величина, являющаяся функцией параметров системы и называемая энергией, которая сохраняется с течением времени"],

    //49) закон теплопроводности
    ["закон теплопроводности",
     "заключается",
     " в этом: количество переданной теплоты пропорционально падению температуры, времени и площади сечения, перпендикулярного направлению распространения теплоты"],

    //50)Что такое теплопроводность
    ["теплопроводность",
     "— это",
     " способность материальных тел к переносу энергии (теплообмену) от более нагретых частей тела к менее нагретым частям тела, осуществляемому хаотически движущимися частицами тела (атомами, молекулами, электронами и т.п.).Такой теплообмен может происходить в любых телах с неоднородным распределением температур, но механизм переноса теплоты будет зависеть от агрегатного состояния вещества"]

];



//поиск и вывод ответа и вопроса
function ask(questionInput) {
    var question = document.getElementById(questionInput).value.trim();
    //выдвижение диалогового модуля
    $("#dialog").animate({ "margin-left": "-300px" }, 1000, function () { });
    dialogOn = true;
    //вывод вопроса
    //document.getElementById("history").innerHTML+="<div class='question'>"+question+"</div>";
    var newDiv = document.createElement("div");
    newDiv.className = 'question';
    newDiv.innerHTML = question;
    document.getElementById("history").appendChild(newDiv);
    //поиск и вывод ответа
    //document.getElementById("history").innerHTML+="<div class='answer'>"+getAnswer(question)+"</div>";
    //создаем блок <div>
    newDiv = document.createElement("div");
    //задаем класс оформления созданного блока
    newDiv.className = 'answer';
    //получаем ответ на вопрос и наполняем им созданный блок
    newDiv.innerHTML = getAnswer(question);
    //ОЗВУЧКА - СИНТЕЗ РЕЧИ
    //флаг, нужна ли озвучка (не нужна, если есть анимация)
    var needSound = true;
    //проходим по элементам HTML-кода ответа
    for (var i = 0; i < newDiv.childNodes.length; i++) {
        //если находим элемент <embed>
        if (newDiv.childNodes[i].tagName == "EMBED") {
            //alert("EMBED detected.");
            //сбрасываем флаг и выходим из цикла
            needSound = false;
            break;
        }
    }
    //если флаг не был сброшен
    if (needSound) {
        //добавляем в ответ тег аудио, ссылающийся на звук от синтезатора речи яндекса
        //в обращении к яндексу tts.voicetech.yandex.net указывается:
        // - формат звука: format=wav
        // - язык озвучиваемого текста: lang=ru-RU
        // - ключ, полученный при регистрации в личном кабинете для SpeechKit Cloud API: key=4a4d3a13-d206-45fc-b8fb-e5a562c9f587
        // - озвучиваемый текст, который берется из сгенерированного ответа: text="+newDiv.innerText+"
        //alert("Incoming transmission.");
        newDiv.innerHTML += "<audio controls='true' audioWidth='23' autoplay='true' src='http://tts.voicetech.yandex.net/generate?format=wav&lang=ru-RU&key=4a4d3a13-d206-45fc-b8fb-e5a562c9f587&text=" + (newDiv.innerText || newDiv.textContent) + "'></audio>";
    }
    document.getElementById("history").appendChild(newDiv);
    //запуск звука
    if (newDiv.lastChild.tagName == "AUDIO") {
        newDiv.lastChild.play();
    }
    //прокрутка истории в самый низ
    document.getElementById("history").scrollTop = document.getElementById("history").scrollHeight;
    //очистка текстового поля для ввода вопроса
    document.getElementById(questionInput).value = "";
}

//псевдоокончания сказуемых (глаголов, кратких причастий и прилагательных )
var endings = [["ет", "(ет|ут|ют)"], ["ут", "(ет|ут|ют)"], ["ют", "(ет|ут|ют)"], ["ыл", "(ал|ул|ыл)"],//1 спряжение
        ["ит", "(ит|ат|ят)"], ["ат", "(ит|ат|ят)"], ["ят", "(ит|ат|ят)"],//2 спряжение
        ["ется", "(ет|ут|ют)ся"], ["утся", "(ет|ут|ют)ся"], ["ются", "(ет|ут|ют)ся"],//1 спряжение, возвратные
        ["ится", "(ит|ат|ят)ся"], ["атся", "(ит|ат|ят)ся"], ["ятся", "(ит|ат|ят)ся"],//2 спряжение, возвратные
        ["ен", "ен"], ["ена", "ена"], ["ено", "ено"], ["ены", "ены"],//краткие прилагательные
        ["ан", "ан"], ["ана", "ана"], ["ано", "ано"], ["аны", "аны"],//краткие прилагательные
        ["жен", "жен"], ["жна", "жна"], ["жно", "жно"], ["жны", "жны"],//краткие прилагательные
		["такое", "- это"]];//для вопроса "что такое А?" ответ - "А - это ..."
//черный список слов, распознаваемых как сказуемые по ошибке
var blacklist = ["замена", "замены", "атрибут", "маршрут", "член", "нет"];
//функция определения сказуемых по соответствующим псевдоокончаниям
function getEnding(word) {
    //проверка по черному списку
    if (blacklist.indexOf(word) !== -1) return -1;
    //перебор псевдоокончаний
    for (var j = 0; j < endings.length; j++) {
        //alert(word.substring(word.length-endings[j][0].length)+"-"+endings[j][0]);
        //проверка, оканчивается ли i-ое слово на j-ое псевдоокончание
        if (word.substring(word.length - endings[j][0].length) == endings[j][0]) {
            return j;   //возврат номера псевдоокончания
        }
    }
    return -1;  //если совпадений нет - возврат -1
}

//функция, которая делает первую букву маленькой
function small1(str) {
    return str.substring(0, 1).toLowerCase() + str.substring(1);
}
//функция, которая делает первую букву большой
function big1(str) {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
}

//главная функция, обрабатывающая запросы клиентов
function getAnswer(question) {
    //знаки препинания
    var separators = "'\",.!?()[]\\/";
    //получение текста из параметра запроса
    var txt = small1(question);
    //добавление пробелов перед знаками препинания
    for (var i = 0; i < separators.length; i++)
        txt = txt.replace(separators[i], " " + separators[i]);
    //массив слов и знаков препинания
    var words = txt.split(' ');
    //флаг, найден ли ответ
    var result = false;
    //формируемый функцией ответ на вопрос
    var answer = "";
    //перебор слов
    for (var i = 0; i < words.length; i++) {
        //alert(words[i]);
        //поиск номера псевдоокончания 
        var ending = getEnding(words[i]);

        //если псевдоокончание найдено – это сказуемое, подлежащее в вопросе после него
        if (ending >= 0) {
            //замена псевдоокончания на набор возможных окончаний
            words[i] = words[i].substring(0, words[i].length -
                endings[ending][0].length) + endings[ending][1];
            //создание регулярного выражения для поиска по сказуемому из вопроса
            var predicate = new RegExp(words[i]);
            //для кратких прилагательных захватываем следующее слово
            if (endings[ending][0] == endings[ending][1]) {
                predicate = new RegExp(words[i] + " " + words[i + 1]);
                i++;
            }
            //создание регулярного выражения для поиска по подлежащему из вопроса
            var subject_array = words.slice(i + 1);
            //из слов подлежащего выбрасываем короткие предлоги (периметр у квадрата = периметр квадрата)
            for (var j = 0; j < subject_array.length; j++) {
                if (subject_array[j].length < 3) {
                    subject_array = subject_array.splice(j);
                    j--;
                }
            }
            var subject_string = subject_array.join(".*");
            //только если в послежащем больше трех символов
            if (subject_string.length > 3) {
                var subject = new RegExp(".*" +
					subject_string +
					".*");
                //поиск совпадений с шаблонами среди связей семантической сети
                for (var j = 0; j < knowledge.length; j++) {
                    if (predicate.test(knowledge[j][1]) &&
						(subject.test(knowledge[j][0]) ||
							subject.test(knowledge[j][2]))) {
                        //создание простого предложения из семантической связи
                        answer += big1(knowledge[j][0] + " " +
							knowledge[j][1] + " " + knowledge[j][2] + ". ");
                        result = true;
                    }
                }
                //если совпадений с двумя шаблонами нет,
                if (result == false) {
                    //поиск совпадений только с шаблоном подлежащего
                    for (var j = 0; j < knowledge.length; j++) {
                        if ((subject.test(knowledge[j][0]) ||
								subject.test(knowledge[j][2]))) {
                            //создание простого предложения из семантической связи
                            answer += big1(knowledge[j][0] + " " +
								knowledge[j][1] + " " + knowledge[j][2] + ". ");
                            result = true;
                        }
                    }
                }
            }
        }
    }
    //если ответа нет
    if (!result)
        answer = "Ответ не найден. <br/>";
        //если ответ есть - добавляем увеличение картинок
    else
        answer = answer.replace("<img ", "<img onclick='zoom(this.src)'");
    return answer;
}

function zoom(src) {
    document.getElementById("img_in_alert").src = src;
    $("#imgalert").css({ "display": "block" });
    clearInterval(timer);
}
