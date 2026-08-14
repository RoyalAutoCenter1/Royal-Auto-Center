package com.example.idgs15.ms_b.service;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.idgs15.ms_b.dto.EntityBDto;
import com.example.idgs15.ms_b.dto.EntityBEntityADto;
import com.example.idgs15.ms_b.dto.EntityBDtoList;
import com.example.idgs15.ms_b.client.ClientFeignMSA;
import com.example.idgs15.ms_b.dto.EntityADto;
import com.example.idgs15.ms_b.entity.EntityB;
import com.example.idgs15.ms_b.entity.EntityBEntityA;
import com.example.idgs15.ms_b.repository.EntityBRepository;

@Service
public class EntityBService {
    @Autowired
    private EntityBRepository repository;

    @Autowired
    private ClientFeignMSA clientFeignMSA;

    // Create
    public EntityBDto create(EntityBDto dto) {
        EntityB entity = toEntity(dto);
        EntityB saved = repository.save(entity);
        return toDto(saved);
    }

    // Read all
    @Transactional(readOnly = true)
    public List<EntityBDtoList> findAll() {
        List<EntityB> datosB = repository.findAll();

        List<Integer> idsRelacionados = datosB.stream()
                .flatMap(relacion -> relacion.getListaConEntityA().stream())
                .map(EntityBEntityA::getEntityAId)
                .collect(Collectors.toList());

        Map<Integer, String> entidadAIdNombreAMap = new HashMap<>();
        List<EntityADto> listaEntityADtos = clientFeignMSA.obtenerDTOsDelMSA(idsRelacionados);
        if (listaEntityADtos != null) {
            for (EntityADto dto : listaEntityADtos) {
                if (dto != null) {
                    entidadAIdNombreAMap.put(dto.getId(), dto.getNombreA());
                }
                entidadAIdNombreAMap.put(dto.getId(), dto.getNombreA());
            }
        }
        List<EntityBDtoList> datosList = datosB
                .stream()
                .map(e -> {
                    EntityBDtoList dto = new EntityBDtoList();
                    dto.setId(e.getId());
                    dto.setNombreB(e.getNombreB());
                    if (e.getListaConEntityA() != null && !e.getListaConEntityA().isEmpty()) {
                        EntityBEntityA relacion = e.getListaConEntityA().get(0);
                        if (relacion != null && relacion.getEntityAId() != null) {
                            String nombreA = entidadAIdNombreAMap.get(relacion.getEntityAId());
                            dto.setNombreA(nombreA != null ? nombreA : "Sin dato de MSA");
                            return dto;
                        }
                    }
                    return dto;
                })
                .collect(Collectors.toList());
        return datosList;
    }

    @Transactional(readOnly = true)
    public List<EntityBDto> findAllByIDs(List<Integer> ids) {
        return repository.findAllById(ids)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    // Read by ID
    @Transactional(readOnly = true)
    public Optional<EntityBDto> findById(int id) {
        return repository.findById(id).map(this::toDto);
    }

    // update
    @Transactional
    public Optional<EntityBDto> update(int id, EntityBDto dto) {
        return repository.findById(id).map(existing -> {
            existing.setNombreB(dto.getNombreB());
            EntityB saved = repository.save(existing);
            return toDto(saved);
        });
    }

    // delete
    @Transactional
    public boolean delete(int id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    // Add EntityA to EntityB
    @Transactional
    public Optional<EntityBDto> addEntityAToEntityB(int entityBId, EntityBEntityADto dto) {
        System.out.println("Dto received in service: " + dto);
        return repository.findById(entityBId).map(entityB -> {
            // Create new relation
            EntityBEntityA relation = new EntityBEntityA();
            relation.setEntityAId(dto.getEntityAId());

            // Initialize list if null
            if (entityB.getListaConEntityA() == null) {
                entityB.setListaConEntityA(new ArrayList<>());
            }

            // Add relation to EntityB
            entityB.getListaConEntityA().add(relation);

            // Save and return
            return toDto(repository.save(entityB));
        });
    }

    // Converters
    private EntityBDto toDto(EntityB e) {
        if (e == null)
            return null;
        EntityBDto d = new EntityBDto();
        d.setId(e.getId());
        d.setNombreB(e.getNombreB());
        return d;
    }

    private EntityB toEntity(EntityBDto d) {
        if (d == null)
            return null;
        EntityB e = new EntityB();
        e.setId(d.getId());
        e.setNombreB(d.getNombreB());
        return e;
    }
}