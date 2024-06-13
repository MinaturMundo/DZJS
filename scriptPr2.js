// Burger,Reg,Slider

var showMenu = (function () {

    var init = function () {
        _setUpListners();
    };
    
    var _setUpListners = function () {
        document.getElementById("sidebar-toggle").addEventListener("click",function toogleMenu(){
            document.querySelector(".wrapper").classList.toggle("open-sidebar");
        });                   
    }
    
    return {init : init}
    })();
    
    function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } 
    else {
        document.addEventListener('DOMContentLoaded', fn);
    }
    }
    
    ready(showMenu.init);
    
    
    
    
    let forma = document.getElementById('forma'); //# не было и работало
    let myForms=document.forms.my;
    let pass1 = document.getElementById('pass').value;
    let pass2 = document.getElementById('pass2').value;
    
    let emaila = document.getElementById('email').value;
    myForms.addEventListener('submit',function(e){
        e.preventDefault();
        let oV=document.getElementById('email').value;
        let tV=document.getElementById('pass').value;
        let thrV=document.getElementById('login').value;
        let fV=document.getElementById('pass2').value;
        result.innerHTML+=thrV;
        result.style.display='block';
        localStorage.setItem('email',oV);
        localStorage.setItem('pass',tV);
        localStorage.setItem('login',thrV);
        localStorage.setItem('pass2',fV);
    });
                let res=localStorage.getItem('login');
                let rty=document.getElementById('dof')
    rty.addEventListener('click',function(){
        myForms.style.display='block';
    });
    forma.addEventListener("submit", function(e) {
        e.preventDefault();
    
    
    
    if(pass1 === pass2) {
        alert("На почту " + emaila + " отправлено письмо с подтверждением.");
        
    
        
        
            
        } else {
            alert("Введен неправильный пароль. Почта не отправлена.");
        }
    });
    let rtyu=document.getElementById('btn');
        rtyu.addEventListener('click',function(){
            myForms.style.display='none';
            rty.style.display='none';
            result.style.display='block';
            
        });
    document.addEventListener('DOMContentLoaded',function(){
            if(res){
                result.innerHTML+=res;
                myForms.style.display='none';
                // rty.style.display='none';
                result.style.display='block';
            }
        });
        let rtu=document.getElementById('fof');
                rtu.addEventListener('click',function(){
                    localStorage.removeItem('email');
                    localStorage.removeItem('pass');
                    localStorage.removeItem('login');
                    localStorage.removeItem('pass2');
                    window.location.reload();
                    
                });
    
    
    
    
    
    // slider
    document.addEventListener('DOMContentLoaded', function() {
                new Slider(document.querySelector('.carousel'));
            });
            class Slider {
        constructor(slider, autoplay = true) {
            // элемент div.carousel
            this.slider = slider;
            // все кадры (слайды)
            this.allFrames = slider.querySelectorAll('.carousel-item');
            // цепочка кадров
            this.frameChain = slider.querySelector('.carousel-slides');
            // кнопка «вперед»
            this.nextButton = slider.querySelector('.carousel-next');
            // кнопка «назад»
            this.prevButton = slider.querySelector('.carousel-prev');
    
            this.index = 0; // индекс кадра, который сейчас в окне просмотра
            this.length = this.allFrames.length; // сколько всего есть кадров
            this.autoplay = autoplay; // включить автоматическую прокрутку?
            this.paused = null; // чтобы можно было выключать автопрокрутку
    
            this.init(); // инициализация слайдера
        }
    
        init() {
            this.dotButtons = this.dots(); // создать индикатор текущего кадра
    
            // все кадры должны быть одной ширины, равной ширине окна просмотра;
            // если кадров три, то ширина каждого кадра будет 100/3 = 33.33333%
            // от ширины контейнера .carousel-slides, то есть 900 пикселей
            this.allFrames.forEach(frame => frame.style.width = 100/this.length + '%');
            // ширина цепочки кадров должна равна ширине всех кадров, то есть
            // 900*3 = 2700 пикселей; но удобнее задать в процентах от родителя,
            // если кадров три, то ширина контейнера кадров будет 100*3 = 300%
            this.frameChain.style.width = 100 * this.length + '%';
    
            this.nextButton.addEventListener('click', event => { // клик по кнопке «вперед»
                event.preventDefault();
                this.next();
            });
    
            this.prevButton.addEventListener('click', event => { // клик по кнопке «назад»
                event.preventDefault();
                this.prev();
            });
    
            // клики по кнопкам индикатора текущего кадра
            this.dotButtons.forEach(dot => {
                dot.addEventListener('click', event => {
                    event.preventDefault();
                    const index = this.dotButtons.indexOf(event.target);
                    if (index === this.index) return;
                    this.goto(index);
                });
            });
    
            if (this.autoplay) { // включить автоматическую прокрутку?
                this.play();
                // когда мышь над слайдером — останавливаем автоматическую прокрутку
                this.slider.addEventListener('mouseenter', () => clearInterval(this.paused));
                // когда мышь покидает пределы слайдера — опять запускаем прокрутку
                this.slider.addEventListener('mouseleave', () => this.play());
            }
        }
    
        // перейти к кадру с индексом index
        goto(index) {
            // изменить текущий индекс...
            if (index > this.length - 1) {
                this.index = 0;
            } else if (index < 0) {
                this.index = this.length - 1;
            } else {
                this.index = index;
            }
            // ...и выполнить смещение
            this.move();
        }
    
        // перейти к следующему кадру
        next() {
            this.goto(this.index + 1);
        }
    
        // перейти к предыдущему кадру
        prev() {
            this.goto(this.index - 1);
        }
    
        // рассчитать и выполнить смещение
        move() {
            // на сколько нужно сместить, чтобы нужный кадр попал в окно
            const offset = 100/this.length * this.index;
            this.frameChain.style.transform = `translateX(-${offset}%)`;
            this.dotButtons.forEach(dot => dot.classList.remove('active'));
            this.dotButtons[this.index].classList.add('active');
        }
    
        // запустить автоматическую прокрутку
        play() {
            this.paused = setInterval(() => this.next(), 1000);
        }
    
        // создать индикатор текущего слайда
        dots() {
            const ol = document.createElement('ol');
            ol.classList.add('carousel-indicators');
            const children = [];
            for (let i = 0; i < this.length; i++) {
                let li = document.createElement('li');
                if (i === 0) li.classList.add('active');
                ol.append(li);
                children.push(li);
            }
            this.slider.prepend(ol);
            return children;
        }
    }
    
    
    // Tiner,Kal
    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function initializeClock(id, endtime) {
        var clock = document.getElementById(id);
        var daysSpan = clock.querySelector('.days');
        var hoursSpan = clock.querySelector('.hours');
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');

        function updateClock() {
            var t = getTimeRemaining(endtime);

            daysSpan.innerHTML = t.days;
            hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }

        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    }

    var deadline="January 01 2024 00:00:00 GMT+0300";
    initializeClock('countdown', deadline);









    var Cal = function(divId) {
        this.divId = divId;
// Дни недели с понедельника
        this.DaysOfWeek = [
            'Mo',
            'Tu',
            'We',
            'Th',
            'Fr',
            'Sa',
            'Su'
        ];
// Месяцы начиная с января
        this.Months =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//Устанавливаем текущий месяц, год
        var d = new Date();
        this.currMonth = d.getMonth();
        this.currYear = d.getFullYear();
        this.currDay = d.getDate();
    };
// Переход к следующему месяцу
    Cal.prototype.nextMonth = function() {
        if ( this.currMonth == 11 ) {
            this.currMonth = 0;
            this.currYear = this.currYear + 1;
        }
        else {
            this.currMonth = this.currMonth + 1;
        }
        this.showcurr();
    };
// Переход к предыдущему месяцу
    Cal.prototype.previousMonth = function() {
        if ( this.currMonth == 0 ) {
            this.currMonth = 11;
            this.currYear = this.currYear - 1;
        }
        else {
            this.currMonth = this.currMonth - 1;
        }
        this.showcurr();
    };
// Показать текущий месяц
    Cal.prototype.showcurr = function() {
        this.showMonth(this.currYear, this.currMonth);
    };
// Показать месяц (год, месяц)
    Cal.prototype.showMonth = function(y, m) {
        var d = new Date()
// Первый день недели в выбранном месяце 
        , firstDayOfMonth = new Date(y, m, 7).getDay()
// Последний день выбранного месяца
        , lastDateOfMonth =  new Date(y, m+1, 0).getDate()
// Последний день предыдущего месяца
        , lastDayOfLastMonth = m == 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();
        var html = '<table>';
// Запись выбранного месяца и года
        html += '<thead><tr>';
        html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
        html += '</tr></thead>';
// заголовок дней недели
        html += '<tr class="days">';
        for(var i=0; i < this.DaysOfWeek.length;i++) {
            html += '<td>' + this.DaysOfWeek[i] + '</td>';
        }
        html += '</tr>';
// Записываем дни
        var i=1;
        do {
            var dow = new Date(y, m, i).getDay();
// Начать новую строку в понедельник
            if ( dow == 1 ) {
                html += '<tr>';
            }
// Если первый день недели не понедельник показать последние дни предыдущего месяца
            else if ( i == 1 ) {
                html += '<tr>';
                var k = lastDayOfLastMonth - firstDayOfMonth+1;
                for(var j=0; j < firstDayOfMonth; j++) {
                    html += '<td class="not-current">' + k + '</td>';
                    k++;
                }
            }
// Записываем текущий день в цикл
            var chk = new Date();
            var chkY = chk.getFullYear();
            var chkM = chk.getMonth();
            if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
                html += '<td class="today">' + i + '</td>';
            } 
            else{
                html += '<td class="normal">' + i + '</td>';
            }
// закрыть строку в воскресенье
            if ( dow == 0 ) {
                html += '</tr>';
            }
// Если последний день месяца не воскресенье, показать первые дни следующего месяца
            else if ( i == lastDateOfMonth ) {
                var k=1;
                for(dow; dow < 7; dow++) {
                    html += '<td class="not-current">' + k + '</td>';
                    k++;
                }
            }
            i++;
        }while(i <= lastDateOfMonth);
// Конец таблицы
        html += '</table>';
// Записываем HTML в div
        document.getElementById(this.divId).innerHTML = html;
    };
// При загрузке окна
    window.onload = function() {
// Начать календарь
        var c = new Cal("divCal");			
        c.showcurr();
// Привязываем кнопки «Следующий» и «Предыдущий»
        getId('btnNext').onclick = function() {
            c.nextMonth();
        };
        getId('btnPrev').onclick = function() {
            c.previousMonth();
        };
    }
// Получить элемент по id
    function getId(id) {
        return document.getElementById(id);
    }




    // AJAX
    let allusers = document.getElementById("all-Users");
let posts = document.querySelector("#posts");
let postbut = document.querySelector("#postsbtn");
let tabl = document.getElementById("result");
tabl.style.display = "none";
let butClk = document.getElementById("postsbtn");
butClk.style.display = "none";

//async logic
async function getAvtors() {
const response = await fetch(
`https://jsonplaceholder.typicode.com/users?_limit=10`
);
const data = await response.json();
return data;
}

//event logic
document.addEventListener('DOMContentLoaded', initApp);
function initApp() {
getAvtors().then(
function(values) {
    values.forEach((avt) => printAvt(avt));
}
)
}

//basic logic
function printAvt({id,name}) {
var div = document.createElement('div');
div.setAttribute("onclick", `infoShow(${id})`);
div.innerHTML = `<span>${name}</span>`;
allusers.append(div);

}

function printAvtInfo({id, name, username, address, email, phone, website }) {
tabl.style.display = "block";
butClk.style.display="block";
var postes = document.getElementById('posts');
postes.innerHTML = '';
const streetUser = address.street;
const cityUser = address.city;
const suiteUser = address.suite;

nameN.innerHTML = `<span>${name}</span>`;
usernameU.innerHTML = `<span>${username}</span>`;
addressA.innerHTML = `<span>${cityUser}, ${streetUser} ${suiteUser}</span>`;
emailE.innerHTML = `<span>${email}</span>`;
phoneP.innerHTML = `<span>${phone}</span>`;
emailE.innerHTML = `<span>${email}</span>`;
websiteW.innerHTML = `<span>${website}</span>`;

postbut.setAttribute("onclick", `postsShow(${id})`);

}

function infoShow(id) {
getAvtorsInfo(id).then(function (values) {
printAvtInfo(values);
});
// info.hidden = false;
}

async function getAvtorsInfo(id) {
const response = await fetch(
`https://jsonplaceholder.typicode.com/users/${id}/`
);
const data = await response.json();
return data;
}


function postsShow(id) {
getPosts(id).then(function (values) {
values.forEach((post) => printPosts(post));
});
}


async function getPosts(id) {
const response = await fetch(
`https://jsonplaceholder.typicode.com/posts?userId=${id}`
);
const data = await response.json();
return data;
}

// ${userId}
function printPosts({userId, title, body}) {
var article = document.createElement('div');

article.innerHTML = `<h4>${title}</h4><p>${body}</p>`;
posts.append(article);
}

// rulette
var cards_block = document.querySelector('.cards');
var cards = document.querySelectorAll('.cards > div');

function start() {
  var random = Math.floor(Math.random() * 101); // От 0 до 8
  cards_block.style.left = -random * 100 + 'px';
  setTimeout(function() {
    random++;
    cards[random].style.background = '#7B90F7';
    cards[random].style.color = 'white';
  }, 5000)
}

// window.onscroll=function(){
//     let rtyu=document.getElementById('info');
//     rtyu.style.display=
// }
// document.getElementById("myDIV").addEventListener("scroll", myFunction);

// function myFunction() {
//   document.getElementById("demo").innerHTML = "You scrolled in div.";
// }



document.addEventListener('scroll',function(){
    
    if(window.pageYOffset>250){
        let figure=document.querySelectorAll(".ball1,.ball2");
        figure[0].style.display='block';
        figure[1].style.display='block';
    }else{
        let figure=document.querySelectorAll(".ball1,.ball2");
        figure[0].style.display='none';
        figure[1].style.display='none';
    }

    if(window.pageYOffset>550){
        let figure=document.querySelectorAll(".ball3,.ball4");
        figure[0].style.display='block';
        figure[1].style.display='block';
    }else{
        let figure=document.querySelectorAll(".ball3,.ball4");
        figure[0].style.display='none';
        figure[1].style.display='none';
    }
    if(window.pageYOffset>750){
        let figure=document.querySelectorAll(".ball5,.ball6");
        figure[0].style.display='block';
        figure[1].style.display='block';
    }else{
        let figure=document.querySelectorAll(".ball5,.ball6");
        figure[0].style.display='none';
        figure[1].style.display='none';
    }
})