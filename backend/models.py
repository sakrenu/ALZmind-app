# models.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    age = db.Column(db.Integer)
    gender = db.Column(db.String(50))
    education = db.Column(db.String(100))
    ethnicity = db.Column(db.String(100))
    race_cat = db.Column(db.String(100))
    apoe_allele_type = db.Column(db.String(100))
    imputed_genotype = db.Column(db.String(100))
    mmse = db.Column(db.Float)
    mri_scan_images = db.Column(db.String(255))  # Store the URL or path to the MRI scan images
    notes = db.Column(db.Text)
    contact_number = db.Column(db.String(15))
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.id'), nullable=True)
    profile_completed = db.Column(db.Boolean, default=False)  # Track if the profile is completed

class Doctor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    patients = db.relationship('User', backref='doctor', lazy=True)

def init_db(app):
    db.init_app(app)
    with app.app_context():
        db.create_all()
