import java.io.*;

public class Builder {
    public static void main(String[] args) {
        try {
            BufferedWriter bw = new BufferedWriter(new FileWriter(new File(args[1])));
            if(args[0].equals("Append")) {
                for(int i = 2; i < args.length; ++i) {
                    BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(new File(args[i]))));
                    String line = "";
                    while((line = br.readLine()) != null) {
                        bw.write(line);
                        bw.newLine();
                    }
                    br.close();
                }
            } else if(args[0].equals("Document") ) {
                for(int i = 2; i < args.length; ++i) {
                    bw.write("{let script = document.createElement('script');script.src='" + args[i] + "';document.head.appendChild(script);script.onload = function() ");
                }
                bw.write("{};");
                for(int i = 2; i < args.length; ++i)
                    bw.write("};");
            }
            bw.close();
        } catch (IOException e) {

        }
    }
}