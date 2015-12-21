angular.module('starter.controllers', [])
  .controller('LoginCtrl', function($scope, $ionicPopup, $state,$http,Auth,Temp,UserInfo) {
    $scope.test = Auth.isLoggedIn();

      $scope.data = {};
      $scope.login = function() {
        var link = 'http://yusufeka.me/siempuk/login.php';
        $http.post(link, {'username' : $scope.data.email,'password' : $scope.data.password}).then(function (res){
          console.log(res.data);

          if (res.data == 'ok') {
            UserInfo.getUser($scope.data.email).success(function (data) {
              Auth.setUser({
                user: data
              });
              $scope.$emit('todo:userChanged');
              $state.go('app.home');
            });
          } else if (res.data == 'confirm'){
            Temp.setTemp({
              email: $scope.data.email
            });
            $state.go('confirm');
          }
        });
      };
      $scope.toRegister = function(){
        $state.go('register');
      };


  })

  .controller('ConfirmCtrl', function($scope,$state,Temp,ConfirmService,Auth){
    $scope.user = Temp.getTemp();
    $scope.data = {};
    $scope.confirm = function() {
      console.log("test log");
      ConfirmService.confirmUser($scope.user.email, $scope.data.code).success(function() {
        Auth.setUser({
          email: $scope.user.email
        });
        Temp.removeTemp();
        $scope.$emit('todo:userChanged');
        $state.go('app.home');
      }).error(function() {
        $ionicPopup.alert({
          title: 'Confirm fail!',
          template: 'Cek ulang email!'
        });
      });
    };
  })

  .controller('AkunCtrl', function($scope,$state,Auth){
    $scope.logout = function() {
      Auth.logout();
      $state.go('login');
    }
  })

  .controller('HomeCtrl', function($rootScope,$scope,$state,Auth){
    if (!Auth.isLoggedIn()) {
        $state.go('login');
    }
    $rootScope.$on('todo:userChanged', function() {
      console.log('kerefresh');
      $scope.showUser();
      console.log($scope.user)
    });
    $scope.showUser = function(){
      $scope.user = Auth.getUser();
    }
    $scope.showUser();
  })

  .controller('TambahCtrl', function($scope,Lahan,$state){

    $scope.data = {};
    $scope.tambahLahan = function(){
      Lahan.tambah($scope.data.nama,$scope.data.luas).success(function() {
        $scope.$emit('todo:lahanChanged');
        $state.go('app.lahan');
      }).error(function() {
        $ionicPopup.alert({
          title: 'tambah gaga gagal!',
          template: 'Silakan cek isian form!'
        });
      });
    };
  })

  .controller('LahanCtrl', function($rootScope,$scope, Lahan) {
    $rootScope.$on('todo:lahanChanged', function() {
      $scope.showLahan();
    });
    $scope.showLahan = function(){
      Lahan.getAll().success(function (data) {
        $scope.lahans = data;
      });
    };
    $scope.showLahan();
  })

  .controller('PenanamanCtrl', function ($scope,$state,$stateParams,$ionicPopup,Lahan,Jenis,TanamService) {
    console.log('bangke');
    Jenis.getAll().success(function(data) {
      $scope.jenis = data;
    });
    $scope.data = {};
    Lahan.getAll().success(function (data) {
      $scope.tanam = function () {
        TanamService.penanaman(data[$stateParams.index].LahanID, $scope.data.jum, $scope.data.jenis).success(function (data) {
          $state.go('app.lahan');
        }).error(function () {
          $ionicPopup.alert({
            title: 'gagal!',
            template: 'Silakan isian form!'
          });
        });
      };
    });
    console.log($stateParams);
  })

  .controller('DetailCtrl',function($scope, $state,$stateParams,Lahan,Jadwal){
    console.log($stateParams);
    Lahan.getAll().success(function (data) {
      $scope.lahan = data[$stateParams.index];
      console.log($scope.lahan);
      if($scope.lahan.jumlah == 0){
        console.log('asuasuasuasu');
        $state.go('app.penanaman',{index: $stateParams.index});
      }else{
        $scope.showData($scope.lahan.LahanID);
      }
    });
    $scope.showData = function(LahanID) {
      Jadwal.getAll(LahanID).success(function (data) {
        $scope.jadwals = data;
      });
    };
  })

  .controller('RegisterCtrl', function($scope, Location,RegisterService, $ionicPopup, $state) {
    $scope.showData = function() {
      Location.getProv().success(function(data) {
        $scope.prov = data;
      });
    };
    $scope.updateKab = function() {
      Location.getKab($scope.data.prov).success(function(data) {
        $scope.kab = data;
      });
    };
    $scope.showData();
    $scope.data = {};
    $scope.register = function() {
      RegisterService.registerUser($scope.data.name,$scope.data.email, $scope.data.password,$scope.data.kab).success(function(data) {
        $state.go('login');
      }).error(function() {
        $ionicPopup.alert({
          title: 'Register gagal!',
          template: 'Silakan isian form!'
        });
      });
    };
    $scope.toLogin = function(){
      $state.go('login');
    };
  })
;
