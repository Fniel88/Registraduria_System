package com.registraduriaG10.RegistergG10.repositories;

import com.registraduriaG10.RegistergG10.models.Rol;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolRepository extends CrudRepository<Rol, Integer> {
}

