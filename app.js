// Define application.
var app = angular.module("app", []);

// Define the controller of the application.
app.controller("QuestionsController", function($scope) {

    /* --------------------------------------------------------- */
    /* Initialization.                                           */
    /* --------------------------------------------------------- */
    /* Note: The sequence of 'questions' and the sequence of
    *        'questionsTypes' is critically important. They
    *        have to be in agreement for the calculation to
    *        correctly work.                                     
    /* --------------------------------------------------------- */
    var question01 = "I'm rich, famous and powerful... (in my daydreams).";
    var question02 = "I engage very fast into relations and show affection rapidly.";
    var question03 = "I usually leave the big decisions to the important people in my life.";
    var question04 = "I love home office.";
    var question05 = "An interesting book or a video game is often better than a social event.";
    var question06 = "I get involved fast at a new workplace.";
    var questions      = [question01, question02, question03, question04,
                          question05, question06]
    var questionsTypes = ["Drama-Queen", "Initiative", "Narcisstic",
                          "Drama-Queen", "Initiative", "Narcisstic"];
    var classes        = ["Initiative",  "Drama-Queen", "Narcisstic"];

    // Initial values.
    var answers        = ["Maybe", "Maybe", "Maybe",
                          "Maybe", "Maybe", "Maybe"];

    // "Class A", "Class B", "Class C"
    //var summaryByClass = [0, 0, 0];
    var summaryByClass = [];

    // Initial questionId, text and answers.
    var questionId         = 0;
    $scope.question        = questions[questionId];
    $scope.questionCounter = (questionId+1)+"/"+questions.length;
    $scope.answer          = answers[questionId];
    summarizeByClass();

    // Hide 'results' initially.
    // var showResults = true;
    // document.getElementById("resultsDraw").style.display = "block";

    var svg = d3.select("#resultsDraw").append("svg")
              .attr("height", "100%")
              .attr("width",  "100%");

    console.log("Initialization: ");
    draw(summaryByClass);
    /* --------------------------------------------------------- */


    /* ----------------------------------------------------------*/
    /*  Visualization.                                           */
    /* ----------------------------------------------------------*/
    /* Search for array of rectangles,
    *  'selectAll' for array,
    *  'enter().append' to append rectangles,
    *  'attr' add attributes for rectangles.
    *  
    *  'x': distance from left side of browser in px
    *  'y': Distance from top of browser
    *  'height': Height of the rectangle
    * 
    *  d: datapoint
    *  i: index
    *  To reposition the rectangles, we’ll modify
    *  the y attribute to subtract the space on top. 
    *
    *  NOTE:
    *  The minimal value of 'width' is '+10' to provide visual
    *  cue also when computed value is zero.                     */
    /* ----------------------------------------------------------*/
    function draw(values) {
        console.log(values);

        // Remove 'rect' from previous 'draw' call.
        d3.selectAll("rect").remove();

        svg.selectAll("rect")
        .data(values).enter().append("rect")
        .attr("height", function(d, i) {return 10})
        .attr("width", function(d, i) {return d*25+10})
        .attr("x", function(d, i) {return 0})
        .attr("y", function(d, i) {return (i*25)+20})
        .attr("fill", "#00A5FB");
    }
    /* ----------------------------------------------------------*/


    /* ----------------------------------------------------------*/
    /* Mechanics.                                                */
    /* ----------------------------------------------------------*/
    $scope.getResults = function() {
        // console.log(answers);
        summarizeByClass();
        console.log("getResults: ");
        console.log(summaryByClass);
        draw(summaryByClass);

        // Toggle 'results' and 'questions' display.
        // Show results.
        // if(showResults==false) {
        //     document.getElementById("main").style.display = "none";
        //     document.getElementById("resultsDraw").style.display = "block";
        //     showResults = true;

        // // Show questions.
        // } else {
        //     document.getElementById("main").style.display = "block";
        //     document.getElementById("resultsDraw").style.display = "none";
        //     showResults = false;
        // } 
    }

    function summarizeByClass() {
        summaryByClass = [0, 0, 0];
        console.log("summarizeByClass: ", summaryByClass);

        for(var i=0; i<classes.length; i++) {
            indecesOfClass = getIndecesOfClass(i);

            for(var j=0; j<indecesOfClass.length; j++) {
                if(answers[indecesOfClass[j]] == "No") {
                    summaryByClass[i] += 0;
                }
                if(answers[indecesOfClass[j]] == "Yes") {
                    summaryByClass[i] += 2
                }
                if(answers[indecesOfClass[j]] == "Maybe") {
                summaryByClass[i] += 1;
                }
            }
        }
        $scope.results = classes[0] + ": " + summaryByClass[0] + ", " + 
                         classes[1] + ": " + summaryByClass[1] + ", " +
                         classes[2] + ": " + summaryByClass[2];
    }

    function getIndecesOfClass(i) {
        var indecesOfClass = [];
        for(var j=0; j<questionsTypes.length; j++) {
            if(classes[i]==questionsTypes[j]) {
                indecesOfClass.push(j);
            }
        }
        return indecesOfClass;
    }
    /* ----------------------------------------------------------*/


    /* ----------------------------------------------------------*/
    /*  Slide window, side effect depends on trigger event.      */
    /* ----------------------------------------------------------*/
    $scope.step = function(event) {
        var idOfEvent = event.target.id;
        if(idOfEvent == "last" ) {    stepBack();          }
        if(idOfEvent == "next" ) { stepForward("Current"); }
        if(idOfEvent == "no"   ) { stepForward("No"     ); }
        if(idOfEvent == "maybe") { stepForward("Maybe"  ); }
        if(idOfEvent == "yes"  ) { stepForward("Yes"    ); }
    }

    function stepForward(inp) {
        if(inp=="Current") { answers[questionId] = answers[questionId]; }
        if(inp=="Maybe")   { answers[questionId] =             "Maybe"; }
        if(inp=="Yes")     { answers[questionId] =               "Yes"; }
        if(inp=="No")      { answers[questionId] =                "No"; }
        makeForwardStep();
        slideToNextQuestion(questionId);
    }

    function makeForwardStep() {
        if(questionId < questions.length-1) {
            questionId = questionId + 1;
        } else { console.log("Last question."); }
    }

    function stepBack() {
        if(questionId > 0) {
            questionId = questionId - 1;
        } else { console.log("First question."); }
        slideToNextQuestion(questionId);
    }

    function slideToNextQuestion(id) {
        var questionString = (id+1) + "/" + questions.length;
        $scope.questionCounter = questionString;
        $scope.question        = questions[questionId];
        $scope.answer          = answers[questionId];
    }

    /* Deprecated. 
    * function summarizeAnswers() {
    *     // Reset required to prevent cumulation of values.
    *     summary = [0, 0, 0];
    *     for(var i=0; i<answers.length; i++) {
    *         if(answers[i]=="No")    { summary[0] += 1 }
    *         if(answers[i]=="Yes")   { summary[1] += 1 }
    *         if(answers[i]=="Maybe") { summary[2] += 1 }
    *      } 
    *      console.log(summary);
    * } */
    /* ----------------------------------------------------------*/


    /* ----------------------------------------------------------*/
    /* To do / Clearify / Improvements                           */
    /* ----------------------------------------------------------*/
    /*
    *  To do:
    *  - Count of answers per category
    *  - Slide transition between questions (CSS or JS animations?)
    *  - UX response for first / last question, like fade out
    *    buttons or start at question 1 again
    *  - Slim out controller
    *  - Questions and questionsTypes data structure (e.g. csv):
    *        Question,        Type
    *        -------------------------------
    *        Question_Text_1, questionType_1
    *        Question_Text_2, questionType_2
    *        ...
    *
    *  Clearify:
    *  - Can the test be finished without answering every question?
    *
    *  UX:
    *  - Should a zero value be visualized?
    *  - Initial values of questions 'Maybe' or 'None'?
    *  - How to handle early finish of test? Give results, save, ..?
    *
    *  Improvements:
    *  - Use 'display' or 'visibility' and a list for the questions
    *  - Export toggling of questions and results display out from
    *    the results calculation 'getResults'
    *  - Top and low row of buttons within a div.
    *  - Answers as radio buttons?
    *  - Minimal visual value is '+10', should minimal computed value
    *    be '+10' instead?
    */
    /* ----------------------------------------------------------*/
});

