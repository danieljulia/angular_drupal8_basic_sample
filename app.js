
var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.html",

    })
    .when("/libros", {
        templateUrl : "libros.html",
        controller: "LibrosController"
    })
    .when("/libro/:id", {
        templateUrl : "libro.html",
        controller: "LibroController"
    })
    .when("/noticias", {
        templateUrl : "noticias.html",
        controller: "NoticiasController"
    })
    .when("/noticia/{id}", {
        templateUrl : "noticia.html",
        controller: "NoticiaController"
    })

    ;
});

app.filter('rawHtml', ['$sce', function($sce){
  return function(val) {
    return $sce.trustAsHtml(val);
  };
}]);

/** controladores **/

var REST_URL="http://localhost/tests/drupal8/"; //esta ruta hay que asignarla a la raiz de nuestro drupal

app.controller("LibrosController", function($scope,$http) {
  $http.get(REST_URL+"rest_libros")  //aqui también hay que cambiar la ruta de la vista
      .then(function(response) {
          $scope.libros = response.data;
      });
});

//http://localhost/tests/drupal8/node/1?_format=json

app.controller("LibroController", function($scope,$http,$routeParams) {
  $http.get(REST_URL+"node/"+$routeParams.id+"?_format=json")  //aqui también hay que cambiar la ruta de la vista
      .then(function(response) {
          $scope.libro = response.data;
      });


});
