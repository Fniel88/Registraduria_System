package com.registraduriaG10.RegistergG10.controllers;

import com.registraduriaG10.RegistergG10.models.Permission;
import com.registraduriaG10.RegistergG10.models.Rol;
import com.registraduriaG10.RegistergG10.services.RolServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/rol")
public class RolController {
    @Autowired
    private RolServices rolServices;

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.FOUND)
    public List<Rol> getAllRoles() {
        return this.rolServices.index();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.FOUND)
    public Optional<Rol> getRolById(@PathVariable("id") int id) {
        return this.rolServices.show(id);
    }

    @GetMapping("/validate/{idRol}")
    public ResponseEntity<Boolean> getValidation(@PathVariable("idRol") int idRol, @RequestBody Permission permission){
        return this.rolServices.validateGrant(idRol, permission);
    }

    @PostMapping("/insert")
    @ResponseStatus(HttpStatus.CREATED)
    public Rol insertRol(@RequestBody Rol rol) {
        return this.rolServices.create(rol);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public Rol updateRol(@PathVariable("id") int id, @RequestBody Rol rol){
        return this.rolServices.update(id, rol);
    }

    @PutMapping("/update/{idRol}/add_permission/{idPermission}")
    public ResponseEntity<Rol> updateRolAddPermission(@PathVariable("idRol") int idRol, @PathVariable("idPermission") int idPermission){
        return this.rolServices.updateAddPermission(idRol, idPermission);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean deleteRol(@PathVariable("id") int id){
        return this.rolServices.delete(id);
    }
}

