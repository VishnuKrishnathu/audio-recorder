import React, { useState } from 'react';
import './App.css';
import { db } from "./dexie.conf";
import AudioFiles from "./components/AudioFiles";
import Header from './components/Header';

function App() {

  const [loadingState, setLoadingState] = useState<boolean>(false);

  async function uploadHandler(e : React.FormEvent){
    e.preventDefault();
    setLoadingState(true);
    console.log(e);
    let audio_file = ((e.target as any)[0].files[0]);
    console.log("received");
    await db.recordings.put({
      name: audio_file.name,
      recording : audio_file
    }).then(res => {
      setLoadingState(false);
    })
    .catch(err => {
      setLoadingState(false);
    })
  }

  return (
    <div className="App">
      <Header />

      <form className='p-5 border-2 border-solid border-red-600 m-5 w-fit' onSubmit={uploadHandler}>
        <label htmlFor="audio-input" className='font-bold text-xl block mb-5'>
          Upload your audio files here :
        </label>
        <input type="file" name="audio-input" accept='audio/*' required/>
        {!loadingState && <button className='bg-red-600 text-slate-50 rounded p-2 block mt-3' type="submit">Upload</button>}
        {loadingState && <button className='bg-slate-700 text-slate-50 rounded p-2 block mt-3' type="submit">Uploading...</button>}
      </form>

      <AudioFiles />
    </div>
  );
}

export default App;
