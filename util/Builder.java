import java.io.*;
import java.util.*;

public class Builder {
    private static int fileCount = 0;
    private static ArrayList<File> files = new ArrayList<File>();
    private static ArrayList<String> includedClass = new ArrayList<String>();
    private static ArrayList<File> remainFiles = new ArrayList<File>();
    private static ArrayList<String> excludeDirectories = new ArrayList<String>();
    private static ArrayList<String> classNameList = new ArrayList<String>();
    public static void main(String[] args) {
        String text = "";
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
                if(i > 1000) {
                    System.out.println(file);
                }
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
                            text += line + "\n";
                        }
                        br.close();
                    } else if(args[0].equals("Document") ) {
                        String name = file.getPath().replace("..\\", "").replace("\\", "/");
                        String className = getClass(file);
                        classNameList.add(className);
                        String extendClass = getExtendClass(file);
                        if(extendClass == null) {
                            text += "{const script = document.createElement('script'); script.src='" + name + "'; document.head.appendChild(script);}\r\n";
                        } else {
                            extendClass = "typeof " + extendClass + " !== `undefined`";
                            text += "{const id = setInterval(function() {\r\n    if (" + extendClass + ") {\r\n        clearInterval(id); const script = document.createElement('script'); script.src='" + name + "'; document.head.appendChild(script);\r\n    }\r\n}, 1);}\r\n";
                        }
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
                        text += line + "\n";
                    }
                } else if(args[0].equals("Document") ) {
                    String name = file.getPath().replace("..\\", "").replace("\\", "/");
                    ArrayList<String> checkList = getNewClasses(file);
                    String news = "";
                    for(int i = 0; i < classNameList.size(); ++i) {
                        if(i != 0) {
                            news += " &&\r\n        ";
                        }
                        news += "typeof " + classNameList.get(i) + " !== `undefined`";
                    }
                    text += "{const id = setInterval(function() {\r\n    if (" + news + ") {\r\n        clearInterval(id); const script = document.createElement('script'); script.src='" + name + "'; document.head.appendChild(script);\r\n    }\r\n}, 1);}\r\n";
                    fileCount++;
                }
            }
            bw.write(text);
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void addIncludedClass(File file) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(file)));
        String line = "";
        while((line = br.readLine()) != null) {
            if(line.contains("class ") && (line.indexOf("*") == -1 || line.indexOf("*") > line.indexOf("class"))) {
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
            if(line.contains("class ") && (line.indexOf("*") == -1 || line.indexOf("*") > line.indexOf("class"))) {
                br.close();
                return false;
            }
        }
        br.close();
        return true;
    }

    private static ArrayList<String> getNewClasses(File file) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(file)));
        ArrayList<String> checkList = new ArrayList<String>();
        String line = "";
        while((line = br.readLine()) != null) {
            if(line.contains("new ") && (line.indexOf("*") == -1 || line.indexOf("*") > line.indexOf("new"))) {
                String[] words = line.split(" ");
                for(int i = 0; i < words.length; i++) {
                    if(words[i].contains("new")) {
                        if(i + 1 < words.length) {
                            String register = words[i + 1];
                            if(register.indexOf("(") != -1) {
                                register  = register.substring(0, register.indexOf("("));
                            }
                            checkList.add(register);
                        }
                    }
                }
            }
        }
        br.close();
        return checkList;
    }


    private static String getClass(File file) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(file)));
        String line = "";
        while((line = br.readLine()) != null) {
            if(line.contains("class ") && (line.indexOf("*") == -1 || line.indexOf("*") > line.indexOf("class"))) {
                String[] words = line.split(" ");
                for(int i = 0; i < words.length; i++) {
                    if(words[i].equals("class")) {
                        if(i + 1 < words.length) {
                            br.close();
                            return words[i + 1];
                        }
                    }
                }
            }
        }
        br.close();
        return null;
    }

    private static String getExtendClass(File file) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(file)));
        String line = "";
        while((line = br.readLine()) != null) {
            if(line.contains("class ") && line.contains("extends ") && (line.indexOf("*") == -1 || line.indexOf("*") > line.indexOf("class"))) {
                String[] words = line.split(" ");
                for(int i = 0; i < words.length; i++) {
                    if(words[i].equals("extends")) {
                        if(i + 1 < words.length) {
                            br.close();
                            return words[i + 1];
                        }
                    }
                }
            }
        }
        br.close();
        return null;
    }

    private static boolean isCanInclude(File file) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(file)));
        ArrayList<String> checkList = new ArrayList<String>();
        String line = "";
        while((line = br.readLine()) != null) {
            if(line.contains("class ") && line.contains("extends ") && (line.indexOf("*") == -1 || line.indexOf("*") > line.indexOf("class"))) {
                String[] words = line.split(" ");
                for(int i = 0; i < words.length; i++) {
                    if(words[i].equals("extends")) {
                        if(i + 1 < words.length) {
                            checkList.add(words[i + 1]);
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
        if(!root.exists())
            System.out.println("Error: " + root);
        if(excludeDirectories.contains(root.getName()))
            return;
        for(File file : root.listFiles()) {
            if(file.isDirectory())
                searchFile(file);
            else {
                if(excludeDirectories.contains(file.getName()))
                    continue;
                files.add(file);
            }
        }
    }
}
