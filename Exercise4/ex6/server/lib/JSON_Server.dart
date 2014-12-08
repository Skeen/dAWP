// Copyright (c) 2014, Emil Madsen. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

/// The JSON_Server library.
library JSON_Server;

import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:core';

class Server
{ 
  static List<String> listImages()
  {
    List<String> images = new List<String>();
    var imageDir = new Directory('../images');
    if(imageDir.existsSync())
    {
      imageDir.listSync().forEach((FileSystemEntity entity)
      {
        images.add(entity.path);
      });
    }
    else
    { 
      print("No such directory" + imageDir);
    }
    return images;
  }
  
  static Map<String, List<String>> mapImages()
  {
    List<String> images = listImages();
    Map<String, dynamic> imageMap = new Map();
    for(int x=0; x<images.length; x++)
    {
      String image = images.elementAt(x);
      imageMap[x.toString()] = image;
    }
    return imageMap;
  }
  
  Map<String, List<String>> images = mapImages();
  Map<String, List<String>> comments = new Map<String, List<String>>();
  
  void handler(dynamic address, int port)
  {
      (HttpServer.bind(address, port)).then((_server)
          => _server.listen((HttpRequest request) 
      {
        HttpResponse response = request.response;
        response.headers.add("Access-Control-Allow-Origin", "*");
        response.headers.add("Access-Control-Allow-Methods", "POST,GET,DELETE,PUT,OPTIONS");
        if(request.uri.path == '/list_images')
        {
          response.write(JSON.encode(images));
        }
        else if(request.uri.path.startsWith('/get_comments'))
        {
          Map<String,String> query = request.uri.queryParameters;
          // Which image are we looking for comments for
          String imageID = query['imageID'];
          // Check that we've got an imageID
          if(imageID == null)
          {
            // Report error
            Map<String, dynamic> mapData = new Map();
            mapData['error'] = "No imageID passed";
            response.write(JSON.encode(mapData));
          }
          // Check if the imageID is indeed valid
          else if(images.containsKey(imageID) == false)
          {
            // Report error
            Map<String, dynamic> mapData = new Map();
            mapData['error'] = "Invalid imageID!";
            response.write(JSON.encode(mapData));
          }
          // Check if we have comments for that
          else if(comments.containsKey(imageID))
          {
            // Let's fetch the list of comments
            List<String> image_comments = comments[imageID];
            // Prepare an answer
            Map<String, dynamic> mapData = new Map();
            mapData['imageID'] = imageID;
            mapData['comments'] = image_comments;
            response.write(JSON.encode(mapData));
          }
          else // No comments for that ID
          {
            Map<String, dynamic> mapData = new Map();
            mapData['imageID'] = imageID;
            mapData['comments'] = new List<String>();
            response.write(JSON.encode(mapData));
          }
        }
        else if(request.uri.path.startsWith('/post_comment'))
        {
          Map<String,String> query = request.uri.queryParameters;
          // Which image are we posting a comments for
          String imageID = query['imageID'];
          if(imageID == null)
          {
            // Report error
            Map<String, dynamic> mapData = new Map();
            mapData['error'] = "No imageID passed";
            response.write(JSON.encode(mapData));
          }
          // Check if the imageID is indeed valid
          else if(images.containsKey(imageID) == false)
          {
            // Report error
            Map<String, dynamic> mapData = new Map();
            mapData['error'] = "Invalid imageID!";
            response.write(JSON.encode(mapData));
          }
          
          String comment = query['comment'];
          if(comment == null)
          {
            // Report error
            Map<String, dynamic> mapData = new Map();
            mapData['error'] = "No comment passed";
            response.write(JSON.encode(mapData));
          }
          
          List<String> image_comments = comments[imageID];
          if(image_comments == null)
          {
            image_comments = new List<String>();
          }
          image_comments.add(comment);
          comments[imageID] = image_comments;
        }
        
        response.close();
      }));
    }
  
  void run(dynamic address, int port)
  {
    handler(address, port);
  }
}

