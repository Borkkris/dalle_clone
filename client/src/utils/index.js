import { supriseMePrompts } from '../constants';
import FileSaver from 'file-saver';

// makes sure we get a random prompt
export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random() *
    supriseMePrompts.length);
    const randomPrompt = supriseMePrompts[randomIndex];

    // makes sure we will not get the same prompt one after the other
    if(randomPrompt === prompt) return getRandomPrompt(prompt);

    return randomPrompt
}

export function downloadImage(_id, photo) {
    FileSaver.saveAs(photo,`download-${_id}.jpeg`);
}