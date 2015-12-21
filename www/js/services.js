angular.module('starter.services', ['ngCookies'])
  .factory('Auth', function ($cookieStore) {
    var _user = $cookieStore.get('starter.user');
    var setUser = function (user) {
      _user = user;
      $cookieStore.put('starter.user', _user);
    }

    return {
      setUser: setUser,
      isLoggedIn: function () {
        return _user ? true : false;
      },
      getUser: function () {
        return _user;
      },
      logout: function () {
        $cookieStore.remove('starter.user');
        _user = null;
      }
    }
  })
  .factory('Temp', function ($cookieStore) {
    var _temp = $cookieStore.get('starter.temp');
    var setTemp = function (temp) {
      _temp = temp;
      $cookieStore.put('starter.temp', temp);
    }

    return {
      setTemp: setTemp,
      getTemp: function () {
        return _temp;
      },
      removeTemp: function () {
        $cookieStore.remove('starter.temp');
        _temp = null;
      }
    }
  })
  .factory('Location', function($http) {
    return {
      getProv: function() {
        return $http.get('http://yusufeka.me/siempuk/provinsi.php').success(function(data) {
          return data;
        }).error(function(err) {
          return err;
        });
      },
      getKab: function (ProvID){
        return $http.post('http://yusufeka.me/siempuk/kab.php',{'prov' : ProvID})
          .success(function(data) {
            return data;
          }).error(function(err) {
            console.log(err);
            return err;
          });
      },
    };
  })
  .factory('Jenis', function($http) {
    return {
      getAll: function() {
        return $http.get('http://yusufeka.me/siempuk/jenis.php').success(function(data) {
          return data;
        }).error(function(err) {
          return err;
        });
      },
    };
  })

  .factory('Jadwal', function($http) {
    return {
      getAll: function(lahan) {
        return $http.post('http://yusufeka.me/siempuk/jadwal.php',{'lahanID': lahan}).success(function(data) {
          return data;
        }).error(function(err) {
          return err;
        });
      },
    };
  })
  .factory('Lahan', function($http,$q,Auth) {
    return {
      getAll: function() {
        var user = Auth.getUser();
        return $http.post('http://yusufeka.me/siempuk/lahan.php',{'UserID': user.user.id}).success(function(data) {
          console.log(data);
          return data;
        }).error(function(err) {
          console.log(err)
          return err;
        });
      },
      tambah: function (nama,luas){
        var deferred = $q.defer();
        var promise = deferred.promise;
        var link = 'http://yusufeka.me/siempuk/addLahan.php';
        var user = Auth.getUser();
        $http.post(link, {'nama' : nama,'luas' : luas,'UserID': user.user.id}).then(function (res){
          console.log(res.data);
          if (res.data == 'ok') {
            deferred.resolve('Success');
          } else {
            deferred.reject('Wrong credentials.');
          }
        });
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      },
    };
  })

  .factory('UserInfo', function($http) {
    return {
      getUser: function(email) {
        return $http.post('http://yusufeka.me/siempuk/user.php',{'email' : email})
        .success(function (data) {
          return data;
        }).error(function (err) {
            console.log('asaca');
          return err;
        });
      }
    }
  })

  .service('RegisterService', function($q,$http) {
    return {
      registerUser: function(name, email,pw,kab) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var link = 'http://yusufeka.me/siempuk/register.php';


        $http.post(link, {'name' : name,'email' : email,'password' : pw,'kab': kab}).then(function (res){
          console.log(res.data);
          if (res.data == 'ok') {
            deferred.resolve('Success');
          } else {
            deferred.reject('Wrong credentials.');
          }
        });
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      }
    }
  })

  .service('ConfirmService', function($q,$http) {
    return {
      confirmUser: function(email,code) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var link = 'http://yusufeka.me/siempuk/confirm.php';

        $http.post(link, {'email' : email,'code' : code}).then(function (res){
          console.log(res.data);
          if (res.data == 'ok') {
            deferred.resolve('Success');
          } else {
            deferred.reject('Wrong credentials.');
          }
        });
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      }
    }
  })

  .service('TanamService', function($q,$http) {
    return {
      penanaman: function(lahan, pohon,jenis) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var link = 'http://yusufeka.me/siempuk/penanaman.php';


        $http.post(link, {'lahan' : lahan,'pohon' : pohon,'jenis' : jenis}).then(function (res){
          console.log(res.data);
          if (res.data == 'ok') {
            deferred.resolve('Success');
          } else {
            deferred.reject('Wrong credentials.');
          }
        });
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      }
    }
  })
