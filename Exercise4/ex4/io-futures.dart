import "dart:io";

String PROPERTIES_PATH = "tmp/local.properties";

void main() {
  incrementVersion();
  print('done');
}

void incrementVersion() {
  File file = new File(PROPERTIES_PATH);
  
  file.exists().then((bool exists) {
    if (!exists) {
      file.create(recursive: true).then((File file) {
        file.writeAsString("version=1");
      })
      .catchError(handleError);
    } else {
      file.readAsString().then((String text) {
        int version = int.parse(text.split("=").last);
        file.writeAsString("version=" + (version+1).toString());
      })
      .catchError(handleError);
    }
  });
}

/**
 * Called if file creation is not recursive, and the tmp folder does not exists.
 */
void handleError(Exception e) {
  print("Woops! $e");
}