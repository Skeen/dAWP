import "dart:async";
import "dart:io";

String PROPERTIES_PATH = "tmp/local.properties";

void main() {
  incrementVersion();
  print('done');
}

Future<File> incrementVersion() async {
  File file = new File(PROPERTIES_PATH);
  
  if(!(await file.exists())) {
      try {
        (await file.create(recursive: true)).writeAsString("version=1");
      } catch(exception, stackTrace) {
        handleError(exception);
      }
  } else {
      try {
        int version = int.parse((await file.readAsString()).split("=").last);
        file.writeAsString("version=" + (version+1).toString());
      } catch(exception, stackTrace) {
        handleError(exception);
      }
  }
  return file;
}

/**
 * Called if file creation is not recursive, and the tmp folder does not exists.
 */
void handleError(Exception e) {
  print("Woops! $e");
}