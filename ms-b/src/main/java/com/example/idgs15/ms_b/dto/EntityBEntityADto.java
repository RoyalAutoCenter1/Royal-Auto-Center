package com.example.idgs15.ms_b.dto;

import lombok.Data;

@Data
public class EntityBEntityADto {
    private int id;
    private int entityAId;

    public EntityBEntityADto() {
    }

    public EntityBEntityADto(int id, int entityAId) {
        this.id = id;
        this.entityAId = entityAId;
    }

    @Override
    public String toString() {
        return "EntityBEntityADto [id=" + id + ", entityAId=" + entityAId + "]";
    }
}