package PW1;

import java.io.IOException;
import java.io.InputStream;
import org.json.*;
import java.net.URL;

// https://github.com/15Dkatz/official_joke_api
public class Solution {
    public static void main(String[] args) throws IOException {
        URL url = new URL("https://official-joke-api.appspot.com/jokes/random");
        try (InputStream input = url.openStream()) {
            byte[] buffer = input.readAllBytes();
            String str = new String(buffer);
            JSONObject obj = new JSONObject(str);
            System.out.println(obj.get("setup"));

            Thread.sleep(1500);
            System.out.println("\n...\n");
            Thread.sleep(2000);
            System.out.println(obj.get("punchline"));
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}



