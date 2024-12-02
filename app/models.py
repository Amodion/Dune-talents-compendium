from pydantic import BaseModel
from enum import Enum
from typing import Annotated, List
from sqlmodel import Field, SQLModel

class Source(str, Enum):
    core = 'Основная Книга Правил'
    Sand_and_Dust = 'Песок и Пыль'
    Power_And_Pawns_Emperors_Court = 'Власть и Пешки: Императорский Двор'
    The_Great_Game_Houses_of_the_Landsraad = 'Великая Игра: Дома Ландсраада'
    
class Requirements(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    requirement: str = Field(index=True)

class Talent(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(default=None, index=True)
    source: Source = Field(default=None, index=True)
    requirements: str | None = Field(default=None, index=True) #TO DO: MANY TO MANY WITH REQUIREMENTS
    flavor: str = Field(default=None, index=True)
    text: str = Field(default=None, index=True)