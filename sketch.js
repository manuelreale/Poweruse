let toDo=0;
      let table;
      let timeAgo =1;
      let avg24 =0;
      const prezzoKwh = 0.354497354;
      const avgDay = 23;

  function preload() {
    //my table is comma separated value "csv"
    //and has a header specifying the columns labels
table = loadTable('https://docs.google.com/spreadsheets/d/1IJiI5ccjD4XKWVqJwI_YE36Sm71zLC2RQmMRu2od3WA/export?format=csv&id=1IJiI5ccjD4XKWVqJwI_YE36Sm71zLC2RQmMRu2od3WA&gid=0', 'csv', 'header');
    //the file can be remote
    //table = loadTable("http://p5js.org/reference/assets/mammals.csv",
    //                  "csv", "header");
  }
let m;
let n;
let latestReading;


  function setup() {
    table = loadTable('https://docs.google.com/spreadsheets/d/1IJiI5ccjD4XKWVqJwI_YE36Sm71zLC2RQmMRu2od3WA/export?format=csv&id=1IJiI5ccjD4XKWVqJwI_YE36Sm71zLC2RQmMRu2od3WA&gid=0', 'csv', 'header',createTable(), twentyFourHoursAverage());

    toDo=0;
    duration = 440;
    updateMeter()

  }

  let v=0;

  function draw(){

    if (millis() - n > 2000){
      //console.log('up')
    n = millis()
    if(v<15){
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
let res = 1
var chart;
var chartInstance;
let duration = 540
let oldLength;


 function createTable()
{
  m = millis()
  n = millis()


if(table.getRowCount() != 0){
  if(chartInstance != undefined){ chartInstance.destroy() }
  oldLength = table.getRowCount();

  if(duration>table.getRowCount()){
    duration = table.getRowCount()-1
  }

  latestReading = table.getString(table.getRowCount()-1, 1)
  document.getElementById("myspan").textContent= latestReading + ' Watt' ;
  console.log('updated')
  setProgress(latestReading/3000*50)

  //count the columns
  //print(table.getRowCount() + ' total rows in table');
  //print(table.getColumnCount() + ' total columns in table');

  //print(table.getColumn('name'));
  //["Goat", "Leopard", "Zebra"]

  //cycle through the table
  for (let r = 0; r < table.getRowCount(); r++)
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
    console.log(table.getRowCount()-duration)
    let averagePM = parseInt(table.getString((table.getRowCount()-duration), 1));
    let valuesPM = 1;
    let stringa;
    let dataV;
    let unit = 0;

     for(i = 0; i < duration; i++){
       //if(table.getString((table.getRowCount()-duration)+i, 0) == )
       stringa = table.getString((table.getRowCount()-duration)+i, 0)

       if(minute != stringa[stringa.length-4]){
         minute = stringa[stringa.length-4]

         dataV = table.getString((table.getRowCount()-duration)+i-1, 0).substr(0, stringa.length-3)
         dataV = remove_character(dataV, 5)
         dataV = remove_character(dataV, 5)
         dataV = remove_character(dataV, 5)
         dataV = remove_character(dataV, 5)
         dataV = remove_character(dataV, 5)


         data.labels[unit/res] = moment(dataV, "DD/MM HH.mm")
         data.datasets[0].data[unit/res] = round(averagePM/valuesPM)

         unit++;
         averagePM = parseInt(table.getString((table.getRowCount()-duration)+i, 1))
         valuesPM = 1;

       }else {

         averagePM += parseInt(table.getString((table.getRowCount()-duration)+i, 1))
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
          max: moment(),
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
    oldLength = table.getRowCount()
  }else{
    console.log('bruh')
    toDo = 1;
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
  res = 1;
  duration = 440;

  timeAgo =1;
  createTable()
}

function threeHours(){
  res = 2;
  duration = 340*4;
timeAgo =3;
  createTable()
}

function twelveHours(){
  res = 5;
  duration = 240*4*4;
timeAgo =12;
  createTable()
}

function twentyFourHours(){
  res = 8;
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

       for(i = 0; unit < 1440*avgDay; i++){
         //if(table.getString((table.getRowCount()-duration)+i, 0) == )
         stringa = table.getString(duration-i, 0)

         if(minute != stringa[stringa.length-4]){
           minute = stringa[stringa.length-4]

           dataV = table.getString(duration-i-1, 0).substr(0, stringa.length-3)
           dataV = remove_character(dataV, 5)
           dataV = remove_character(dataV, 5)
           dataV = remove_character(dataV, 5)
           dataV = remove_character(dataV, 5)
           dataV = remove_character(dataV, 5)

           avg24+= round(averagePM/valuesPM)
           //console.log(minute)

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
