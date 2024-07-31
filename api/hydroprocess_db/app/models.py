from sqlmodel import Field, Relationship, SQLModel


class Citation(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    citation: str | None = Field(default=None)
    url: str | None = Field(default=None)
    attribution: str | None = Field(default=None)
    attribution_url: str | None = Field(default=None)


class FunctionType(SQLModel, table=True):
    name: str | None = Field(default=None)
    id: int = Field(default=None, primary_key=True)

    process_taxonomy: list["ProcessTaxonomy"] = Relationship(back_populates="function_type")


class LinkProcessPerceptual(SQLModel, table=True):
    entry_id: int | None = Field(default=None)
    original_text: str | None = Field(default=None)
    process_id: int | None = Field(default=None)
    id: int = Field(default=None, primary_key=True)


class ModelType(SQLModel, table=True):
    name: str | None = Field(default=None)
    id: int = Field(default=None, primary_key=True)

    perceptual_models: list["PerceptualModel"] = Relationship(back_populates="model_type")


class SpatialZoneType(SQLModel, table=True):
    spatial_property: str | None = Field(default=None)
    id: int = Field(default=None, primary_key=True)

    perceptual_models: list["PerceptualModel"] = Relationship(back_populates="spatial_zone_type")


class TemporalZoneType(SQLModel, table=True):
    temporal_property: str | None = Field(default=None)
    id: int = Field(default=None, primary_key=True)

    perceptual_models: list["PerceptualModel"] = Relationship(back_populates="temporal_zone_type")


class PerceptualModel(SQLModel, table=True):
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
    location_id: int | None = Field(default=None)
    citation_id: int | None = Field(default=None)
    spatialzone_id: int | None = Field(default=None)
    temporalzone_id: int | None = Field(default=None)
    model_type_id: int | None = Field(default=None)

    # citation: Relationship = Relationship(back_populates="perceptual_models")
    spatial_zone_type: SpatialZoneType = Relationship(back_populates="perceptual_models")
    temporal_zone_type: TemporalZoneType = Relationship(back_populates="perceptual_models")
    model_type: ModelType = Relationship(back_populates="perceptual_models")


class ProcessTaxonomy(SQLModel, table=True):
    process: str | None = Field(default=None)
    identifier: str | None = Field(default=None)
    process_level: float | None = Field(default=None)
    id: int = Field(default=None, primary_key=True)
    function_id: int | None = Field(default=None)

    process_alt_names: list["ProcessAltNames"] = Relationship(back_populates="process_taxonomy")
    function_type: FunctionType = Relationship(back_populates="process_taxonomy")
    # perceptual_models: Relationship = Relationship(back_populates="process_taxonomy")


class ProcessAltNames(SQLModel, table=True):
    alternative_names: str
    id: int = Field(default=None, primary_key=True)
    process_id: int | None = Field(default=None)

    process_taxonomy: ProcessTaxonomy = Relationship(back_populates="process_alt_names")
