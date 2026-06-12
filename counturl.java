import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UrlCounter {
    public static void main(String[] args) {
        String text = "Batch: https://example.com?qty=3&exp=5m, http://test.org, and www.sample.net.";

        String urlRegex = "(https?://\\S+|www\\.\\S+)";
        Pattern pattern = Pattern.compile(urlRegex, Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(text);

        int count = 0;
        System.out.println("=== Link Scanning Report ===");
        while (matcher.find()) {
            count++;
            String foundUrl = matcher.group().replaceAll("[.,]$", "");
            System.out.println("Found URL [" + count + "]: " + foundUrl);
        }

        System.out.println("----------------------------");
        System.out.println("Total Tracked URLs: " + count);
    }
}
