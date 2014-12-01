// Copyright (c) 2014, <your name>. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

import 'dart:html';
import 'package:route_hierarchical/client.dart';

void main() {
  // Webapps need routing to listen for changes to the URL.
  var router = new Router();
  router.root
    ..addRoute(name: 'image', path: '/image', enter: showImage)
    ..addRoute(name: 'gallery', defaultRoute: true, path: '/', enter: showGallery);
  router.listen();
}

void showImage(RouteEvent e) {
  // Extremely simple and non-scalable way to show different views.
  querySelector('#gallery').style.display = 'none';
  querySelector('#image').style.display = '';
}

void showGallery(RouteEvent e) {
  querySelector('#gallery').style.display = '';
  querySelector('#image').style.display = 'none';
}
