var app = angular.module("app", []);

app.controller("ctl", function($scope) {

    var questions = [[1, "Question 1"],
                     [2, "Question 2"],
                     [3, "Question 3"]]


    // Initial questionId and text.
    var questionId = 0;
    $scope.question = questions[questionId][1];

    $scope.last = function() {
        questionId = questionId - 1;
        $scope.question = questions[questionId][1];
    }

    $scope.next = function() {
        questionId = questionId + 1;
        $scope.question = questions[questionId][1];
    }
});
