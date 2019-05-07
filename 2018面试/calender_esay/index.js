let weeks = ["一", "二", "三", "四", "五", "六", "日"];
let time = new Date();
let thisY = time.getFullYear();
let thisM = time.getMonth();
let thisD = time.getDate();
let pastMleft = {0: 6, 1: 7, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5};
let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function cal() {
  monthDays[1] = (thisY % 400 == 0 || (thisY % 4 == 0 && thisY % 100 == 0)) ? 29 : 28  //判断当前年是什么年来确定2月天数
  let realM = thisM + 1;
  let firstWD = new Date(thisY, realM, 1).getDay();
  let pasD = pastMleft[firstWD]; //上月遗留
  let thisMD = monthDays[thisM];  //当月天数
  let nextD = 49 - thisMD - pasD - 7;
  let pastM = thisM - 1;
  pastM = pastM < 0 ? 11 : pastM;//上个月对应的月份
  let pasMD = monthDays[pastM]; //上个月天数 也就是最后一天
  let lists = [];
  lists.push(`<div class="cal-title">
             <span class="cal-left-btn"><</span>
             <span class="cal-title-content">${thisY}-${realM < 10 ? 0 + '' + realM : realM}</span>
             <span class="cal-right-btn">></span>
         </div>`);
  for (let i = 0; i < weeks.length; i++) {
    lists.push(`<span class='week'>${weeks[i]}</span>`)
  }
  for (let i = 0; i < pasD; i++) {
    lists.push(`<span class='past'>${pasMD - pasD + i + 1}</span>`)
  }
  for (let i = 1; i <= thisMD; i++) {
    let str = i == thisD ? 'today' : i < thisD ? 'now' : 'fur';
    lists.push(`<span class='${str}'>${i}</span>`)
  }
  for (let i = 0; i < nextD; i++) {
    lists.push(`<span class='next'>${i + 1}</span>`)
  }
  $("#cal-wrap").html(lists.join(""))
}
window.onload = function () {
  cal();
  $('#cal-wrap')
    .on('click', '.cal-left-btn', function () {
      thisM = thisM - 1;
      if (thisM < 0) {
        thisM = 11;
        thisY = thisY - 1
      }
      cal()
    })
    .on('click', '.cal-right-btn', function () {
      thisM = thisM + 1;
      if (thisM > 11) {
        thisM = 0;
        thisY = thisY + 1
      }
      cal()
    })

};



