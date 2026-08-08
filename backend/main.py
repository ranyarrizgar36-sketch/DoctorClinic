import os

from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from backend.database import engine, SessionLocal
from backend import models
from backend.schemas import AppointmentCreate, DoctorCreate
from backend.models import Appointment, Doctor


# =========================
# Load environment variables
# =========================

load_dotenv()

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")
API_KEY = os.getenv("API_KEY")


# =========================
# Create database tables
# =========================

models.Base.metadata.create_all(bind=engine)


# =========================
# Create FastAPI app
# =========================

app = FastAPI()


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# Database connection
# =========================

def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# =========================
# API Key Authentication
# =========================

def verify_api_key(x_api_key: str = Header(None)):

    if x_api_key != API_KEY:
        raise HTTPException(
            status_code=401,
            detail="Unauthorized"
        )

    return True


# =========================
# Home
# =========================

@app.get("/")
def home():

    return {
        "message": "DoctorClinic Backend Running",
        "database": "Connected Successfully"
    }


# =========================
# Login
# =========================

from pydantic import BaseModel


class LoginData(BaseModel):
    username: str
    password: str


@app.post("/login")
def login(data: LoginData):

    if (
        data.username == ADMIN_USERNAME
        and data.password == ADMIN_PASSWORD
    ):

        return {
            "success": True,
            "message": "Login successful"
        }

    raise HTTPException(
        status_code=401,
        detail="Invalid username or password"
    )


# =========================
# Create Appointment
# =========================

@app.post("/appointments")
def create_appointment(
    appointment: AppointmentCreate,
    db: Session = Depends(get_db),
    authenticated: bool = Depends(verify_api_key)
):

    new_appointment = Appointment(
        full_name=appointment.full_name,
        email=appointment.email,
        phone=appointment.phone,
        department=appointment.department,
        appointment_date=appointment.appointment_date,
        message=appointment.message
    )

    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)

    return {
        "success": True,
        "appointment_id": new_appointment.id
    }


# =========================
# Get Appointments
# =========================

@app.get("/appointments")
def get_appointments(
    db: Session = Depends(get_db),
    authenticated: bool = Depends(verify_api_key)
):

    appointments = db.query(Appointment).all()

    return appointments


# =========================
# Create Doctor
# =========================

@app.post("/doctors")
def create_doctor(
    doctor: DoctorCreate,
    db: Session = Depends(get_db),
    authenticated: bool = Depends(verify_api_key)
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


# =========================
# Get Doctors
# =========================

@app.get("/doctors")
def get_doctors(
    db: Session = Depends(get_db),
    authenticated: bool = Depends(verify_api_key)
):

    doctors = db.query(Doctor).all()

    return doctors
# =========================
# Get Doctor by ID
# =========================

@app.get("/doctors/{doctor_id}")
def get_doctor(
    doctor_id: int,
    db: Session = Depends(get_db),
    authenticated: bool = Depends(verify_api_key)
):

    doctor = db.query(Doctor).filter(
        Doctor.id == doctor_id
    ).first()

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found"
        )

    return doctor


# =========================
# Update Doctor
# =========================

@app.put("/doctors/{doctor_id}")
def update_doctor(
    doctor_id: int,
    doctor_data: DoctorCreate,
    db: Session = Depends(get_db),
    authenticated: bool = Depends(verify_api_key)
):

    doctor = db.query(Doctor).filter(
        Doctor.id == doctor_id
    ).first()

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found"
        )

    doctor.full_name = doctor_data.full_name
    doctor.specialization = doctor_data.specialization
    doctor.email = doctor_data.email
    doctor.phone = doctor_data.phone
    doctor.experience = doctor_data.experience
    doctor.image = doctor_data.image

    db.commit()
    db.refresh(doctor)

    return {
        "success": True,
        "message": "Doctor updated successfully"
    }
# =========================
# Delete Doctor
# =========================

@app.delete("/doctors/{doctor_id}")
def delete_doctor(
    doctor_id: int,
    db: Session = Depends(get_db),
    authenticated: bool = Depends(verify_api_key)
):

    doctor = db.query(Doctor).filter(
        Doctor.id == doctor_id
    ).first()

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found"
        )

    db.delete(doctor)
    db.commit()

    return {
        "success": True,
        "message": "Doctor deleted successfully"
    }