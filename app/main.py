from typing import Annotated, List

from app.models import Talent, Source
from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Session, create_engine, select, Field, SQLModel
from fastapi.middleware.cors import CORSMiddleware

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///app/{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
    
def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]

app = FastAPI(version="v0.115.0.0")

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
async def root():
    return 'root'

@app.post("/talents/add")
async def add_talent(talent: Talent, session: SessionDep) -> dict:
    session.add(talent)
    session.commit()
    session.refresh(talent)
    return {'message': f'Вы успешно добавили талант {talent.name}.'}

@app.get("/talents/")
async def read_talents(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
) -> list[Talent]:
    talents = session.exec(select(Talent).offset(offset).limit(limit).order_by(Talent.name)).all()
    return talents

@app.get("/talents/filter/")
async def filter_talents(
    session: SessionDep,
    name: Annotated[str | None, Query(max_length=50)] = None,
    source: Annotated[str | None, Query(max_length=50)] = None,
    requirements: Annotated[str | None, Query(max_length=50)] = None,
    flavor: Annotated[str | None, Query(max_length=5000)] = None,
    text: Annotated[str | None, Query(max_length=5000)] = None,
) -> list[Talent]:
    statement = select(Talent)
    if name:
        statement = statement.where(Talent.name.like('%' + name + '%'))
    if source:
        statement = statement.where(Talent.source == Source(source))
    if requirements:
        statement = statement.where(Talent.requirements.like('%' + requirements + '%'))
    if flavor:
        statement = statement.where(Talent.flavor.like('%' + flavor + '%'))
    if text:
        statement = statement.where(Talent.text.like('%' + text + '%'))
    talents = session.exec(statement).all()
    return talents

@app.get("/talents/{talent_id}", deprecated=True)
async def read_talent(talent_id: int, session: SessionDep) -> Talent:
    talent = session.get(Talent, talent_id)
    if not talent:
        raise HTTPException(status_code=404, detail="Talent not found")
    return talent

@app.post("/talents/del/{talent_id}")
async def delete_by_id(talent_id: int, session: SessionDep) -> Talent:
    statement = select(Talent).where(Talent.id == talent_id)
    result = session.exec(statement)
    talent = result.one()
    session.delete(talent)
    session.commit()
    return result


# ADD DISCONNECT ON SHUTDOWN EVENT 