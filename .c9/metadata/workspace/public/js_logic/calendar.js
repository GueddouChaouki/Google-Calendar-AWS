{"filter":false,"title":"calendar.js","tooltip":"/public/js_logic/calendar.js","undoManager":{"mark":0,"position":0,"stack":[[{"start":{"row":0,"column":0},"end":{"row":137,"column":3},"action":"insert","lines":["var cal_days_labels = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];","","var cal_months_labels = ['Janvier', 'Fevrier', 'Mars', 'Avril',","                      'Mai', 'Juin', 'Juiller', 'Aout', 'Septembre',","                      'Octobre', 'Novembre', 'Decembre'];","","var cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];","","var today = new Date();","var month = today.getMonth()+1; //January is 0!","var year = today.getFullYear();","","","var prec_button = document.getElementById(\"prec_button\");","prec_button.addEventListener(\"click\", function(){","","    alert(\"hello\");","});","       ","//------------------------------------------------------------------------------------------------------------------------------------","","function Calendar(month, year){","      ","   // compensate for leap year","","      if ( month == 1) { // February only!","        if(( year % 4 == 0 &&  year % 100 != 0) ||  year % 400 == 0){","          monthLength = 29;","        }","      }","      ","         // find number of days in month","       var monthLength = cal_days_in_month[month];","       ","          // get first day of month","       var firstDay = new Date(year, month, 2);","       var startingDay = firstDay.getDay();","      ","    var div1 = document.getElementById('Calendar_title');","    div1.id = 'my_calendar_title';","    var div2 = document.getElementById('caleandar_head');","    var div3 = document.getElementById('caleandar');","    var table = document.createElement('table');","    table.id='my_calendar';","    ","         var tr_head= document.createElement(\"tr\");","         var p_title= document.createElement('p');","         p_title.id = 'my_calendar_title';","         ","","        ","    ","         //Calendar title","         var monthName = cal_months_labels[4];","         p_title.innerHTML = monthName + \" \" + 2017;","         div1.appendChild(p_title);","         ","        ","","     for(var i=0; i< cal_days_labels.length; i++){","         var td_head = document.createElement('td');","         td_head.innerHTML = cal_days_labels[i];","         tr_head.appendChild(td_head);","     }","         table.appendChild(tr_head);","         div2.appendChild(table);","","  // fill in the days","  var day = 1;","  var tableau = [];","  var mini_tableau = [];","  // this loop is for weeks (rows)","  for (var i =0 ; i < 10 ; i++) {","      var tr = document.createElement('tr');","      tableau[i] = [];","            // this loop is for week days (cells)","            for (var j = 0; j < cal_days_labels.length ; j++) { ","            var td_body= document.createElement('td');","            td_body.id = 'td_main_table';","            var mini_table = document.createElement('table');","            mini_table.id = 'my_mini_table';","      ","                    // creating the mini table ","                    for (var k=0 ; k < 6 ; k ++){","                    var tr_mini_table = document.createElement('tr');","                    mini_tableau[k] = [];","                            for(var l=0 ; l < 6 ; l ++){","                                ","                            var td_mini_table = document.createElement('td');","                            td_mini_table.dataset.column = l;","                            tr_mini_table.appendChild(td_mini_table);","                            mini_tableau[k][l] = td_mini_table;","                            ","                            if(k==0 && l==0){","                                td_mini_table.colSpan = \"6\";","                                td_mini_table.classList.add('first_row_mini_table');","                                break;","                            }","                            }","                            mini_table.appendChild(tr_mini_table);","","                    }","   ","      td_body.appendChild(mini_table);","      td_body.dataset.column = j;","      tr.appendChild(td_body);","     ","      if (day <= monthLength  && (i > 0 || j >= startingDay)) {","            mini_tableau[0][0].innerHTML = day;","            mini_tableau[5][5].innerHTML = '0';","            day++;","      } else {","          td_body.innerHTML = '';","      }","      ","    }","  ","    ","    // stop making rows if we've run out of days","     if (day > monthLength ) {","       td_body.innerHTML = '';","       tableau[i][j] = td_body;","       break;","     } else {","         tableau[i][j] = td_body;","     }","    table.appendChild(tr);","  }","    div3.appendChild(table);","}","","//------------------------------------------------------------------------------------------------------------------------------------","","","document.querySelector('#next_button').addEventListener('click', function(){","    month++;","    console.log(month);","});"],"id":1}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":13,"column":57},"end":{"row":13,"column":57},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1489418752211,"hash":"158d34362a6edb9735cdc9139bc15d1a98fab7fc"}