from fastapi import FastAPI
from backend.database import engine
from backend import models

from fastapi import Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from backend.database import SessionLocal
from backend.schemas import AppointmentCreate, DoctorCreate
from backend.models import Appointment, Doctor

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {
        "message": "DoctorClinic Backend Running",
        "database": "Connected Successfully"
    }
@app.post("/appointments")
def create_appointment(
    appointment: AppointmentCreate,
    db: Session = Depends(get_db)
):
    new_appointment = Appointment(
        full_name=appointment.full_name,
        email=appointment.email,
        phone=appointment.phone,
        department=appointment.department,
        appointment_date=appointment.appointment_date,
        message=appointment.message,
    )

    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)

    return {
        "success": True,
        "appointment_id": new_appointment.id
    }
@app.get("/appointments")
def get_appointments(db: Session = Depends(get_db)):
    appointments = db.query(Appointment).all()

    return appointments
from pydantic import BaseModel

class LoginData(BaseModel):
    username: str
    password: str


@app.post("/login")
def login(data: LoginData):

    if data.username == "admin" and data.password == "123456":

        return {
            "success": True,
            "message": "Login successful"
        }

    return {
        "success": False,
        "message": "Invalid username or password"
    }

@app.post("/doctors")
def create_doctor(
    doctor: DoctorCreate,
    db: Session = Depends(get_db)
):

    new_doctor = Doctor(
        full_name=doctor.full_name,
        specialization=doctor.specialization,
        email=doctor.email,
        phone=doctor.phone,
        experience=doctor.experience,
        image=doctor.image
    )

    db.add(new_doctor)
    db.commit()
    db.refresh(new_doctor)

    return {
        "success": True,
        "doctor_id": new_doctor.id
    }


@app.get("/doctors")
def get_doctors(db: Session = Depends(get_db)):
    return db.query(Doctor).all()
@app.delete("/doctors/{doctor_id}")
def delete_doctor(
    doctor_id: int,
    db: Session = Depends(get_db)
):
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()

    if not doctor:
        return {
            "success": False,
            "message": "Doctor not found"
        }

    db.delete(doctor)
    db.commit()

    return {
        "success": True,
        "message": "Doctor deleted successfully"
    }
@app.put("/doctors/{doctor_id}")
def update_doctor(
    doctor_id: int,
    doctor: DoctorCreate,
    db: Session = Depends(get_db)
):
    existing_doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()

    if not existing_doctor:
        return {
            "success": False,
            "message": "Doctor not found"
        }

    existing_doctor.full_name = doctor.full_name
    existing_doctor.specialization = doctor.specialization
    existing_doctor.email = doctor.email
    existing_doctor.phone = doctor.phone
    existing_doctor.experience = doctor.experience
    existing_doctor.image = doctor.image

    db.commit()

    return {
        "success": True,
        "message": "Doctor updated successfully"
    }
@app.get("/doctors/{doctor_id}")
def get_doctor(
    doctor_id: int,
    db: Session = Depends(get_db)
):
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()

    if not doctor:
        return {
            "success": False,
            "message": "Doctor not found"
        }

    return doctor