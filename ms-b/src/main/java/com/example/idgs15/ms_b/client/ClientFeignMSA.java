package com.example.idgs15.ms_b.client;

import java.util.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import com.example.idgs15.ms_b.dto.EntityADto;

@FeignClient(name = "ms-a")
public interface ClientFeignMSA {
    @PostMapping("/api/entity-a/by-ids")
    public List<EntityADto> obtenerDTOsDelMSA(List<Integer> ids);
}