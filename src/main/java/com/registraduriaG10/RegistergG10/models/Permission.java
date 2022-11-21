package com.registraduriaG10.RegistergG10.models;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "permission")
public class Permission implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPermission;
    private String url;
    private String method;

    @ManyToMany(mappedBy = "permissions")
    private Set<Rol> roles;

    public Integer getId() {
        return idPermission;
    }

    public void setId(Integer Id) {
        this.idPermission = Id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }
}

