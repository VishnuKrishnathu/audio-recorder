import { useEffect, useState } from 'react'
import { db, IAudio } from "../dexie.conf";
import AudioInfo from './AudioInfo';

export default function AudioFiles() {

    const [ audioRecordings, setAudioRecordings ] = useState<Array<IAudio>>([]);

    useEffect(function(){
        db.recordings.toArray()
        .then(res => setAudioRecordings(res))
        .catch(err => console.log(err));
    }, [])

    return (
        <div className='ml-5'>
            <h4 className='underline font-bold text-xl text-red-700'>Audio Recordings </h4>
            {
                audioRecordings.length == 0 && <h4 style={{
                    color: "rgb(185 28 28)",
                    fontWeight: "600",
                    marginTop: "1.2rem"
                }}>No recordings in indexedDB. Upload an audio or refresh the page</h4>
            }

            {
                audioRecordings.length > 0 && audioRecordings.map((recording, index) => {
                    return (
                        <AudioInfo props={recording} key={index}/>
                    )
                })
            }
            
        </div>
    )
}
