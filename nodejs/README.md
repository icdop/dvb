#
% make


# Initialization 
1) install nodejs/npm
   * CentOS
     % rpm install nodejs 
   * Ubuntu
     % apt-get install nodejs
   * OpenSuse
     % zypeer install nodejs

2) install server side package: jquery jstree angular
   % npm install jquery
   % npm install jstree
   % npm install angular

3) install client side package bower
   % npm install bower
   % edit .bowerrc
	{
	"directory": "client/libs",
	"interactive" : false
	}
   % bower init # edit bower.jason
   % bower install angular bootstrap jquery jstree-directive
   % copy jstree to client/

#Customization

* server/route.js
  * change default home path
  * change icon assocated to different file type
    * file icon must be specified in client/css/app.css

#API- http://localhost:3000/
* api/tree?id=1
  return default path json data
* api/tree?id=<path>
  return associate path json data

* api/resource?resource=<file>
  return the text file content



