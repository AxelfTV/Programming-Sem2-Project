const bcrypt = require('bcrypt');

class UserService {
    pool;
    
    constructor(pool) {
        console.log("User Service Created");
        this.pool = pool;
        
    }
    async getAllUsers(){
        let conn;
        try {
            conn = await this.pool.getConnection();
            const result = await conn.query("SELECT id, username, bio, profile_image_src FROM users");
            return result;
          } catch(err){
            console.error("Error:", err);
            return null;
          } finally {
            if (conn) conn.release();
          }
    }
    async getUserById(userId){
        let conn;
        try {
            conn = await this.pool.getConnection();
            const result = await conn.query('SELECT id, username, bio, profile_image_src FROM users WHERE id = ?', [userId]);
            return result;
          } catch(err){
            console.error("Error:", err);
            return null;
          } finally {
            if (conn) conn.release();
          }
    }
    async getUserByUsername(username){
        let conn;
        try {
            conn = await this.pool.getConnection();
            const result = await conn.query('SELECT * FROM users WHERE username = ?', [username]);
            return result;
          } catch(err){
            console.error("Error:", err);
            return null;
          } finally {
            if (conn) conn.release();
          }
    }
    async checkUserExists(username){
        let conn;
        try {
            conn = await this.pool.getConnection();
            const result = await conn.query('SELECT EXISTS (SELECT 1 FROM users WHERE username = ?) AS username_exists;', [username]);
            return result;
          } catch(err){
            console.error("Error:", err);
            return null;
          } finally {
            if (conn) conn.release();
          }
    }
    async addNewUser(username, password){
        let conn;
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            conn = await this.pool.getConnection();
            const result = await conn.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
            return result.insertId.toString();
        } catch(err){
            console.log("Error", err);
            return null;
        } finally {
            if (conn) conn.release();
        }
    }
    async loginUser(username, password) {
      let conn;
      try {
          conn = await this.pool.getConnection();
          const result = await conn.query(
              "SELECT id, username, password FROM users WHERE username = ?",
              [username]
          );
  
          if (result.length === 0) {
              return { success: false, message: "User not found" };
          }
  
          const user = result[0];
          const passwordMatch = await bcrypt.compare(password, user.password);
  
          if (!passwordMatch) {
              return { success: false, message: "Invalid password" };
          }
          return { success: true, user: { id: user.id, username: user.username } };
      } catch (err) {
          console.error("Error:", err);
          return { success: false, message: "Internal server error" };
      } finally {
          if (conn) conn.release();
      }
  }
    async updateUserBio(userId, bio){
        let conn;
        try {
            conn = await this.pool.getConnection();
            const result = await conn.query("UPDATE users SET bio = ? WHERE id = ?",[bio,userId]);
            return result;
        } catch(err){
            console.log("Error", err);
            return null; 
        } finally {
            if (conn) conn.release();
        }
    }
    async updateUserProfileImage(userId, image_src){
        let conn;
        try {
            conn = await this.pool.getConnection();
            const result = await conn.query("UPDATE users SET profile_image_src = ? WHERE id = ?",[image_src,userId]);
            return result;
        } catch(err){
            console.log("Error", err);
            return null; 
        } finally {
            if (conn) conn.release();
        }
    }
    async addNewFollow(followedId, followerId){
      let conn;
      try{
          conn = await this.pool.getConnection();
          const result = await conn.query("INSERT INTO follows (following_user_id, followed_user_id) VALUES (?, ?);", [followerId, followedId]);
          return result.insertId.toString();
      } catch(err){
          console.log("Error", err);
          return null; 
      } finally{
          if (conn) conn.release();
      }
  }
    
}

module.exports = UserService;