package com.example.idgs15.ms_b.client;

import java.util.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import com.example.idgs15.ms_b.dto.EntityADto;

// url fija en vez de descubrimiento por Eureka: en Railway cada servicio esta
// aislado y la IP que Eureka registra para ms-a no es alcanzable desde ms-b.
@FeignClient(name = "ms-a", url = "${MS_A_URL:http://microservicio-a:8081}")
public interface ClientFeignMSA {
    @PostMapping("/api/entity-a/by-ids")
    public List<EntityADto> obtenerDTOsDelMSA(List<Integer> ids);
}