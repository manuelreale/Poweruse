let toDo=0;
      let table;
      let oldTable;
      let timeAgo =1;
      let avg24 =0;
      const prezzoKwh = 0.354497354;
      const avgDay = 39;
      const barDays = 14;
      let lastDays=[];
      let lastDaysLabels=[];
      let lastDaysColor=[];
      let lastDaysColorBorder=[];
      let lastDaysAccuracy=[];

  function preload() {
    //my table is comma separated value "csv"
    //and has a header specifying the columns labels
table = loadTable('https://docs.google.com/spreadsheets/d/1IJiI5ccjD4XKWVqJwI_YE36Sm71zLC2RQmMRu2od3WA/export?format=csv&id=1IJiI5ccjD4XKWVqJwI_YE36Sm71zLC2RQmMRu2od3WA&gid=0', 'csv', 'header');
oldTable = table;
    //the file can be remote
    //table = loadTable("http://p5js.org/reference/assets/mammals.csv",
    //                  "csv", "header");
  }
let m;
let n;
let latestReading;
var diffMinutes;


  function setup() {

    // Your moment
    var mmt = moment();

    // Your moment at midnight
    var mmtMidnight = mmt.clone().startOf('day');

    // Difference in minutes
    diffMinutes = mmt.diff(mmtMidnight, 'minutes');



    table = loadTable('https://docs.google.com/spreadsheets/d/1IJiI5ccjD4XKWVqJwI_YE36Sm71zLC2RQmMRu2od3WA/export?format=csv&id=1IJiI5ccjD4XKWVqJwI_YE36Sm71zLC2RQmMRu2od3WA&gid=0', 'csv', 'header',createTable(), twentyFourHoursAverage());

    toDo=0;
    duration = 440;
    updateMeter()

  }

  let v=0;

  function draw(){

    if (millis() - n > 5000){
      console.log(v)
      //console.log('up')
    n = millis()
    if(v<6){
      oldTable = table;
      table = loadTable('https://docs.google.com/spreadsheets/d/1IJiI5ccjD4XKWVqJwI_YE36Sm71zLC2RQmMRu2od3WA/export?format=csv&id=1IJiI5ccjD4XKWVqJwI_YE36Sm71zLC2RQmMRu2od3WA&gid=0', 'csv', 'header', updateMeter());
      v++
    }else{
      v=0;
      console.log("helo")
      table = loadTable('https://docs.google.com/spreadsheets/d/1IJiI5ccjD4XKWVqJwI_YE36Sm71zLC2RQmMRu2od3WA/export?format=csv&id=1IJiI5ccjD4XKWVqJwI_YE36Sm71zLC2RQmMRu2od3WA&gid=0', 'csv', 'header', createTable());
    }
  }

}

  function remove_character(str, char_pos)
 {
  part1 = str.substring(0, char_pos);
  part2 = str.substring(char_pos + 1, str.length);
  return (part1 + part2);
 }
let res = 2
var chart;
var chartInstance;
let duration = 540
let oldLength;


 function createTable()
{
  m = millis()
  n = millis()


if(oldTable.getRowCount() != 0){
  if(chartInstance != undefined){ chartInstance.destroy() }
  oldLength = oldTable.getRowCount();

  if(duration>oldTable.getRowCount()){
    duration = oldTable.getRowCount()-1
  }

  latestReading = oldTable.getString(oldTable.getRowCount()-1, 1)
  document.getElementById("myspan").textContent= latestReading + ' Watt' ;
  console.log('updated')
  setProgress(latestReading/3000*50)

  //count the columns
  //print(table.getRowCount() + ' total rows in table');
  //print(table.getColumnCount() + ' total columns in table');

  //print(table.getColumn('name'));
  //["Goat", "Leopard", "Zebra"]

  //cycle through the table
  for (let r = 0; r < oldTable.getRowCount(); r++)
    for (let c = 0; c < 2; c++) {
      //print(table.getString(r, c));
    }




    chart    = document.getElementById('chart').getContext('2d'),
        gradient = chart.createLinearGradient(0, 0, 0, 450);

    gradient.addColorStop(0, 'rgba(127, 130, 255, 0.5)');
    gradient.addColorStop(0.5, 'rgba(127, 130, 255, 0.25)');
    gradient.addColorStop(1, 'rgba(127, 130, 255, 0)');


    var data  = {
        labels: [],
        datasets: [{
          label: data,
          backgroundColor: gradient,
          pointBackgroundColor: 'white',
          borderWidth: 2,
          borderColor: '#7F82FF',
          data: []
        }]
    };
    console.log(oldTable.getRowCount()-duration)
    let averagePM = parseInt(oldTable.getString((oldTable.getRowCount()-duration), 1));
    let valuesPM = 1;
    let stringa;
    let dataV;
    let unit = 0;

     for(i = 0; i < duration; i++){
       //if(table.getString((table.getRowCount()-duration)+i, 0) == )
       stringa = oldTable.getString((oldTable.getRowCount()-duration)+i, 0)

       if(minute != stringa[stringa.length-4]){
         minute = stringa[stringa.length-4]

         dataV = oldTable.getString((oldTable.getRowCount()-duration)+i-1, 0).substr(0, stringa.length-3)
         dataV = remove_character(dataV, 5)
         dataV = remove_character(dataV, 5)
         dataV = remove_character(dataV, 5)
         dataV = remove_character(dataV, 5)
         dataV = remove_character(dataV, 5)


         data.labels[unit/res] = moment(dataV, "DD/MM HH.mm")
         data.datasets[0].data[unit/res] = round(averagePM/valuesPM)

         unit++;
         averagePM = parseInt(oldTable.getString((oldTable.getRowCount()-duration)+i, 1))
         valuesPM = 1;

       }else {

         averagePM += parseInt(oldTable.getString((oldTable.getRowCount()-duration)+i, 1))
         valuesPM++
         //console.log(averagePM);

       }
     }


//console.log(data.datasets[0].data)

// for(i = 0; i < stringa.length; i++){
//   if(minute != stringa[stringa.length-4]){
//     minute = stringa[stringa.length-4]
//
//   }
// }
//console.log(stringa.length)

    var options = {
      responsive: true,
      maintainAspectRatio: true,
      animation: {
        easing: 'easeInOutQuad',
        duration: 520
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
          min: moment().subtract({hours: timeAgo}),
          max: moment().subtract({minutes: 1}),
          parser: 'MM/DD HH.mm',
          //unit: 'hours',
          tooltipFormat:'MM/DD HH.mm' // <- HERE
          },
          gridLines: {
            color: 'rgba(100, 100, 100, 0.05)',
            lineWidth: 1
          }
        }],
        yAxes: [{
          gridLines: {
            color: 'rgba(100, 100, 100, 0.08)',
            lineWidth: 1
          }
        }]
      },
      elements: {
        line: {
          tension: 0.4
        }
      },
      legend: {
        display: false
      },
      point: {
        backgroundColor: 'white'
      },
      tooltips: {
        //titleFontFamily: 'Open Sans',
        //backgroundColor: 'rgba(255,255,255,0.9)',
        titleFontColor: 'rgba(255,255,255,0.7)',
        //dataFontColor: 'black',
        caretSize: 5,
        cornerRadius: 5,
        xPadding: 10,
        yPadding: 10
      }
    };


    chartInstance = new Chart(chart, {
        type: 'line',
        data: data,
        options: options
    });
    oldLength = oldTable.getRowCount()
  }else{
    console.log('bruh')
    //toDo = 1;
    v=15;
  }


}

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.shift();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
    });
    chart.update();
}


let fasce = [];

function updateTable()
{

 m = millis()
 let res = 1
  if(oldLength != table.getRowCount() && table.getRowCount() != 0){

   let averagePM = 0;

   let valuesPM = 0;
   let stringa;
   let dataV;
   let unit = 0;


   //console.log(table.getString(table.getRowCount()-1, 0))

    for(i = oldLength; i <= table.getRowCount(); i++){
      //if(table.getString((table.getRowCount()-duration)+i, 0) == )



      //averagePM = parseInt(table.getString(i, 1))

      if(i == table.getRowCount()){

        addData(chartInstance, moment(dataV, "DD/MM HH.mm"), round(averagePM/valuesPM))
        removeData(chartInstance)
        console.log(moment(dataV, "DD/MM HH.mm"));

        unit++;


      }else {


        stringa = table.getString(i, 0)
        minute = stringa[stringa.length-4]
        dataV = table.getString(i, 0).substr(0, stringa.length-3)
        dataV = remove_character(dataV, 5)
        dataV = remove_character(dataV, 5)
        dataV = remove_character(dataV, 5)
        dataV = remove_character(dataV, 5)
        dataV = remove_character(dataV, 5)

        averagePM += parseInt(table.getString(i, 1))
        valuesPM++
        //console.log(averagePM, valuesPM);


      }
    }
    oldLength = table.getRowCount()
  }
}

function updateMeter(){

  if(table.getRowCount() != 0 ){
    latestReading = table.getString(table.getRowCount()-1, 1)
    document.getElementById("myspan").textContent= latestReading + ' Watt' ;
    console.log('updated')
    setProgress(latestReading/3000*50)

    if(toDo == 1){
      console.log(table.getRowCount());
        createTable();
        toDo=0;
    }
  }



}

function oneHour(){
  res = 2;
  duration = 440;
  timeAgo =1;
  createTable()
}

function threeHours(){
  res = 4;
  duration = 340*4;
  timeAgo =3;
  createTable()
}

function twelveHours(){
  res = 12;
  duration = 240*4*4;
  timeAgo =12;
  createTable()
}

function twentyFourHours(){
  res = 20;
  duration = 240*6*4*2;
  timeAgo =24;
  createTable()
}

function twentyFourHoursAverage(){
  duration = 1440000;

  if(duration>table.getRowCount()){
    duration = table.getRowCount()-1
  }

  if(table.getRowCount() != 0){

    //oldLength = table.getRowCount();

      //console.log(table.getRowCount()-duration)
      let averagePM = parseInt(table.getString((table.getRowCount()-duration), 1));
      let valuesPM = 1;
      let stringa;
      let dataV;
      let unit = 0;
      let daycount = 0;
      let dayAvg = 0;
      let daysCount = 0;
      let curDay;
      let myMomentObject;
      let f1=0;
      let f2=0;
      let f3=0;



       for(i = 0; unit < 1440*avgDay; i++){
         //if(table.getString((table.getRowCount()-duration)+i, 0) == )
         stringa = table.getString(duration-i, 0)

         if(minute != stringa[stringa.length-4]){
           minute = stringa[stringa.length-4]
           myMomentObject = moment(dataV, 'DD/MM hh.mm')
           //console.log(myMomentObject.day())
           dataV = table.getString(duration-i-1, 0).substr(0, stringa.length-3)

           dataV = remove_character(dataV, 5)
           dataV = remove_character(dataV, 5)
           dataV = remove_character(dataV, 5)
           dataV = remove_character(dataV, 5)
           dataV = remove_character(dataV, 5)
           //console.log(dataV.substring(5,8))
           if(i==0){
             curDay=dataV.substring(0,5)
           }

           avg24+= round(averagePM/valuesPM)


           if(myMomentObject.day()==0){                                                 //if sunday
             f3++;
           }else if(myMomentObject.day()==6){                                           //else if saturday
             if(myMomentObject.hours()>=7 && myMomentObject.hours()<23){
               f2++;
             }else{
               f3++;
             }
           }else{                                                                       //else(all the others)
             if(myMomentObject.hours()==7){
               f2++;
             }else if(myMomentObject.hours()>=8 && myMomentObject.hours()<19){
               f1++;
             }else if(myMomentObject.hours()>=19 && myMomentObject.hours()<23){
               f2++;
             }else{
               f3++;
             }
           }


           //console.log(minute)

           dayAvg += round(averagePM/valuesPM)
             daycount++;



           if(curDay != dataV.substring(0,5)){
             daysCount++;
             if(daycount>900){
               lastDaysColor[daysCount]='rgba(127, 130, 255, 0.5)'
               lastDaysColorBorder[daysCount]='#7F82FF'
               lastDaysAccuracy[daysCount]=""
             }else{
               lastDaysColor[daysCount]='rgba(127, 127, 127, 0.3)'
               lastDaysColorBorder[daysCount]='#5F5F5F'
               lastDaysAccuracy[daysCount]=""
               //lastDaysAccuracy[daysCount]=Math.trunc((daycount/1440)*100)+"%"
             }
             daycount = 0;
             dayAvg=Math.trunc((dayAvg/24)/1000);

             if(curDay!=undefined){
               lastDaysLabels[daysCount] = curDay
               lastDays[daysCount] = dayAvg;
             }

             curDay = dataV.substring(0,5);


             dayAvg=0;

           }
           unit++;
           averagePM = parseInt(table.getString(duration-i, 1))
           valuesPM = 1;

         }else {

           averagePM += parseInt(table.getString(duration-i, 1))
           valuesPM++
           //console.log(averagePM);

         }
       }

       avg24=Math.trunc((((avg24/(1440*avgDay))/1000)*24*62)*prezzoKwh);
       console.log("kwh bimestrali :" +Math.trunc(avg24/prezzoKwh))
       document.getElementById("myspan2").textContent= 'Previsione bolletta: ' + avg24 + ' €' ;
       document.getElementById("myspan3").textContent= 'media ultimi ' + avgDay + ' giorni';
       //console.log(lastDays)
       fasce[0] = (Math.trunc(1000*f1/(f1+f2+f3)))/10;
       fasce[1] = (Math.trunc(1000*f2/(f1+f2+f3)))/10;
       fasce[2] = (Math.trunc(1000*f3/(f1+f2+f3)))/10;

       //console.log("f1: " + f1/(f1+f2+f3) + ", f2: " + f2/(f1+f2+f3)+ ", f3: " + f3/(f1+f2+f3))
       createBarChart()
       createDoughnutChart()
       //console.log('avergaee: ' + avg24)

    }else{
      console.log('failed hour')
    }
}

var circle = document.querySelector('circle');
var radius = circle.r.baseVal.value;
var circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

function setProgress(percent) {
  const offset = circumference - percent / 100 * circumference;

  var el = document.getElementsByClassName("progress-ring__circle")[0];
  el.style.strokeDashoffset = offset;
}

function createBarChart(){

lastDays.reverse();
lastDaysColor.reverse();
lastDaysAccuracy.reverse();
lastDaysColorBorder.reverse();
lastDaysLabels.reverse();

lastDays = lastDays.filter(item => item);
lastDaysLabels = lastDaysLabels.filter(item => item);
//lastDaysLabels.shift();

console.log(lastDaysLabels)
console.log(lastDays)

  const ctx = document.getElementById('myChart');
  const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: lastDaysLabels,
          datasets: [{
              label: 'Kwh giornalieri',
              data: lastDays,
              backgroundColor: lastDaysColor,
              borderColor: lastDaysColorBorder,
              borderWidth: 1
          }]
      },
      options: {
        barThickness: 10,
        scales: {
          xAxes: [{
            barPercentage: 0.4,
            type: 'time',
            time: {
            min: moment().subtract({days: 15}),
            max: moment().add({hours: 0}),
            offset:true,
            parser: 'DD/MM',
            //unit: 'hours',
            tooltipFormat:'DD/MM' // <- HERE
            },
            gridLines: {
              color: 'rgba(100, 100, 100, 0.05)',
              lineWidth: 1
            }
          }],
          yAxes: [{
            gridLines: {
              color: 'rgba(100, 100, 100, 0.08)',
              lineWidth: 1
            }
          }]
        }
      },
  });
}





function createDoughnutChart(){
  var ctx2 = document.getElementById('graph').getContext('2d');
var chart = new Chart(ctx2, {
    // The type of chart we want to create
    type: 'doughnut',
    // The data for our dataset
    data: {
        labels: ["F1", "F2", "F3"],
        datasets: [{
            backgroundColor: ['rgba(127, 130, 255, 0.3)', 'rgba(127, 130, 255, 0.5)', 'rgba(127, 130, 255, 0.8)'],
            borderColor: '#7F82FF',
            borderWidth: 1,
            data: fasce,
            label:["F1", "F2", "F3"]
        }]
    },

    // Configuration options go here
    options: {
      legend: {
            display: true,
            position: 'right',
        },
        tooltips: {
     callbacks: {
       label: function (tooltipItem, data) {
         try {
           let label = ' ' + data.labels[tooltipItem.index] || '';

           if (label) {
             label += ': ';
           }

           const sum = data.datasets[0].data.reduce((accumulator, curValue) => {
             return accumulator + curValue;
           });
           const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

           label += Number((value / sum) * 100).toFixed(2) + '%';
           return label;
         } catch (error) {
           console.log(error);
         }
       }
     }
   }
    }
});
}
