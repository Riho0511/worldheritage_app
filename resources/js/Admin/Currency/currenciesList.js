import React from 'react';
import { makeStyles } from '@mui/styles';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

const useStyles = makeStyles({
   root: {
       backgroundColor: 'rgb(40,40,45)',
       color: 'rgb(255,255,255)',
   } 
});


const CurrenciesList = (props) => {
    const classes = useStyles();
    
    
    // チェックボックスの切り替え
    const handleToggle = (value) => () => {
        const currentIndex = props.checked.indexOf(value);
        const newChecked = [...props.checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else { 
            newChecked.splice(currentIndex, 1);
        }

        props.setChecked(newChecked);
    };
    
    
    return (
        <List component={Paper} elevation={3} className={classes.root}>
            {props.currenciesList.map((currency, index) => {
                return (
                    <div key={currency.id}>
                        <ListItem>
                            <ListItemButton onClick={handleToggle(currency)} dense>
                                <ListItemText primary={`${index+1}. ${currency.unit}`} />
                                <ListItemIcon>
                                    <Checkbox 
                                        checked={props.checked.indexOf(currency) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                        {props.currenciesList.length-1 !== index &&
                            <Divider />
                        }
                    </div>
                );
            })}
        </List>
    );
};

export default CurrenciesList;