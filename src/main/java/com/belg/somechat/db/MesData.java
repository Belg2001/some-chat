package com.belg.somechat.db;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "mesdata")
public class MesData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private Date time;
    private String message;

    // standard constructors / setters / getters / toString
    public MesData() {}

    public MesData(String name, String message, Date time) {
        this.name = name;
        this.message = message;
        this.time = time;
    }

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

    @Override
    public String toString() {
        return "MesData{" + "id=" + id + ", name=" + name + ", message=" + message + '}';
    }
}
