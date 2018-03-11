var app = angular.module("app", []);

app.controller("ctl", function($scope) {

    var questions = [[1, "Question 1"],
                     [2, "Question 2"],
                     [3, "Question 3"]]

    // Initial questionId and text.
    var questionId = 0;
    $scope.question = questions[questionId][1];
    $scope.questionCounter = (questionId+1)+"/"+questions.length;

    $scope.last = function() {
        if(questionId > 0) {
            questionId = questionId - 1;
            $scope.question = questions[questionId][1];
        } else {
            console.log("First question.");
        }
        updateQuestionCounter(questionId);
    }

    $scope.next = function() {
        if(questionId < questions.length-1) {
            questionId = questionId + 1;
            $scope.question = questions[questionId][1];
        } else {
            console.log("Last question.");
        }
        updateQuestionCounter(questionId);
    }

    function updateQuestionCounter(id) {
        var questionString = (id+1) + "/" + questions.length;
        $scope.questionCounter = questionString;
        //console.log(id);
    }
});
