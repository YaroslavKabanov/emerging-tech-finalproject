angular.module('experiences').controller('ExperiencesController', ['$scope',
    '$routeParams', '$location', 'Authentication', 'Experiences', 'ExperiencesByUser',
    function($scope, $routeParams, $location, Authentication, Experiences, ExperiencesByUser) {
        $scope.authentication = Authentication;
        $scope.create = function() {
            var experience = new Experiences({
                companyName: this.companyName,
                city: this.city,
                country: this.country,
                startDate: this.startDate,
                endDate: this.endDate,
                position: this.position,
                details: this.details
            });

            experience.$save(function(response) {
                $location.path('experiences/' + response._id);
                //reload page to get the new value
                location.reload();
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });


        };

        $scope.findAll = function() {
            $scope.experiences = Experiences.query();
        };

        $scope.findAllFromUser = function() {
            if (Authentication.user !== null) {
                $scope.experiences = ExperiencesByUser.query({
                    Id: Authentication.user._id
                });
                //console.log(Authentication.user._id);
            } else {
                $scope.experiences = {};

            }


        };

        $scope.findOne = function() {

            $scope.experience = Experiences.get({
                experienceId: $routeParams.experienceId
            });
        };

        $scope.update = function() {
            $scope.experience.$update(function() {
                $location.path('experiences/' + $scope.experience._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.delete = function(experience) {
            if (confirm("Are you sure that you want to delete this ? \nRecord will be deleted permanently")) {
                
                if (experience) {
                    experience.$remove(function() {
                        for (var i in $scope.experiences) {
                            if ($scope.experiences[i] === experience) {
                                $scope.experiences.splice(i, 1);
                            }
                        }
                    });
                } else {
                    $scope.experience.$remove(function() {
                        $location.path('experiences/');
                    });
                }
            }

        };


    }
]);