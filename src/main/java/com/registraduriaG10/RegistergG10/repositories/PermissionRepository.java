package com.registraduriaG10.RegistergG10.repositories;

import com.registraduriaG10.RegistergG10.models.Permission;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionRepository extends CrudRepository<Permission, Integer> {
}
