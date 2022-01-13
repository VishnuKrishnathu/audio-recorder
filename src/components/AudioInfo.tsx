import { useState } from 'react'
import { db, IAudio } from "../dexie.conf";

export default function AudioInfo({props} : {props :IAudio}) {
    const [displayComponent, setDisplayComponent] = useState<boolean>(true);
    function deleteHandler(audioId :number | undefined){
        if(!audioId) return;
        db.recordings.delete(audioId);
        setDisplayComponent(false);
    }
    return (
        <section>
        {displayComponent && <div className='border-2 border-solid border-red-500 shadow-lg w-fit rounded p-2 my-3'>
            <span className='font-semibold'>{props.recording.name}</span>
            <audio controls>
                <source type="audio/mpeg" src={URL.createObjectURL(props.recording)}/>
            </audio>
            <button className='bg-red-600 p-2 rounded text-slate-50 my-1' onClick={() => deleteHandler(props.id)}>
                Delete Recording
            </button>
        </div>}
        </section>
    )
}
