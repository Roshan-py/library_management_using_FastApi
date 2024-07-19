from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


# URL_DATABASE = 'mysql+pymysql://root:Admin%40123@localhost:3306/library_management'


# engine = create_engine(URL_DATABASE)
engine = create_engine(f"sqlite:///database.db", echo=False, hide_parameters=True)
SessionLocal = sessionmaker(autocommit=False,autoflush=False,bind=engine)

Base = declarative_base()