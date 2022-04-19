

  let toDo=0;
      let table;

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
    table = loadTable('https://docs.google.com/spreadsheets/d/1IJiI5ccjD4XKWVqJwI_YE36Sm71zLC2RQmMRu2od3WA/export?format=csv&id=1IJiI5ccjD4XKWVqJwI_YE36Sm71zLC2RQmMRu2od3WA&gid=0', 'csv', 'header', createTable());
    oneHour()
  }

  //let newM;

  function draw(){
    if (millis() - m > 30000){
      console.log("helo")
      table = loadTable('https://docs.google.com/spreadsheets/d/1IJiI5ccjD4XKWVqJwI_YE36Sm71zLC2RQmMRu2od3WA/export?format=csv&id=1IJiI5ccjD4XKWVqJwI_YE36Sm71zLC2RQmMRu2od3WA&gid=0', 'csv', 'header', createTable());
      m = millis()
    }

    if (millis() - n > 1000){
      //console.log('up')
    table = loadTable('https://docs.google.com/spreadsheets/d/1IJiI5ccjD4XKWVqJwI_YE36Sm71zLC2RQmMRu2od3WA/export?format=csv&id=1IJiI5ccjD4XKWVqJwI_YE36Sm71zLC2RQmMRu2od3WA&gid=0', 'csv', 'header', updateMeter());
    n = millis()
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
let duration = 240
let oldLength;


 function createTable()
{
  m = millis()
  n = millis()
  if(duration>table.getRowCount()){
    duration = table.getRowCount()-1
  }


if(table.getRowCount() != 0){
  if(chartInstance != undefined){ chartInstance.destroy() }
  oldLength = table.getRowCount();

  //count the columns
  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');

  print(table.getColumn('name'));
  //["Goat", "Leopard", "Zebra"]

  //cycle through the table
  for (let r = 0; r < table.getRowCount(); r++)
    for (let c = 0; c < 2; c++) {
      print(table.getString(r, c));
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


         data.labels[unit/res] = dataV
         data.datasets[0].data[unit/res] = round(averagePM/valuesPM)

         unit++;
         averagePM = parseInt(table.getString((table.getRowCount()-duration)+i, 1))
         valuesPM = 1;

       }else {

         averagePM += parseInt(table.getString((table.getRowCount()-duration)+i, 1))
         valuesPM++
         console.log(averagePM);

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

        addData(chartInstance, dataV, round(averagePM/valuesPM))
        removeData(chartInstance)
        console.log(averagePM/valuesPM);

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
        console.log(averagePM, valuesPM);


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

    if(toDo == 1){
        createTable();
        toDo=0;
    }
  }



}

function oneHour(){
  res = 1;
  duration = 240;


  createTable()
}

function threeHours(){
  res = 2;
  duration = 240*3;

  createTable()
}

function twelveHours(){
  res = 3;
  duration = 240*3*4;

  createTable()
}

function twentyFourHours(){
  res = 5;
  duration = 240*3*4*2;

  createTable()
}
