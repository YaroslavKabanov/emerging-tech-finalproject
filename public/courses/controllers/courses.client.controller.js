angular.module('courses').controller('CoursesController', [
    '$scope',
    '$routeParams',
    '$location',
    'Authentication',
    'Courses',
    'CourseStudent',
    'Classmates',
    'EnrollingStudent',
    'UpdateRoute',
    'StudentsByCourse',
    'EnrollmentsByStudent',
    function($scope,
        $routeParams,
        $location,
        Authentication,
        Courses,
        CourseStudent,
        Classmates,
        EnrollingStudent,
        UpdateRoute,
        StudentsByCourse,
        EnrollmentsByStudent) {
        $scope.authentication = Authentication;


        $scope.create = function() {
            var course = new Courses({
                courseCode: this.courseCode,
                courseName: this.courseName,
                program: this.program,
                description: this.description
            });

            course.$save(function(response) {
                $location.path('courses/' + response._id);
            }, function(errorResponse) {

                $scope.error = errorResponse.data.message;
            });
        };


        $scope.find = function() {
            $scope.courses = Courses.query();
        };


        $scope.findOne = function() {
            $scope.course = Courses.get({
                courseId: $routeParams.courseId
            });

            //this parameter OMG
            $scope.enrollment = CourseStudent.get({
                enrollmentCourseId: $routeParams.courseId,
            });

            $scope.classmates = Classmates.query({
                enrollmentCourseId: $routeParams.courseId,
            });
        };

        $scope.collectCoursesByStudent = function() {
            $scope.enrollingCourses = CourseStudent.query();
        };




        $scope.getEnrollingStudent = function() {
            $scope.enrollingStudents = EnrollingStudent.query({
                courseObjectId: $routeParams.courseId,
            });

            $scope.Students = StudentsByCourse.query({
                courseId: $routeParams.courseId,
            });


        };



        $scope.updateGrade = function(id) {
            var record;

            for (var i = 0; i < $scope.enrollingStudents.length; i++) {
                if (id === $scope.enrollingStudents[i]._id) {
                    record = $scope.enrollingStudents[i];
                }
            }

            $id = record._id;
            UpdateRoute.update({ recordID: $id }, record, function(response) {
                if (response) {
                    alert("Successfully Saved !!!");
                }
                else {
                    alert("Error, Your Data May not be saved !!!");
                }
            });
        };


        $scope.enroll = function() {
            var enrollment = new CourseStudent({
                course: $routeParams.courseId,
                student: Authentication.user._id,
            });

            enrollment.$save(function(response) {
                location.reload();
                $location.path('courses/' + response.course);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };

        $scope.drop = function(enrollment) {

            $scope.enrollment.$remove({
                enrollmentCourseId: $routeParams.courseId,
            });

        };





        $scope.update = function() {
            $scope.course.$update(function() {
                $location.path('courses/' + $scope.course._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };



        $scope.delete = function(course) {
            if (course) {
                course.$remove(function() {
                    for (var i in $scope.courses) {
                        if ($scope.courses[i] === course) {
                            $scope.courses.splice(i, 1);
                        }
                    }
                });
            } else {
                $scope.course.$remove(function() {
                    $location.path('courses');
                });
            }
        };


        $scope.getTranscriptJSON = function() {
            $scope.transcriptCourses = CourseStudent.query();

            $scope.grades = EnrollmentsByStudent.query({
                studentObjectId: $scope.authentication.user.id,
            });


        };
        
        $scope.date = new Date();
    }
]);


