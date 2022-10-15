const Blog = require ( '../models/blog')
const Comment = require ( '../models/Comment')

module.exports.CreatBlog = async (req,res) => {
    console.log(req?.user?._id);
    const data = await Blog.create(
        {
            Hedding : req.body.Hedding || 'Hello Wold',
            SubHedding : req.body.SubHedding || 'SubHedding',
            Url : req.body.Url,
            user_id : req?.user?._id
        })
        req.flash('success','Blog created successfully')
        return res.redirect('/blog')
}
module.exports.getBlogs = async (req , res) =>{
    const Data = await Blog.find({}).populate('user_id').populate(
        {
            path : 'comments',
            populate : {
                path : 'user_id'
            }
        }

        )
        Data.forEach((i) => {
            // console.log('i++',i.comments);
            i.comments.forEach((j) => {
                console.log('j++',j.user_id?._id);
            })
        })
        
    return res.render('Blog.ejs',{
        Data,
        auth : req?.user? true : false,
        user_id : req?.user?._id
    })
}

module.exports.getblogpage = (req,res) => {
    return res.render('Creat-Blog.ejs')
}

module.exports.UpadateData = async (req , res) => {
    const id = req.params.id

    await Blog.findByIdAndUpdate(id, {
        Hedding : req.body.Hedding,
        SubHedding : req.body.SubHedding,
        Url : req.body.Url        
    })

    const Data = await Blog.find({id})

    res.render('Blog.ejs' , {
        Data,
        auth : req?.user? true : false,
        user_id : req?.user?._id
    })
}

module.exports.DeleteBlog = async (req , res) => {

    const blogData = await Blog.findById(req.params.id)

    if(!blogData){
        req.flash('error','Blog not found')
    }

    if(blogData.user_id.toString() === req.user._id.toString()){
        await blogData.remove()
        await Comment.remove({ blog_id : req.params.id })
        req.flash('success','Blog deleted successfully')
        return res.redirect('/blog')
    }

    return res.redirect('/blog')
 
}
       
