package com.solidcodeempire.clinic.modelDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressDTO {
    private int id;
    private String street;
    private String houseNumber;
    private int apartmentNumber;
    private String city;
    private String postalCode;
    private String country;
}
