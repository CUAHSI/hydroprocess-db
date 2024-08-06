from typing import Any

from geoalchemy2 import Geometry
from pydantic import ConfigDict
from sqlmodel import Column, Field, Relationship, SQLModel
from sqlalchemy.ext.asyncio import AsyncAttrs


class Citation(SQLModel, AsyncAttrs, table=True):
    __tablename__: str = "citations"
    id: int = Field(default=None, primary_key=True)
    citation: str | None = Field(default=None)
    url: str | None = Field(default=None)
    attribution: str | None = Field(default=None)
    attribution_url: str | None = Field(default=None)

    perceptual_model: "PerceptualModel" = Relationship(back_populates="citation")


class FunctionType(SQLModel, AsyncAttrs, table=True):
    __tablename__: str = "function_type"
    name: str
    id: int = Field(default=None, primary_key=True)

    process_taxonomy: list["ProcessTaxonomy"] | None = Relationship(back_populates="function_type")


class Location(SQLModel, AsyncAttrs, table=True):
    __tablename__: str = "locations"

    name: str
    country: str
    lat: float
    lon: float
    area_km2: float | None = Field(default=None)
    id: int = Field(default=None, primary_key=True)
    # huc watershed id non-nullable in their schema but db dump has null values
    huc_watershed_id: float | None = Field(default=None)
    long_name: str
    pt: Any | None = Field(sa_column=Column(Geometry('POINT')), default=None)

    perceptual_models: list["PerceptualModel"] | None = Relationship(back_populates="location")


class ModelType(SQLModel, AsyncAttrs, table=True):
    __tablename__: str = "model_type"
    name: str | None = Field(default=None)
    id: int = Field(default=None, primary_key=True)

    perceptual_models: list["PerceptualModel"] | None = Relationship(back_populates="model_type")


class SpatialZoneType(SQLModel, AsyncAttrs, table=True):
    __tablename__: str = "spatial_zone_type"
    spatial_property: str | None = Field(default=None)
    id: int = Field(default=None, primary_key=True)

    perceptual_models: list["PerceptualModel"] | None = Relationship(back_populates="spatial_zone_type")


class TemporalZoneType(SQLModel, AsyncAttrs, table=True):
    __tablename__: str = "temporal_zone_type"
    temporal_property: str | None = Field(default=None)
    id: int = Field(default=None, primary_key=True)

    perceptual_models: list["PerceptualModel"] | None = Relationship(back_populates="temporal_zone_type")


class LinkProcessPerceptual(SQLModel, table=True):
    __tablename__: str = "link_process_perceptual"
    original_text: str | None = Field(default=None)
    id: int = Field(default=None, primary_key=True)

    entry_id: int | None = Field(default=None, foreign_key="perceptual_model.id")
    process_id: int | None = Field(default=None, foreign_key="process_taxonomy.id")


class PerceptualModel(SQLModel, AsyncAttrs, table=True):
    __tablename__: str = "perceptual_model"
    model_config = ConfigDict(protected_namespaces=())
    id: int = Field(default=None, primary_key=True)
    figure_num: str | None = Field(default=None)
    figure_url: str | None = Field(default=None)
    figure_caption: str | None = Field(default=None)
    textmodel_snipped: str | None = Field(default=None)
    textmodel_section_number: str | None = Field(default=None)
    textmodel_page_number: str | None = Field(default=None)
    textmodel_section_name: str | None = Field(default=None)
    num_spatial_zones: int | None = Field(default=None)
    num_temporal_zones: str | None = Field(default=None)
    vegetation_info: str | None = Field(default=None)
    soil_info: str | None = Field(default=None)
    geol_info: str | None = Field(default=None)
    topo_info: str | None = Field(default=None)
    three_d_info: str | None = Field(default=None)
    uncertainty_info: str | None = Field(default=None)
    other_info: str | None = Field(default=None)

    location_id: int = Field(foreign_key="locations.id")
    location: Location = Relationship(back_populates="perceptual_models")

    citation_id: int = Field(foreign_key="citations.id")
    citation: Citation = Relationship(back_populates="perceptual_model")

    spatialzone_id: int = Field(foreign_key="spatial_zone_type.id")
    spatial_zone_type: SpatialZoneType = Relationship(back_populates="perceptual_models")

    temporalzone_id: int = Field(foreign_key="temporal_zone_type.id")
    temporal_zone_type: TemporalZoneType = Relationship(back_populates="perceptual_models")

    model_type_id: int | None = Field(default=None, foreign_key="model_type.id")
    model_type: ModelType = Relationship(back_populates="perceptual_models")

    # many-to-many relationship between perceptual model and processTaxonomy
    process_taxonomies: list["ProcessTaxonomy"] | None = Relationship(
        back_populates="perceptual_models", link_model=LinkProcessPerceptual
    )


class ProcessTaxonomy(SQLModel, AsyncAttrs, table=True):
    __tablename__: str = "process_taxonomy"
    process: str | None = Field(default=None)
    identifier: str
    process_level: float | None = Field(default=None)
    id: int = Field(default=None, primary_key=True)

    function_id: int | None = Field(default=None, foreign_key="function_type.id")
    function_type: FunctionType = Relationship(back_populates="process_taxonomy")

    process_alt_name_id: int | None = Field(default=[], foreign_key="process_alt_names.id")
    process_alt_name: "ProcessAltName" = Relationship(back_populates="process_taxonomy")
    # function_type: FunctionType = Relationship(back_populates="process_taxonomy")

    # many-to-many relationship between perceptual model and processTaxonomy
    perceptual_models: list[PerceptualModel] | None = Relationship(
        back_populates="process_taxonomies", link_model=LinkProcessPerceptual
    )


class ProcessAltName(SQLModel, AsyncAttrs, table=True):
    __tablename__: str = "process_alt_names"
    alternative_names: str
    id: int = Field(default=None, primary_key=True)
    process_id: int | None = Field(default=None)

    process_taxonomy: ProcessTaxonomy | None = Relationship(back_populates="process_alt_name")
