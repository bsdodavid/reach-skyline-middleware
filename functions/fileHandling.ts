import * as fs from "node:fs";
import { type } from "node:os";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "..", "assets", "users.json");

export default function writeToFile(user:any) {
    const existingUsers = fetchFile();
    let users:any[] = [];

    if(!user || user.length>0) return;

    try {
        if(existingUsers && existingUsers.length>0){
            user.id = existingUsers[existingUsers.length-1].id + 1;
            existingUsers.push(user);
            existingUsers.map((usr) => users.push(usr));
        }else {
            user.id = 1;
            users.push(user);
        }

        fs.writeFileSync(filePath, JSON.stringify(users), 'utf-8');
    } catch(error) {
        console.error("Error writing file:", error);
    }
    
}

export function fetchFile(){
    let users:any[] = [];
    try{
        const fileData = fs.readFileSync(filePath);
        users = fileData && fileData.length>0? JSON.parse(fileData.toString()):[];
    } catch(error) {
        console.error("Error reading file:", error);
    }

    return users;
}