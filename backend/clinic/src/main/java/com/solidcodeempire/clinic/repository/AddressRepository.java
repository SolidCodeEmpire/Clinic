package com.solidcodeempire.clinic.repository;

import com.solidcodeempire.clinic.model.Address;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends CrudRepository<Address, Long>{

}

