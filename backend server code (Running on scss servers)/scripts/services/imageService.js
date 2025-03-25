class ImageService {
    pool;
    constructor(pool) {
        console.log("Image Service Created");
        this.pool = pool;
    }
    async createInstanceImage(instanceId, locationId, imagePath){
        let conn;
        const sql = `
            INSERT INTO user_images (instance_id, location_id, image_src) 
            VALUES (?, ?, ?);`;
        try{
            conn = await this.pool.getConnection();
            const result = await conn.query(sql, [instanceId, locationId, imagePath]);
            return { instanceId, userId, message: "User image created successfully." };
        } catch (err){
            console.error("Error:", err);
            return null;
        } finally {
            if (conn) conn.release();
        }
    }
}

module.exports = ImageService;