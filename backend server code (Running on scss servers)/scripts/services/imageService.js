const pool = require("../../db");

class ImageService {
    constructor() {
        console.log("Image Service Created");
    }
    async createInstanceImage(instanceId, locationId, imagePath){
        let conn;
        const sql = `
            INSERT INTO user_images (instance_id, location_id, image_src) 
            VALUES (?, ?, ?);`;
        try{
            conn = await pool.getConnection();
            const result = await conn.query(sql, [instanceId, locationId, imagePath]);
            return { instanceId, message: "User image created successfully." };
        } catch (err){
            console.error("Error:", err);
            return null;
        } finally {
            if (conn) conn.release();
        }
    }
    async updateLocationImage(locationId, imagePath){
        let conn;
        try {
            conn = await pool.getConnection();
            const result = await conn.query("UPDATE locations SET image_src = ? WHERE id = ?",[imagePath,locationId]);
            return result;
        } catch(err){
            console.log("Error", err);
            return null; 
        } finally {
            if (conn) conn.release();
        }
    }
}

module.exports = new ImageService();