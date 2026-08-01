package com.infosys.carbonfootprint.util;

import java.security.SecureRandom;
import java.util.Locale;
import java.util.Objects;
import java.util.Random;

public class PasswordGenerator {
    private static final String upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String lower = upper.toLowerCase(Locale.ROOT);
    private static final String digits = "0123456789";
    private static final String symbols = "!@#$%^&*()-_";
    private static final String all = upper + lower + digits + symbols;
    private static final Random rand = new SecureRandom();

    public static String generate(int length) {
        if (length < 8) length = 8;
        StringBuilder sb = new StringBuilder(length);
        sb.append(upper.charAt(rand.nextInt(upper.length())));
        sb.append(lower.charAt(rand.nextInt(lower.length())));
        sb.append(digits.charAt(rand.nextInt(digits.length())));
        sb.append(symbols.charAt(rand.nextInt(symbols.length())));
        for (int i = 4; i < length; i++) {
            sb.append(all.charAt(rand.nextInt(all.length())));
        }
        return sb.toString();
    }
}
