const BlogModel = require("../models/blog")
const moment = require('moment')
const UserModel  = require("../models/users")


exports.createBlog = async (req,res)=>{
    try {
      const data = req.body;
      data.userId = req.user._id
      data.author = req.user._id
      const time = data.body.split(' ').length
      const reading_time = time >=30? "20mins": reading_time>=20?"10mins" : reading_time>=10? "5mins": "2mins"
      data.reading_time = reading_time
      data.read_count = 1
    const blog = await BlogModel.create(data)
       
    return res.status(200).json({
        message:"Blog created successfully",
        status: true,
        userId: req.user._id,
        blog : blog
    })
    } catch (error) {
        if(error.keyPattern){
          return res.status(404).send({message:" Title already used"})

        }
       
        res.status(422).send({message:"Data entered is invalid"})
    }
}


exports.getBlog = async (req,res)=>{
    try {
        const { id } = req.params;
        console.log(id)
        const result = await BlogModel.findById(id)
        console.log(result, "result")
        result.read_count++
        await result.save()
        const data = await BlogModel.findById(id).populate("author")
        res.status(200).json({message:"Record Fetched successfully", status: true, Blog:data})
    } catch (error) {
        console.log(error)
        res.status(500).send({message: "The id passed doesn't exist"})
    }
}
exports.getBlogs = async (req,res)=>{

    const { state, page = 0, per_page = 20} = req.query
    const findQuery = {}

    if(state){
        findQuery.state = state
    }

    const userId = req.user._id
     findQuery.userId = userId
    try {
        
        const result = await BlogModel.find(findQuery).populate("author").skip(page).limit(per_page)
       
        console.log(result, "result")
        res.status(200).json({message:"Successfully retrieved fully", status:true, blog: result});
      } catch (err) {
        console.log(err)
        res.status(500).send("Something went wrong, check logs")
      }
}


exports.getAllBlogs = async (req,res)=>{
   
    //const blogs = await BlogModel.find({})
   
    const { page = 0, per_page = 20, tag, author, title, created_at, sortby="created_at", sort="asc"} = req.query

    const findQuery = {}

    const sortQuery = {}
    const sortAttributes = sortby.split(" ")
   
    for(const attribute of sortAttributes){
        if(sort === "asc" && sortby){
            sortQuery[attribute] = 1
        }
        if(sort === 'desc' && sortby){
            sortQuery[attribute] = -1
        }
        
    }



    if (created_at) {
        findQuery.created_at = {
            $gt: moment(created_at).startOf('day').toDate(), 
            $lt: moment(created_at).endOf('day').toDate(),
        }
    } 
    if(author){
        findQuery.author = author
    }
    if(tag){
    
        findQuery.tags = {$in:tag.split(" ")}
    }

    if(title){
        findQuery.title = title
    }

    findQuery.state = "published"

    try {
        
        const result = await BlogModel.find(findQuery).populate("author").sort(sortQuery).skip(page).limit(per_page)
        
        res.status(200).json({message:"All data retrieved successfully", status:true, Blogs:result});
      } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong, check logs");
      }
}


//update any field in the blog.
exports.updateBlog = async(req,res)=>{
    try {
        const id = req.params.id
        const blog = req.body
        
        const update = await BlogModel.findByIdAndUpdate(id, blog, {new: true})
        res.status(200).json({message:"Data updated successfully", status: true, blog: update})
    } catch (error) {
        res.status(500).send(err)
    }
}

exports.deleteBlog = async(req,res)=>{
    try {
        const id = req.params.id
        const result = await BlogModel.findByIdAndDelete(id)
        res.status(200).json({message:"Blog deleted successfully", status: true})
    } catch (error) {
        res.status(500).send(error)
        
    }
}