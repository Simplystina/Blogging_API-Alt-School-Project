const request = require('supertest')
const { connect } = require('./database')
const app = require('../app');
const moment = require('moment');
const BlogModel = require('../models/blog');
const UserModel = require('../models/users')


describe('Blog Route', () => {
    let conn;
    let token;
    let createdBlogId;

    beforeAll(async () => {
        conn = await connect()

      const response =  await UserModel.create({ email: 'tobi@mail', password: '123456'});
      
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

    it('should return all published Blogs', async () => {
        // create Blog in our db

       

        const response = await request(app)
        .get('/Blogs')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('Blogs')
        expect(response.body).toHaveProperty('status', true)
    }),
    it('should post blogs', async() =>{
          const response = await request(app).post("/blog")
          .send(
            {
                    title: "Lowest time arrival",
                    description: "Find the lowest price ",
                    body:"Find the lowest price for Computer Science Boot Camp today! Now on sale at GigaPromo. GigaPromo is the website to compare Computer Science Boot Camp. Search and save now! Cheap Prices. Compare Simply. Large Selection. Compare Online. Always Sale. The Best Price. Save Online.",
                    state:"draft",
                    tags:[
                      "food",
                      "eat",
                      "well"
                      ]
            }).set('content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
             createdBlogId = response.body.blog._id
             expect(response.status).toBe(200)
             expect(response.body).toHaveProperty('blog')
            expect(response.body).toHaveProperty('status', true)
            
        
    }

    ),

    it('should return Blogs for a particular user', async () => {
       

        const response = await request(app)
        .get('/blog')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('blog')
        expect(response.body).toHaveProperty('status', true)
    }),

    it('should update Blog PATCH /blog/:id', async () => {
        // Update a field in our database
       

        const response = await request(app).put(`/blog/${createdBlogId}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('blog')
        expect(response.body).toHaveProperty('status', true)
    })
    ,

   it('should delete Blog /blog/:id', async () => {
        // Update a field in our database
        
              
        
        const response = await request(app).delete(`/blog/${createdBlogId}`)
        
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('message',"Blog deleted successfully")
        expect(response.body).toHaveProperty('status', true)
    })
     
    
});
