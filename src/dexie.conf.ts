import Dexie from "dexie";

// export const db = new Dexie("AudioRecordings");

// db.version(1).stores({
//     recordings: "++id, name"
// })

class AudioDatbase extends Dexie {
    recordings!: Dexie.Table<IAudio, number>; // number = type of the primkey

    constructor () {
        super("AudioRecordings");
        this.version(1).stores({
            recordings: '++id, name',
        });
    }
}

export interface IAudio {
    id?: number;
    name: string;
    recording :File
}

export const db = new AudioDatbase();