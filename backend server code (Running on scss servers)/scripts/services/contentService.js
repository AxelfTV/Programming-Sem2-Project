class ContentService {
    pool;
    constructor(pool) {
        console.log("Content Service Created");
        this.pool = pool;
    }
    async getUserPosts(userId, limit){
        const sql = `
            SELECT user_id, instance_id, created_at
            FROM posts
            WHERE user_id = ?
            ORDER BY created_at DESC
            LIMIT ?;`;
    let conn;
    try {
        conn = await this.pool.getConnection();
        const result = await conn.query(sql,[userId, limit]);
        return result;
      } catch(err){
        console.error("Error:", err);
        return null;
      } finally {
        if (conn) conn.release();
      }
    }
    async getUserFeed(userId, limit){
        const sql = `
            SELECT posts.user_id, users.username, posts.instance_id, posts.created_at
            FROM posts
            JOIN follows ON posts.user_id = follows.followed_user_id
            JOIN users ON posts.user_id = users.id
            WHERE follows.following_user_id = ?
            ORDER BY posts.created_at DESC
            LIMIT ?;`;
        let conn;
        try {
            conn = await this.pool.getConnection();
            const result = await conn.query(sql,[userId, limit]);
            return result;
        } catch(err){
            console.error("Error:", err);
            return null;
        } finally {
            if (conn) conn.release();
        }
    }
    async getPostImages(instanceId){
        const sql = `
            SELECT * 
            FROM user_images
            WHERE instance_id = ?;`;
        let conn;
        try {
            conn = await this.pool.getConnection();
            const result = await conn.query(sql,[instanceId]);
            return result;
        } catch(err){
            console.error("Error:", err);
            return null;
        } finally {
            if (conn) conn.release();
        }
    }
    async checkPostExists(instanceId){
        const sql = `
            SELECT 1
            FROM posts
            WHERE instance_id = ?
            LIMIT 1;`;
        let conn;
        try {
            conn = await this.pool.getConnection();
            const result = await conn.query(sql,[instanceId]);
            return result.length>0;
        } catch(err){
            console.error("Error:", err);
            return null;
        } finally {
            if (conn) conn.release();
        }
    }
    async createPost(userId, instanceId){
        let conn;
        const sql = `
            INSERT INTO posts (user_id, instance_id) 
            VALUES (?, ?);`;
        try{
            conn = await this.pool.getConnection();
            const result = await conn.query(sql, [userId, instanceId]);
            return { instanceId, userId, message: "Post created successfully." };
        } catch (err){
            console.error("Error:", err);
            return null;
        } finally {
            if (conn) conn.release();
        }
    }
    async createRating(userId, routeId, score){
        let conn;
        const sql = `
            INSERT INTO ratings (user_id, route_id, score)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE
            score = VALUES(score);`;
        try{
            conn = await this.pool.getConnection();
            const result = await conn.query(sql, [userId, routeId, score]);
            return { userId, routeId, message: "Rating created successfully." };
        } catch (err){
            console.error("Error:", err);
            return null;
        } finally {
            if (conn) conn.release();
        }
    }
}

module.exports = ContentService;