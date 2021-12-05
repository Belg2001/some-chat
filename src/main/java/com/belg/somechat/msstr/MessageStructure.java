package com.belg.somechat.msstr;

import java.util.Date;

public class MessageStructure {
    private String name;
    private String message;
    private Date time;

    public void setTime(Date time) {
        this.time = time;
    }

    public Date getTime() {
        return time;
    }

    public void setName(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    public String getMessage() {
        return message;
    }

    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append(this.getName())
                .append(" ")
                .append(this.getTime().toString())
                .append(", ")
                .append(this.getMessage())
                .append(", ");
        return builder.toString();
    }

}