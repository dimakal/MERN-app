import React from "react"
import useStyles from './styles'
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";
import moment from "moment";
import {Delete, MoreHoriz, ThumbUpAlt} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {deletePost, likePost} from "../../redux/actions/posts";

const Post = ({post, setCurrentId}) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const id = post._id
    const tags = post.tags.join().split(' ').map(tag => `#${tag} `)

    return (
        <Card className={classes.card} >
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant={'h6'} > {post.creator} </Typography>
                <Typography variant={'body2'} > {moment(post.createdAt).fromNow()} </Typography>
            </div>
            <div className={classes.overlay2}>
                <Button
                    style={{color: 'white'}}
                    size={'small'}
                    onClick={() => setCurrentId(id)}
                >
                    <MoreHoriz fontSize={'default'} />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant={'body2'} color={'textSecondary'} > {tags} </Typography>
            </div>
            <Typography variant={'h5'} className={classes.title} gutterBottom > {post.title} </Typography>
            <CardContent>
                <Typography variant={'h5'} className={classes.title} gutterBottom > {post.message} </Typography>
            </CardContent>
            <CardActions className={classes.cardActions} >
                <Button size={'small'} color={'primary'} onClick={() => {dispatch(likePost(post._id))}}>
                    <ThumbUpAlt fontSize={'small'} />
                    Like
                    {post.likeCount}
                </Button>
                <Button size={'small'} color={'primary'} onClick={() => dispatch(deletePost(post._id))}>
                    <Delete fontSize={'small'} />
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post