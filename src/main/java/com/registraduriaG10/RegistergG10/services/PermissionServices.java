package com.registraduriaG10.RegistergG10.services;

import com.registraduriaG10.RegistergG10.models.Permission;
import com.registraduriaG10.RegistergG10.repositories.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PermissionServices {
    @Autowired
    private PermissionRepository permissionRepository;

    public List<Permission> index(){
        return (List<Permission>)this.permissionRepository.findAll();
    }

    public Optional<Permission> show(int id){
        return this.permissionRepository.findById(id);
    }

    public Permission create(Permission newPermission){
        if (newPermission.getId() == null){
            if(newPermission.getUrl() != null && newPermission.getMethod() != null)
                return this.permissionRepository.save(newPermission);
            else {
                return newPermission;
            }
        }
        else {
            return newPermission;
        }
    }

    public Permission update(int id, Permission updatedPermission){
        if (id > 0){
            Optional<Permission> tempPermission = this.show(id);
            if(tempPermission.isPresent()){
                if(updatedPermission.getUrl() != null)
                    tempPermission.get().setUrl(updatedPermission.getUrl());
                return this.permissionRepository.save(tempPermission.get());
            }
            else{
                return updatedPermission;
            }
        }
        else {
            return updatedPermission;
        }
    }

    public boolean delete(int id){
        Boolean success = this.show(id).map(permission -> {
            this.permissionRepository.delete(permission);
            return true;
        }).orElse(false);
        return success;
    }
}

