const Comment = require('../models/Comment')
const Blog = require('../models/blog')


module.exports.createComment = async (req,res) => {
 
    const blog = await Blog.findById(req.body.blog_id)
    
    if(!blog){
        req.flash('error','Blog not found')
        return res.redirect('/blog')
    }
    
    const comment = await Comment.create({
        content : req.body.content,
        blog_id : req.body.blog_id,
        user_id : req?.user?._id
    })

    blog.comments.push(comment._id)
    await blog.save()

    req.flash('success','Comment created successfully')
    return res.redirect('/blog')
}


module.exports.deleteComment = async (req,res) => {
    console.info("id+ ",req.params.id)
    const comment = await Comment.findById(req.params.id)

    if(!comment){
        req.flash('error','comment not found')
        return res.redirect('/blog')
    }

    if(comment.user_id.toString() === req.user._id.toString()){
        await comment.remove()
        await Blog.findByIdAndUpdate(comment.blog_id , {
            $pull : {
                comments : req.params.id
            }   
        })
    }
    req.flash('success','Comment is Delete')

    return res.redirect('/blog')
} 