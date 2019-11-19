import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withAuthorization} from '../session'; 

const useStyles = makeStyles({
  card: {
    maxWidth: 455,
    padding: 30, 
    float: 'left', 
  },
  media: {
    height: 180,
  },
  row: {
    margin: 0 -5,
    padding: 40,
  }, 
},


);


export default function HomePage () {
  const classes = useStyles(); 
  return (
    <div className={classes.row}>
       <Card className={classes.card}>
        <CardActionArea>
        <CardMedia
            className={classes.media}
            image="https://images.unsplash.com/photo-1551718753-9a1d488b523d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Yoga training 
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card className={classes.card}>
        <CardActionArea>
        <CardMedia
            className={classes.media}
            image="https://images.unsplash.com/photo-1571388208497-71bedc66e932?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Gym training 
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card className={classes.card}>
        <CardActionArea>
        <CardMedia
            className={classes.media}
            image="https://images.unsplash.com/photo-1517130038641-a774d04afb3c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Zumba training 
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      
      
    </div>
  );
}

 

