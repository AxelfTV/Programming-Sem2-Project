const pool = require("../../db");

class RouteService {
    constructor() {
        console.log("Route Service Created");
    }
    async getAllRoutes(){
        let conn;
            try {
                conn = await pool.getConnection();
                const result = await conn.query("SELECT * FROM routes");
                return result;
              } catch(err){
                console.error("Error:", err);
                return null;
              } finally {
                if (conn) conn.release();
              }
        }
    async getRouteById(routeId){
        let conn;
        const sql = "SELECT * FROM routes WHERE id = ?";
        try {
            conn = await pool.getConnection();
            const result = await conn.query(sql, [routeId]);
            return result;
        } catch (err) {
            console.error("Error:", err);
            return null;
        } finally {
            if (conn) conn.release();
        }
    }
    async getLocationById(locationId){
        let conn;
        const sql = "SELECT * FROM locations WHERE id = ?";
        try {
            conn = await pool.getConnection();
            const result = await conn.query(sql, [locationId]);
            return result;
        } catch (err) {
            console.error("Error:", err);
            return null;
        } finally {
            if (conn) conn.release();
        }
    }
    async getUserActiveInstance(userId){
        let conn;
        const sql = "select * from route_instances where user_id = ? and status != -1"
        try {
            conn = await pool.getConnection();
            const result = await conn.query(sql, [userId]);
            return result;
        } catch (err) {
            console.error("Error:", err);
            return null;
        } finally {
            if (conn) conn.release();
        }
    }
    async getInstanceById(instanceId){
        let conn;
        const sql = "SELECT * FROM route_instances WHERE id = ?";
        try {
            conn = await pool.getConnection();
            const result = await conn.query(sql, [instanceId]);
            return result;
        } catch (err) {
            console.error("Error:", err);
            return null;
        } finally {
            if (conn) conn.release();
        }
    }
    async getRandomRoutes(limit){
        let conn;
        const sql = `
            select * from routes
            order by rand()
            limit ?;
        `; 
        try {
            conn = await pool.getConnection();
            const result = await conn.query(sql, [limit]);
            return result;
        } catch (err) {
            console.error("Error:", err);
            return null;
        } finally {
            if (conn) conn.release();
        }
    }
    async getRouteLocationsByRouteId(routeId){
        let conn;
        const sql = `
            SELECT l.id, l.name, l.image_src, l.long, l.lat
            FROM locations l
            JOIN route_locations rl ON l.id = rl.location_id
            WHERE rl.route_id = ?
            ORDER BY rl.route_position;`;
            try {
                conn = await pool.getConnection();
                const result = await conn.query(sql, [routeId]);
                console.log(result);
                return result;
            } catch (err) {
                console.error("Error:", err);
            } finally {
                if (conn) conn.release();
            }
    }
    async addNewRoute(userId, locations, name){
        let conn;
        const sql = 'INSERT INTO routes (created_by_id, name) VALUES (?, ?)';
        const sql2 = 'INSERT INTO route_locations (route_id, location_id, route_position) VALUES (?, ?, ?)';
        try {
            conn = await pool.getConnection();
            const result = await conn.query(sql, [userId,name]);
            const id = result.insertId.toString();
            for(let location in locations){
                const locRes = await conn.query(sql2, [id, locations[location], location]);
                console.log(locRes);
            }
            return { message: 'Route added', id: id };
        } catch(err){
            console.log("Error:", err);
            return null;
        } finally {
            if (conn) conn.release();
        }
    }
    async endUserRoute(userId){
        let conn;
        const sql = 'SELECT * FROM route_instances WHERE user_id = ? AND status != -1';
        const sql2 = 'UPDATE route_instances SET status = -1 WHERE id = ?';
        try {
            conn = await pool.getConnection();
            const currentRoute = await conn.query(sql, [userId]);

            if (currentRoute.length === 0) {
                console.log("No active route found for user:", userId);
                return null;
            }

            const instanceId = currentRoute[0].id
            const result = await conn.query(sql2, [instanceId])

            if (result.affectedRows > 0) {
                return { message: 'Route ended successfully', id: instanceId };
            } else {
                return { message: 'Failed to end route', id: instanceId };
            }
        } catch(err){
            console.log("Error ending route:", err);
            return null;
        } finally {
            if (conn) conn.release();
        }
    }
    async checkUserRouteStatus(userId){
        let conn;
        const sql = 'SELECT COUNT(*) AS count FROM route_instances WHERE user_id = ? AND status != -1';
        try {
            conn = await pool.getConnection();
            const result = await conn.query(sql, [userId]);
            
            return result[0].count > 0;
        } catch(err){
            console.log("Error checking route existence:", err);
            return false;
        } finally {
            if (conn) conn.release();
        }
    } 
    async userStartRoute(userId, routeId){
        let conn;
        const sql = 'INSERT INTO route_instances (user_id, route_id) VALUES (?, ?);';
        try {
            conn = await pool.getConnection();
            const result = await conn.query(sql, [userId, routeId]);
            
            return result.insertId.toString();
        } catch(err){
            console.log("Error adding new route instance:", err);
            return null;
        } finally {
            if (conn) conn.release();
        }
    }
    async updateRouteInstance(instanceId, destinationNumber){
        let conn;
        const sql = `
            UPDATE route_instances
            SET status = ?
            WHERE id = ?;`;
            try {
                conn = await pool.getConnection();
                const result = await conn.query(sql, [destinationNumber, instanceId]);
                if (result.affectedRows === 0) {
                    console.log("No route instance found with the provided id.");
                    return null;
                }
                
                return `Route instance ${instanceId} updated successfully.`;
            } catch(err){
                console.log("Error adding new route instance:", err);
                return null;
            } finally {
                if (conn) conn.release();
            }
    }
    async getRouteRatings(routeId)
    {
        let conn;
        const sql = `select * from ratings where route_id = ?`;
        try {
            conn = await pool.getConnection();
            const result = await conn.query(sql, [routeId]);
            console.log(result);
            return result;
        } catch (err) {
            console.error("Error:", err);
        } finally {
            if (conn) conn.release();
        }
    }
}

module.exports = new RouteService();