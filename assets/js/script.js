//empty array to store the schedule
var schedArray = [];

//pulls schedule from local storage if available
if (localStorage.getItem("schedArray")){
    var arrayStr = localStorage.getItem("schedArray");
    var schedArray = JSON.parse(arrayStr);
    console.log(schedArray);
}else{
    var schedArray = [
    {time: "9am", event:"Put event here"},
    {time: "10am", event:"Put event here"},
    {time: "11am", event:"Put event here"},
    {time: "12pm", event:"Put event here"},
    {time: "1pm", event:"Put event here"},
    {time: "2pm", event:"Put event here"},
    {time: "3pm", event:"Put event here"},
    {time: "4pm", event:"Put event here"},
    {time: "5pm", event:"Put event here"}
    ];
}

//creates schedule from local storage
var writeSchedule = function(){
    for (let i = 0; i < schedArray.length; i++) {
        //adds a time-block div for each timeframe
        $(".container").append("<div class='time-block row' id='"+schedArray[i].time+"'></div>");

        //variable to store time ID for each div
        let timeBlockID = $("#"+schedArray[i].time).attr("id")
        console.log(timeBlockID);
        console.log(schedArray[i].time);

        //variable for description in each array item
        let eventDescription = schedArray[i].event;

        //creates inner html for each div if ID matches time for array item
        if (schedArray[i].time === timeBlockID){
            console.log("Hello there");
            $("#" + timeBlockID).append("<div class = 'hour col-1'><p>" + timeBlockID + "</p></div><p class = 'col-10 description "+ timeBlockID + "Text' >"+eventDescription+"</p> <button class= 'col-1 saveBtn'><i>+</i></button>");
        }
        //$(".time-block").attr("id", schedArray[i].time)
        // $(".time-block").append("<div class=row'></div>");
        // $("row").append("<div class='hour col-1'></div>");
        // $(".hour").append("<p class='col-10 description'></p>");
        // $(".description").val(schedArray[i].time);
    };
};

writeSchedule();

//allows for description to be edited
$(".time-block").on("click","p",function(){
   //read current text
    var text = $(this).text().trim();

    //stores current classes
    var prevClass = $(this).attr("class");
    // console.log(prevClass);

    //replace p with textarea
    var textInput = $("<textarea>").addClass(prevClass).val(text);
    $(this).replaceWith(textInput);

    //change focus to textarea
    textInput.trigger("focus");
})


//saves description and changes textarea back to p
$(".saveBtn").click(function(){

    //fetches parent div ID for save button clicked
    //ParentID identifies the time associate with the text
    var parentID = $(this).parent().attr('id');
    console.log(parentID);

    //variable for textarea class
    var textInputClass = '.' + parentID +'Text'
    // console.log($(textInputClass).val());

    //stores current classes
    var prevClass = $(textInputClass).attr('class');

    //read current input text
    var inputText = $(textInputClass).val();

    //changes textarea back to <p>
    var updatedP = $("<p>").addClass(prevClass).text(inputText);

    //save text to array
    var indexPos = ""

        //finds time position in array
        for (let i = 0; i < schedArray.length; i++){
            if (schedArray[i].time === parentID){
                console.log("found it!")
                indexPos = i;
            }
        };
    schedArray[indexPos].event = inputText;

    //save array to localstorage
    var schedArrayString = JSON.stringify(schedArray);
    console.log(schedArrayString);
    localStorage.setItem('schedArray',schedArrayString);

    //console.log("hello there")
})