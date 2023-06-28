import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
    // Your Firebase configuration object goes here
    apiKey: "AIzaSyAyDM-IfH-XYdwWFkbgA_adL4qzPv6_pfU",
    authDomain: "dynamic-form-store.firebaseapp.com",
    projectId: "dynamic-form-store",
    storageBucket: "dynamic-form-store.appspot.com",
    messagingSenderId: "636628561653",
    appId: "1:636628561653:web:e7639c6c993b07b0165fbc",
    measurementId: "G-M2F7NK4XZB"
  };
  
initializeApp(firebaseConfig);
  
const db = getFirestore();

  



const Form = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [image, setImage] = useState(null);

  const handleText1Change = (e) => {
    setText1(e.target.value);
  };

  const handleText2Change = (e) => {
    setText2(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  
    // Save form data to Google Firestore
    const handleSave = async () => {
        const formData = {
          text1,
          text2,
          image: image ? image.name : null,
        };
      
        try {
          const docRef = await addDoc(collection(db, 'forms'), formData);
          console.log('Document written with ID: ', docRef.id);
        } catch (error) {
          console.error('Error adding document: ', error);
        }
      };
      
  

  return (
    <div className="flex">
      <div className="w-1/2">
        <h2 className="text-2xl font-bold mb-4">Form</h2>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="text1">
            Text Field 1
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            id="text1"
            value={text1}
            onChange={handleText1Change}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="text2">
            Text Field 2
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            id="text2"
            value={text2}
            onChange={handleText2Change}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="image">
            Image Field
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      <div className="w-1/2 ml-4">
        <h2 className="text-2xl font-bold mb-4">Preview</h2>
        <div>
          <p className="mb-2">Text Field 1: {text1}</p>
          <p className="mb-2">Text Field 2: {text2}</p>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="max-w-full h-auto mb-4"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
