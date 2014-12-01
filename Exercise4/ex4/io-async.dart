import "dart:async";
import "dart:io";

String PROPERTIES_PATH = "tmp/local.properties";

void main() {
  incrementVersion();
  print('done');
}

void incrementVersion() {
  File file = new File(PROPERTIES_PATH);
  
  Future<bool> exists = file.exists();
  exists.then((bool exists)
  {
    if (!exists)
    {
      Future<File> new_file = file.create(recursive: true);
      new_file.then((File file) {
        file.writeAsString("version=1");
      })
      .catchError(handleError);
    }
    else
    {
      Future<String> finishedReading = file.readAsString();
      finishedReading.then((String text) {
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