import json
from typing import List, Optional

from geoalchemy2 import Geometry, WKBElement, shape
from geojson_pydantic import Feature, FeatureCollection, Point
from pydantic import BaseModel, ConfigDict, model_serializer
from pydantic_extra_types.coordinate import Latitude, Longitude
from shapely import to_geojson
from sqlmodel import Column, Field, Relationship, SQLModel


class Citation(SQLModel, table=True):
    __tablename__: str = "citations"
    id: int = Field(default=None, primary_key=True)
    citation: str | None = Field(default=None)
    url: str | None = Field(default=None)
    attribution: str | None = Field(default=None)
    attribution_url: str | None = Field(default=None)

    perceptual_model: "PerceptualModel" = Relationship(back_populates="citation")


class FunctionType(SQLModel, table=True):
    __tablename__: str = "function_type"
    name: str
    id: int = Field(default=None, primary_key=True)

    process_taxonomy: list["ProcessTaxonomy"] | None = Relationship(back_populates="function_type")


class WKBToGeoJSON(SQLModel, WKBElement):
    # TODO: return a geojson_pydantic object instead of a string
    @classmethod
    def validate(cls, value):
        if not isinstance(value, WKBElement):
            raise TypeError("value must be a WKBElement object")
        shp = shape.to_shape(value)
        return json.loads(to_geojson(shp))

    @classmethod
    def from_WKBElement(cls, element: WKBElement) -> str:
        return cls.validate(element)

    @model_serializer()
    def ser_model(self) -> str:
        shp = shape.to_shape(self)
        return to_geojson(shp)


class Location(SQLModel, table=True):
    __tablename__: str = "locations"

    name: str
    country: str
    lat: Latitude
    lon: Longitude
    area_km2: float | None = Field(default=None)
    id: int = Field(default=None, primary_key=True)
    # huc watershed id non-nullable in their schema but db dump has null values
    huc_watershed_id: float | None = Field(default=None)
    long_name: str
    pt: WKBToGeoJSON | None = Field(sa_column=Column(Geometry('POINT')), default=None)

    perceptual_models: list["PerceptualModel"] | None = Relationship(back_populates="location")


class ModelType(SQLModel, table=True):
    __tablename__: str = "model_type"
    name: str | None = Field(default=None)
    id: int = Field(default=None, primary_key=True)

    perceptual_models: list["PerceptualModel"] | None = Relationship(back_populates="model_type")


class SpatialZoneType(SQLModel, table=True):
    __tablename__: str = "spatial_zone_type"
    spatial_property: str | None = Field(default=None)
    id: int = Field(default=None, primary_key=True)

    perceptual_models: list["PerceptualModel"] | None = Relationship(back_populates="spatial_zone_type")


class TemporalZoneType(SQLModel, table=True):
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


class PerceptualModelBase(SQLModel):
    # https://sqlmodel.tiangolo.com/tutorial/fastapi/multiple-models/
    # https://sqlmodel.tiangolo.com/tutorial/fastapi/relationships/#models-with-relationships
    model_config = ConfigDict(protected_namespaces=())
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


class PerceptualModel(PerceptualModelBase, table=True):
    __tablename__: str = "perceptual_model"
    id: int = Field(default=None, primary_key=True)

    location_id: int = Field(foreign_key="locations.id")

    citation_id: int = Field(foreign_key="citations.id")

    spatialzone_id: int = Field(foreign_key="spatial_zone_type.id")

    temporalzone_id: int = Field(foreign_key="temporal_zone_type.id")

    model_type_id: int | None = Field(default=None, foreign_key="model_type.id")

    # many-to-many relationship between perceptual model and processTaxonomy
    process_taxonomies: list["ProcessTaxonomy"] | None = Relationship(
        back_populates="perceptual_models", link_model=LinkProcessPerceptual
    )
    location: Location = Relationship(back_populates="perceptual_models")
    citation: Citation = Relationship(back_populates="perceptual_model")
    spatial_zone_type: SpatialZoneType = Relationship(back_populates="perceptual_models")
    temporal_zone_type: TemporalZoneType = Relationship(back_populates="perceptual_models")
    model_type: ModelType = Relationship(back_populates="perceptual_models")

    def get_feature_properties(self) -> dict:

        # add the base properties
        properties = self.model_dump()

        # add the citation to the properties
        citation = self.citation
        if citation:
            properties["citation"] = citation.model_dump()

        # add the process taxonomies to the properties
        process_taxonomies = self.process_taxonomies
        if process_taxonomies:
            properties["process_taxonomies"] = [pt.model_dump() for pt in process_taxonomies]

        # add the spatial zone type to the properties
        spatial_zone_type = self.spatial_zone_type
        if spatial_zone_type:
            properties["spatial_zone_type"] = spatial_zone_type.model_dump()

        # add the temporal zone type to the properties
        temporal_zone_type = self.temporal_zone_type
        if temporal_zone_type:
            properties["temporal_zone_type"] = temporal_zone_type.model_dump()

        # add the model type to the properties
        model_type = self.model_type
        if model_type:
            properties["model_type"] = model_type.model_dump()

        # add the location to the properties
        location = self.location
        if location:
            properties["location"] = location.model_dump()

        return properties


class PerceptualModelRecursive(PerceptualModelBase):
    process_taxonomies: list["ProcessTaxonomy"] | None
    location: Location
    citation: Citation
    spatial_zone_type: SpatialZoneType
    temporal_zone_type: TemporalZoneType
    model_type: ModelType


class GeoJsonFeature(Feature):
    type: str = "Feature"
    properties: dict
    geometry: Point


class GeoJsonFeatureCollection(FeatureCollection):
    type: str = "FeatureCollection"
    features: list[GeoJsonFeature]


class ProcessTaxonomy(SQLModel, table=True):
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


class ProcessAltName(SQLModel, table=True):
    __tablename__: str = "process_alt_names"
    alternative_names: str
    id: int = Field(default=None, primary_key=True)
    process_id: int | None = Field(default=None)

    process_taxonomy: ProcessTaxonomy | None = Relationship(back_populates="process_alt_name")


class ModelCountRequest(BaseModel):
    spatialzone_ids: Optional[List[int]] = None
    temporalzone_ids: Optional[List[int]] = None
    process_taxonomy_ids: Optional[List[int]] = None
