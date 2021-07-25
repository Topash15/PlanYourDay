//empty array to store the schedule
var schedArray = [];

//pulls schedule from local storage if available
if (localStorage.getItem("schedArray")){
    var arrayStr = localStorage.getItem("schedArray");
    var schedArray = JSON.parse(arrayStr);
}else{
    var schedArray = [
    {time: "9", event:"Put event here"},
    {time: "10", event:"Put event here"},
    {time: "11", event:"Put event here"},
    {time: "12", event:"Put event here"},
    {time: "13", event:"Put event here"},
    {time: "14", event:"Put event here"},
    {time: "15", event:"Put event here"},
    {time: "16", event:"Put event here"},
    {time: "17", event:"Put event here"}
    ];
}

//creates schedule from array
var writeSchedule = function(){
    for (let i = 0; i < schedArray.length; i++) {
        //adds a time-block div for each timeframe
        $(".container").append("<div class='time-block row' id='"+schedArray[i].time+"'></div>");

        //variable to store time ID for each div
        let timeBlockID = $("#"+schedArray[i].time).attr("id")

        //variable for description in each array item
        let eventDescription = schedArray[i].event;

        //creates inner html for each div if ID matches time for array item
        if (schedArray[i].time === timeBlockID){
            $("#" + timeBlockID).append("<div class = 'hour col-1'><p>" + moment().hour(timeBlockID).format("hA") + "</p></div><textarea class = 'col-10 description "+ timeBlockID + "Text' >"+eventDescription+"</textarea> <button class= 'col-1 saveBtn'><i>+</i></button>");
        };
    };
};

//checks for current date and displays in html
var currentDate = moment().format("MM-DD-YYYY");
$('#currentDay').text(currentDate)

//calls writeSchedule to create schedule on page
writeSchedule();

//saves current hour
var hour = moment().format('hh');

//saves current minute
var currentMin = moment().format("m");

//function to adjust class for description based on current hour
var descriptClass = function(){
    for (let i = 0; i < schedArray.length; i++) {
        var timeID = $("#" +schedArray[i].time).attr("id");

        if(Number(hour) > Number(timeID)){
            $('.'+timeID+"Text").attr('class',"col-10 description "+ timeID + "Text past");
        } else if (Number(hour) < Number(timeID)){
            $('.'+timeID+"Text").attr('class',"col-10 description "+ timeID + "Text future");
        } else {
            $('.'+timeID+"Text").attr('class',"col-10 description "+ timeID + "Text present");
        };
        };
};

//changes class during initial startup
descriptClass();

//check current hour and runs descriptClass at change of hour
var checkHour = function(){
    var checkTime = setInterval(function(){
        //changes class once the hour changes
         if(currentMin === "0"){
             descriptClass();
         };
    }, 1000);
};

//initializes checkHour function
checkHour();

//saves description when save button is clicked
$(".saveBtn").click(function(){

    //fetches parent div ID for save button clicked
    //ParentID identifies the time associate with the text
    var parentID = $(this).parent().attr('id');

    //variable for textarea class
    var textInputClass = '.' + parentID +'Text'

    //read current input text
    var inputText = $(textInputClass).val();

    //save text to array
    var indexPos = ""

        //finds time position in schedArray
        for (let i = 0; i < schedArray.length; i++){
            if (schedArray[i].time === parentID){
                indexPos = i;
            }
        };
    schedArray[indexPos].event = inputText;

    //save array to localstorage
    var schedArrayString = JSON.stringify(schedArray);
    localStorage.setItem('schedArray',schedArrayString);

    //console.log("hello there")
})