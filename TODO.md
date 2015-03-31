## TODO
* Fix null return error when trying to load from cookie
* Fallbacks
  ** Use something similar to "Gallery Storage Lite (Yahoo - Gallery Storage Lite)":http://www.yuiblog.com/blog/2010/02/23/gallery-storage-lite/ for fallbacks
  *** localStorage - Firefox 3.5+, Chrome 4+, Safari 4+, IE8, Opera 10.5+
  *** globalStorage - Firefox 2.x and 3.0.x
  *** sessionStorage - n/a
  *** databaseStorage,  - Safari 3.1 and 3.2
  *** userData persistence - IE6, IE7
  *** Consider using SWFstore to store flash cookies as well
* Output to console.log("Error Message") when an error is produced