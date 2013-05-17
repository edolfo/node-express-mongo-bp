function loginController($scope, $http) {
    $scope.sentForm = false;
    $scope.message = '';
    $scope.submitForm = function() {
        var submitURL = $scope.action;
        $http.post(submitURL, {
            'email': $scope.email,
            'pass': $scope.pass,
        })
        .success(function(data){
            $scope.sentForm = true;
            $scope.statusCode = data.statusCode;
            $scope.message = data.message;
        });
    };
}