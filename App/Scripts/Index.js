$(function(){
    var topradio = "";
    var leftradio = "";
    var values = [];

    $('input:radio[name=top]').change(function() {
        topradio = $('input:radio[name=top]:checked').val();
        leftradio = $('input:radio[name=left]:checked').val();
        if((topradio !==undefined) && (leftradio !==undefined)){
            values = [];
            values.push(topradio);
            values.push(leftradio);
            renderSection(values);
        }
    });

    $('input:radio[name=left]').change(function() {
        topradio = $('input:radio[name=top]:checked').val();
        leftradio = $('input:radio[name=left]:checked').val();
        if((topradio !==undefined) && (leftradio !==undefined)){
            values = [];
            values.push(topradio);
            values.push(leftradio);
            renderSection(values);
        }
    });

    var initdata = ["Yy", "Yy"];
    renderSection(initdata);
});

function renderSection(data){

    var newData = data.join("").split("");
    var d0 = newData[0];
    var d1 = newData[1];
    var d2 = newData[2];
    var d3 = newData[3];
    
    var permarr= [d2+d0, d2+d1, d3+d0, d3+d1];
   
    for(var x=0; x<newData.length; x++){
        $("#h"+x).html(newData[x]);
    }

    var value1 = 4;
    var value2 = 0;

    for(var i=0; i<permarr.length; i++){
        if(permarr[i] == "yY"){
            permarr[i] = "Yy";
        }
        $("#d"+i).html(permarr[i]);

        if(permarr[i] == "yy"){
            $("#d"+i).prev("img").attr("src", "../App/Assets/green_pea.svg");
            value1--;
            value2++;
        }
        else{
            $("#d"+i).prev("img").attr("src", "../App/Assets/yellow_pea.svg");
        }
    }

    var json = [];
    json.push({ 
        "categorie" : "Yellow",
        "value1" : value1,
        "value2" : 0 
    });

    json.push({ 
        "categorie" : "Green",
        "value1" : 0,
        "value2" : value2 
    });
    
    var models = [
        {
            "categorie": "Yellow", 
            "value1": 4,
            "value2":0
        }, 
        {
            "categorie": "Green", 
            "value1": 0,
            "value2": 1
        }
    ];

    renderGraph(json);
    renderRatios(permarr);
    
}

function renderGraph(models){
    $(".g-chart").html("");

    models = models.map(i => {
        i.categorie = i.categorie;
        return i;
    });
  
  var container = d3.select('.g-chart'),
      width = 400,
      height = 300,
      margin = {top: 30, right: 20, bottom: 30, left: 50},
      barPadding = .2,
      axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};
  
  var svg = container
     .append("svg")
     .attr("width", "100%")
     .attr("height", height)
     .append("g")
     .attr("transform", `translate(${margin.left},${margin.top})`);
  
  var xScale0 = d3.scaleBand().range([0, width*0.85 - margin.left - margin.right]).padding(barPadding);
  var yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);
  
  var xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);
  var yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);
  
  xScale0.domain(models.map(d => d.categorie));
  yScale.domain([0, 4]);
  
  var model_name = svg.selectAll(".model_name")
    .data(models)
    .enter().append("g")
    .attr("class", "model_name")
    .attr("transform", d => `translate(${xScale0(d.categorie)},0)`);
  
  /* Add field1 bars */
  model_name.selectAll(".bar.field1")
      .data(d => [d])
      .enter()
      .append("rect")
      .attr("class", "bar field1")
      .style("stroke", "#FFF")
      .style("stroke-width", "3px")
      .style("fill","#EFCE22")
      .attr("x", d => xScale0('field1'))
      .attr("y", d => yScale(d.value1))
      .attr("width", xScale0.bandwidth())
      .attr("height", d => {
      return height - margin.top - margin.bottom - yScale(d.value1)
      });
    
    /* Add field2 bars */
  model_name.selectAll(".bar.field2")
      .data(d => [d])
      .enter()
      .append("rect")
      .attr("class", "bar field2")
      .style("stroke", "#FFF")
      .style("stroke-width", "3px")
      .style("fill","#65B14F")
      .attr("x", d => xScale0('field1'))
      .attr("y", d => yScale(d.value2))
      .attr("width", xScale0.bandwidth())
      .attr("height", d => {
      return height - margin.top - margin.bottom - yScale(d.value2)
      });
  
   
  // Add the X Axis
  svg.append("g")
     .attr("class", "x axis")
     .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
     .call(xAxis);
  
  // Add the Y Axis
  svg.append("g")
     .attr("class", "y axis")
     .call(yAxis); 
}

function renderRatios(permarr){
    var permutedarr = permarr;
    var permutedobj = {};
    permutedarr.forEach(function(i) {
        permutedobj[i] = (permutedobj[i]||0) + 1;
    });

    var text="";
    for (var prop in permutedobj) {
        text = text + permutedobj[prop] + prop + " ";
    }
    text = text.split(" ");
    text = text.slice(0, -1).join(' : ');
    
    $(".genotype-ratio").html("");
    $(".genotype-ratio").html(text);
}