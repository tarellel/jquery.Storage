/*
 * jquery.Storage
 * A jQuery plugin to make localStorage easy and managable to use
 *
 * Copyright (c) Brandon Hicks (Tarellel)
 *
 * Version: 1.0.0a (12/6/10)
 * Requires: jQuery 1.4
 *
 *
 */


/* Inspiration
  http://openbit.co.uk/?p=105
  https://hacks.mozilla.org/2009/06/localstorage/
  - http://jackbliss.co.uk/projects/localstorage/min.jquery.saveit.js
  - http://jackbliss.co.uk/projects/localstorage/jquery.localstorage.js
  - http://www.stoimen.com/blog/2010/02/26/jquery-localstorage-plugin-alpha/
  - http://paperkilledrock.com/2010/05/html5-localstorage-part-one/
  - http://geojoy.claimsoluciones.com/js/geoJoy.js
  - https://sites.google.com/site/daveschindler/jquery-html5-storage-plugin
  - https://code.google.com/p/jquery-jstore/
  - http://developer.yahoo.com/yui/storage/
  - http://sankhomallik.com/blog/2010/06/16/ustore-js-cross-browser-local-and-session-storage/
    > https://github.com/hugeinc/USTORE.js/raw/master/USTORE.js
    > https://github.com/hugeinc/USTORE.js/
  - http://rethink.unspace.ca/2010/5/10/the-state-of-html5-local-data-storage

  - localStorage w/ cookie fallback
    > https://github.com/AndrewLowther/localStore

  // fallsbacks using gears/session/local storage
  https://code.google.com/p/realstorage/source/browse/realStorage.js


  - Uses various storage engines
    > http://medialize.github.com/jQuery-store/

    > local/cookie
      http://www.html5rocks.com/tutorials/speed/quick/#toc-webstorage

    > local/session
     https://github.com/AndrewLowther/StorageItem

    jquery.cookie info
      http://stackoverflow.com/questions/95213/can-jquery-read-write-cookies-to-a-browser
      https://github.com/carhartl/jquery-cookie
      **** http://jquery-howto.blogspot.com/2010/09/jquery-cookies-getsetdelete-plugin.html
      http://lab.distilldesign.com/json-cookie/
      http://stackoverflow.com/questions/595228/how-can-i-delete-all-cookies-with-javascript


  JSON:
    http://www.json.org/json2.js
    http://json.org/
    http://jsperf.com/json-parsing/12
    https://github.com/douglascrockford/JSON-js

  --- copyright
  - https://github.com/mstegmann/jquery.paginate/blob/master/js/jquery.paginate-1.0.0.js
*/
(function(jQuery) {
  // validate if the visiting browser supports localStorage
  var supported = true;
  var keyMeta = 'ls_';

  //var localStorage === window.localStorage
  if (typeof localStorage == 'undefined' || typeof JSON == 'undefined'){
      supported = false;
  }

  // errors produced by localStorage
  this.storageError = function(error){
    switch(error){
      // current browser/device is not supported
      case 'SUPPORTED':
        alert("Your browser does not support localStorage!");
        break;

      // browsers database quota is full
      case 'QUOTA':
        alert("Your storage quota is currently full!");
        console.log("Browser database quote exceeded.");
        break;

      // Any other error that may have occurred
      default:
        alert('An unknown error has occurred!');
        break;
    }
    return true;
  };

  // saves specified item using ("key","value")
  this.saveItem = function(itemKey, itemValue, lifetime){
    if (typeof lifetime == 'undefined'){
       lifetime = 60000;
    }

    if (!supported){
      // set future expiration for cookie
      dt = new Date();
      // 1 = 1day can use days variable
      //dt.setTime(dt.getTime() + (1*24*60*60*1000));
      dt.setTime(dt.getTime() + lifetime);
      expires = "expires= " + dt.toGMTString();

      document.cookie = keyMeta + itemKey + "=" + itemValue + "; " + expires + "; path=/";
      return true;
    }

    // set specified item
    try{
      localStorage.setItem(keyMeta+itemKey, JSON.stringify(itemValue));
    } catch (e){
      // if the browsers database is full produce error
      if (e == QUOTA_EXCEEDED_ERR) {
        this.storageError('QUOTA');
        return false;
      }
    }
    return true;
  };

  // load value of a specified database item
  this.loadItem = function(itemKey){
    if(itemKey===null){ return null; }
    if (!supported){
      var cooKey = keyMeta + itemKey + "=";
      // go through cookies looking for one that matchs the specified key
      var cookArr = document.cookie.split(';');
      for(var i=0, cookCount = cookArr; i < cookCount; i++){
        var current_cookie = cookArr[i];
        while(current_cookie.charAt(0) == ''){
          current_cookie = current_cookie.substring(1, current_cookie.length);
          // if keys match return cookie
          if (current_cookie.indexOf(cooKey) == 0) {
            return current_cookie.substring(cooKey.length, current_cookie.length);
          }
        }
      }
      return null;
    }

    var data = localStorage.getItem(keyMeta+itemKey);
    if (data){
      return JSON.parse(data);
    }else{
      return false;
    }
  };

  // removes specified item
  this.deleteItem = function (itemKey){
    if (!supported){
      document.cookie = keyMeta + itemKey + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      return true;
    }

    localStorage.removeItem(keyMeta+itemKey);
    return true;
  };

  // WARNING!!! this clears entire localStorage Database
  this.deleteAll = function(){
    if (!supported){
      // process each and every cookie through a delete funtion
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++){
        this.deleteItem(cookies[i].split("=")[0]);
      }
      return true;
    }

    localStorage.clear();
    return true;
  };

  // jquery namespace for the function set
  jQuery.Storage = this;
})(jQuery);

