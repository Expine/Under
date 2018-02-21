import java.io.*;

public class Builder {
    public static void main(String[] args) {
        try {
            BufferedWriter bw = new BufferedWriter(new FileWriter(new File(args[0])));
            for(int i = 1; i < args.length; ++i) {
                BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(new File(args[i]))));
                System.out.println("Output: " + new File(args[i]));
                String line = "";
                while((line = br.readLine()) != null) {
                    bw.write(line);
                    bw.newLine();
                }
                br.close();
            }
            bw.close();
        } catch (IOException e) {

        }
    }
}