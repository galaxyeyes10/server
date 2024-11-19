const express = require('express')
const app = express();
const cors = require('cors')
const port = process.env.port || 3001;
const pg = require('pg');

const client = new pg.Pool({
    user: "database_wvl1_user",
    host: "dpg-csu2uct6l47c73djpak0-a.oregon-postgres.render.com",
    password: "4RR5vnL2EreOdJkbzVEyiTvhvr1eLsXE",
    port: 5432,
    database: "database_wvl1",
    ssl: true,
});

app.use(cors())

app.get('/fruit/:kind', async(req, res)=> {
    const ddd = req.params.kind;
    
    await client.connect();
    const result = await client.query(
        "select * from public.render_db where fruit_id = $1", 
        [ddd]
    );
    res.send(result.rows[0].fruit_img);
});

app.get('/banana', (req, res)=> {
    res.send("🍌")
})

app.get('/watermelon', (req, res)=> {
    res.send("🍉")
})

app.get('*', (req, res)=> {
    res.send("NotFound")
})

app.listen(3001, ()=> {
    console.log("connected on server port" + port);    
});

module.exports = app;