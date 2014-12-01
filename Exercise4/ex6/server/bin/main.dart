// Copyright (c) 2014, Emil Madsen. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

import 'package:JSON_Server/JSON_Server.dart' as JSON_Server;
import 'dart:io';

main()
{
  JSON_Server.Server server = new JSON_Server.Server();
  server.run(InternetAddress.LOOPBACK_IP_V4, 4111);
}
