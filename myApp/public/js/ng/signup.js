function signupController($scope, $http) {
    $scope.sentForm = false;
    $scope.message = '';
    $scope.submitForm = function() {
        var submitURL = $scope.action;
        $http.post(submitURL, {
            'email': $scope.email,
            'pass1': $scope.pass1,
            'pass2': $scope.pass2
        })
        .success(function(data){
            $scope.sentForm = true;
            $scope.statusCode = data.statusCode;
            $scope.message = data.message;
        });
    };
}