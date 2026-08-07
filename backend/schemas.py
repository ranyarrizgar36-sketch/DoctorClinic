from pydantic import BaseModel
from datetime import date


class AppointmentCreate(BaseModel):
    full_name: str
    email: str
    phone: str
    department: str
    appointment_date: date
    message: str


class DoctorCreate(BaseModel):
    full_name: str
    specialization: str
    email: str
    phone: str
    experience: int
    image: str = ""