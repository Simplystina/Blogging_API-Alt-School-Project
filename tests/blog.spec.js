const request = require('supertest')
const { connect } = require('./database')
const app = require('../app');
const moment = require('moment');
const BlogModel = require('../models/blog');
const UserModel = require('../models/users')


describe('Blog Route', () => {
    let conn;
    let token;

    beforeAll(async () => {
        conn = await connect()

        await UserModel.create({ email: 'tobi@mail', password: '123456'});

        const loginResponse = await request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({ 
            email: 'tobi@mail', 
            password: '123456'
        });

        token = loginResponse.body.token;
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it('should return Blogs', async () => {
        // create Blog in our db
        await BlogModel.create(
        {
            title: "Importance of sleeping well",
            description: "Find the lowest price for Computer Science Boot Camp today! Now on sale at GigaPromo. GigaPromo is the website to compare Computer Science Boot Camp. Search and save now! Cheap Prices. Compare Simply. Large Selection. Compare Online. Always Sale. The Best Price. Save Online.",
            
            state:"draft",
            tags:[
              "food",
              "eat",
              "well"
              ]
          })

       

        const response = await request(app)
        .get('/Blogs')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('Blogs')
        expect(response.body).toHaveProperty('status', true)
    }),

    it('should return Blogs for a particular user', async () => {
        // create Blog in our db
        await BlogModel.create(
        {
            title: "Importance of sleeping well",
            description: "Find the lowest price for Computer Science Boot Camp today! Now on sale at GigaPromo. GigaPromo is the website to compare Computer Science Boot Camp. Search and save now! Cheap Prices. Compare Simply. Large Selection. Compare Online. Always Sale. The Best Price. Save Online.",
            
            state:"draft",
            tags:[
              "food",
              "eat",
              "well"
              ]
          })

       

        const response = await request(app)
        .get('/blog')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('blog')
        expect(response.body).toHaveProperty('status', true)
    }),
    it('should return update Blogs', async () => {
        // Update a field in our database
        await BlogModel.create(
        {
            title: "Importance of excercises",
            description: "Find the lowest price for Computer Science Boot Camp today! Now on sale at GigaPromo. GigaPromo is the website to compare Computer Science Boot Camp. Search and save now! Cheap Prices. Compare Simply. Large Selection. Compare Online. Always Sale. The Best Price. Save Online.",
            
            state:"draft",
            tags:[
              "food",
              "eat",
              "well"
              ]
          })

       

        const response = await request(app)
        
        .get('/blog/:id')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .query({})

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('Blogs')
        expect(response.body).toHaveProperty('status', true)
    })


    
});
