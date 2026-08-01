package com.infosys.carbonfootprint.util;

import java.text.Normalizer;
import java.util.Locale;
import java.util.Random;

public class UsernameGenerator {
    private static final Random rnd = new Random();

    public static String generate(String firstName, String lastName) {
        String base = (firstName + "." + (lastName != null ? lastName : "")).toLowerCase(Locale.ROOT);
        base = Normalizer.normalize(base, Normalizer.Form.NFD).replaceAll("[^a-z0-9._-]", "");
        base = base.replaceAll("\s+", "");
        String username = base;
        username = username.endsWith(".") ? username + "user" : username;
        username = username.length() > 30 ? username.substring(0, 30) : username;
        username = username + rnd.nextInt(900) + 100; // add 3 digits to reduce collisions
        return username;
    }
}
