// Copyright (c) 2014, <your name>. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

import 'dart:html';
import 'dart:convert';
import 'package:route_hierarchical/client.dart';

DivElement galleryContainer = querySelector("#galleryContainer");
UListElement commentsList = querySelector("#comments");
Router router = new Router();

void main() {
  // Webapps need routing to listen for changes to the URL.
  router.root
    ..addRoute(name: 'image', path: '/image', enter: showImage)
    ..addRoute(name: 'gallery', defaultRoute: true, path: '/', enter: showGallery);
  router.listen();
  
  querySelector("#submitComment").onClick.listen(submitComment);
  loadImages();
}

void submitComment(Event event) {
  // Eh post request perhaps?
  var url = "http://localhost:4111/post_comment?imageID=1&comment=LOL";
  HttpRequest.getString(url);
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

void loadImages() {
  var url = "http://localhost:4111/list_images";
  var request = HttpRequest.getString(url).then(onImagesLoaded);
}

void onImagesLoaded(String responseText) {
  galleryContainer.children.clear();
  
  Map<int, String> images = JSON.decode(responseText);
  images.forEach((id, url) {
    ImageElement img = new ImageElement(src: url);
    img.onClick.listen((event) {
      loadImage(id);
    });
    galleryContainer.children.add(img);
  });
}

void loadImage(int id) {
  router.gotoUrl("image");
  commentsList.children.clear();
  var url = "http://localhost:4111/get_comments?imageID=" + id.toString();
  var request = HttpRequest.getString(url).then((responseString) {
    // Assumes list of string, isn't this better than including the image
    // id anyway? It is in the request and is rather redundant
    List<String> comments = JSON.decode(responseString);
    comments.forEach(loadComment);    
  });
}

void loadComment(String comment) {
  LIElement li = new LIElement();
  li.text = comment;
  commentsList.children.add(li);
}
