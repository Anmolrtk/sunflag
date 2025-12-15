import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [image, setImage] = useState(null);

  const storage = getStorage();

  const fetchDoctors = async () => {
    const snap = await getDocs(collection(db, "doctors"));
    setDoctors(
      snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    );
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const addDoctor = async () => {
    if (!name || !specialty || !image) return alert("All fields required");

    const imgRef = ref(storage, `doctors/${Date.now()}_${image.name}`);
    await uploadBytes(imgRef, image);
    const imageUrl = await getDownloadURL(imgRef);

    await addDoc(collection(db, "doctors"), {
      name,
      specialty,
      imageUrl,
      createdAt: new Date()
    });

    setName("");
    setSpecialty("");
    setImage(null);
    fetchDoctors();
  };

  const deleteDoctor = async (id) => {
    await deleteDoc(doc(db, "doctors", id));
    fetchDoctors();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Doctors Management</h2>

      {/* Add Doctor */}
      <div className="bg-gray-100 p-4 rounded mb-6">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Doctor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Specialty"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        />

        <input
          type="file"
          className="mb-2"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          onClick={addDoctor}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Doctor
        </button>
      </div>

      {/* Doctors List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {doctors.map(doc => (
          <div key={doc.id} className="border p-3 rounded">
            <img
              src={doc.imageUrl}
              alt=""
              className="h-40 w-full object-cover mb-2"
            />
            <h3 className="font-bold">{doc.name}</h3>
            <p>{doc.specialty}</p>
            <button
              onClick={() => deleteDoctor(doc.id)}
              className="text-red-600 mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

