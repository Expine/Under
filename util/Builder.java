import java.io.*;
import java.util.*;

public class Builder {
    private static int fileCount = 0;
    private static ArrayList<File> files = new ArrayList<File>();
    private static ArrayList<String> includedClass = new ArrayList<String>();
    private static ArrayList<File> remainFiles = new ArrayList<File>();
    private static ArrayList<String> excludeDirectories = new ArrayList<String>();
    public static void main(String[] args) {
        if(args.length < 3)
            return;
        int counter = args.length;
        for(int i = 3; i < args.length; ++i)
            if(args[i].equals("-ex"))
                counter = i;
        for(int i = counter + 1; i < args.length; ++i)
            excludeDirectories.add(args[i]);
        for(int i = 2; i < counter; ++i)
            searchFile(new File(args[i]));
        try {
            BufferedWriter bw = new BufferedWriter(new FileWriter(new File(args[1])));
            for(int i = 0; i < 100000; ++i) {
                if(files.size() == 0)
                    break;
                File file = files.get(0);
                files.remove(0);
                if(isCanInclude(file)) {
                    if(isMainClass(file)) {
                        remainFiles.add(file);
                        continue;
                    }
                    addIncludedClass(file);
                    if(args[0].equals("Append")) {
                        BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(file)));
                        String line = "";
                        while((line = br.readLine()) != null) {
                            bw.write(line);
                            bw.newLine();
                        }
                    } else if(args[0].equals("Document") ) {
                        String name = file.getPath().replace("..\\", "").replace("\\", "/");
                        bw.write("{let script = document.createElement('script');script.src='" + name + "';document.head.appendChild(script);script.onload = function() ");
                        fileCount++;
                    }
                } else {
                    files.add(file);
                }
            }
            for(File file : remainFiles) {
                if(args[0].equals("Append")) {
                    BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(file)));
                    String line = "";
                    while((line = br.readLine()) != null) {
                        bw.write(line);
                        bw.newLine();
                    }
                } else if(args[0].equals("Document") ) {
                    String name = file.getPath().replace("..\\", "").replace("\\", "/");
                    bw.write("{let script = document.createElement('script');script.src='" + name + "';document.head.appendChild(script);script.onload = function() ");
                    fileCount++;
                }
            }
            if(args[0].equals("Document") ) {
                bw.write("{};");
                for(int i = 0; i < fileCount; ++i)
                    bw.write("};");
                bw.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void addIncludedClass(File file) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(file)));
        String line = "";
        while((line = br.readLine()) != null) {
            if(line.contains("class ") && line.indexOf("*") == -1) {
                String[] words = line.split(" ");
                for(int i = 0; i < words.length; i++) {
                    if(words[i].equals("class")) {
                        includedClass.add(words[i + 1]);
                        break;
                    }
                }
            }
        }
        br.close();

    }

    private static boolean isMainClass(File file) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(file)));
        ArrayList<String> checkList = new ArrayList<String>();
        String line = "";
        while((line = br.readLine()) != null) {
            if(line.contains("class ") && line.indexOf("*") == -1) {
                br.close();
                return false;
            }
        }
        br.close();
        return true;
    }

    private static boolean isCanInclude(File file) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(file)));
        ArrayList<String> checkList = new ArrayList<String>();
        String line = "";
        while((line = br.readLine()) != null) {
            if(line.contains("class ") && line.contains("extends ") && line.indexOf("*") == -1) {
                String[] words = line.split(" ");
                for(int i = 0; i < words.length; i++) {
                    if(words[i].equals("extends")) {
                        for(int j = i + 1; j < words.length; ++j) {
                            String className = words[j].replaceAll(",", "");
                            if(className.contains("{"))
                                break;
                            checkList.add(className);
                        }
                        break;
                    }
                }
            }
        }
        br.close();
        for(String name : checkList) {
            if(includedClass.contains(name))
                continue;
            return false;
        }
        return true;
    }

    private static void searchFile(File root) {
        if(excludeDirectories.contains(root.getName()))
            return;
        for(File file : root.listFiles()) {
            if(file.isDirectory())
                searchFile(file);
            else
                files.add(file);
        }
    }
}