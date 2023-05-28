import classes from './OrderedItems.module.css'
const OrderedItems = (props) => {
    return (
        <div className={classes.summary}>
            <span className={classes.price}>{props.name}</span>
            <span className={classes.price}>{props.price}</span>
            <span className={classes.amount}>x {props.amount}</span>
        </div> 
    );
}
export default OrderedItems;