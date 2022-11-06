const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogSchema = new Schema(
    {
        title: { type: String, unique: true},
        description: String,
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
        state: { type: String, enum: ['draft', 'published'], default: 'draft'},
        read_count: {type: Number},
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        tags: [{
        type: String,
        }],
        reading_time: {type: String}
  
  },
  {
    timestamps: true
  }
);

const Blog = mongoose.model('blog', BlogSchema);

module.exports = Blog;