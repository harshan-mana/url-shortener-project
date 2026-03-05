import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UrlCounter {
    public static void main(String[] args) {
        String text = "Here are some URLs: https://example.com, http://test.org, and www.sample.net.";

        // Regex pattern to match URLs
        String urlRegex = "(https?://\\S+|www\\.\\S+)";
        Pattern pattern = Pattern.compile(urlRegex, Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(text);

        int count = 0;
        while (matcher.find()) {
            count++;
            System.out.println("Found URL: " + matcher.group());
        }

        System.out.println("Total number of URLs: " + count);
    }
}
