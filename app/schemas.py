from pydantic import BaseModel, EmailStr, field_validator

class BookBase(BaseModel):
    title: str
    author: str
    genre: str

class BookCreate(BookBase):
    pass

class Book(BookBase):
    id: int
    available: bool

    class Config:
        orm_mode: True

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserCreate(UserBase):
    role:str
    password: str

class User(UserBase):
    id: int
    role: str

    class Config:
        orm_mode: True

    @field_validator('role')
    def role_must_be_valid(cls, v):
        if v not in ["user", "librarian"]:
            raise ValueError('Role must be "user" or "librarian"')
        return v
