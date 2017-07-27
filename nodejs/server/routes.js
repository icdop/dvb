(function() {

  'use strict';
  var express = require('express');
  var router = express.Router();
  var fs = require('fs');
  var path = require('path');

  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });

  /* Serve the Tree */
  router.get('/api/tree', function(req, res) {
    var _p;
    if (req.query.id == 1) {
      _p = path.resolve(__dirname, '..', "..", 'project');
      processReq(_p, res);

    } else {
      if (req.query.id) {
        _p = req.query.id;
        processReq(_p, res);
      } else {
        res.json(['No valid data found']);
      }
    }
  });

  /* Serve a Resource */
  router.get('/api/resource', function(req, res) {
    res.send(fs.readFileSync(req.query.resource, 'UTF-8'));
  });

  function processReq(_p, res) {
    var resp = [];
    fs.readdir(_p, function(err, list) {
      for (var i = list.length - 1; i >= 0; i--) {
        if ((list[i] != "-") && (list[i] != ".dvc") && (list[i] != ".svn") && (list[i] != ".git") && (list[i] != ".cvs") ) {
        resp.push(processNode(_p, list[i]));
        }
      }
      res.json(resp);
    });
  }

  function processNode(_p, f) {
    var _pf = path.join(_p, f);
    var s = fs.statSync(_pf);
    var sl = fs.lstatSync(_pf);
  if (sl.isSymbolicLink() == 1) {
    var _lp = fs.readlinkSync(_pf);
    return {
      "id": _pf,
      "text": f+" @",
      "icon" :  s.isDirectory() ? 'jstree-folder' : 'jstree-file',
      "state": {
        "opened": false,
        "disabled": false,
        "selected": false
      },
      "li_attr": {
        "base": _lp,
        "isLink": true,
        "isDVC" : false,
        "isLeaf": !s.isDirectory()
      },
      "children": s.isDirectory()
    };
  } else if (fs.existsSync(path.join(_pf,".dvc/README.md"))) {
    return {
      "id": _pf,
      "text": "["+f+"]",
      "icon" : s.isDirectory() ? 'jstree-custom-folder' : 'jstree-custom-file',
      "state": {
        "opened": true,
        "disabled": false,
        "selected": false
      },
      "li_attr": {
        "base": _pf,
        "isLink": false,
        "isDVC" : true,
        "isLeaf": !s.isDirectory()
      },
      "children": s.isDirectory()
    };
  } else {
    return {
      "id": _pf,
      "text": f,
      "icon" : s.isDirectory() ? 'jstree-folder' : 'jstree-file',
      "state": {
        "opened": false,
        "disabled": false,
        "selected": false
      },
      "li_attr": {
        "base": _pf,
        "isLink": false,
        "isDVC" : false,
        "isLeaf": !s.isDirectory()
      },
      "children": s.isDirectory()
    };
  }
  }

  module.exports = router;

}());
